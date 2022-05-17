import React, { Fragment } from "react";

import "../static/css/signIn.css";
import Image from "../static/images/signIn.png";

export default function SignIn() {
  return (
    <Fragment>
      <div className="signin">
        <div>
          <img src={Image} alt="intro" />
        </div>
        <div>
          <h5>Sign in</h5>
          <form>
            <input type="text" placeholder="Username" /> <br />
            <input type="text" placeholder="Password" /> <br />
            <button>Continue</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}