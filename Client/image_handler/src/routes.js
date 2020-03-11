import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import App from './Sites/main/main';
import Filters from './Sites/Filter/Filter';
import Palette from './Sites/palette/palette';
export default (
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Route render={({ location }) => (
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/filters" component={Filters} />
                <Route exact path="/palette" component={Palette} />
                {/* <Route exact path="/about" component={AboutMe} /> */}
            </Switch>

        )} />

    </HashRouter>
)