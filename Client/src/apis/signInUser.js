import { SIGNIN_URL } from "../utils/BackendUrls";
import axios from "axios";

export const signinUser = async (values) => {
  console.log(values);
  axios
    .post(SIGNIN_URL, {
      email: values.email_id,
      password: values.password,
    })
    .then((res) => {
      if (res.status === 200) {
        // set tokens and redirect to next page
      }
    })
    .catch(function (error) {
      if (error.response) {
        // refresh the page or redirect to same page with error popup
      }
    });
};
