Create database store;
use store;

Create table users (
id int primary key not null,
user varchar(50) not null,
password varchar(255) not null,
date_registration datetime default now(),
rol enum('admin', 'customer') default 'customer',
last_connection datetime 
);

create table products (
id varchar(50) primary key not null,
name varchar(100) not null,
price decimal(10,2) not null,
qty int default 0,
description text
);

create table orders (
id varchar(50) primary key not null,
id_user int not null,
total_price decimal(10,2) not null,
order_date datetime default now(),
foreign key(id_user) references users(id)
);

create table order_details (
id varchar(50) primary key not null,
id_order varchar(50) not null,
id_product varchar(50) not null,
qty int not null,
individual_price decimal(10,2) not null,
foreign key (id_order) references orders(id),
foreign key (id_product) references products(id)
);

show tables;
describe users;
describe products;
describe orders;
describe order_details;