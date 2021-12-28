use dandinpo_teamproject;

insert into admin (userName,password,authority) values
("admin1","123","all"),
("admin2","123","event"),
("admin3","123","account");

insert into account (address,gender,phone,email,password,userName,name) value ("台南市安平區87號","0","0912345678","tom@gmail.com","123","customer1","Liaw");
insert into customer (id) value ((select last_insert_id()));
insert into account (address,gender,phone,email,password,userName,name) value ("台北市中正區古亭站","1","0987878787","ban@yahoo.com.tw","123","customer2","Bananachen");
insert into customer (id) value ((select last_insert_id()));
insert into account (address,gender,phone,email,password,userName,name) value ("台北市中山區松江南路","0","0983657382","chickenrice@hotmail.com","123","customer3","LiYongChi");
insert into customer (id) value ((select last_insert_id()));
insert into account (address,gender,phone,email,password,userName,name) value ("台北市信義區123號","0","0968263743","nohair@gmail.com","123","business1","Aup");
insert into business (id) value ((select last_insert_id()));
insert into account (address,gender,phone,email,password,userName,name) value ("台北市萬華區摸摸茶","1","0964829156","holipoter@nogigi.com","123","business2","LiuYeanLin");
insert into business (id) value ((select last_insert_id()));
insert into account (address,gender,phone,email,password,userName,name) value ("窩不知道我住哪Peko","0","0983657256","handsome@yahoo.com","123","business3","ShenPon");
insert into business (id) value ((select last_insert_id()));

insert into product (businessId,description,name,price,status,category,uploadedDate)
values 
(4,"講述物理學歷史","你應該擁有的一本牛頓萬有引力",1099,"1","物理","2021-11-30"),
(5,"講述電子學的知識","電子學概論",999,"1","電類","2021-11-28"),
(5,"講述基本電學的知識","基本電學概論",890,"1","電類","2021-11-29"),
(6,"無敵的主角","穿越異世界",890,"0","小說","2021-12-3");

insert into product_list(customerId,productId)
values
(1,1),
(1,2),
(1,3),
(2,4);

insert into organizer()values
(),
(),
();

update admin set organizerId = 1 where id = 2;
update business set organizerId = 2 where id = 4;
update business set organizerId = 3 where id = 5;

insert into event(organizerId,name,discount,date)
values
(1,"聖誕節全館95折",0.95,"2021-12-31"),
(2,"本館學術書籍85折",0.85,"2021-12-30"),
(3,"同人小說跳樓折價75折",0.75,"2021-12-29");

insert into coupon(code,eventName,organizerId,date,discount,maxQuantity)
values
("XMAS88","聖誕節全館95折",1,"2021-12-30",0.88,2),
("STUDY77","本館學術書籍85折",2,"2021-12-29",0.77,2),
("HAPPY69","同人小說跳樓折價75折",3,"2021-12-28",0.69,3);


insert into have(customerId,couponCode,quantity)
values
(1,"XMAS88",2),
(2,"STUDY77",2),
(3,"HAPPY69",3);

insert into orders(customerId,orderDate,quantity)value(1,"2021-12-8",3);
insert into manage(businessId,orderNo,productId)value(4,(select last_insert_id()),2);
insert into orders(customerId,orderDate,quantity)value(2,"2021-12-8",2);
insert into manage(businessId,orderNo,productId)value(5,(select last_insert_id()),3);
insert into orders(customerId,orderDate,quantity)value(3,"2021-12-8",1);
insert into manage(businessId,orderNo,productId)value(6,(select last_insert_id()),4);

insert into product_comment(productId,customerId,orderNo,star,comment) value(4,3,3,5,"好書推薦");