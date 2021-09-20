import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
};

export const Header: React.VFC<Props> = memo((props) => {
  return <header className="py-1 text-6xl text-center bg-blue-300">{props.children}</header>;

});
