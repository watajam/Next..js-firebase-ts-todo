import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { Header } from "../../components/header";
import { Layout } from "../../components/Layout";
import { Todos as Tasks } from "../../components/tasks";
import { auth } from "../../lib/firebase";

const Todos = () => {
    const router = useRouter();

    //自動ログアウト
    useEffect(() => {
      const unSub = onAuthStateChanged(auth, (user) => {
        !user && router.push("/");
      });
      return () => unSub();
    });
  return (
    <>
      <Header>Task Item</Header>
      <Layout>
        <Tasks />
      </Layout>
    </>
  );
};

export default Todos;
