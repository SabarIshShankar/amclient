import React, {useRef, useCallback, MouseEvent} from 'react';
import {Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import useStore from '../zustand/store';
import useWillMount from '../custom-hooks/useWillMount';

const Login: React.FC = () => {
    const emailRef = useRef<string>("")
    const passwordRef = useRef<string>("")
    const {login, loggedIn} = useStore(useCallback(state => ({
        login: state.login,
        loggedIn: state.loggedIn
    }), []))
    const history = useHistory()

    useWillMount(() => {
        if(loggedIn){
            history.replace("/")
        }
    }, loggedIn)

    const loginHandler = useCallback((e: MouseEvent) => {
        e.preventDefault()
        if(loginValidation()){
            login(emailRef.current, passwordRef.current)
        }
        else {
            alert("please fill in both fields")
        }
    }, [])

    const loginValidation = useCallback(() => {
        return (emailRef.current !== "" && passwordRef.current !== "")
    }, [])

    return(
        <div id="container">
            <div id="inner-login-container">
                <p id="loginTitle">LOGIN</p>
                <form>
                    <input type="text" className="inputs" placeholder="Email ID" onChange={e => {
                        emailRef.current = e.target.value
                    }}/>
                    <input type="password" className="inputs" placeholder="password" onChange={e => {
                        passwordRef.current = e.target.value
                    }}/>
                    <Button variant="contained" color="inherit" id="loginButton" onClick={e => loginHandler(e)}>
                        Login
                    </Button>
                    <p id="login-register">
                        Don't have an account? {" "}
                        <Link to="/register" className="link">
                            <b id="login-register-link">Register</b>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login