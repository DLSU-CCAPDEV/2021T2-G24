/*
const mongodb = require(`mongodb`);
const dotenv = require(`dotenv`);

dotenv.config();
const client = mongodb.MongoClient;
const url = process.env.DB_URL;

const dbName = `writers-kiln-db`;

const options = { useUnifiedTopology: true };

const database = {

	insertOne: function(collection, doc, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).insertOne(doc, function (err, res) {
				if (err) throw err;
				console.log(`1 document inserted`);
				db.close();
				return callback(res);
			});
		});
	},

	insertMany: function(collection, docs, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).insertMany(docs, function (err, res) {
				if (err) throw err;
				console.log(res.insertedCount + ` documents inserted`);
				db.close();
				return callback(res);
			});
		});
	},

	findOne: function(collection, query, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).findOne(query, function (err, res) {
				if (err) throw err;
				console.log(res);
				db.close();
				return callback(res);
			});
		});
	},

	findMany: function(collection, query, callback, sort=null, projection=null) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).find(query, {projection: projection}).sort(sort).toArray(function (err, res) {
				if (err) throw err;
				console.log(res);
				db.close();
				return callback(res);
			});
		});
	},

	deleteOne: function(collection, filter, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).deleteOne(filter, function (err, res) {
				if (err) throw err;
				console.log(`1 document deleted`);
				db.close();
				return callback(res);
			});
		});
	},

	deleteMany: function(collection, filter, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).deleteMany(filter, function (err, res) {
				if (err) throw err;
				console.log(res.deletedCount + ` documents deleted`);
				db.close();
				return callback(res);
			});
		});
	},

	updateOne: function(collection, filter, update, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).updateOne(filter, update, function (err, res) {
				if (err) throw err;
				console.log(`1 document updated`);
				db.close();
				return callback(res);
			});
		});
	},

	updateMany: function(collection, filter, update, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).updateMany(filter, update, function (err, res) {
				if (err) throw err;
				console.log(res.modifiedCount + ` documents updated`);
				db.close();
				return callback(res);
			});
		});
	}
}

module.exports = database;
*/

const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);

const db = `writers-kiln-db`;

dotenv.config();
const url = process.env.DB_URL;

const User = require(`./user-model.js`);
const Post = require(`./post-model.js`);
const Comment = require(`./comment-model.js`);

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function () {
        mongoose.connect(url, options, function(err) {
            if(err) throw err;
            console.log(`Connected to: ` + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(err, res) {
            if(err) throw err;
            console.log(`Added ` + res);
            return callback(res);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(err, res) {
            if(err) throw err;
            console.log(`Added ` + res);
            return callback(res);
        });
    },

    findOne: function(model, query, callback, projection=``) {
        model.findOne(query, projection, function(err, res) {
            if(err) throw err;
            return callback(res);
        });
    },

    findMany: function(model, query, callback, projection=``, sort=null) {
        model.find(query, projection).sort(sort).exec(function (err, res) {
            if(err) throw err;
            return callback(res);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(err, res) {
            if(err) throw err;
            console.log(`Document modified: ` + res.nModified);
            return callback(res);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(err, res) {
            if(err) throw err;
            console.log(`Documents modified: ` + res.nModified);
            return callback(res);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (err, res) {
            if(err) throw err;
            console.log(`Document deleted: ` + res.deletedCount);
            return callback(res);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (err, res) {
            if(err) throw err;
            console.log(`Document deleted: ` + res.deletedCount);
            return callback(res);
        });
    }

}

module.exports = database;
