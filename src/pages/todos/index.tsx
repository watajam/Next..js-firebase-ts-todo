import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { todoState } from "../../store/todoState";



type Filter = "checked" | "unchecked";

const tasks = () => {
  const [input, setInput] = useState("");
  // const [todos, setTodos] = useState<Tasks[]>([]);
  const [filter, setFilter] = useState<Filter>();
  const [todos, setTodos] = useRecoilState(todoState);

  //Form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //SetInput
  const handleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  //Todoの取得
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("dateTime", "desc"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isCompleted: doc.data().isCompleted,
          delete: doc.data().delete,
          dateTime: doc.data().dateTime,
        }))
      );
    });

    return () => unSub();
  }, []);

  //追加
  const handleAddTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {

    await addDoc(collection(db, "tasks"), {
      todo: input,
      isCompleted: false,
      delete: false,
      // dateTime: "0",
      dateTime: serverTimestamp(),
    });
     setInput("");
  };

  //チェックボタン
  const handleAddCheck = (itemId: string, isCompleted: boolean) => {
    const washingtonRef = doc(db, "tasks", itemId);


    todos.map((todo) => {
      if (todo.id === itemId) {
        updateDoc(washingtonRef, {
          isCompleted: !isCompleted,
        });
      }
    });
  };

  //削除
  // const handleDeleteTodo = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   await deleteDoc(doc(db, "tasks", id));
  // };

  //TODO詳細遷移◎
  //TODO作成◎
  //Todoの値をグローバル化◎
  //全てのフィルタリング、未完了フィルタリング、チェックボタン＝完了のフィルタリング◎

  //フィルタリング
  //todoの配列をフィルタリングして新しい配列に並び替える
  const filteredTodos = todos.filter((item) => {
    switch (filter) {
      case "checked":
        return item.isCompleted;
      case "unchecked":
        return !item.isCompleted;
      default:
        return item;
    }
  });

  //setFilter asとは常に定義された型を上書きする方法
  const handleFilterChenge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Filter);
  };

  return (
    <div className="w-full m-auto">
      <h1 className="text-4xl">Task Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChenge}
          type="text"
          value={input}
          placeholder="タスクを入力してください"
          className="border-2"
        />
        <button
          onClick={handleAddTodo}
          disabled={!input}
          className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400"
        >
          追加
        </button>
      </form>

      {/* セレクトボタン */}
      <label>
        フィルタリング :
        <select onChange={handleFilterChenge} className="border-2">
          <option value="">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">未完了のタスク</option>
        </select>
      </label>

      <ul className="m-auto mt-2 space-y-3">
        {filteredTodos.map((item) => {
          return (
            <li key={item.id} className="flex ">

              <input
                onClick={() => handleAddCheck(item.id, item.isCompleted)}
                type="checkbox"
                className="form-checkbox"
                defaultChecked={item.isCompleted}
              />
              <Link href={`/todos/${item.id}`}>
                <h3 className="text-3xl ">{item.todo}</h3>
              </Link>
              {/* <input type="datetime-local" value={"2018-06-12T19:30" }/> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default tasks;
