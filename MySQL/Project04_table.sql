USE PROJECT04;

DROP TABLE USER;
CREATE TABLE USER(
	USER_ID BIGINT AUTO_INCREMENT,
    USERNAME VARCHAR(50) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL UNIQUE,
    -- PHONE_NUMBER VARCHAR(20) NOT NULL,
    POSTCODE VARCHAR(10) NOT NULL,
    ADDRESS VARCHAR(255) NOT NULL,
    DETAIL_ADDRESS VARCHAR(255),
    EXTRA_ADDRESS VARCHAR(255),
    ROLE VARCHAR(20) DEFAULT 'USER' NOT NULL,
    
    PRIMARY KEY(USER_ID)
);
SELECT * FROM USER;