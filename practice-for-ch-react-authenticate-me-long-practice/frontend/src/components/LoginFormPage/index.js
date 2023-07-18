import { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);

    const body = {
      credential,
      password,
    };

    try {
      await dispatch(login(body));
    } catch (res) {
      const data = await res.json();
      setErrors(data.errors);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {
          errors.map((msg) => (
            <li key={msg}>{msg}</li>
          ))
        }
      </ul>

      <label htmlFor="login-credential-field">
        Credential:
      </label>
      <input
        id="login-credential-field"
        type="text"
        value={credential}
        onChange={(event) => setCredential(event.target.value)}
        placeholder="Username or email"
      />

      <br />

      <label htmlFor="login-password-field">
        Password:
      </label>
      <input
        id="login-password-field"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />

      <br />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginFormPage;
