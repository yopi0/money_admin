import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const List = (props) => {

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
      <li key={item.id}>{item.content}-----{item.amount}
        <button type="button" onClick={() => deleteIncomeHandle(item.id)}>削除</button>
      </li>
    );
  });

  const renderExpense = props.expenseList.map((item) => {
    return(
      <li key={item.id}>{item.content}-----{item.amount}
        <button type="button" onClick={() => deleteExpenseHandle(item.id)}>削除</button>
      </li>
    )
  }) 




  return(
    <div>
      <h2>Income List</h2>
      <ul>{renderIncome}</ul>
      <h2>Expense List</h2>
      <ul>{renderExpense}</ul>
    </div>
  )
}
export default List;
