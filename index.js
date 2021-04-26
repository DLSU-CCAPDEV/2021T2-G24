const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const db = require(`./model/db.js`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.get(`/`, function(req, res) {
	fs.readFile(`./Phase 1/source-code/html/index.html`, function(err, data) {
		res.setHeader(`Content-Type`, `text/html`);
		if (err) {
			res.status = 404;
			res.write(`404 Not Found`);
		} else {
			res.status = 200;
			res.write(data);
		}
		res.end();
	});
});

app.listen(port, hostname, function() {
	console.log(`Server running at:`);
	console.log(`http://` + hostname + `:` + port);
})
