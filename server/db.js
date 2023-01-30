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
      attending INTEGER,
      need_hotel INTEGER,
      entree TEXT,
      food_exceptions TEXT,
      song_request TEXT
    );

    INSERT INTO guest (guest_id, name, attending, need_hotel, entree, food_exceptions, song_request)
      VALUES (1, 'Michael Scott', 1, 1, 'Beef', '', '"Seasons of Love" by Rent'),
          (2, 'Dwight Schrute', 1, 0, 'Chicken', '', '"Wild Side" by Mötley Crüe'),
          (3, 'Angela Martin', 1, 0, 'Vegetarian', 'Developed an allergy to beets', '"The Little Drummer Boy"'),
          (4, 'Roy Anderson', 0, '', '', '', ''),
          (5, 'Karen Filippelli', 0, '', '', '', ''),
          (6, 'Andy Bernard', 1, 1, 'Fish', '', '"Faith" by George Michael'),
          (7, 'Erin Hannon', 1, 0, 'Chicken', '', ''),
          (8, 'Kelly Kapoor', 1, 0, 'Chicken', '', '"Hollaback Girl" by Gwen Stefani'),
          (9, 'Ryan Howard', 1, 0, 'Beef', 'Only organic food please', ''),
          (10, 'Kevin Malone', 1, 1, 'Chicken', '', '"You Oughta Know" by Alanis Morissette');
    
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
