const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run(`PRAGMA busy_timeout = 60000`);
        db.run(`CREATE TABLE IF NOT EXISTS posters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            startDate TEXT,
            endDate TEXT,
            title TEXT,
            poster TEXT,
            password TEXT,
            uploadDate TEXT
        )`);
    }
});

module.exports = db;