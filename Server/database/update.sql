use dandinpo_teamproject;

/*
delete from coupon;
alter table coupon add column organizerId int;
alter table coupon drop primary key,add primary key(code,eventName,organizerId);
insert into coupon(code,eventName,organizerId,date,discount,maxQuantity)
values
("XMAS88","聖誕節全館95折",1,"2021-12-30",0.88,2),
("STUDY77","本館學術書籍85折",2,"2021-12-29",0.77,2),
("HAPPY69","同人小說跳樓折價75折",3,"2021-12-28",0.69,3);*/

alter table have add column organizerId int;
alter table have add column eventName varchar(20);
alter table have drop primary key,add primary key(customerId,couponCode,organizerId,eventName);

delete from have;
insert into have(customerId,couponCode,organizerId,eventName,quantity)
values
(1,"XMAS88",1,"聖誕節全館95折",2),
(3,"HAPPY69",3,"同人小說跳樓折價75折",3);

