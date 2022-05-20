import React, { Fragment, useState } from 'react';

import '../static/css/signIn.css';
import Image from '../static/images/signIn.png';

import { SIGNIN_URL } from '../utils/BackendUrls';

import axios from 'axios';

export default function SignIn() {
  const [values, setValues] = useState({
    email_id: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(SIGNIN_URL, {
        user: {
          email: values.email_id,
          password: values.password,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
        }
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <Fragment>
      <div className="signin">
        <div>
          <img src={Image} alt="intro" />
        </div>
        <div>
          <h5>Sign in</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange('email_id')}
              value={values.email_id}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange('password')}
              value={values.password}
            />
            <button type="submit">Continue</button>
            <p className="error-message">{error}</p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
