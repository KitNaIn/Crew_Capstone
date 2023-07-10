import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {User} from './User';

type Props = {
    user: User | undefined
}

function ProtectedRoutesUser(props: Props) {

    const authenticated = props.user !== undefined && props.user.username !== "anyonymousUser"

    return (
        authenticated ? <Outlet/> : <Navigate to={"/login"}/>
    );
}

export default ProtectedRoutesUser;