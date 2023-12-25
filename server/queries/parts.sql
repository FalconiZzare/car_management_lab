CREATE TABLE parts
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    makeId INTEGER NOT NULL,
    model VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (makeId) REFERENCES makes(id)
);