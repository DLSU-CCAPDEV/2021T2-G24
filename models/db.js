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
				return callback(true);
			});
		});
	},

	insertMany: function(collection, docs) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).insertMany(docs, function (err, res) {
				if (err) throw err;
				console.log(res.insertedCount + ` documents inserted`);
				db.close();
			});
		});
	},

	findOne: function(collection, query, callback) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).findOne(query, function (err, result) {
				if (err) throw err;
				res = result;
				db.close();
				return callback(result);
			});
		});
	},

	findMany: function(collection, query, sort=null, projection=null) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).find(query, {projection: projection}).sort(sort).toArray(function (err, res) {
				if (err) throw err;
				console.log(res);
				db.close();
			});
		});
	},

	deleteOne: function(collection, filter) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).deleteOne(filter, function (err, res) {
				if (err) throw err;
				console.log(`1 document deleted`);
				db.close();
			});
		});
	},

	deleteMany: function(collection, filter) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).deleteMany(filter, function (err, res) {
				if (err) throw err;
				console.log(res.deletedCount + ` documents deleted`);
				db.close();
			});
		});
	},

	updateOne: function(collection, filter, update) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).updateOne(filter, update, function (err, res) {
				if (err) throw err;
				console.log(`1 document updated`);
				db.close();
			});
		});
	},

	updateMany: function(collection, filter, update) {
		client.connect(url, options, function(err, db) {
			if (err) throw err;
			var database = db.db(dbName);
			database.collection(collection).updateMany(filter, update, function (err, res) {
				if (err) throw err;
				console.log(res.modifiedCount + ` documents updated`);
				db.close();
			});
		});
	}
}

module.exports = database;
