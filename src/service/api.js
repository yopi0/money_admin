import firebase from "firebase"
import {db} from "./firebase"

export const getList = async(uid) => {
  const incomeList = await db.collection("income")
  .orderBy("createdAt", "desc").where("uid", "==", uid);

  console.log("start");
  console.log(incomeList);


  return incomeList.get().then((snapShot) => {
    let lists = [];
    snapShot.forEach((doc) => {
      lists.push({
        id: doc.id,
        content: doc.data().content,
        amount: doc.data().amount
      });
    });
    return lists;
  })
}

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
