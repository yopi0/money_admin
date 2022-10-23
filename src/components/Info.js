import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(() => ({
  back: {
    backgroundColor: "#f1bacd",
    color: "white",
  },
  contens: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  item: {
    display: 'inline-block',
  },
  saving:{
    textAlign: 'center',
    marginBottom: '2%',
    marginLeft: '30%',
    marginRight: '30%',
    padding: '8px 8px',
    whiteSpace: 'nowrap',
    backgroundColor: 'grey',
  },
  income: {
    marginLeft: '15%',
    marginBottom: '3%',
    backgroundColor: 'green',
    padding: '8px 8px',
  },
  expense: {
    marginRight: '15%',
    marginBottom: '3%',
    backgroundColor: 'red',
    padding: '8px 8px',
  }
}));

const Info = (props) => {
  const classes = useStyles();

  const monthIn = Number(props.incomeInfo).toLocaleString();
  const monthExp = Number(props.expenseInfo).toLocaleString();

  const allIn = props.incomeAllInfo;
  const allExp = props.expenseAllInfo;
  const savings = Number(allIn - allExp).toLocaleString();

  return(
    <div className={classes.back}>
      <div>
        <div className={classes.saving}>
          wallet   {`${savings} 円`}
        </div>
        <div className={classes.contens}>
          <div className={`${classes.item} ${classes.income}`}>
            income   {`${monthIn} 円`}
          </div>
          <div className={`${classes.item} ${classes.expense}`}>
            expense   {`${monthExp} 円`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info;
