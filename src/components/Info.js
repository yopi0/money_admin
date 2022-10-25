import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  back: {
    backgroundColor: "#f5bab8b3",
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
    marginBottom: '5%',
    marginLeft: '30%',
    marginRight: '30%',
    padding: '8px 8px',
    whiteSpace: 'nowrap',
    backgroundColor: '#37ddbb80',
  },
  income: {
    marginLeft: '15%',
    marginBottom: '3%',
    backgroundColor: '#046e04b0',
    padding: '8px 20px',
  },
  expense: {
    marginRight: '15%',
    marginBottom: '3%',
    backgroundColor: '#af0303d1',
    padding: '8px 20px',
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
            +   {`${monthIn} 円`}
          </div>
          <div className={`${classes.item} ${classes.expense}`}>
            -   {`${monthExp} 円`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info;
