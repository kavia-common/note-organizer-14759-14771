/**
 * Simple in-browser API client simulating CRUD and auth flows using localStorage.
 * Replace with real API calls to your backend as needed.
 */

// PUBLIC_INTERFACE
export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  starred?: boolean;
  updatedAt: number;
  createdAt: number;
  userId: string;
};

// PUBLIC_INTERFACE
export type User = {
  id: string;
  email: string;
  name?: string;
};

const STORAGE_KEYS = {
  notes: "notes_app.notes",
  session: "notes_app.session",
  users: "notes_app.users",
} as const;

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// PUBLIC_INTERFACE
export async function getSessionUser(): Promise<User | null> {
  const session = readJSON<{ userId: string } | null>(STORAGE_KEYS.session, null);
  if (!session) return null;
  const users = readJSON<User[]>(STORAGE_KEYS.users, []);
  return users.find((u) => u.id === session.userId) ?? null;
}

// PUBLIC_INTERFACE
export async function signIn(email: string): Promise<User> {
  // Password is ignored in this demo client. Replace with real auth.
  const users = readJSON<User[]>(STORAGE_KEYS.users, []);
  let user = users.find((u) => u.email === email);
  if (!user) {
    user = { id: uid(), email };
    users.push(user);
    writeJSON(STORAGE_KEYS.users, users);
  }
  writeJSON(STORAGE_KEYS.session, { userId: user.id });
  return user;
}

// PUBLIC_INTERFACE
export async function signOut(): Promise<void> {
  window.localStorage.removeItem(STORAGE_KEYS.session);
}

// PUBLIC_INTERFACE
export async function listNotes(params: {
  userId: string;
  q?: string;
  filter?: "starred" | "recent";
  tag?: string;
}): Promise<Note[]> {
  let notes = readJSON<Note[]>(STORAGE_KEYS.notes, []).filter(
    (n) => n.userId === params.userId
  );

  if (params.q) {
    const q = params.q.toLowerCase();
    notes = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (params.filter === "starred") {
    notes = notes.filter((n) => n.starred);
  }
  if (params.filter === "recent") {
    notes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else {
    notes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
  }
  if (params.tag) {
    notes = notes.filter((n) => n.tags.includes(params.tag!));
  }
  return notes;
}

// PUBLIC_INTERFACE
export async function createNote(input: {
  userId: string;
  title: string;
  content: string;
  tags?: string[];
}): Promise<Note> {
  const now = Date.now();
  const note: Note = {
    id: uid(),
    title: input.title || "Untitled",
    content: input.content || "",
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now,
    userId: input.userId,
    starred: false,
  };
  const notes = readJSON<Note[]>(STORAGE_KEYS.notes, []);
  notes.push(note);
  writeJSON(STORAGE_KEYS.notes, notes);
  return note;
}

// PUBLIC_INTERFACE
export async function getNote(id: string): Promise<Note | null> {
  const notes = readJSON<Note[]>(STORAGE_KEYS.notes, []);
  return notes.find((n) => n.id === id) ?? null;
}

// PUBLIC_INTERFACE
export async function updateNote(
  id: string,
  patch: Partial<Pick<Note, "title" | "content" | "tags" | "starred">>
): Promise<Note | null> {
  const notes = readJSON<Note[]>(STORAGE_KEYS.notes, []);
  const idx = notes.findIndex((n) => n.id === id);
  if (idx < 0) return null;
  const updated: Note = { ...notes[idx], ...patch, updatedAt: Date.now() };
  notes[idx] = updated;
  writeJSON(STORAGE_KEYS.notes, notes);
  return updated;
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<boolean> {
  let notes = readJSON<Note[]>(STORAGE_KEYS.notes, []);
  const before = notes.length;
  notes = notes.filter((n) => n.id !== id);
  writeJSON(STORAGE_KEYS.notes, notes);
  return notes.length < before;
}
