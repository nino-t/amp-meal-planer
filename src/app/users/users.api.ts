import request from "../../utils/request";
import { User } from "./users.interface";

export const fetchUserList = async (): Promise<User[]> => {
  try {
    const httpResponse = await request.get(`/users`);
    return httpResponse.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
