CREATE TABLE "user"
(
    user_id SERIAL CONSTRAINT user_pk PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    patronymic VARCHAR(30),
    last_name VARCHAR(30) NOT NULL,
    birthday DATE,
    nickname VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    sex SMALLINT,
    avatar_path TEXT
);

CREATE TABLE locality
(
    locality_id SERIAL CONSTRAINT locality_pk PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


CREATE TABLE street
(
    street_id SERIAL CONSTRAINT street_pk PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    locality_id INTEGER NOT NULL CONSTRAINT street_locality_fk REFERENCES locality
);

CREATE TABLE building
(
    building_id SERIAL CONSTRAINT building_pk PRIMARY KEY,
    number INTEGER NOT NULL,
    street_id INTEGER NOT NULL CONSTRAINT building_street_fk REFERENCES street
);

CREATE TABLE hometown_association
(
    hometown_association_id SERIAL CONSTRAINT hometown_association_pk PRIMARY KEY,        
    name VARCHAR(30) NOT NULL
);

CREATE TABLE apartment
(
    apartment_id SERIAL CONSTRAINT apartment_pk PRIMARY KEY,
    building_id INTEGER NOT NULL CONSTRAINT apartment_building_fk REFERENCES building,
    number INTEGER NOT NULL,
    hometown_association_id INTEGER NOT NULL CONSTRAINT apartment_hometown_association_fk REFERENCES hometown_association,
    aread NUMERIC NOT NULL
);

CREATE TABLE resident_type
(
    resident_type_id SERIAL CONSTRAINT resident_type_pk PRIMARY KEY,
    name VARCHAR(15) NOT NULL
);

CREATE TABLE user_apartment
(
    user_id INTEGER NOT NULL CONSTRAINT user_apartment_user_fk REFERENCES "user",
    apartment_id INTEGER NOT NULL CONSTRAINT user_apartment_apartment_fk REFERENCES apartment,
    resident_type_id INTEGER NOT NULL CONSTRAINT user_apartment_resident_type_null_fk REFERENCES resident_type,
    CONSTRAINT user_apartment_pk PRIMARY KEY (user_id, apartment_id)
);

INSERT INTO resident_type (name)
VALUES ('собственник'), ('член правления'), ('председатель');