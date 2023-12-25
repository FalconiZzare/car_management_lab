CREATE TABLE users
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    roleId INTEGER NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(id)
);