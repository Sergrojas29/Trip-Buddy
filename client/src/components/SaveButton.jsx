import React, { Component } from 'react'
import Auth from '../utils/auth'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


export default function SaveButton(props) {
  {
    if (Auth.loggedIn()) {
    // if (true) {
      return (
        <>
          <Button key={Auth.getProfile().data._id} className='savebtn' id={props.xid} onClick={() => { props.saveMyPlace(props.data) }}>SAVE</Button>
        </>
      )
    } else {
      return (
        <Link to='/login'>
          <button className='savebtn' >LOGIN</button >
        </Link >
      )
    }

  }
}
