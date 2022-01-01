import React from 'react';
import { Container } from 'reactstrap';
import { Route, Switch,  } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Workers from './components/Workers';
import WorkerForm from './components/WorkerForm';

function App() {
  
  return (
    <Container>
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={WorkerForm} />
        <Route path="/workerForm" component={WorkerForm} />
        <Route path="/workers" component={Workers} />
        <Route path="/" component={Login} />
      </Switch>
    </Container>
  );
}

export default App;
