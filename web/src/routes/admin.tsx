import React, {useContext} from "react";
import {Route, Switch, useRouteMatch, Redirect} from "react-router-dom";
import OrphanagesList from "../pages/admin/OrphanagesList";
import EditOrphanage from "../pages/admin/EditOrphanage";
import OrphanagesPending from "../pages/admin/OrphanagesPending";
import Login from "../pages/admin/Login";
import Register from "../pages/admin/Register";
import ForgotPassword from "../pages/admin/ForgotPassword";
import RedefinePassword from "../pages/admin/RedefinePassword";
import {RouteComponentProps} from "react-router";
import {AppContext} from "../contexts/app";


export interface CustomRouteProps {
    isPrivate: boolean;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
    exact?: boolean;
}

const CustomRoute = ({isPrivate, ...rest}: CustomRouteProps): JSX.Element => {
    const { loading, auth } = useContext(AppContext);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isPrivate && !auth) {
        return <Redirect to="/admin/login" />
    }

    return (<Route {...rest} />)
}
const AdminRoutes: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <CustomRoute isPrivate path="/admin" exact component={OrphanagesList} />
            <CustomRoute isPrivate path="/admin/orphanages" exact component={OrphanagesList} />
            <CustomRoute isPrivate path="/admin/orphanages/pending" exact component={OrphanagesPending} />
            <CustomRoute isPrivate path="/admin/orphanages/:id" component={EditOrphanage} />
            <Route path="/admin/login" component={Login} />
            <Route path="/admin/register" exact component={Register} />
            <Route path="/admin/forgot" exact component={ForgotPassword} />
            <Route path="/admin/forgot/:token" component={RedefinePassword} />
        </Switch>
    )

}

export default AdminRoutes
