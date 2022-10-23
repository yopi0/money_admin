import firebase from "firebase"
import { startTransition } from "react";
import {db} from "./firebase"

const createStartBorder = (date) => {
  const newStartDate = firebase.firestore.Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth(), 1));
  console.log("start");
  console.log(newStartDate);
  return newStartDate;
  
}
const createEndBorder = (date) => {
  const newEndDate = firebase.firestore.Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth()+1, 0));
  console.log("end");
  console.log(newEndDate);
  return newEndDate;
}

// 指定されている月の収入リストを表示
export const getIncomeList = async(uid, formTime) => {
  const incomeList = await db.collection("income")
  .orderBy("createdAt").startAt(createStartBorder(formTime)).endAt(createEndBorder(formTime)).where("uid", "==", uid);

  return incomeList.get().then((snapShot) => {
    let lists = [];
    snapShot.forEach((doc) => {
      lists.push({
        id: doc.id,
        content: doc.data().content,
        amount: doc.data().amount
      });
    });
    console.log("収入");
    console.log(lists);
    return lists;
  })
}

// 指定されている月の支出リストを表示
export const getExpenseList = async(uid, formTime) => {
  const expenseLists = await db.collection("expense")
  .orderBy("createdAt").startAt(createStartBorder(formTime)).endAt(createEndBorder(formTime)).where("uid", "==", uid);

  return expenseLists.get().then((snapShot) => {
    let lists = [];
    snapShot.forEach((doc) => {
      lists.push({
        id: doc.id,
        content: doc.data().content,
        amount: doc.data().amount
      });
    });
    console.log("支出");
    console.log(lists);
    return lists;
  })
}

export const addForm = async(content, amount, uid, inorex) => {
  if (inorex === "in"){
    await db.collection("income").add({
      content: content,
      amount: amount,
      uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }else if (inorex === "ex"){
    await db.collection("expense").add({
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
