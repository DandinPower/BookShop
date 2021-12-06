use dandinpo_teamproject;
create table account ( 
	id int primary key auto_increment,
	adminId int,
	address varchar(50) not null,
	gender char(1) not null,
	rating int default 0,
	phone char(10) not null,
	email varchar(30) not null unique,
	password varchar(20) not null,
	userName varchar(20) not null unique,
	name varchar(20) not null
);

create table product (
	no int primary key auto_increment,
	businessId int,
    description varchar(100),
    name varchar(30) not null,
    price int not null,
    status char(1) not null,
    category varchar(20) not null,
    rating int default 0,
    image varchar(100),
    uploadedDate Date not null
);

create table business (
	id int primary key,
    description varchar(100) default "",
    logo varchar(100) default "image/1.jpg",
    foreign key(id)references account(id)on delete cascade
);
alter table product add foreign key(businessId)references business(id)on delete cascade;

create table customer (
	id int primary key,
    paymentInfo varchar(20) default "現金",
    foreign key(id)references account(id)on delete cascade
);

create table orders (
	 orderNo int primary key auto_increment,
     customerId int,
     orderDate Date not null,
     arrivalDate Date,
     quantity int not null,
     status varchar(20) not null default "未出貨",
     foreign key (customerId) references account(id) on delete cascade
);
describe orders;


create table manage (
	businessId int,
    orderNo int,
    productId int,
    primary key(businessId,orderNo,productId),
    foreign key(businessId)references business(id)on delete cascade,
    foreign key(orderNo)references orders(orderNo)on delete cascade,
    foreign key(productId)references product(no)on delete cascade
);

create table product_list (
	customerId int,
    productId int,
    quantity int not null default 1,
    primary key(customerId,productId),
    foreign key(customerId)references customer(id)on delete cascade,
    foreign key(productId)references product(no)on delete cascade
);

insert into account (address,gender,phone,email,password,userName,name) value ("235新北市中和區景新街347號","1","0912733812","pchome.gmail.com","secret1234","pchome","Pchome24H店家");
insert into business (id,description,logo) value ((SELECT LAST_INSERT_ID()),"pchome在克萊柏的帳號","image/logo/pchome.png");

insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述物理學歷史","你應該擁有的一本牛頓萬有引力",1099,"1","物理","image/product/picture2.jpg","2021-11-30");
insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述電子學的知識","電子學概論",999,"1","電類","image/product/picture3.jpg","2021-11-28");
insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述基本電學的知識","基本電學概論",890,"1","電類","image/product/picture1.jpg","2021-11-29");
insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"無敵的主角","穿越異世界",890,"0","小說","image/picture4.jpg","2021-12-3");
select * from product;
delete from product_list;

select * from customer;
select * from product_list;
select * from product;
select P.no as productId,A.name as businessName,P.name,P.price,P.image,PL.quantity
                    from product as P,account as A,customer as C,product_list as PL 
                    where PL.customerId = 17 and PL.customerId = C.id and PL.productId = P.no and A.id = P.businessId;
select A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,C.paymentInfo from account as A,customer as C where A.id = C.id;
select A.userName,A.password as userPassword,A.name,A.gender,A.email,A.phone,A.address,B.description,B.logo from account as A,business as B where A.id = B.id;
select businessId from product where no = 5;

select * from manage;
select * from orders;
delete from orders;
describe account;




select P.price,P.name,O.quantity,O.status,O.orderDate,O.arrivalDate from product as P,orders as O,manage as M,customer as C where P.no = M.productId and O.orderNo = M.orderNo and O.customerId = 17 and C.id = O.customerId;