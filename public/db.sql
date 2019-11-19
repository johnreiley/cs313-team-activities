CREATE TABLE users
( id            SERIAL      PRIMARY KEY
, first_name    VARCHAR(60) NOT NULL
, last_name     VARCHAR(60) NOT NULL
, birth_date    DATE
);

CREATE TABLE relationships
( id            SERIAL      PRIMARY KEY
, child_id      INTEGER     REFERENCES users(id)
, father_id     INTEGER     REFERENCES users(id)
, mother_id     INTEGER     REFERENCES users(id)
);

--THE SMITH FAMILY--
--MOM: Martha
--DAD: George
--CHILD: Maria
INSERT INTO users (
 first_name
, last_name
, birth_date)
VALUES  (
  'Maria'
, 'Smith'
, '2000-01-01');

INSERT INTO users (
 first_name
, last_name
, birth_date)
VALUES  (
  'George'
, 'Smith'
, '1970-02-01');

INSERT INTO users (
 first_name
, last_name
, birth_date)
VALUES  (
  'Martha'
, 'Smith'
, '1975-03-01');

--Maria's Relationship
INSERT INTO relationships (
  child_id
, mother_id
, father_id)
VALUES (
  1
, 3
, 2
);



--COALESCE((SELECT user_id FROM users u WHERE u.user_id = r.mother_id AND u.first_name = 'Maria'), -1)