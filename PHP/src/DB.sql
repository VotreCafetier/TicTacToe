DROP DATABASE IF EXISTS testphp;
CREATE DATABASE testphp;
USE testphp;
CREATE TABLE `User` (
    USERID INT AUTO_INCREMENT NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Win INT NOT NULL DEFAULT 0,
    Lose INT NOT NULL DEFAULT 0,
    Draw INT NOT NULL DEFAULT 0,
    DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LastLogin TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LastNameUpdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (USERID)
);

-- CREATE TABLE `ChatRoom` (
--     CHATROOMID INT AUTO_INCREMENT NOT NULL,
--     USERID INT NOT NULL,
--     Message TEXT NOT NULL,
--     TimeSent DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (CHATROOMID),
--     CONSTRAINT FK_USERID_ChatRoom FOREIGN KEY (USERID)
--     REFERENCES User(USERID),
--     INDEX (USERID)
-- );

-- CREATE TABLE `Lobby` (
--     LOBBYID INT AUTO_INCREMENT NOT NULL,
--     CHATROOMID INT NOT NULL,
--     DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     LastUpdated DATETIME NOT NULL ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (LOBBYID),
--     CONSTRAINT FK_CHATROOMID_Lobby FOREIGN KEY (CHATROOMID)
--     REFERENCES ChatRoom(CHATROOMID),
--     INDEX (CHATROOMID)
-- );

-- CREATE TABLE `Participants` (
--     LOBBYID INT NOT NULL,
--     USERID INT NOT NULL,
--     PRIMARY KEY (LOBBYID, USERID),
--     CONSTRAINT FK_LOBBYID_Participants FOREIGN KEY (LOBBYID)
--     REFERENCES Lobby(LOBBYID),
--     CONSTRAINT FK_USERID_Participants FOREIGN KEY (USERID)
--     REFERENCES User(USERID),
--     INDEX (LOBBYID, USERID)
-- );