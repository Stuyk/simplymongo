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
    constructor(url: string, databasename: string, collections?: Array<string>, username?: string | null, password?: string | null);
    establishingConnection: boolean;
    /** @type {mongodb.MongoClient} */
    client: any;
    collections: string[];
    databaseName: string;
    establishConnection(): Promise<void>;
    db: any;
    generateCollections(): Promise<void>;
    /**
     * @param {string} fieldName Field we want to select.
     * @param {any} fieldValue Field value we want to find.
     * @param {string} collection Name of the collection.
     * @returns {Promise<T | null>} A single document.
     * @template T
     */
    fetchData<T>(fieldName: string, fieldValue: any, collection: string): Promise<T | null>;
    /**
     * Fetch all with a specific field and a specific value.
     * @param {string} fieldName Field we want to modify.
     * @param {any} fieldValue Field value we want to find.
     * @param {string} collection Name of the collection.
     * @returns {Promise<Array<T>>} An array of documents.
     * @template T
     */
    fetchAllByField<T_2>(fieldName: string, fieldValue: any, collection: string): Promise<T_2[]>;
    /**
     * Insert a document and return the ID.
     * @param {T} document
     * @param {string} collection
     * @param {boolean} returnDocument
     * @returns {Promise<T | null>} Document
     * @template T
     */
    insertData<T_3>(document: T_3, collection: string, returnDocument?: boolean): Promise<T_3 | null>;
    /**
     * Update an ID in the database partially.
     * @param {string} id
     * @param {T} partialObjectData
     * @param {string} collection
     * @returns {boolean}
     * @template T
     */
    updatePartialData<T_5>(id: string, partialObjectData: T_5, collection: string): boolean;
    /**
     * Update an ID in the database partially, with custom aggregation.
     * @param {string} id
     * @param {T} partialObjectData
     * @param {string} collection
     * @returns {boolean}
     * @template T
     */
    updatePartialDataAggregation<T_6>(id: string, partialObjectData: T_6, collection: string): boolean;
    /**
     * Delete data by id.
     * @param {string} id
     * @param {string} collection
     * @returns {boolean}
     */
    deleteById(id: string, collection: string): boolean;
    /**
     * Fetch all data in a collection.
     * @param {string} collection
     * @returns {Promise<Array<T>>}
     * @template T
     */
    fetchAllData<T_7>(collection: string): Promise<T_7[]>;
    /**
     * Select specific fields from the collection; and return all data.
     * @param {string} collection
     * @param {Array<string>} fieldNames
     * @returns {Array<T>}
     * @template T
     */
    selectData<T_8>(collection: string, fieldNames: Array<string>): T_8[];
    /**
     * Update partial data based on other parameters.
     * @param {string} fieldName The field name.
     * @param {string} fieldValue The field value to update based on fieldName.
     * @param {T} partialObjectData An object of data to update.
     * @param {string} collection
     * @template T
     */
    updateDataByFieldMatch<T_9>(fieldName: string, fieldValue: string, partialObjectData: T_9, collection: string): Promise<void>;
    /**
     *
     * @param {string} oldValue
     * @param {string} fieldName
     * @param {any} fieldValue
     * @param {string} collection
     */
    replaceField(oldValue: string, fieldName: string, fieldValue: any, collection: string): Promise<void>;
}
