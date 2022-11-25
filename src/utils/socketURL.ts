export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://connect-four-backend.leomje.repl.co"
    : "http://localhost:4000";
