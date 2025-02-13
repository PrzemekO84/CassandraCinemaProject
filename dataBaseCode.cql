CREATE TABLE IF NOT EXISTS users (
id UUID PRIMARY KEY, 
username TEXT, 
email TEXT, 
password TEXT, 
joindate DATE);


CREATE TABLE screenings (
    movie_id UUID,
    screening_time TEXT,
    available_seats INT,
    PRIMARY KEY ((movie_id), screening_time)
);
