const { client } = require("./common");
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const {
  findUserWithToken,
} = require("../../Unit4.Block36.Workshop.Starter/server/db");

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

//reservations post
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const { id: customer_id } = req.params;
    const { date, restaurant_id, party_count } = req.body;

    const result = await client.query(
      `INSERT INTO reservations (customer_id, date, restaurant_id, party_count)
       VALUES($1, $2, $3, $4) RETURNING *`,
      [customer_id, date, restaurant_id, party_count]
    );

    res.status(201).send(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//Delete a reservation
app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      const { customer_id, id: reservation_id } = req.params;

      await client.query(
        `DELETE FROM reservations 
       WHERE id = $1 AND customer_id = $2`,
        [reservation_id, customer_id]
      );
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

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
