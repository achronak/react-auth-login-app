import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history, PrivateRoute } from './helpers/utils';
import { Home } from './Home';
import { LoginScreen } from './LoginScreen';

class App extends Component {
    
    render() {
        return (
            <div className="mt-5">
                <div className="container">
                  <Router history={history}>
                      <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          <Route path="/login" component={LoginScreen} />
                          <Redirect from="*" to="/" />
                      </Switch>
                  </Router>
                  </div>
            </div>
        );
    }
}

export default App;
