import React, {useContext, useState} from 'react';
import dig from "object-dig"
import { signInWithGoogle, logOut } from '../service/firebase';
import {AuthContext} from "../provider/AuthProvider"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  button: {
    color: '#FFF',
  },
  appbar: {
    backgroundColor: "#f3b456",
  }
}));

const Header = () => {

  const classes = useStyles();

  const currenUser = useContext(AuthContext);
  console.log(currenUser);
  
  //ログインによる表示内容分岐
  const buttonRender = () => {
    let buttonDom
    if( dig(currenUser, 'currentUser', 'uid') ){
      buttonDom = (
      <>
      <Button className={classes.button} onClick={logOut}>Log-out
      </Button>
      </>
      )
    }else{
      buttonDom = <Button className={classes.button} onClick={signInWithGoogle}>Log-in</Button>
    }
    return buttonDom
  }

  const nameRender = () => {
    let nameDom;
    if( dig(currenUser, 'currentUser', 'uid') ){
      let name = dig(currenUser, 'currentUser', 'bc', 'displayName');
      nameDom = (
        <>{name}</>
      )
    }else{
      nameDom = <p></p>
    }
    return nameDom;
  }


  return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PiggyWallet
        </Typography>
        <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
          {nameRender()}'s wallet
        </Typography>
        <Button color="inherit">{buttonRender()}</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header;
