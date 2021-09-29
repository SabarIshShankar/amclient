import React, {useEffect, useRef} from 'react';
import Peer from 'simple-peer';

interface Props{
    peers: Peer.Instance
}

const Video: React.FC<Props> = (props) => {
    const ref= useRef<HTMLVideoElement>(document.createElement('video'));
    useEffect(() => {
        props.peers.on("stream", (stream: MediaStream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return(
        <Video autoPlay playsInline className="peer-video" ref={ref}/>
    )
}

export default React.memo(Video)