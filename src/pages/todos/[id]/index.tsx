import { deleteDoc, doc, getDoc } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../../lib/firebase";
import { todoState } from "../../../store/todoState";
import Link from "next/link";

//TODO削除◎ //コメント
const index = () => {
  // const [detailTodo, setDetailTodo] = useState<string[]>([]);
  const [detailTodo, setDetailTodo] = useRecoilState(todoState);
  const router = useRouter();

  //クエリIDを元にデータを取得
  useEffect(() => {
    const documentId = async () => {
      const docRef = doc(db, `tasks`, `${router.query.id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // const aaa: string[] | boolean[] | number[] | undefined = [
        //   docSnap.data().todo,
        //   docSnap.data().isCompleted,
        //   docSnap.data().delete,
        //   docSnap.data().dateTime,
        // ];
        // console.log(aaa);

        setDetailTodo(docSnap.data().todo);
      } else {
        console.log("No such document!");
      }
    };
    documentId();
  }, [router.query.id]);

  //削除
  const handleDeleteTodo = async (e: React.MouseEvent<HTMLHeadingElement>) => {
    await deleteDoc(doc(db, "tasks", `${router.query.id}`));
  };

  //1:todosのstateを使って、遷移した際のrouter.query.idをwhereで条件をつけると前回のstateが格納されてしまい挙動がおかしくなる

  //2:{if(router.query.id === todo(todosをmapしたもの){ <p></p>とするとundefindがはいる}) }

  return (
    <div>
      <h1>詳細画面</h1>
      <div className="flex">
        <Link href={`/todos/${router.query.id}/edit`}>
          <h3 className="text-3xl ">{detailTodo}</h3>
        </Link>
        <Link href="/todos">
          <h3 onClick={(e) => handleDeleteTodo(e)}>削除</h3>
        </Link>
      </div>
    </div>
  );
};

export default index;
