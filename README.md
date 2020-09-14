Simply Mongo is the simplest way to use MongoDB without knowing how to use MongoDB.

Store your client data in collections and fetch and modify data easily.

Originally created for the https://altv.mp/ community.

# Installation

## Prerequisites

-   NodeJS 13+
-   ES6 Project with Modules
-   [A MongoDB Server](https://www.mongodb.com/try/download/community)

## Install

```
$ npm install simplymongo
```

# Starting Usage

Here are some generalized steps for getting started.

1. Add callback for ready statement.
2. Create `new sm.Database`.
3. Connection establishment will trigger ready statement.
4. Ready statement imports rest of the files.
5. Establish database instances where needed with `sm.fetchDatabaseInstance()`.

Additional information can be found below. 👇🏻

## 🔽 Importing

I recommend importing the entire library of `simplymongo`.

```js
import * as sm from 'simplymongo';
```

## 🔗 Establish Connection

After a connection is established. You may use `sm.onReady` to listen for the ready status.

```js
import * as sm from 'simplymongo';

new sm.Database('mongodb://localhost:27017', 'databasename', ['accounts', 'vehicles', 'characters']);

// OR
new sm.Database('mongodb://localhost:27017', 'databasename', ['accounts', 'vehicles', 'characters'], 'user', 'pass');
```

## 🤝🏼 Handling Connection to Simply Mongo

There is an onReady callback register that will assist you establishing Database connection before loading other files.

Register callback with this function, then import the rest of your files.

**main.js**

```js
import * as sm from 'simplymongo';

sm.onReady(loadRestOfCode);

async function loadRestOfCode() {
    await import('somefile');
}
```

**somefile.js**

```js
import * as sm from 'simplymongo';

const db = sm.getDatabase();

// OR
// No Params Required if fetching established db.
const db = new sm.Database();
```

## ♻️ Fetching Database Instance after Connection

This no longer requires an wait.

Use `sm` first and load the rest of your files.

Rest of your files will automatically fetch the correct instance.

**somefile.js**

```js
import * as sm from 'simplymongo';

const db = sm.getDatabase();

// OR
// No Params Required if fetching established db.
const db = new sm.Database();
```

## 📝 Regular Usage

These are just some general examples of deleting, updating, etc.

Think of this as your basic CRUD lesson.

This example is targetting usage with [https://altv.mp/](https://altv.mp/)

**Check `./example/example.js` for more explanation.**

```js
import * as sm from 'simplymongo';

const db = sm.getDatabase();

async function someAsyncFunction(player) {
    // We can now use player.data.id to update any changes to this document.
    player.data.money = 50000;
    await db.updatePartialData(player.data.id, { money: player.data.money }, 'accounts');
}

// Let's assume we're looking for this player's id now.
async function someUsernamePassed(player) {
    // Returns a document with { _id, username, bank }
    player.data = await db.insertData({ username: 'johnny', bank: 0 }, 'accounts', true);

    // Find the username in the database
    const matches = await db.fetchAllByField('username', player.data.username, 'accounts');

    // Check if it exists. Create it if it doe snot.
    if (matches.length <= 0) {
        // Account does not exist. Create it.
        player.data = await db.insertData({ username: 'johnny2' }, 'accounts', true);
    } else {
        // Account exists. Assign to player object.
        player.data = matches[0];
    }

    // Create money element and update bank element.
    player.data.money = 50000;
    player.data.bank = 10;

    // Update two entries for a player.
    await db.updatePartialData(player.data.id, { money: player.data.money, bank: player.data.bank }, 'accounts');

    // Update all entries for a player.
    await db.updatePartialData(player.data.id, { ...player.data }, 'accounts');

    // Delete the account!
    await db.deleteById(player.data._id.toString(), 'accounts');

    // Fetch all accounts in the accounts collection.
    const accounts = await db.fetchAllData('accounts');

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        console.log(account);
    }
}
```
