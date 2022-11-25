export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://connect-2-connect-4-backend.onrender.com"
    : "http://localhost:4000";
