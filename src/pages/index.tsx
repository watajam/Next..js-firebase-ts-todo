import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/dist/client/router";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 自動ログイン
  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     user && router.push("/todos");
  //   });

  //   return () => unSub();
  // }, []);

  //ログイン
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/todos");
    } catch (error) {
      alert("ログインできません");
    }
  };

  //新規ログイン
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/todos");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleIsLogin = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handeleChengeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handeleChengePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className="text-4xl">Login</h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <div>
          <label className="block mb-2 text-blue-600">Username</label>
          <input
            value={email}
            onChange={handeleChengeEmail}
            className="w-full p-2 mb-6 text-blue-600 border-b-2 border-blue-600 outline-none focus:bg-gray-300"
            type="text"
            name="username"
          />
        </div>
        <div>
          <label className="block mb-2 text-blue-600">Password</label>
          <input
            value={password}
            placeholder="6文字以上入力してください"
            onChange={handeleChengePassword}
            className="w-full p-2 mb-6 text-blue-600 border-b-2 border-blue-600 outline-none focus:bg-gray-300"
            type="password"
            name="password"
          />
        </div>
        <div>
          <button
            onClick={isLogin ? (e) => handleLogin(e) : (e) => handleRegister(e)}
            className="w-full px-4 py-2 mb-6 font-bold text-white bg-blue-600 rounded "
          >
            {isLogin ? "ログイン" : "アカウント作成"}
          </button>
        </div>
      </form>
      <footer>
        <p
          onClick={handleIsLogin}
          className="float-left text-sm text-blue-600 hover:text-pink-700"
        >
          {isLogin ? "アカウント作成する>" : "ログイン画面に戻る"}
        </p>
      </footer>
    </div>
  );
}
