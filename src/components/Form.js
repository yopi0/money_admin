import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"
import List from "./List";
import Datetime from "./Datetime"
import Info from "./Info";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(() => ({
  
}));

const Form = (props) => {

  const classes = useStyles();

  const currentUser = useContext(AuthContext);
  // form内で使用する値
  const [inputContent, setInputContent] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const [inputInOrEx, setInputInOrEx] = useState("");

  // Listで使用する値の設定
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  // 選択されている月情報
  const formTime = props.time;
  const formTimeMonth = props.time.getMonth();
  const formTimeYear = props.time.getFullYear();
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  console.log("フォーム");
  console.log(formTimeMonth);

  // Infomation用の情報
  const [incomeInfo, setIncomInfo] = useState(0);
  const [expenseInfo, setExpenseInfo] = useState(0);
  const [incomeAllInfo, setIncomeAllInfo] = useState(0);
  const [expenseAllInfo, setExpenseAllInfo] = useState(0);

  // Listの更新
  useEffect(() => {
    fetch()
  }, [currentUser, formTime])

  // 収支のリストを取得
  const fetch = async() => {
    if( dig(currentUser, 'currentUser', 'uid') ){
      // income
      const incLists = await Api.getIncomeList(currentUser.currentUser.uid, formTime);
      await setIncomeList(incLists);
      console.log("fetch incom");
      console.log(incLists);
      console.log(incomeList);
      let amountSum = 0;
      if (incLists.length > 0){
        const amountList = incLists.map((obj) => obj.amount);
        const amountIntList = amountList.map((str) => parseInt(str, 10));
        amountSum = amountIntList.reduce((sum,element) => {
          return sum +element;
        });
      };
      setIncomInfo(amountSum);
      const incAll = await Api.getIncomeAllInfo(currentUser.currentUser.uid);
      let amountAllSum = 0;
      if (incAll.length > 0){
        const amountAll = incAll.map((obj) => obj.amount);
        const amountIntAll = amountAll.map((str) => parseInt(str, 10));
        amountAllSum = amountIntAll.reduce((sum,element) => {
          return sum +element;
        });
      };
      setIncomeAllInfo(amountAllSum);

      // expense
      const expLists = await Api.getExpenseList(currentUser.currentUser.uid, formTime);
      await setExpenseList(expLists);
      console.log("fetch Expenses");
      console.log(expenseList);
      let amountSumForExp = 0;
      if (expLists.length > 0){
        const amountList = expLists.map((obj) => obj.amount);
        const amountIntList = amountList.map((str) => parseInt(str, 10));
        amountSumForExp = amountIntList.reduce((sum,element) => {
          return sum +element;
        });
      };
      setExpenseInfo(amountSumForExp);
      const expAll = await Api.getExpenseAllInfo(currentUser.currentUser.uid);
      let amountAllSumForExp = 0;
      if (expAll.length > 0){
        const amountAll = expAll.map((obj) => obj.amount);
        const amountIntAll = amountAll.map((str) => parseInt(str, 10));
        amountAllSumForExp = amountIntAll.reduce((sum,element) => {
          return sum +element;
        });
      };
      setExpenseAllInfo(amountAllSumForExp);
    }
  }
  
  //ログインによる表示内容分岐
  const formRender = () => {
    let FormDom
    // ログイン=>入力フォーム
    if( dig(currentUser, 'currentUser', 'uid') ){
      // 現在の月だけフォーム表示
      if(formTimeMonth === todayMonth && formTimeYear === todayYear ){
        FormDom = 
        <form>
          <select name="inorex" value={inputInOrEx} onChange={(event) => setInputInOrEx(event.currentTarget.value)}>
            <option value="" >select type</option>
            <option value="in" >income</option>
            <option value="ex" >expense</option>
          </select>
          <input type="text"  placeholder="項目" value={inputContent} onChange={(event) => setInputContent(event.currentTarget.value)}/>
          <input type="number"  placeholder="0000" value={inputAmount} step="1000" min="0"  onChange={(event) => setInputAmount(event.currentTarget.value)}/>
          <button type="button" onClick={() => post()}>追加</button>
        </form>
      }else{
        <form></form>
      }
    }else{
      FormDom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return FormDom
  }

  const post = async() => {
    await Api.addForm(inputContent, inputAmount, currentUser.currentUser.uid, inputInOrEx);
    await setInputContent("");
    await setInputAmount(0);
    await setInputInOrEx("");
    await fetch();
  }



  return(
    <div>
      <Info incomeInfo={incomeInfo} expenseInfo={expenseInfo} incomeAllInfo={incomeAllInfo} expenseAllInfo={expenseAllInfo}/>
      {formRender()}
      <List incomeList={incomeList} expenseList={expenseList} fetch={fetch}/>
    </div>
  )
};

export default Form;

