import { atom } from "jotai";

export const token = atom(localStorage.getItem("token") ?? "no token");
export const userId = atom(localStorage.getItem("userId") ?? 3);
