import { atom } from "jotai";

export const token = atom(localStorage.getItem("token") ?? "no token");
