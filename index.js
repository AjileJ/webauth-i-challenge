require('dotenv').config();
const server = require('./api/server');


const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`\n** Running on port: ${PORT}**\n`));