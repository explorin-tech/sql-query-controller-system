import React, { Fragment, useState } from 'react';
import '../static/css/signIn.css';
import Image from '../static/images/signIn.png';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../store/actions/Actions';

import * as APPLICATION_URLS from '../utils/ApplicationUrls';
import * as BACKEND_URLS from '../utils/BackendUrls';

import axios from 'axios';

function SignIn(props) {
  const history = useHistory();
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
      .post(BACKEND_URLS.SIGNIN_URL, {
        user: {
          email: values.email_id,
          password: values.password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.login_success();
          localStorage.setItem('token', res.data.data);
          history.push(APPLICATION_URLS.DASHBOARD_PAGE);
        }
      })
      .catch(function (error) {
        props.login_failed();
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

const mapDispatchToProps = (dispatch) => ({
  login_success: () => dispatch(actions.login_success()),
  login_failed: () => dispatch(actions.login_failure()),
});

export default connect(null, mapDispatchToProps)(SignIn);
