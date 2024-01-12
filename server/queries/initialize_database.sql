CREATE DATABASE car_management;

USE car_management;

CREATE TABLE roles
(
    id INTEGER PRIMARY KEY,
    role VARCHAR(10) NOT NULL UNIQUE
);

INSERT INTO roles VALUES
(1, 'Admin'),
(2, 'Client');

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

INSERT INTO users (fname, lname, username, password, email, roleId) VALUES
('Talat', 'Mahmud', 'FalconiZzare', '123456', 'talat@octopi.ai', 1);

CREATE TABLE makes
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    make VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE cars
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    makeId INTEGER NOT NULL,
    model VARCHAR(50) NOT NULL,
    rent INTEGER NOT NULL,
    photo VARCHAR(255) NOT NULL,
    state VARCHAR(255) DEFAULT 'Looks Like New',
    isRented BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (makeId) REFERENCES makes(id)
);

CREATE TABLE parts
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    makeId INTEGER NOT NULL,
    model VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (makeId) REFERENCES makes(id)
);

CREATE TABLE rents
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER NOT NULL,
    carId INTEGER NOT NULL UNIQUE,
    rentDate DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (carId) REFERENCES cars(id)
);