export const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://lm-wordle-platform.herokuapp.com"
    : "http://localhost:4000";
