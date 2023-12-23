CREATE TABLE cars
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    makeId INTEGER NOT NULL,
    model VARCHAR(50) NOT NULL UNIQUE,
    rent INTEGER NOT NULL,
    photo VARCHAR(255) NOT NULL,
    isRented BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (makeId) REFERENCES makes(id)
);