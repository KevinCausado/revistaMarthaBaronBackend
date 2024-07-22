require("dotenv").config({ path: `${process.cwd()}/.env`});

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    "schema":process.env.DB_SCHEMA,
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false // Establece en true si deseas verificar el certificado SSL
      }
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    "schema":process.env.DB_SCHEMA,
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false // Establece en true si deseas verificar el certificado SSL
      }
    }
  }
}
