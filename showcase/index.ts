import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  throw Error();
  res.json("Running successfully");
});

app.listen(PORT, () =>
  console.log(`Server is starting on port on port ${PORT}`)
);
