# Notes App Frontend (Remix)

This is a fully functional frontend-only implementation of the Notes app with:
- User authentication (demo, client-side session via localStorage)
- Create, edit, delete notes
- Organize with tags and starred flag
- Search and filters (recent, starred)
- Modern light theme using provided palette: primary #1976D2, secondary #424242, accent #FFC107

## Running

- npm run dev
- Open the App (link on home) or go to /app
- Sign in at /auth (email only; demo session)
- Create a note via sidebar or "New" button

## Integrating with a backend

- Replace functions in app/utils/api.client.ts with real API calls.
- Use Remix loaders/actions to fetch on the server for SEO and multi-device sessions.
- Ensure environment variables for API base URL are provided via .env and consumed in server-side loaders.

## Structure

- routes/
  - _index.tsx: Landing page
  - auth.tsx: Sign in/out (demo)
  - app.tsx: App shell
  - app._index.tsx: List + empty state
  - app.$noteId.tsx: View/edit a note
  - app.new.tsx: Create note then redirect to editor
- components/ SearchBar, NoteList, Editor, EmptyState
- utils/api.client.ts: Demo API client (localStorage)
