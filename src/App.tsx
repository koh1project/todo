import { VFC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Login } from './pages/login/login';
import { TodoPage } from 'pages/todo/todo';

import './App.scss';
import { auth } from 'firebase/firebase.utils';
import { setCurrentUser } from 'redux/user/user.actions';

const App: VFC = () => {
  const userId = useSelector((state: RootState) => state.user.currentUser) ?? null;
  const dispatch = useDispatch();
  const history = useHistory();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log('userChange: ', user);
      dispatch(setCurrentUser(user.uid));
      history.push('/');
    }
  });

  // const routes = userId ? (
  //   <Switch>
  //     <Route path={'/login'} component={Login} />
  //     <Route path={'/'} component={TodoPage} exact />
  //     <Redirect to="/" />
  //   </Switch>
  // ) : (
  //   <Switch>
  //     <Route path={'/login'} component={Login} />
  //     <Redirect to="/login" />
  //   </Switch>
  // );
  const routes = (
    <Switch>
      <Route path={'/login'} component={Login} exact />
      <Route exact path="/" render={() => (userId ? <TodoPage /> : <Redirect to="/login" />)} />
    </Switch>
  );
  console.log(userId);
  return <div className="App">{routes}</div>;
};

export default App;
