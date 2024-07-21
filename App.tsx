import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherForecastPage from './pages/WeatherForecastPage';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/weather/:city" component={WeatherForecastPage} />
      </Switch>
    </Router>
  );
}

export default App;