use `dandinpo_teamproject`;
create table customers ( 
        name varchar(50) NOT NULL,
        password varchar(50) NOT NULL,
        secret varchar(50) NOT NULL,
        primary key(name)
);
delete from customers;