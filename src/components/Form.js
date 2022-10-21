import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const Form = () => {
  const currenUser = useContext(AuthContext);
  // form内で使用する値
  const [inputContent, setInputContent] = useState(null);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputInOrEx, setInputInOrEx] = useState(null);
  // 動確
  console.log(inputContent);

  //ログインによる表示内容分岐
  const formRender = () => {
    let IncomeFormDom
    // ログイン=>入力フォーム
    if( dig(currenUser, 'currentUser', 'uid') ){
      IncomeFormDom = 
      <form>
        <select name="inorex" onChange={(event) => setInputInOrEx(event.currentTarget.value)}>
          <option value="" >select type</option>
          <option value="in" >income</option>
          <option value="ex" >expense</option>
        </select>
        <input type="text"  placeholder="項目" onChange={(event) => setInputContent(event.currentTarget.value)}/>
        <input type="number" step="1000" min="0" placeholder="料金" onChange={(event) => setInputAmount(event.currentTarget.value)}/>
        <button type="button" onClick={() => post()}>追加</button>
      </form>
    }else{
      IncomeFormDom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return IncomeFormDom
  }

  const post = () => {
    Api.addForm(inputContent, inputAmount, currenUser.currentUser.uid, inputInOrEx,)
  }

  return(
    <div>{formRender()}</div>
  )
};

export default Form;

