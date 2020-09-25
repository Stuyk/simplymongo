/**
 * @module simplymongo
 */
/**
 * Single use event that registers a callback for onReady.
 * Load all other functions, imports, etc. after this is ready.
 *
 * @param  {Function} callback
 */
export function onReady(callback: Function): void;
/**
 * Return an instance of the Database after Database is ready.
 *
 * @return {Database} Singleton of your Database Connection
 */
export function getDatabase(): Database;
export class Database {
    /**
     * Create a Database Connection
     * @param  {string} url mongodb://localhost:27017
     * @param  {string} databasename Name of the database to store collections.
     * @param  {Array<string>} collections Collections to create.
     * @param  {string | null} username=null
     * @param  {string | null} password=null
     */
    constructor(
        url: string,
        databasename: string,
        collections?: Array<string>,
        username?: string | null,
        password?: string | null
    );
    establishingConnection: boolean;
    /** @type {mongodb.MongoClient} */
    client: any;
    collections: string[];
    databaseName: string;
    establishConnection(): Promise<void>;
    db: any;
    /**
     * Used to generate collections.
     */
    generateCollections(): Promise<void>;
    /**
     * @param {String} fieldName Field we want to select.
     * @param {any} fieldValue Field value we want to find.
     * @param {String} collection Name of the collection.
     * @returns {Promise<{}>} A single document.
     */
    fetchData(fieldName: string, fieldValue: any, collection: string): Promise<{}>;
    /**
     * Fetch all with a specific field and a specific value.
     * @param {String} fieldName Field we want to modify.
     * @param {any} fieldValue Field value we want to find.
     * @param {String} collection Name of the collection.
     * @returns {Promise<{}>} An array of documents.
     */
    fetchAllByField(fieldName: string, fieldValue: any, collection: string): Promise<{}>;
    /**
     * Insert a document and return the ID.
     * @param {*} document
     * @param {*} collection
     * @param {boolean} returnDocument
     * @returns {Promise<{}>} Document
     */
    insertData(document: any, collection: any, returnDocument?: boolean): Promise<{}>;
    /**
     * Update an ID in the database partially.
     * @param {*} id
     * @param {*} partialObjectData
     * @param {*} collection
     */
    updatePartialData(id: any, partialObjectData: any, collection: any): Promise<void>;
    /**
     * Delete data by id.
     * @param {String} id
     * @param {String} collection
     */
    deleteById(id: string, collection: string): Promise<void>;
    /**
     * Fetch all data in a collection.
     * @param {String} collection
     * @returns {Promise<Array<any>>}
     */
    fetchAllData(collection: string): Promise<Array<any>>;
    /**
     * Select specific fields from the collection; and return all data.
     * @param {String} collection
     * @param {Array<String>} fieldNames
     */
    selectData(collection: string, fieldNames: Array<string>): Promise<any>;
    /**
     * Update partial data based on other parameters.
     * @param {String} fieldName
     * @param {String} fieldValue
     * @param {{name: 'stuyk'}} partialObjectData merely an example
     * @param {String} collection
     */
    updateDataByFieldMatch(
        fieldName: string,
        fieldValue: string,
        partialObjectData: {
            name: 'stuyk';
        },
        collection: string
    ): Promise<void>;
    /**
     *
     * @param {String} oldValue
     * @param {String} fieldName
     * @param {any} fieldValue
     * @param {String} collection
     */
    replaceField(oldValue: string, fieldName: string, fieldValue: any, collection: string): Promise<void>;
}
