import React from 'react';
import { GoogleLogin } from "react-google-login";
import {CLIENT_ID} from "../../config";
import {useDispatch} from "react-redux";
import {onLoginFailure, onLoginSuccess} from "../../reducers/userReducer";

export default function Login() {
    const dispatch = useDispatch();
    const onSuccess = (res) => dispatch(onLoginSuccess(res.profileObj.name));
    const onFailure = () => dispatch(onLoginFailure());

    return (
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}/>
        </div>
    )
}