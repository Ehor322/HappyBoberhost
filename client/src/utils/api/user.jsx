import { axios } from "../../core";

export default {
  signin: postData => axios.post("/user/signin", postData),
  signup: postData => axios.post("/user/signup", postData),
  getMe: () => axios.get("/user/me"),
  findUsers: query => axios.get("/user/find?query=" + query)
};