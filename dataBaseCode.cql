Useful cqlsh code to setup a database. Everything here works with copy/paste.

Database was setup in docker container 

docker cassandra setup:

docker pull cassandra:latest

docker run --name cassandraCinema -d -p 9042:9042 cassandra:latest

docker exec -it cassandra-container cqlsh

CREATE KEYSPACE cassandraCinemaDatabase
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE cassandraCinemaDatabase;


Creating DataBases

CREATE TABLE IF NOT EXISTS users (
id UUID PRIMARY KEY, 
username TEXT, 
email TEXT, 
password TEXT, 
joindate DATE);


CREATE TABLE IF NOT EXISTS screenings (
    movie_id UUID,
    screening_time TEXT,
    available_seats INT,
    PRIMARY KEY ((movie_id), screening_time)
);


CREATE TABLE IF NOT EXISTS reservations (
reservation_id UUID PRIMARY KEY,
movie_name TEXT,
movie_hour TEXT,
number_of_tickets INT,
reservation_date TEXT,
username TEXT,
email TEXT);


CREATE TABLE IF NOT EXISTS movies (
    id UUID PRIMARY KEY,
    title TEXT,
    director TEXT,
    duration INT
);

Inserting data into database

INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'One Flew Over the Cuckoo''s Nest', 'Milos Forman', 133);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'The Green Mile', 'Frank Darabont', 189);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'Intouchables', 'Olivier Nakache & Éric Toledano', 112);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'The Shawshank Redemption', 'Frank Darabont', 144);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'Twelve Angry Men', 'Sidney Lumet', 96);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'Forrest Gump', 'Robert Zemeckis', 142);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'The Lord of the Rings: The Return of the King', 'Peter Jackson', 201);
INSERT INTO movies (id, title, director, duration) VALUES (uuid(), 'The Godfather', 'Francis Ford Coppola', 175);

NOTE: UUID ID is random so in the next step of inserting you will need to provide the exact UUID generated in your 
database (use the command "SELECT * FROM movies" and use chatgpt for creating the inserts);

NOTE: If you want to use diffrent date you need to change the date in the inserts and also inside the app.js code in line
277 (const testData = "2025-02-13 " + movieHour)

Example insert (change the movie_id)

INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(406f309f-105b-4b09-a37e-25789063d3b5, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(53811a3f-fc2b-4361-b165-506a184eea33, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(82992fcb-574e-4114-ad85-a090c2244db5, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(d8bcaee3-29b2-4bf5-a0f8-c9f46752a964, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(728ec59f-2c11-4730-a8d5-5d83a6a9039e, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(406f309f-105b-4b09-a37e-25789063d3b5, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(4604abe0-1cfb-4ecf-93ed-b2049ced434c, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(728ec59f-2c11-4730-a8d5-5d83a6a9039e, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(9882e661-afed-4ab0-95a4-57b10614a5a1, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(406f309f-105b-4b09-a37e-25789063d3b5, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(27c9b207-d21e-4563-94d5-1309b4ab5196, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(27c9b207-d21e-4563-94d5-1309b4ab5196, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(d8bcaee3-29b2-4bf5-a0f8-c9f46752a964, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(d8bcaee3-29b2-4bf5-a0f8-c9f46752a964, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(9882e661-afed-4ab0-95a4-57b10614a5a1, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(82992fcb-574e-4114-ad85-a090c2244db5, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(4604abe0-1cfb-4ecf-93ed-b2049ced434c, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(9882e661-afed-4ab0-95a4-57b10614a5a1, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(82992fcb-574e-4114-ad85-a090c2244db5, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(53811a3f-fc2b-4361-b165-506a184eea33, '2025-02-13 20:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(53811a3f-fc2b-4361-b165-506a184eea33, '2025-02-13 14:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(728ec59f-2c11-4730-a8d5-5d83a6a9039e, '2025-02-13 18:00', 100);
INSERT INTO screenings (movie_id, screening_time, available_seats) VALUES 
(4604abe0-1cfb-4ecf-93ed-b2049ced434c, '2025-02-13 20:00', 100);

For testing purpose we can just use allow filtering however i recommend indexing the data that we use.

Indexing that we need on specific columns for correct work of the application.

CREATE INDEX ON users (email);
CREATE INDEX ON users (username);

CREATE INDEX ON reservations (email);
CREATE INDEX ON reservations (username);

CREATE INDEX ON movies (title);
