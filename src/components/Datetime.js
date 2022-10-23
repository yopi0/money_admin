import React, {useState, useEffect, useContext} from "react";
import List from "./List";
import Form from "./Form";
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
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftTwoTone';
import RightIcon from '@material-ui/icons/KeyboardArrowRightTwoTone'

const useStyles = makeStyles(() => ({
  contens: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: "#f1bacd",
    color: "white",
  },
  item: {
    display: 'inline-block',
  },
  button: {
    color: 'white',
    backgroundColor: "#471b7a",
    margin: 24
  },
  nextButton: {
    color: "white",
    backgroundColor: "#471b7a",
    margin: 24,
  },
}));

const Datetime = () => {

  const classes = useStyles();

  const [time, setTime] = useState(new Date());

  console.log(time);

  const getNextMonth = () => {
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const day = time.getDate();
    setTime(new Date(year, month, day)); 
  }
  const getPreviousMonth = () => {
    const year =time.getFullYear();
    const month = time.getMonth()-1;
    const day = time.getDate();
    setTime(new Date(year,month,day));
  }

  const year = time.getFullYear();
  const month = time.getMonth();

  return(
    <div>
      <div className={classes.contens}>
        <div className={classes.item}>
          <Button className={classes.button} variant="outlined" startIcon={<LeftIcon/>} onClick={() => getPreviousMonth()}>Prev</Button>
        </div>
        <div className={classes.item}>
          <h2>{year}/{month+1}</h2>
        </div>
        <div className={classes.item}>
          <Button className={classes.nextButton} variant="outlined" endIcon={<RightIcon/>} onClick={() => getNextMonth()}>Next</Button>
        </div>
      </div>
      <Form time={time}/>
    </div>
  )
}

export default Datetime;
