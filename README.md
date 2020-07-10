# What is this?

Simply Mongo is just a wrapper for the original MongoDB interface.

This package will let you spin up a database in seconds.

Originally created for the https://altv.mp/ community.

Utilizes ES6.

# Installation

```
npm install simplymongo
```

# Usage

### Importing

```js
import { Database from fetchDatabaseInstance } from 'simplymongo';

// or

import * as simplymongo from 'simplymongo';
```

### Initializing your Database connection. No Authorization.

url, databasename, collectionsToCreate

```js
new Database('mongodb://localhost:27017', 'databasename', ['names', 'of', 'collections']);

// or;

new simplymongo.Database('mongodb://localhost:27017', 'databasename', ['names', 'of', 'collections']);
```

### Initializing your Database connection. Authorization.

url, databasename, collectionsToCreate, username, password

```js
new Database('mongodb://localhost:27017', 'databasename', ['names', 'of', 'collections'], 'username', 'password');

// or;

new simplymongo.Database(
    'mongodb://localhost:27017',
    'databasename',
    ['names', 'of', 'collections'],
    'username',
    'password'
);
```

### Fetching Database Instance After Initialization

```js
const db = fetchDatabaseInstance();

// or;

const db = simplymongo.fetchDatabaseInstance();
```

### Documentation

<a name="module_simplymongo"></a>

