const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const { generateToken } = require("./utils/token");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  const whitelisted = [
    "/api/v1/_/auth/login",
    "/api/v1/_/auth/register",
    "/api/v1/_/auth/token-revoke",
  ];

  if (whitelisted.includes(req.path) === false) {
    const headers = req.headers || {};
    const { token = null } = headers;

    if (token) {
      const currentTime = Date().now();
      const dbToken = db.get("access_tokens").find({ token: token }).value();
      if (dbToken.exp < currentTime) {
        return res.status(401).jsonp({
          error_message: "Your token is expire",
        });
      }
    } else {
      return res.status(401).jsonp({
        error_message: "You not have access credentials",
      });
    }
  }

  return next();
});

server.post("/api/v1/_/auth/token-revoke", (req, res) => {
  const { refresh_token } = req.body;
  const oldRefreshToken = db
    .get("refresh_tokens")
    .find({
      refresh_token,
    })
    .value();

  if (oldRefreshToken) {
    const generatedToken = generateToken(oldRefreshToken.id);
    const newGeneratedRefreshToken = generateToken(oldRefreshToken.id, 12); // expire 12 hours
    db.get("access_tokens").find({ user_id: oldRefreshToken.id }).assign(generatedToken).write();
    db.get("refresh_tokens")
      .find({ user_id: oldRefreshToken.id })
      .assign(newGeneratedRefreshToken)
      .write();

    return res.status(200).jsonp({
      data: {
        access_token: {
          token: generatedToken.token,
          exp: generatedToken.exp,
        },
        refresh_token: {
          token: newGeneratedRefreshToken.token,
          exp: newGeneratedRefreshToken.exp,
        },
      },
    });
  } else {
    return res.status(401).jsonp({
      error_message: "You not have access credentials",
    });
  }
});

server.post("/api/v1/_/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = db
    .get("users")
    .find({
      email,
      password,
    })
    .value();

  if (user) {
    const generatedToken = generateToken(user.id);
    const generatedRefreshToken = generateToken(user.id, 12); // expire 12 hours
    const responseJSON = {
      ...user,
      access_token: {
        token: generatedToken.token,
        exp: generatedToken.exp,
      },
      refresh_token: {
        token: generatedRefreshToken.token,
        exp: generatedRefreshToken.exp,
      },
    };

    // Commit Token
    const tokenAlreadyExist = db
      .get("access_tokens")
      .find({
        user_id: user.id,
      })
      .value();

    if (tokenAlreadyExist) {
      db.get("access_tokens").find({ user_id: user.id }).assign(generatedToken).write();
    } else {
      db.get("access_tokens").push(generatedToken).write();
    }

    // Commit Refresh Token
    db.get("refresh_tokens").remove({ user_id: user.id }).write();
    db.get("refresh_tokens").push(generatedRefreshToken).write();

    res.status(200).jsonp({
      data: responseJSON,
    });
  } else {
    res.status(401).jsonp({
      error_message: "Your credentials is invalid",
    });
  }
});

server.post("/api/v1/_/auth/register", (req, res) => {});

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
  });
};
server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running in port 3004");
});
