import * as sm from '../index.js'; // import * as sm from 'simplymongo';

const db = sm.getDatabase();

async function handleSomeStuff(player) {
    // Check if account exists.
    const accounts = await db.fetchAllByField('username', 'stuyk', 'accounts');

    // Delete account if greater than one.
    if (accounts.length >= 1) {
        await db.deleteById(accounts[0]._id, 'accounts');
    }

    // Create new account. Return document.
    player.data = await db.insertData({ username: 'stuyk', bank: 0 }, 'accounts', true);

    // Modify some parameters.
    player.data.bank = 25;
    player.data.money = 1;
    await db.updatePartialData(player.data._id, { bank: player.data.bank, money: player.data.money }, 'accounts');

    // Update all parameters.
    await db.updatePartialData(player.data._id, { ...player.data }, 'accounts');

    // Fetch by ID
    const result = await db.fetchData('_id', player.data._id, 'accounts');
    console.log(result);
}

handleSomeStuff({});
