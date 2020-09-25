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
    establishingConnection: boolean | undefined;
    /** @type {mongodb.MongoClient} */
    client: any;
    collections: string[] | undefined;
    databaseName: string | undefined;
    establishConnection(): Promise<void>;
    db: any;
    /**
     * Used to generate collections.
     */
    generateCollections(): Promise<void>;
    /**
     * @param {string} fieldName Field we want to select.
     * @param {any} fieldValue Field value we want to find.
     * @param {string} collection Name of the collection.
     * @returns {Promise<T>} A single document.
     * @template T
     */
    fetchData<T>(fieldName: string, fieldValue: any, collection: string): Promise<T>;
    /**
     * Fetch all with a specific field and a specific value.
     * @param {string} fieldName Field we want to modify.
     * @param {any} fieldValue Field value we want to find.
     * @param {string} collection Name of the collection.
     * @returns {Promise<Array<T>>} An array of documents.
     * @template T
     */
    fetchAllByField<T_1>(fieldName: string, fieldValue: any, collection: string): Promise<T_1[]>;
    /**
     * Insert a document and return the ID.
     * @param {{}} document
     * @param {string} collection
     * @param {boolean} returnDocument
     * @returns {Promise<{T}>} Document
     * @template T
     */
    insertData<T_2>(
        document: {},
        collection: string,
        returnDocument?: boolean
    ): Promise<{
        T: any;
    }>;
    /**
     * Update an ID in the database partially.
     * @param {string} id
     * @param {{}} partialObjectData
     * @param {string} collection
     * @returns {boolean}
     */
    updatePartialData(id: string, partialObjectData: {}, collection: string): boolean;
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
    fetchAllData<T_4>(collection: string): Promise<T_4[]>;
    /**
     * Select specific fields from the collection; and return all data.
     * @param {string} collection
     * @param {Array<string>} fieldNames
     * @returns {Array<T>}
     * @template T
     */
    selectData<T_5>(collection: string, fieldNames: Array<string>): T_5[];
    /**
     * Update partial data based on other parameters.
     * @param {string} fieldName The field name.
     * @param {string} fieldValue The field value to update based on fieldName.
     * @param {{}} partialObjectData An object of data to update.
     * @param {string} collection
     */
    updateDataByFieldMatch(
        fieldName: string,
        fieldValue: string,
        partialObjectData: {},
        collection: string
    ): Promise<void>;
    /**
     *
     * @param {string} oldValue
     * @param {string} fieldName
     * @param {any} fieldValue
     * @param {string} collection
     */
    replaceField(oldValue: string, fieldName: string, fieldValue: any, collection: string): Promise<void>;
}
