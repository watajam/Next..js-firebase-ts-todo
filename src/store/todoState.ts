import { atom } from "recoil";

type Tasks = {
  id: string;
  todo: string;
  isCompleted: boolean;
  delete: boolean;
  dateTime: number;
};

export const todoState = atom<Tasks[]>({
  key: "todoState",
  default: [],
});
