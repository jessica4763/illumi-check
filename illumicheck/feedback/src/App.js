import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route path="/add-todo" component={AddTodoForm} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;