CREATE TABLE BBY36_user (
    UID int NOT NULL AUTO_INCREMENT,
    username varchar(30),
    firstname varchar(15),
    lastname varchar(15),
    email varchar(30),
    password varchar(30),
    admin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (UID)
);

INSERT INTO BBY36_user (username, firstname, lastname, email, password, admin) VALUES ("admin", "Dongil", "Kwon", "dkwon5@bcit.ca", "admin", 1);

