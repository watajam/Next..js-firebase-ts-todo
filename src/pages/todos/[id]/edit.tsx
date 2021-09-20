import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

import { Edit } from "../../../components/edit";
import { Header } from "../../../components/header";
import { Layout } from "../../../components/Layout";
import { auth } from "../../../lib/firebase";

const edit = () => {
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
      <Header>Edit screen</Header>
      <Layout>
        <Edit />
      </Layout>
    </>
  );
};

export default edit;
