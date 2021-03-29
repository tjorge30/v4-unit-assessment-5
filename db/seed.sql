-- CREATE TABLE helo_users (
-- id SERIAL PRIMARY KEY,
-- username VARCHAR NOT NULL,
-- password VARCHAR NOT NULL,
-- profile_pic TEXT
-- );

-- CREATE TABLE helo_posts (
-- id SERIAL PRIMARY KEY,
-- title VARCHAR (45) NOT NULL,
-- content TEXT,
-- img TEXT,
-- author_id INT 
--     REFERENCES helo_users (id),
-- date_created TIMESTAMP
-- );

-- INSERT INTO helo_users (username, password, profile_pic)
-- VALUES 
-- (dummy01, password123),
-- (dummy02, password321);

INSERT INTO helo_users(username, password)
VALUES 
('dummy01', 'password123'),
('dummy02', 'password321'),
('dummy03', 'password456');

INSERT INTO helo_users(username, password)
VALUES ('firstDummy', 'password123');