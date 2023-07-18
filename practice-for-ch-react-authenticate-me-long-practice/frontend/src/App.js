import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginFormPage} />

      <Route path="/">
        <h1>Hello from App</h1>
        <Link to="/login">
          Login
        </Link>
      </Route>
    </Switch>
  );
}

export default App;
