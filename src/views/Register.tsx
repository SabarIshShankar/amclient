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
}