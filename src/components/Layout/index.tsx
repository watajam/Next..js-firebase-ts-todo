import React from "react";

type Props = {
  children: React.ReactNode;
};
export const Layout:React.VFC<Props> = (props) => {
  return (
    <main className="flex flex-col items-center max-w-2xl min-h-screen px-2 mx-auto">
      {props.children}
    </main>
  );
};
