import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { memo, useState } from "react";
import { db } from "../../lib/firebase";
import Link from "next/link";

export const Item: React.VFC = memo(() => {
  const [input, setInput] = useState("");
  const router = useRouter();

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
    <table className="table-fixed">
      <thead>
        <tr className="bg-blue-300 border">
          <th className="border">Title</th>
          <th className="border ">編集</th>
          <th className="border ">戻る</th>
        </tr>
      </thead>

      <tbody className=" bg-gray-50">
        <tr className="px-4 py-2 border ">
          <td className="px-4 py-2 border ">
            <input
              type="text"
              value={input}
              onChange={handleEditClick}
              className="text-2xl text-center truncate w-96 "
            />
          </td>
          <td className="px-4 py-2 border ">
            <button
              onClick={editTask}
              disabled={!input}
              className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400"
            >
              編集
            </button>
          </td>
          <td className="px-4 py-2 border ">
            <Link href={`/todos/${router.query.id}`}>
              <p className="px-4 py-1 mx-auto text-white bg-blue-600 rounded-md nline-block hover:bg-blue-800 md:mx-0 disabled:bg-gray-400">
                戻る
              </p>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
