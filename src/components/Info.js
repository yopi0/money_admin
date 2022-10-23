import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const Info = (props) => {

  const ref1 = props.incomeInfo;
  console.log(ref1);

  return(
    <>
    <h2>Info</h2>
    <p>{ref1}</p>
    </>
  )
}

export default Info;
