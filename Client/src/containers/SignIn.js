import React, { Fragment, useState } from "react";
import { signinUser } from "../apis/signInUser";

import "../static/css/signIn.css";
import Image from "../static/images/signIn.png";

export default function SignIn() {
  const [values, setValues] = useState({
    email_id: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      signinUser(values);
    }
  };

  return (
    <Fragment>
      <div className="signin">
        <div>
          <img src={Image} alt="intro" />
        </div>
        <div>
          <h5>Sign in</h5>
          <form>
            <input type="text" placeholder="Username"
              onChange={handleChange("email_id")}
              value={values.email_id} /> <br />
            <input type="password" placeholder="Password"
              onChange={handleChange("password")}
              value={values.password}
              onKeyPress={handleEnter} /> <br />
            <button onClick={signinUser(values)}>Continue</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
