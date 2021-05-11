import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
// components
import BoardList from './components/boards/BoardList';
import BoardCreate from './components/boards/BoardCreate';
import BoardConfirm from './components/boards/BoardConfirm'
import BoardSuccess from './components/boards/BoardSuccess';
import BoardDetail from './components/boards/BoardDetail';

const App = () => {

  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/board-list" component={BoardList} />
        <Route exact path="/board-create" component={BoardCreate} />
        <Route exact path="/board-confirm" component={BoardConfirm} />
        <Route exact path="/board-success" component={BoardSuccess} />
        <Route exact path="/board-detail/:id" component={BoardDetail} />
        <Redirect from="*" to="/board-list" />
      </Switch>
    </Router>
  );
}

export default App;
