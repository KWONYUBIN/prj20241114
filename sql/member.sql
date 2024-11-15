USE prj20241114;
CREATE TABLE member
(
    id          VARCHAR(20) PRIMARY KEY,
    password    VARCHAR(30) NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);

SELECT *
FROM member