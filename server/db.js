const pg = require("pg");
const dotenv = require("dotenv").config();
// Ensure integer types are parsed correctly
pg.types.setTypeParser(20, parseInt);
const DATABASE_URL = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: DATABASE_URL });
module.exports = pool;
