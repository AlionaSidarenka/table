import React from 'react';
import {GoogleLogout} from "react-google-login";
import {CLIENT_ID} from "../../config";
import {onLogoutSuccess} from "../../reducers/userReducer";
import {useDispatch} from "react-redux";

export default function Logout() {
    const dispatch = useDispatch();
    const handleLogoutSuccess = () => dispatch(onLogoutSuccess());

    const onFailure = (res) => {
        console.log('Fail', res);
    };

    return (
        <div>
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onFailure={onFailure}
                onLogoutSuccess={handleLogoutSuccess}/>
        </div>
    )
}