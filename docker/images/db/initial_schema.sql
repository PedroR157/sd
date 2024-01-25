/* Sample table and data that we can insert once the database is created for the first time */
CREATE TABLE public.users (
	name    VARCHAR (100),
	email    VARCHAR(100),
	password VARCHAR(50),
	created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users(name, email) VALUES('Luís Teófilo', 'Porto');

-- INSERT INTO teachers(name, city) VALUES('Luís Teófilo', 'Porto');
-- INSERT INTO teachers(name, city) VALUES('Ricardo Castro', 'Braga');