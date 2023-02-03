const sqlite3 = require('sqlite3');

/*
 * OPEN_READWRITE: The database is opened for reading and writing where the
 * database must already exist, otherwise an error is returned.
 */
const db = new sqlite3.Database(
	'./e-rsvp.db',
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err && err.code === 'SQLITE_CANTOPEN') {
			return createDatabase();
		} else if (err) {
			console.log('Error opening database ' + err);
			exit(1);
		}
		// If the database exists, the runQueries() is executed.
		// runQueries(db);
	}
);

function createDatabase() {
	const newdb = new sqlite3.Database('e-rsvp.db', (err) => {
		if (err) {
			console.log('Error creating database: ' + err);
			exit(1);
		}
		createTables(newdb);
	});
}

function createTables(newdb) {
	newdb.exec(
		`CREATE TABLE guest (
      guest_id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      is_attending INTEGER,
      needs_hotel INTEGER,
      entree TEXT,
      food_restrictions TEXT,
      song_request TEXT
    );

    INSERT INTO guest (guest_id, name, email, is_attending, needs_hotel, entree, food_restrictions, song_request)
      VALUES (1, 'Michael Scott', 'michael@email.com', null, null, '', '', ''),
          (2, 'Dwight Schrute', 'dwight@email.com', null, null, '', '', ''),
          (3, 'Angela Martin', 'dwight@email.com', null, null, '', '', ''),
          (4, 'Roy Anderson', 'roy@email.com', null, null, '', '', ''),
          (5, 'Karen Filippelli', 'karen@email.com', null, null, '', '', ''),
          (6, 'Andy Bernard', 'andy@email.com', null, null, '', '', ''),
          (7, 'Erin Hannon', 'erin@email.com', null, null, '', '', ''),
          (8, 'Kelly Kapoor', 'kelly@email.com', null, null, '', '', ''),
          (9, 'Ryan Howard', 'kelly@email.com', null, null, '', '', ''),
          (10, 'Kevin Malone', 'kevin@email.com', null, null, '', '', '');
    
    CREATE TABLE plus_one (
      guest_id INTEGER NOT NULL,
      plus_one_id INTEGER NOT NULL,
      PRIMARY KEY(guest_id, plus_one_id),
      FOREIGN KEY(guest_id) REFERENCES guest(guest_id),
      FOREIGN KEY(plus_one_id) REFERENCES guest(guest_id)
    );
    `,
		(err) => {
			if (err) {
				console.log('Error creating table: ' + err);
			}
			runQueries(newdb);
		}
	);
}

function runQueries(db) {
	db.all('SELECT * FROM guest', (err, rows) => {
		rows.forEach((row) => {
			console.log(row);
		});
	});
}

module.exports = db;
