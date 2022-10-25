import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"
import { makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForever"
import { Autorenew } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    maxWidth: 360,
    margin: 'auto',
  },
  ul: {
    listStyle: 'none',
    paddingLeft: 0,

  },
  line: {
    borderBottom: 'solid 1px #f5bab8b3',
  },

  item: {
    width: 100,
  },
  titleName: {
    marginLeft: -270,
    fontWeight: 600,

  },
  back: {
    backgroundColor: '#fbf9f9',
  }
}));

const List = (props) => {

  const classes = useStyles();

  // IncomeListを削除
  const deleteIncomeHandle = async(id) => {
    await Api.incomeDelete(id);
    props.fetch();
  }
  // expListを削除
  const deleteExpenseHandle = async(id) => {
    await Api.expenseDelete(id);
    props.fetch();
  }

  const renderIncome = props.incomeList.map((item) => {
    return(
      <ListItem className={classes.line} key={item.id}>
        <ListItemText className={classes.item} primary={item.content} />
        <ListItemText primary={item.amount} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => deleteIncomeHandle(item.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  const renderExpense = props.expenseList.map((item) => {
    return(
      <ListItem className={classes.line} key={item.id}>
        <ListItemText className={classes.item} primary={item.content} />
        <ListItemText primary={item.amount} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => deleteExpenseHandle(item.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }); 




  return(
    <div className={classes.back}>
      <div className={classes.root}>
        <div className={classes.titleName}>Income List</div>
        <ul className={classes.ul}>{renderIncome}</ul>
        <div className={classes.titleName}>Expense List</div>
        <ul className={classes.ul}>{renderExpense}</ul>
      </div>
    </div>
  )
}
export default List;
