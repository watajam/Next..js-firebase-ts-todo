
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth, db } from "../../../lib/firebase";
import { Detail } from "../../../components/detail";
import { Header } from "../../../components/header";
import { Layout } from "../../../components/Layout";
import { onAuthStateChanged } from "@firebase/auth";

// コメント機能
const index = () => {
  const router = useRouter();

  //自動ログアウト
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      !user && router.push("/");
    });
    return () => unSub();
  });

  return (
    <>
      <Header>Details screen</Header>
      <Layout>
        <Detail />
      </Layout>
    </>
  );
};

export default index;
