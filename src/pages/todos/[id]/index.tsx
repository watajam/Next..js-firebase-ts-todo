import { deleteDoc, doc, getDoc } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../../lib/firebase";
import { todoState } from "../../../store/todoState";
import Link from "next/link";
import { Detail } from "../../../components/detail";
import { Header } from "../../../components/header";
import { Layout } from "../../../components/Layout";

// コメント機能
const index = () => {
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
