import ReactDOM from 'react-dom';
import React from 'react';
import routes from './routes.jsx';

import '../css/login.css';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));
