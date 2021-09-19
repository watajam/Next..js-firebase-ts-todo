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
    <div>
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
    </div>
  );
});
