USE prj20241114;
CREATE TABLE member
(
    id          VARCHAR(20) PRIMARY KEY,
    email       VARCHAR(300) UNIQUE,
    password    VARCHAR(30) NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);
SELECT *
FROM member;

DROP TABLE member;

ALTER TABLE member
    ADD COLUMN email VARCHAR(300) UNIQUE AFTER id;

DESC member;
SELECT *
FROM member;