--createdb blog

CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	username varchar(20) NOT NULL, --create index for username column
	password varchar(100) NOT NULL,
	email varchar(35) NOT NULL UNIQUE,
	"firstName" varchar(20) NOT NULL,
	"lastName" varchar(20) NOT NULL,
	bday date NOT NULL,
	"isVerified" boolean NOT NULL DEFAULT false,
	"createdAt" timestamp NOT NULL DEFAULT NOW(),
	CHECK (email LIKE '_%@_%._%')
);

CREATE TABLE sessions (
	"sessionId" varchar(100) PRIMARY KEY,
	"createdAt" timestamp NOT NULL DEFAULT NOW(),
	uid integer NOT NULL REFERENCES users(uid)
);

CREATE TABLE images (
	id SERIAL PRIMARY KEY,
	content bytea NOT NULL,
	"contentType" varchar(20) NOT NULL
);

CREATE TABLE users_about (
	uid integer PRIMARY KEY REFERENCES users(uid),
	"imgId" integer REFERENCES images(id),
	body varchar(1000) NOT NULL,
	"facebookLink" varchar(50),
	"instagramLink" varchar(50),
	"twitterLink" varchar(50)
);


CREATE TABLE posts (
	id BIGSERIAL PRIMARY KEY,
	title varchar(100) NOT NULL,
	body varchar(5000) NOT NULL,
	"imgId" integer REFERENCES images(id),
	"createdAt" timestamptz NOT NULL DEFAULT NOW(), 
	uid integer NOT NULL REFERENCES users(uid)
);

CREATE TABLE verify_tokens (
    token varchar(100) PRIMARY KEY,
    uid integer NOT NULL REFERENCES users(uid),
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);



/*---------------------------------------------------------------------- 
insert into users (username, password, fName, lName, email, bday)
values('DaniSoi','123456', 'Daniel', 'Soifer', 'dani@gmail.com', '1997-07-05')
;


INSERT INTO posts (title, body, postID, uid)
                     SELECT 'King daniel', 'Daniel is the king', '1', uid
                     FROM sessions WHERE session_id = 'eM4rB0ayUhZP+nvBBTyzNg==';
                     

INSERT INTO verify_tokens (token, uid) VALUES ('a', 3);
INSERT INTO verify_tokens (token, uid) VALUES ('b', 2);
INSERT INTO verify_tokens (token, uid) VALUES ('c', 1);
*/

