import { useRouter } from "next/dist/client/router";
import React, { memo } from "react";
import { auth } from "../../lib/firebase";

type Props = {
  children: React.ReactNode;
};

export const Header: React.VFC<Props> = memo((props) => {
  const router = useRouter();

  //ログアウト
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header className="flex justify-between px-6 py-4 text-gray-100 bg-blue-300">
      <h3 className="text-5xl">{props.children}</h3>
      <button
        onClick={handleLogout}
        className="inline-block px-4 py-1 text-right text-white bg-blue-600 rounded-md"
      >
        ログアウト
      </button>
    </header>
  );
});
