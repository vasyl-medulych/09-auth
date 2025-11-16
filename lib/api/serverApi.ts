import { cookies } from "next/headers";
import { nextServer } from "./api";
import { CheckSession, FetchNotesProps } from "./clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export async function fetchNotesServer(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> {
  const params = new URLSearchParams({
    search: query,
    page: String(page),
    perPage: "12",
  });

  if (tag) params.set("tag", tag);
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchNotesProps>("/notes?", {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>(`/users/me`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
}

export async function checkSessionServer(): Promise<
  AxiosResponse<CheckSession>
> {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSession>(`/auth/session`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
}
