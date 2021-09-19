import React, { memo } from "react";

type Props = {
  handleChenge: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Filtering: React.VFC<Props> = memo((props) => {
  return (
    <div>
      <label>
        フィルタリング :
        <select onChange={props.handleChenge} className="border-2">
          <option value="">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">未完了のタスク</option>
        </select>
      </label>
    </div>
  );
});
