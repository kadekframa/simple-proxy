import express from "express";

const app = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.get("/users", async (_req, res) => {
  const url = "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

const port = 4000;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
