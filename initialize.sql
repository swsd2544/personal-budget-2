CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(255) NOT NULL,
    gender varchar(50) NOT NULL
);

CREATE TABLE envelopes (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    name varchar(50) NOT NULL,
    amount numeric NOT NULL,
    created_at timestamp NOT NULL
);

CREATE TABLE envelopes (
    id serial PRIMARY KEY,
    envelope_id integer REFERENCES envelopes(id),
    amount numeric NOT NULL,
    description varchar(255),
    created_at timestamp NOT NULL
);