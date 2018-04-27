// ----This file is here to prevent hardcoding. They are exported to index.js----
const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/myDB';
const port = process.env.PORT || 3000;

module.exports = {databaseURI, port};
