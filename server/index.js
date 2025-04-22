const { client } = require("./common");
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));

//test
app.listen(PORT, () => {
  console.log(`I am listening on PORT ${PORT}`);
});

//root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "This works" });
});

//customers get
app.get("/api/customers", async (req, res) => {
  try {
    const SQL = `
        SELECT * FROM customers;
        `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(400).send("You've broken me");
  }
});

//restaurants get
app.get("/api/restaurants", async (req, res) => {
  try {
    const SQL = `
        SELECT * FROM restaurants;
        `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(400).send("You've broken me");
  }
});

//reservations get
app.get("/api/reservations", async (req, res) => {
  try {
    const SQL = `
        SELECT * FROM reservations;
        `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(400).send("You've broken me");
  }
});

//init create
const init = async (req, res) => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

//init gov'na'
init();
