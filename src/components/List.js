import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const List = (props) => {

  // listを削除
  const deleteHandle = async(id) => {
    await Api.incomeDelete(id);
    props.fetch();
  }

  const renderIncome = props.incomeList.map((item) => {
    return(
      <li key={item.id}>{item.content}-----{item.amount}
        <button type="button" onClick={() => deleteHandle(item.id)}>削除</button>
      </li>
    );
  });



  return(
    <div>
      <h2>Income List</h2>
      <ul>{renderIncome}</ul>
    </div>
  )
}
export default List;
