use dandinpo_teamproject;

/*
delete from coupon;
alter table coupon add column organizerId int;
alter table coupon drop primary key,add primary key(code,eventName,organizerId);
insert into coupon(code,eventName,organizerId,date,discount,maxQuantity)
values
("XMAS88","聖誕節全館95折",1,"2021-12-30",0.88,2),
("STUDY77","本館學術書籍85折",2,"2021-12-29",0.77,2),
("HAPPY69","同人小說跳樓折價75折",3,"2021-12-28",0.69,3);

alter table have add column organizerId int;
alter table have add column eventName varchar(20);
alter table have drop primary key,add primary key(customerId,couponCode,organizerId,eventName);

delete from have;
insert into have(customerId,couponCode,organizerId,eventName,quantity)
values
(1,"XMAS88",1,"聖誕節全館95折",2),
(3,"HAPPY69",3,"同人小說跳樓折價75折",3);
SET FOREIGN_KEY_CHECKS=0;
drop table have;
drop table coupon;
drop table event;
SET FOREIGN_KEY_CHECKS=1;

create table event (
	organizerId int,
    name varchar(20),
    date Datetime not null,
    primary key(name),
    foreign key(organizerId)references organizer(organizerId) on delete cascade
);

create table coupon (
	code varchar(10),
    eventName varchar(20),
    date datetime not null,
    discount double not null,
    maxQuantity int not null,
    primary key(code),
	foreign key(eventName)references event(name)on delete cascade
);

create table have (
	customerId int,
    couponCode varchar(10),
    quantity int not null,
    primary key(customerId,couponCode),
    foreign key(couponCode)references coupon(code)on delete cascade,
    foreign key(customerId)references customer(id)on delete cascade
);

insert into event(organizerId,name,date)
values
(1,"聖誕節全館95折","2021-12-31"),
(2,"本館學術書籍85折","2021-12-30"),
(3,"同人小說跳樓折價75折","2021-12-29");

insert into coupon(code,eventName,date,discount,maxQuantity)
values
("XMAS88","聖誕節全館95折","2021-12-30",0.88,2),
("STUDY77","本館學術書籍85折","2021-12-29",0.77,2),
("HAPPY69","同人小說跳樓折價75折","2021-12-28",0.69,3);

insert into have(customerId,couponCode,quantity)
values
(1,"XMAS88",2),
(2,"STUDY77",2),
(3,"HAPPY69",3);

alter table product drop column image;
alter table account drop foreign key account_ibfk_1;
alter table account drop column adminId;

alter table orders add column discount double;
alter table orders modify column discount double default 1 not null;

delete from manage;
delete from orders;
insert into orders(customerId,orderDate,quantity,discount)value(1,"2021-12-8",3,0.99);
insert into manage(businessId,orderNo,productId)value(4,(select last_insert_id()),2);
insert into orders(customerId,orderDate,quantity,discount)value(2,"2021-12-8",2,1);
insert into manage(businessId,orderNo,productId)value(5,(select last_insert_id()),3);
insert into orders(customerId,orderDate,quantity,discount)value(3,"2021-12-8",1,0.77);
insert into manage(businessId,orderNo,productId)value(6,(select last_insert_id()),4);

alter table coupon add column description varchar(100);*/

set SQL_SAFE_UPDATES = 0;

alter table orders add column address varchar(50) not null,add column paymentInfo varchar(20) default "現金" not null;
delete from manage;
delete from orders;
insert into orders(customerId,orderDate,quantity,discount,address,paymentInfo)value(1,"2021-12-8",3,0.99,"台北市古亭區","現金");
insert into manage(businessId,orderNo,productId)value(4,(select last_insert_id()),2);
insert into orders(customerId,orderDate,quantity,discount,address,paymentInfo)value(2,"2021-12-8",2,1,"新北市三峽區","現金");
insert into manage(businessId,orderNo,productId)value(5,(select last_insert_id()),3);
insert into orders(customerId,orderDate,quantity,discount,address,paymentInfo)value(3,"2021-12-8",1,0.77,"台灣總統府","信用卡");
insert into manage(businessId,orderNo,productId)value(6,(select last_insert_id()),4);

