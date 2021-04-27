const dotenv = require(`dotenv`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
// const path = require('path');
const routes = require('./routes/routes.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set(`view engine`, `hbs`);
app.use(express.static(`public`));
// app.use(express.static(path.join(__dirname, '/public')));
app.use(`/`, routes);

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.listen(port, hostname, function() {
	console.log(`Server running at:`);
	console.log(`http://` + hostname + `:` + port);
})
