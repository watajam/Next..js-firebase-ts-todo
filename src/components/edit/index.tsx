import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { memo, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../lib/firebase";
import { todoState } from "../../store/todoState";
import { Item } from "./Item";

export const Edit: React.VFC = memo(() => {
  return (
    <div className="mt-12">
      <Item />
    </div>
  );
});
