import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

let instance;

/**
 * @module simplymongo
 */

/**
 * @return {Promise<Database>} Singleton of your Database Connection
 */
export async function fetchDatabaseInstance() {
    if (instance) {
        return instance;
    }

    await new Promise((resolve) => {
        console.log(`[MongoDB] Awaiting instance setup...`);
        const interval = setInterval(() => {
            if (!instance) {
                return;
            }

            clearInterval(interval);
            resolve();
        }, 250);
    });

    console.log(`[MongoDB] Singleton instance returned. Connection completed.`);
    return instance;
}

export class Database {
    /**
     * Create a Database Connection
     * @param  {string} url mongodb://localhost:27017
     * @param  {string} databasename Name of the database to store collections.
     * @param  {Array<string>} collections Collections to create.
     * @param  {} username=null
     * @param  {} password=null
     */
    constructor(url, databasename, collections = [], username = null, password = null) {
        if (instance) {
            return instance;
        }

        this.establishingConnection = true;

        /** @type {mongodb.MongoClient} */
        this.client = null;
        this.collections = collections;
        this.databaseName = databasename;

        if (username && password) {
            console.log(`[MongoDB] Establishing connection with username and password.`);
            this.client = new MongoClient(url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                auth: {
                    user: username,
                    password: password,
                },
            });
        } else {
            console.log(`[MongoDB] Establishing connection without using a username or password.`);
            this.client = new MongoClient(url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
        }

        this.establishConnection();
    }

    async establishConnection() {
        await this.client.connect().catch((err) => {
            if (err) {
                console.log(err);
                console.error(`[MongoDB] Failed to establish connection to database. Did you specify the correct url?`);
                process.exit(1);
            }
        });

        this.db = this.client.db(this.databaseName);
        this.generateCollections();
        instance = this;
    }

    /**
     * Used to generate collections.
     */
    async generateCollections() {
        if (this.collections.length <= 0) {
            console.log(`[MongoDB] No collections were specified for creation.`);
            return;
        }

        for (let i = 0; i < this.collections.length; i++) {
            const collectionName = this.collections[i];
            await this.db.createCollection(collectionName, {}, (err, res) => {
                if (err)
                    console.log(
                        `[MongoDB] Error occurred when creating collection '${collectionName}' (${err.code}: ${err.codeName})`
                    );
            });
        }

        console.log(`[MongoDB] Connection Complete! Utilizing ${this.collections.length} collections.`);
    }

    /**
     * @param {String} fieldName Field we want to select.
     * @param {Any} fieldValue Field value we want to find.
     * @param {String} collection Name of the collection.
     * @returns {Any} A single document.
     */
    async fetchData(fieldName, fieldValue, collection) {
        if (fieldName === '_id') {
            fieldValue = new ObjectID(fieldValue);
        }

        const results = await this.db.collection(collection).findOne({ [fieldName]: fieldValue });

        return results;
    }

    /**
     * Fetch all with a specific field and a specific value.
     * @param {String} fieldName Field we want to modify.
     * @param {Any} fieldValue Field value we want to find.
     * @param {String} collection Name of the collection.
     * @returns {Array} An array of documents.
     */
    async fetchAllByField(fieldName, fieldValue, collection) {
        if (fieldName === '_id') {
            fieldValue = new ObjectID(fieldValue);
        }

        const results = await this.db
            .collection(collection)
            .find({ [fieldName]: fieldValue })
            .toArray();

        if (results.length <= 0) {
            return [];
        }

        return results;
    }

    /**
     * Insert a document and return the ID.
     * @param {*} document
     * @param {*} collection
     * @param {Boolean} returnDocument
     * @returns {{_id, a, b, c}} Document
     */
    async insertData(document, collection, returnDocument = false) {
        const id = await (await this.db.collection(collection).insertOne(document)).insertedId;

        if (!returnDocument) {
            return id;
        }

        return await this.db.collection(collection).findOne({ _id: ObjectID(id) });
    }

    /**
     * Update an ID in the database partially.
     * @param {*} id
     * @param {*} partialObjectData
     * @param {*} collection
     */
    async updatePartialData(id, partialObjectData, collection) {
        await this.db
            .collection(collection)
            .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { ...partialObjectData } });
    }

    /**
     * Delete data by id.
     * @param {String} id
     * @param {String} collection
     * @returns {{}}
     */
    async deleteById(id, collection) {
        await this.db.collection(collection).findOneAndDelete({ _id: ObjectID(id) });
    }

    /**
     * Fetch all data in a collection.
     * @param {String} collection
     * @returns {Array<any>}
     */
    async fetchAllData(collection) {
        return await this.db.collection(collection).find().toArray();
    }

    /**
     * Select specific fields from the collection; and return all data.
     * @param {String} collection
     * @param {Array<String>} fieldNames
     */
    async selectData(collection, fieldNames) {
        const selectData = {
            _id: 1,
        };

        fieldNames.forEach((name) => {
            selectData[name] = 1;
        });

        return await this.db
            .collection(collection)
            .find({})
            .project({ ...selectData })
            .toArray();
    }

    /**
     * Update partial data based on other parameters.
     * @param {String} fieldName
     * @param {String} fieldValue
     * @param {{name: 'stuyk'}} partialObjectData merely an example
     * @param {String} collection
     */
    async updateDataByFieldMatch(fieldName, fieldValue, partialObjectData, collection) {
        if (fieldName === '_id') {
            fieldValue = ObjectID(fieldValue);
        }

        await this.db
            .collection(collection)
            .findOneAndUpdate({ [fieldName]: fieldValue }, { $set: { ...partialObjectData } });
    }

    /**
     *
     * @param {String} id
     * @param {String} fieldName
     * @param {any} fieldValue
     * @param {String} collection
     */
    async replaceField(oldValue, fieldName, fieldValue, collection) {
        await this.db
            .collection(collection)
            .updateMany({ [fieldName]: oldValue }, { $set: { [fieldName]: fieldValue } });
    }
}
