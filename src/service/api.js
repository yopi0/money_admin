import firebase from "firebase"
import {db} from "./firebase"

export const addForm = (content, amount, uid, inorex) => {
  if (inorex === "in"){
    db.collection("income").add({
      content: content,
      amount: amount,
      uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }else if (inorex === "ex"){
    db.collection("expense").add({
      content: content,
      amount: amount,
      uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }
}
