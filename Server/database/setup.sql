use dandinpo_teamproject;

create table organizer (
	organizerId int primary key auto_increment,
    eventQuantity int not null default 0
);

create table event (
	organizerId int,
    name varchar(20) unique,
    discount double not null,
    date Datetime not null,
    primary key(organizerId,name),
    foreign key(organizerId)references organizer(organizerId) on delete cascade
);

create table coupon (
	code varchar(10),
    eventName varchar(20),
    category varchar(20) not null,
    date datetime not null,
    discount double not null,
    primary key(code,eventName),
    foreign key(eventName)references event(name) on delete cascade
);

create table admin (
	id int primary key auto_increment,
	organizerId int,
    userName varchar(20) unique not null,
    password varchar(20) not null,
    authority varchar(10) not null default "master",
    foreign key(organizerId)references organizer(organizerId) on delete set null
);

create table account ( 
	id int primary key auto_increment,
	adminId int,
	address varchar(50) not null,
	gender char(1) not null,
	rating int default 0,
	phone char(10) not null unique,
	email varchar(30) not null unique,
	password varchar(20) not null,
	userName varchar(20) not null unique,
	name varchar(20) not null,
    foreign key (adminId)references admin(id)on delete set null
);

create table customer (
	id int primary key,
    paymentInfo varchar(20) default "現金",
    foreign key(id)references account(id)on delete cascade
);

create table have (
	customerId int,
    couponCode varchar(10),
    quantity int not null,
    primary key(customerId,couponCode),
    foreign key(customerId)references customer(id)on delete cascade,
    foreign key(couponCode)references coupon(code)on delete cascade
);

create table business (
	id int primary key,
    organizerId int,
    description varchar(100) default "",
    logo varchar(100) default "image/1.jpg",
    foreign key(id)references account(id)on delete cascade,
    foreign key(organizerId)references organizer(organizerId) on delete set null
);

create table product (
	no int primary key auto_increment,
	businessId int,
    description varchar(100),
    name varchar(30) not null unique,
    price int not null,
    launch boolean default True not null,
    status char(1) not null,
    category varchar(20) not null,
    rating int default 0,
    image varchar(100),
    uploadedDate datetime not null,
    foreign key(businessId)references business(id)on delete cascade
);

create table product_comment (
    productId int,
    customerId int,
    orderNo int,
    star int default 0 not null,
    comment varchar(30),
    primary key(productId,customerId,orderNo),
    foreign key(productId)references product(no)on delete cascade,
    foreign key(customerId)references customer(id) on delete cascade,
    foreign key(orderNo)references orders(orderNo) on delete cascade
);

create table orders (
	 orderNo int primary key auto_increment,
     customerId int,
     orderDate datetime not null,
     arrivalDate datetime,
     quantity int not null,
     status varchar(20) not null default "未出貨",
     foreign key (customerId) references account(id) on delete cascade
);

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
