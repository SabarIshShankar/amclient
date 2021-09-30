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

    const regexMatch = useCallback((field: Field, val: string) => {
        if(field === 'name'){
            const regex = /^[A-Za-z]{1, 25}$/
            return val.trim().match(regex)
        }
        else if(field === "email"){
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return val.trim().match(regex)
        }
        else{
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            return val.trim().match(regex)
        }
    }, [])

    const validation = useCallback((field: Fiedl, val: string) => {
        const input = document.getElementById(field + "-input")
        if(field === "name"){
            if(regexMatch(field, val)){
                document.getElementById("name-validation-message")?.classList.add('invisible')
                input?.classList.remove('invalid')
                input?.classList.remove('input-with-label')
            }
            else {
                document.getElementById("name-validation-message")?.classList.remove('invisible')
                input?.classList.add('invalid')
                input?.classList.add('inputs-with-label')
            }
        }
        else if(field === "email"){
            if(regexMatch(field, val)){
                document.getElementById("email-validation-message")?.classList.add('invisible')
                input?.classList.remove('invalid')
                input?.classList.remove('inputs-with-label')
            }
            else{
                document.getElementById("email-validation-message")?.classList.remove('invisible')
                input?.classList.add('invalid')
                input?.classList.add('inputs-with-label')
            }
        }
        else{
            if(regexMatch(field, val)){
                document.getElementById("password-validation-message")?.classList.add('invisible')
                input?.classList.remove('invalid')
                input?.classList.remove('inputs-with-label')
            } else {
                document.getElementById("password-validation-message")?.classList.remove('invisble')
                input?.classList.add('invalid')
                input?.classList.add('inputs-with-label')
            }
        }
    }, [])

    return(

    )
}

export default Signup