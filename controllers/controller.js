const db = require(`../models/db.js`);

const controller = {
    getIndex: function(req, res) {
    	// fs.readFile(`./Phase 1/source-code/html/index.html`, function(err, data) {
    	// 	res.setHeader(`Content-Type`, `text/html`);
    	// 	if (err) {
    	// 		res.status = 404;
    	// 		res.write(`404 Not Found`);
    	// 	} else {
    	// 		res.status = 200;
    	// 		res.write(data);
    	// 	}
    	// 	res.end();
    	// });
        res.render(`index`);
    },

    getProfile: function(req, res) {
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
    }
}

module.exports = controller;
