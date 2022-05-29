CREATE TABLE IF NOT EXISTS BBY36_user (
        UID int NOT NULL AUTO_INCREMENT,
        username varchar(30),
        email varchar(30),
	address varchar(30),
        password varchar(30),
        admin BOOLEAN NOT NULL DEFAULT 0,
        PRIMARY KEY (UID)
);

CREATE TABLE bby36_donations (
    donation_ID int NOT NULL AUTO_INCREMENT,
    bakery_ID int NOT NULL,
    organization_ID int,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    location VARCHAR(50) NOT NULL,
    picture VARCHAR(100),
    status int NOT NULL DEFAULT 0,
    donated_date VARCHAR(20) NOT NULL,
    delivered_date VARCHAR(20),
    PRIMARY KEY (donation_ID),
    FOREIGN KEY (bakery_ID) REFERENCES bby36_user(UID) ON DELETE CASCADE,
    FOREIGN KEY (organization_ID) REFERENCES bby36_user(UID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS BBY36_cart (
            buyer_ID int NOT NULL,
            item_ID int NOT NULL,
            PRIMARY KEY (buyer_ID, item_ID),
            FOREIGN KEY (buyer_ID) REFERENCES BBY36_user(UID) ON DELETE CASCADE,
            FOREIGN KEY (item_ID) REFERENCES BBY36_donations(donation_ID) ON DELETE CASCADE
);

INSERT INTO BBY36_user (username, email, address, password, admin) VALUES("admin", "dkwon5@bcit.ca", "1000 Admin St", "admin", 1);

INSERT INTO BBY36_user (username, email, address, password, admin) VALUES("test1", "test@test.com", "900 Test St", "test123", 0);