import React, {useRef, useState, useCallback, useEffect, MouseEvent} from 'react';
import Message from './Message';
import './styles/ChatBox.css';

type Props = {
    socket: SocketIOClient.SocketIOClient
    close: () => void
}