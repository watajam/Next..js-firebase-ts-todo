import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocFromCache,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { log } from "console";
import { Router, useRouter } from "next/dist/client/router";
import { route } from "next/dist/server/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../../lib/firebase";
import { todoState } from "../../../store/todoState";
import Link from "next/link";

//TODO削除◎ //コメント
const index = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [todo, setTodo] = useState();
  const router = useRouter();
  console.log(`1回:${router.asPath}`);

  useEffect(() => {
    const aaaa = async () => {
      const docRef = doc(
        db,
        `tasks`,
        `${router.query.id}`
        // "7RvyUWDKYvo6LMfxbcRY"
        // router.query.id ? `${router.query.id}` : "7RvyUWDKYvo6LMfxbcRY"
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTodo(docSnap.data().todo);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    aaaa();
  }, [router.query.id]);

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
  }, [todo]);

  //削除
  const handleDeleteTodo = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    await deleteDoc(doc(db, "tasks", `${router.query.id}`));
  };

  return (
    <div>
      <h1>詳細画面</h1>
      {router.query.id ? todo : null}
      <Link href="/todos">
        <a onClick={(e) => handleDeleteTodo(e)}>削除</a>
      </Link>
    </div>
  );
};

export default index;
