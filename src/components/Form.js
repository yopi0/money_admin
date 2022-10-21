import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"
import List from "./List";

const Form = () => {
  const currentUser = useContext(AuthContext);
  // form内で使用する値
  const [inputContent, setInputContent] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const [inputInOrEx, setInputInOrEx] = useState("");

  // Listで使用する値の設定
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  // Listの更新
  useEffect(() => {
    fetch()
  }, [currentUser])

  // 収入のリストを取得
  const fetch = async() => {
    if( dig(currentUser, 'currentUser', 'uid') ){
      const lists = await Api.getList(currentUser.currentUser.uid);
      await setIncomeList(lists);
      console.log(incomeList);
    }
  }
  
  //ログインによる表示内容分岐
  const formRender = () => {
    let FormDom
    // ログイン=>入力フォーム
    if( dig(currentUser, 'currentUser', 'uid') ){
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
      FormDom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return FormDom
  }

  const post = async() => {
    await Api.addForm(inputContent, inputAmount, currentUser.currentUser.uid, inputInOrEx);
    await setInputContent("");
    await setInputAmount(0);
    await setInputInOrEx("");
    fetch();
  }

  return(
    <div>
      {formRender()}
      <List incomeList={incomeList}/>
    </div>
  )
};

export default Form;

