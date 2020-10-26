import {Switch, Route, Router} from 'react-router-dom'
import React from 'react'

import CreateOrphanage from '../pages/CreateOrphanage'
import OrphanagesMap from '../pages/OrphanagesMap'
import Orphanage from '../pages/Orphanage'
import Landing from '../pages/Landing'
import AdminRoutes from "./admin";
import history from './history'

function Index() {
    return (
        <Router history={history}>
            <AdminRoutes />
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </Router>
    );
}

export default Index
