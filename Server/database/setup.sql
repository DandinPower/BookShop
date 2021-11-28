use `dandinpo_teamproject`;
create table account ( 
        adminId int,
        address varchar(50) not null,
        gender char(1) not null,
        rating int default 0,
        phone char(10) not null,
        email varchar(30) not null,
        password varchar(20) not null,
        username varchar(20) not null,
        name varchar(20) not null,
        token varchar(20),
        primary key(username)
);