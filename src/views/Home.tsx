import React, {useRef} from 'react';
import {Grid, Button, Paper} from '@material-ui/core';
import Header from '../components/Header';

const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const startMeet = async() => {
    window.open(`room?host={true}`)
  }

  const joinRoom = () => {
    if(inputRef.current?.value !== ""){
      window.open(`/room?room=${inputRef.current?.value}`)
    }
  }

  return(
    <>
    {/*<Header/>*/}
    <Grid container style={{position: 'absolute', top: '40%', transform: 'translateY(-50%)', backgroundCOlor: '#DCDCDC', marginLeft: '12.5%', marginRight: '12.5%', width: '75%', border: '1px solid #888888',  borderRadius: 5}}>
    <Grid item md = {6} sm={12} xs={12}>
      <div>
        <div style={{margin: 40}}>
          <h4>start a new meeting</h4>
        </div>
        <div style={{margin: 40}}>
          <Button variant="contained" color="primary" onClick={startMeet}>
          Host
          </Button>
        </div>
        </div>
    </Grid>
    
    <Grid item md={6} sm={12} xs={12}>
      <div style={{margin: 40}}>
        
      </div>
    </Grid>
    </Grid>
    </>
  )
}