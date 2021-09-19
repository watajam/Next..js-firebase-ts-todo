import React from "react";

import Link from "next/link";

type Props = {
  item: { id: string; todo: string; isCompleted: boolean };
  handleClick: (
    e: React.MouseEvent<HTMLInputElement>,
    itemId: string,
    isCompleted: boolean
  ) => void;
};

export const Item: React.VFC<Props> = (props) => {
  return (
    <tr key={props.item.id} className="px-4 py-2 border ">
      <td className="p-2 px-4 border">
        <input
          type="checkbox"
          onClick={(e) =>
            props.handleClick(e, props.item.id, props.item.isCompleted)
          }
          defaultChecked={props.item.isCompleted}
        />
      </td>

      <td className="px-4 py-2 border ">
        <Link href={`/todos/${props.item.id}`}>
          <p className="text-3xl truncate w-96 hover:text-blue-500">
            {props.item.todo}
          </p>
        </Link>
      </td>
    </tr>
  );
};
