const pg = require("pg");
const client = new pg.Client("postgres://Torsk:wordpass@localhost:5432/ARP");

module.exports = { client };
