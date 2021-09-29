import React, {useRef, useCallback, MouseEvent} from 'react';
import {Button} from '@material-ui/core';
import {Link, usehistory} from 'react-router-dom';
import axios from 'axios';
import useStore from '../zustand/store';
import useWillMount from '../custom-hooks/useWillMount';
import './styles/Register.css';

type Fiedl = "name" | "email" | "password"

const Signup: React.FC = () => {
    const nameRef = useRef<string>("")
    const emailRef = useRef<string>("")
    const passwordRef = useRef<string>("")
    const loggedIn = useStore(useCallback(state =>state.loggedIn, []))
    const history = usehistory()
    useWillMount(() => {
        if(loggedIn){
            history.replace("/")
        }
    }, loggedIn)

    const register = async(e: MouseEvent) => {
        e.preventDefault()
        try{
            if(registerValidation()){
                const response = await axios.post('api/users/register',
                JSON.stringify({
                    name: nameRef.current,
                    email: emailRef.current,
                    password: passwordRef.current
                }),{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response.data)
            }
            else {
                alert("fill appropriately")
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const registerValidation = useCallback(() => {
        return(regexMatch("name", nameRef.current) && regexMatch("email", emailRef.current) && regexMatch("password", passwordRef.current))
    }, [])
}