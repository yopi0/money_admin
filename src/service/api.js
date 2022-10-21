import firebase from "firebase"
import {db} from "./firebase"

export const getIncomeList = async(uid) => {
  const incomeList = await db.collection("income")
  .orderBy("createdAt", "desc").where("uid", "==", uid);

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

export const getExpenseList = async(uid) => {
  const expenseLists = await db.collection("expense")
  .orderBy("createdAt", "desc").where("uid", "==", uid);

  return expenseLists.get().then((snapShot) => {
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

export const incomeDelete = async(id) => {
  await db.collection("income").doc(id).delete();
}

export const expenseDelete = async(id) => {
  await db.collection("expense").doc(id).delete();
}
