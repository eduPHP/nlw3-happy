import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'
import React from 'react'

import OrphanagesPending from '../pages/admin/OrphanagesPending'
import RedefinePassword from '../pages/admin/RedefinePassword'
import ForgotPassword from '../pages/admin/ForgotPassword'
import OrphanagesList from '../pages/admin/OrphanagesList'
import {UserView} from "../../../backend/src/models/User"
import CreateOrphanage from '../pages/CreateOrphanage'
import OrphanagesMap from '../pages/OrphanagesMap'
import Register from '../pages/admin/Register'
import Orphanage from '../pages/Orphanage'
import Login from '../pages/admin/Login'
import Landing from '../pages/Landing'
import api from "../services/api";

interface Auth {
    user: UserView
    token: string
}

const getSessionAuth = (): Auth | null => {
    let user = sessionStorage.getItem('@Happy.user') || null
    let token = sessionStorage.getItem('@Happy.token')
    if (!user || !token) {
        return null
    }

    return {
        user: JSON.parse(user),
        token
    }
}

const AdminRoutes: React.FC = (): JSX.Element => {
    const history = useHistory()
    const auth = getSessionAuth()

    if (!auth && history.location.pathname.search(/\/admin/) && history.location.pathname !== '/admin/login') {
        history.push('/admin/login')
    }

    if (auth) {
        api.defaults.headers.Authorization = `Bearer ${auth.token}`
        return (<Switch>
            <Route path="/admin" exact component={OrphanagesList} />
            <Route path="/admin/orphanages" exact component={OrphanagesList} />
            <Route path="/admin/orphanages/pending" component={OrphanagesPending} />
        </Switch>)
    } else {
        return (<Switch>
            <Route path="/admin/login" component={Login} />
            <Route path="/admin/register" exact component={Register} />
            <Route path="/admin/forgot" exact component={ForgotPassword} />
            <Route path="/admin/forgot/:token" component={RedefinePassword} />
        </Switch>)
    }
}

function Index() {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoutes />
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Index
