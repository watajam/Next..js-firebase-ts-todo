import React, { memo } from "react";
import { Item } from "./Item";

export const Detail: React.VFC = memo(() => {
  //1:todosのstateを使って、遷移した際のrouter.query.idをwhereで条件をつけると前回のstateが格納されてしまい挙動がおかしくなる

  //2:{if(router.query.id === todo(todosをmapしたもの){ <p></p>とするとundefindがはいる}) }
  return (
    <div className="mt-12">
      <Item />
    </div>
  );
});
