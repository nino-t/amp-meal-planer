import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/auth.layout";
import MasterLayout from "./layouts/master.layout";
import AuthFeedback from "./pages/auth-feedback/auth-feedback.page";
import AuthSignin from "./pages/auth-signin/auth-sigin.page";
import AuthSigninViaEmail from "./pages/auth-signin-email/auth-sigin-email.page";
import Home from "./pages/home/home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<AuthSignin />} />
          <Route path="signin/via-email" element={<AuthSigninViaEmail />} />
          <Route path="feedback" element={<AuthFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
