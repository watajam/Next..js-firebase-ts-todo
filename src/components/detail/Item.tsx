import React, { memo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { deleteDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "../../lib/firebase";
import { useRecoilState } from "recoil";
import { todoState } from "../../store/todoState";


export const Item: React.VFC = memo((props) => {
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

  return (
    <>
      <table className="table-fixed">
        <thead>
          <tr className="bg-blue-300 border">
            <th className="border">Title</th>
            <th className="border ">DELETE</th>
            <th className="border ">戻る</th>
          </tr>
        </thead>
        <tbody className=" bg-gray-50">
          <tr className="px-4 py-2 border ">
            <td className="px-4 py-2 border ">
              <Link href={`/todos/${router.query.id}/edit`}>
                <p className="text-2xl text-center truncate w-96 hover:text-blue-500">
                  {detailTodo}
                </p>
              </Link>
            </td>
            <td className="px-4 py-2 border ">
              <Link href="/todos">
                <p
                  onClick={handleDeleteTodo}
                  className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400"
                >
                  削除
                </p>
              </Link>
            </td>
            <td className="px-4 py-2 border ">
              <Link href={`/todos`}>
                <p className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400">
                  戻る
                </p>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
