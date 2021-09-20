import { collection, serverTimestamp, addDoc } from "@firebase/firestore";
import React, { memo, useState } from "react";

import { db } from "../../lib/firebase";

export const Form: React.VFC = memo(() => {
  const [input, setInput] = useState("");
  //Form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //SetInput
  const handleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  //追加
  const handleAddTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await addDoc(collection(db, "tasks"), {
      todo: input,
      isCompleted: false,
      dateTime: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="m-auto space-x-5 w-96">
        <input
          onChange={handleChenge}
          type="text"
          value={input}
          maxLength={50}
          placeholder="タスクを入力してください"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 w-72 "
        />

        <button
          onClick={handleAddTodo}
          disabled={!input}
          className="px-4 py-2 mx-auto text-white <Layout> rounded-md nline-block bg-blue-800 md:mx-0 disabled:bg-gray-400"
        >
          追加
        </button>
      </form>
    </div>
  );
});
