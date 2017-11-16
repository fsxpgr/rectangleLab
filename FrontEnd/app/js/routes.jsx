import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import React from 'react';
import Rect from './rect/rect.jsx';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={Rect}>
            <IndexRoute component={Rect} />
        </Route>
    </Router>
);
