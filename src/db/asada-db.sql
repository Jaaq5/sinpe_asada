CREATE TABLE members (
    memberId INTEGER PRIMARY KEY,
    memberServiceNumber INTEGER UNIQUE CHECK(memberServiceNumber >= 400 AND memberServiceNumber <= 1300),
    memberName TEXT NOT NULL,
    memberLocation TEXT,
    memberPhoneNumber TEXT CHECK(length(memberPhoneNumber) = 8)
);

INSERT INTO members (memberServiceNumber, memberName, memberLocation, memberPhoneNumber)
VALUES (831, 'Ruben Quesada', 'Plaza', '85010535');
