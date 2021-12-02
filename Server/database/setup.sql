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
        name varchar(20) not null,
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
    description varchar(100),
    logo varchar(100) not null,
    foreign key(id)references account(id)on delete cascade
);

alter table product add foreign key(businessId)references business(id)on delete cascade;

insert into account (address,gender,phone,email,password,userName,name) value ("235新北市中和區景新街347號","1","0912733812","pchome.gmail.com","secret1234","pchome","Pchome24H店家");
insert into business (id,description,logo) value ((SELECT LAST_INSERT_ID()),"pchome在克萊柏的帳號","image/logo/pchome.png");

insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述物理學歷史","你應該擁有的一本牛頓萬有引力",1099,"1","物理","image/product/picture2.jpg","2021-11-30");
insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述電子學的知識","電子學概論",999,"1","電類","image/product/picture3.jpg","2021-11-28");
insert into product (businessId,description,name,price,status,category,image,uploadedDate) value (2,"講述基本電學的知識","基本電學概論",890,"1","電類","image/product/picture1.jpg","2021-11-29");