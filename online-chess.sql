CREATE DATABASE online_chess_db;

USE online_chess_db;

-- Tables
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE user_info(
    user_id INT,
    user_rank ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'beginner',
    user_points INT DEFAULT 1000,
    CONSTRAINT userID FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Procedures
DELIMITER $$
CREATE PROCEDURE createUser(
    IN _username VARCHAR(255),
    IN _email VARCHAR(255),
    IN _password VARCHAR(255)
)
BEGIN
    DECLARE userId INT;

    INSERT INTO users(username, email, password) VALUES(_username, _email, _password);
    SELECT id INTO userId FROM users WHERE username=_username;
    INSERT INTO user_info(user_id) VALUES(userId);
END $$
DELIMITER ;

