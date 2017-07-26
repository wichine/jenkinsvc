import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ProjectPage from './routes/ProjectPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/project" component={ProjectPage} />
    </Router>
  );
}

export default RouterConfig;
