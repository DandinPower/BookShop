use dandinpo_teamproject;

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

insert into product (businessId,description,name,price,status,category,image,uploadedDate)
values 
(4,"講述物理學歷史","你應該擁有的一本牛頓萬有引力",1099,"1","物理","image/product/picture2.jpg","2021-11-30"),
(5,"講述電子學的知識","電子學概論",999,"1","電類","image/product/picture3.jpg","2021-11-28"),
(5,"講述基本電學的知識","基本電學概論",890,"1","電類","image/product/picture1.jpg","2021-11-29"),
(6,"無敵的主角","穿越異世界",890,"0","小說","image/picture4.jpg","2021-12-3");

