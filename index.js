const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
const path = require('path');
//const db = require(`./models/db.js`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set(`view engine`, `hbs`);
app.use(express.static(path.join(__dirname, '/public')));

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

//colon after represent it as being a parameter
app.get(`/profile/:username`, function(req, res){
    //get the values from the database
    //For now we're hardcoding for simulation purposes
    /*
    var person = {
        fn: `Ned`,//should be from database
        ln: `Stark`//should be from database
    };
    */

    var person = {
        username: req.params.username,
		realname: `Howard Philips`
    };
    //first parameter is the rendering of file, succeeding are objects
    res.render(`profile`, person);
});

app.listen(port, hostname, function() {
	console.log(`Server running at:`);
	console.log(`http://` + hostname + `:` + port);
})
