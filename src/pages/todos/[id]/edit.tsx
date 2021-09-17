import { deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../../lib/firebase";
import { todoState } from "../../../store/todoState";

const edit = () => {
  const [todo, setTodo] = useRecoilState(todoState);
  const [input, setInput] = useState("");
  const [detailTodo, setDetailTodo] = useRecoilState(todoState);
  // const [editTodo, setEditTodo] = useState(todo);
  const router = useRouter();

  console.log(input);

  //クエリIDを元にデータを取得
  // useEffect(() => {
  //   const documentId = async () => {
  //     const docRef = doc(db, `tasks`, `${router.query.id}`);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setDetailTodo(docSnap.data().todo);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   documentId();
  // }, [router.query.id]);

  //編集
  const editTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await setDoc(
      doc(db, "tasks", `${router.query.id}`),
      {
        todo: input,
      },
      { merge: true }
    );
    router.push(`/todos/${router.query.id}`);
  };

  const handleEditClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={handleEditClick}
        className="border-2"
      />
      <button
        onClick={editTask}
        disabled={!input}
        className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400"
      >
        編集
      </button>
    </>
  );
};

export default edit;
