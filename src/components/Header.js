import React, {useContext, useState} from 'react';
import dig from "object-dig"
import { signInWithGoogle, logOut } from '../service/firebase';
import {AuthContext} from "../provider/AuthProvider"

const Header = () => {
  const currenUser = useContext(AuthContext);
  console.log(currenUser);
  
  //ログインによる表示内容分岐
  const buttonRender = () => {
    let buttonDom
    if( dig(currenUser, 'currentUser') ){
      // ユーザー名の取得
      let name = dig(currenUser, 'currentUser', 'bc', 'displayName')
      buttonDom = (
      <>
      <button onClick={logOut}>ログアウト
      </button>
      <p>{name}</p>
      </>
      )
    }else{
      buttonDom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return buttonDom
  }

  return(
    <header>
      ヘッダー
      {buttonRender()}
    </header>
  )
}

export default Header;
