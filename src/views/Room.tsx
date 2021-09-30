import React,  {useEffect, useRef, useState, useCallback} from 'react';
import Drawer from '../components/Drawer';
import io from 'socket.io-client';
import Peer, {Instance, SignalData} from 'simple-peer';
import useStore from '../zustand/store';
import {useHistory} from 'react-router-dom';
import * as queryString from 'query-string';
import Video from '../components/Video';
import ChatBox from '../components/ChatBox';
import Controls from '../components/Controls';
import Header from '../components/Header';
import clsx from 'clsx';
import { Container, CssBaseline } from '@material-ui/core';
import './styles/Room.css';
import RoomMaterialStyles from './styles/RoomMaterialStyles';

type Peer={
    peerID: string,
    peer: Instance,
    username: string
}

type Member = {
    id: string,
    username: string
}

type Payload = {
    signal: SignalData,
    id: string,
    username: string
}

type DisconnectedUser = {
    id: string,
    username: string
}

const Room: React.FC = () => {
    const userVideo = useRef<HTMLVideoElement>(document.createElement('video'))
    const userStream = useRef<MediaStream>()
    const socketRef = useRef<SocketIOClient.Socket>(io.Socket)
    const peersRef = useRef<Array<Peer>>([])
    const [peers, setPeers] = useState<Array<Peer>>([])
    const [showDrawerChildren, setShowDrawerChildren] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);

    const get_access_token = useStore(useCallback(state => state.get_access_token, []))
    const history = useHistory()
    const classes = RoomMaterialStyles();

    useEffect(() => {
        init()
    }, [])

    const init = useCallback(async() => {
        socketRef.current = io.connect("/")
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
        userVideo.current.srcObject = userStream.current = stream
    }, [])
}