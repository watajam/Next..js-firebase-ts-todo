import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
} from "@firebase/firestore";
import React, { memo, useEffect, useState } from "react";

import { db } from "../../lib/firebase";
import { Form } from "./Form";
import { Filtering } from "./Filtering";
import { Item } from "./Item";

type Filter = "checked" | "unchecked";

type Tasks = {
  id: string;
  todo: string;
  isCompleted: boolean;
  dateTime: number;
};

export const Tasks: React.VFC = memo(() => {
  const [todos, setTodos] = useState<Tasks[]>([]);
  const [filter, setFilter] = useState<Filter>();

  //Todoの取得
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("dateTime", "desc"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isCompleted: doc.data().isCompleted,
          dateTime: doc.data().dateTime,
        }))
      );
    });

    return () => unSub();
  }, []);

  //チェックボタン
  const handleAddCheck = (
    e: React.MouseEvent<HTMLInputElement>,
    itemId: string,
    isCompleted: boolean
  ) => {
    // const washingtonRef = doc(db, "tasks", itemId);

    todos.map((todo) => {
      if (todo.id === itemId) {
        updateDoc(doc(db, "tasks", itemId), {
          isCompleted: !isCompleted,
        });
      }
    });
  };

  //フィルタリング
  //todoの配列をフィルタリングして新しい配列に並び替える
  const filteredTodos = todos.filter((item) => {
    switch (filter) {
      case "checked":
        item.isCompleted;
        break;
      case "unchecked":
        !item.isCompleted;
        break;
      default:
        item;
        break;
    }
  });

  //setFilter asとは常に定義された型を上書きする方法
  const handleFilterChenge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Filter);
  };

  return (
    <div className="">
      <h1 className="text-4xl">Task Item</h1>

      <Form />
      <Filtering handleChenge={handleFilterChenge} />

      <table className="table-fixed">
        <thead>
          <tr className="bg-blue-300 border">
            <th className="border ">✓</th>
            <th className="border ">Title</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {filteredTodos.map((item) => {
            return <Item item={item} handleClick={handleAddCheck} />;
          })}
        </tbody>
      </table>
    </div>
  );
});
