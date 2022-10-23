import React, {useState, useEffect, useContext} from "react";
import List from "./List";
import Form from "./Form";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig"
import AuthProvider, {AuthContext} from "../provider/AuthProvider"

const Datetime = () => {

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
      <button onClick={() => getPreviousMonth()}>前月</button>
      <h2>{year}/{month+1}</h2>
      <button onClick={() => getNextMonth()}>翌月</button>
      <Form time={time}/>
    </div>
  )
}

export default Datetime;
