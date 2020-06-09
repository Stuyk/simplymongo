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

### Inserting Data

document, collection, shouldReturnDocument?

```js
async function someAsyncFunction() {
    const result = await db.insertData({ name: 'stuyk' }, 'names', true);
    console.log(result);
}
```

Result:

```js
{ _id: 5eded784f4cddb47a0bbbd40, name: 'stuyk' }
```

### Updating Data

documentID, PartialObjectData, collectionName

```js
await db.updatePartialData('5eded784f4cddb47a0bbbd40', { name: 'not stuyk', timesUpdated: 1 }, 'names');
```

### Delete Data

documentID, collection

```js
await db.deleteById(`5eded784f4cddb47a0bbbd40`, 'names');
```

### Fetch All Data In Collection

collectionName

```js
const names = await db.fetchAllData('names');
console.log(names);
```

### Select All Data by Field Names

collectionName, fieldNamesArray

```js
const selected = db.selectData('names', ['name']);
```

### Fetch All Data by Field

fieldName, fieldValue, collection

```js
const result = await db.fetchAllByField('name', 'stuyk', 'names');
```

### Fetch One Set of Data with Specific Value

fieldName, fieldValue, collection

```js
const result = await db.fetchData('name', 'stuyk', 'names');
```
