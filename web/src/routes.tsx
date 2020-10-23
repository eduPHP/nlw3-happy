import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/admin/Login'
import Register from './pages/admin/Register'
import ForgotPassword from './pages/admin/ForgotPassword'
import RedefinePassword from './pages/admin/RedefinePassword'
import OrphanagesList from './pages/admin/OrphanagesList'
import OrphanagesPending from './pages/admin/OrphanagesPending'
import MessageDone from "./pages/MessageDone";
import MessageDelete from "./pages/admin/MessageDelete";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={Register} />
                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
