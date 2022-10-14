export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://connect-2-connect-4.herokuapp.com"
    : "http://localhost:4000";
