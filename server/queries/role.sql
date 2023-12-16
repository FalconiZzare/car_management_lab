CREATE TABLE roles
(
    id INTEGER PRIMARY KEY,
    role VARCHAR(10) NOT NULL UNIQUE
);

INSERT INTO roles VALUES
(1, 'Admin'),
(2, 'Client');