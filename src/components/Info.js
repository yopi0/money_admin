import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const Info = (props) => {

  const monthIn = props.incomeInfo;
  const monthExp = props.expenseInfo;

  const allIn = props.incomeAllInfo;
  const allExp = props.expenseAllInfo;
  const savings = allIn - allExp;

  return(
    <>
    <h2>Info</h2>
    <p>{savings}</p>
    <p>{monthIn}</p>
    <p>{monthExp}</p>
    </>
  )
}

export default Info;
