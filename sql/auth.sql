USE prj20241114;
CREATE TABLE auth
(
    member_id VARCHAR(20) REFERENCES member (id),
    auth      VARCHAR(20) NOT NULL,
    PRIMARY KEY (member_id, auth)
);

#
INSERT INTO auth (member_id, auth)
VALUES ('trump', 'admin');
INSERT INTO auth (member_id, auth)
VALUES ('trump', 'manager');

DESC member;