import * as sm from '../index.js'; // import * as sm from 'simplymongo';

sm.onReady(establishConnection);

async function establishConnection() {
    console.log(`Ready! Let's import the rest of our project.`);
    await import('./someFile.js');
}

new sm.Database('mongodb://localhost:27017', 'mydb', ['accounts', 'characters']);