-   [simplymongo](#module_simplymongo)
    -   [.Database](#module_simplymongo.Database)
        -   [new exports.Database(url, databasename, collections, username, password)](#new_module_simplymongo.Database_new)
        -   [.client](#module_simplymongo.Database+client) : <code>mongodb.MongoClient</code>
        -   [.generateCollections()](#module_simplymongo.Database+generateCollections)
        -   [.fetchData(fieldName, fieldValue, collection)](#module_simplymongo.Database+fetchData) ⇒ <code>Any</code>
        -   [.fetchAllByField(fieldName, fieldValue, collection)](#module_simplymongo.Database+fetchAllByField) ⇒ <code>Array</code>
        -   [.insertData(document, collection, returnDocument)](#module_simplymongo.Database+insertData) ⇒ <code>Object</code>
        -   [.updatePartialData(id, partialObjectData, collection)](#module_simplymongo.Database+updatePartialData)
        -   [.deleteById(id, collection)](#module_simplymongo.Database+deleteById) ⇒ <code>Object</code>
        -   [.fetchAllData(collection)](#module_simplymongo.Database+fetchAllData) ⇒ <code>Array.&lt;any&gt;</code>
        -   [.selectData(collection, fieldNames)](#module_simplymongo.Database+selectData)
        -   [.updateDataByFieldMatch(fieldName, fieldValue, partialObjectData, collection)](#module_simplymongo.Database+updateDataByFieldMatch)
        -   [.replaceField(id, fieldName, fieldValue, collection)](#module_simplymongo.Database+replaceField)
    -   [.fetchDatabaseInstance()](#module_simplymongo.fetchDatabaseInstance) ⇒ <code>Promise.&lt;Database&gt;</code>

<a name="module_simplymongo.Database"></a>

### simplymongo.Database

**Kind**: static class of [<code>simplymongo</code>](#module_simplymongo)

-   [.Database](#module_simplymongo.Database)
    -   [new exports.Database(url, databasename, collections, username, password)](#new_module_simplymongo.Database_new)
    -   [.client](#module_simplymongo.Database+client) : <code>mongodb.MongoClient</code>
    -   [.generateCollections()](#module_simplymongo.Database+generateCollections)
    -   [.fetchData(fieldName, fieldValue, collection)](#module_simplymongo.Database+fetchData) ⇒ <code>Any</code>
    -   [.fetchAllByField(fieldName, fieldValue, collection)](#module_simplymongo.Database+fetchAllByField) ⇒ <code>Array</code>
    -   [.insertData(document, collection, returnDocument)](#module_simplymongo.Database+insertData) ⇒ <code>Object</code>
    -   [.updatePartialData(id, partialObjectData, collection)](#module_simplymongo.Database+updatePartialData)
    -   [.deleteById(id, collection)](#module_simplymongo.Database+deleteById) ⇒ <code>Object</code>
    -   [.fetchAllData(collection)](#module_simplymongo.Database+fetchAllData) ⇒ <code>Array.&lt;any&gt;</code>
    -   [.selectData(collection, fieldNames)](#module_simplymongo.Database+selectData)
    -   [.updateDataByFieldMatch(fieldName, fieldValue, partialObjectData, collection)](#module_simplymongo.Database+updateDataByFieldMatch)
    -   [.replaceField(id, fieldName, fieldValue, collection)](#module_simplymongo.Database+replaceField)

<a name="new_module_simplymongo.Database_new"></a>

#### new exports.Database(url, databasename, collections, username, password)

Create a Database Connection

| Param        | Type                              | Default       | Description                                |
| ------------ | --------------------------------- | ------------- | ------------------------------------------ |
| url          | <code>string</code>               |               | mongodb://localhost:27017                  |
| databasename | <code>string</code>               |               | Name of the database to store collections. |
| collections  | <code>Array.&lt;string&gt;</code> |               | Collections to create.                     |
| username     |                                   | <code></code> |                                            |
| password     |                                   | <code></code> |                                            |

<a name="module_simplymongo.Database+client"></a>

#### database.client : <code>mongodb.MongoClient</code>

**Kind**: instance property of [<code>Database</code>](#module_simplymongo.Database)
<a name="module_simplymongo.Database+generateCollections"></a>

#### database.generateCollections()

Used to generate collections.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)
<a name="module_simplymongo.Database+fetchData"></a>

#### database.fetchData(fieldName, fieldValue, collection) ⇒ <code>Any</code>

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)
**Returns**: <code>Any</code> - A single document.

| Param      | Type                | Description                  |
| ---------- | ------------------- | ---------------------------- |
| fieldName  | <code>String</code> | Field we want to select.     |
| fieldValue | <code>Any</code>    | Field value we want to find. |
| collection | <code>String</code> | Name of the collection.      |

<a name="module_simplymongo.Database+fetchAllByField"></a>

#### database.fetchAllByField(fieldName, fieldValue, collection) ⇒ <code>Array</code>

Fetch all with a specific field and a specific value.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)
**Returns**: <code>Array</code> - An array of documents.

| Param      | Type                | Description                  |
| ---------- | ------------------- | ---------------------------- |
| fieldName  | <code>String</code> | Field we want to modify.     |
| fieldValue | <code>Any</code>    | Field value we want to find. |
| collection | <code>String</code> | Name of the collection.      |

<a name="module_simplymongo.Database+insertData"></a>

#### database.insertData(document, collection, returnDocument) ⇒ <code>Object</code>

Insert a document and return the ID.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)
**Returns**: <code>Object</code> - Document

| Param          | Type                 | Default            |
| -------------- | -------------------- | ------------------ |
| document       | <code>\*</code>      |                    |
| collection     | <code>\*</code>      |                    |
| returnDocument | <code>Boolean</code> | <code>false</code> |

<a name="module_simplymongo.Database+updatePartialData"></a>

#### database.updatePartialData(id, partialObjectData, collection)

Update an ID in the database partially.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param             | Type            |
| ----------------- | --------------- |
| id                | <code>\*</code> |
| partialObjectData | <code>\*</code> |
| collection        | <code>\*</code> |

<a name="module_simplymongo.Database+deleteById"></a>

#### database.deleteById(id, collection) ⇒ <code>Object</code>

Delete data by id.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param      | Type                |
| ---------- | ------------------- |
| id         | <code>String</code> |
| collection | <code>String</code> |

<a name="module_simplymongo.Database+fetchAllData"></a>

#### database.fetchAllData(collection) ⇒ <code>Array.&lt;any&gt;</code>

Fetch all data in a collection.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param      | Type                |
| ---------- | ------------------- |
| collection | <code>String</code> |

<a name="module_simplymongo.Database+selectData"></a>

#### database.selectData(collection, fieldNames)

Select specific fields from the collection; and return all data.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param      | Type                              |
| ---------- | --------------------------------- |
| collection | <code>String</code>               |
| fieldNames | <code>Array.&lt;String&gt;</code> |

<a name="module_simplymongo.Database+updateDataByFieldMatch"></a>

#### database.updateDataByFieldMatch(fieldName, fieldValue, partialObjectData, collection)

Update partial data based on other parameters.

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param             | Type                | Description       |
| ----------------- | ------------------- | ----------------- |
| fieldName         | <code>String</code> |                   |
| fieldValue        | <code>String</code> |                   |
| partialObjectData | <code>Object</code> | merely an example |
| collection        | <code>String</code> |                   |

<a name="module_simplymongo.Database+replaceField"></a>

#### database.replaceField(id, fieldName, fieldValue, collection)

**Kind**: instance method of [<code>Database</code>](#module_simplymongo.Database)

| Param      | Type                |
| ---------- | ------------------- |
| id         | <code>String</code> |
| fieldName  | <code>String</code> |
| fieldValue | <code>any</code>    |
| collection | <code>String</code> |

<a name="module_simplymongo.fetchDatabaseInstance"></a>

### simplymongo.fetchDatabaseInstance() ⇒ <code>Promise.&lt;Database&gt;</code>

**Kind**: static method of [<code>simplymongo</code>](#module_simplymongo)
**Returns**: <code>Promise.&lt;Database&gt;</code> - Singleton of your Database Connection
