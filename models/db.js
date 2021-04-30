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
			});
		});
	}
}

module.exports = database;
