import { Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

export interface UserLogin {
  email: string;
  password: string;
}

export interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> {
  const perPage = 12;

  const res = await nextServer.get<FetchNotesProps>("/notes", {
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await nextServer.post<Note>(`/notes`, newNote);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(registerData: UserLogin): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", registerData);
  return data;
}

export async function login(loginData: UserLogin): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", loginData);
  return data;
}

export async function logout() {
  const { data } = await nextServer.post("/auth/logout");
  return data;
}

export interface CheckSession {
  success: boolean;
}

export async function checkSession(): Promise<CheckSession> {
  const { data } = await nextServer.get<CheckSession>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

interface EditMe {
  email: string;
  username: string;
}

export async function updateMe(editUser: EditMe): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", editUser);
  return data;
}
