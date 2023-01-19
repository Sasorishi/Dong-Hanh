drop database if exists thac;
create database thac;
use thac;

create table users
(
    id varchar(36) not null primary key,
    email varchar(50) not null,
    password varchar(50) not null,
    createdDate datetime not null
);

create table camps
(
    id varchar(36) not null primary key,
    label varchar(45) not null,
    place varchar(80) not null,
    location varchar(80) not null,
    year int(5) not null,
    date datetime not null
);

create table participants
(
    id varchar(36) not null primary key,
    firstname varchar(45) not null,
    lastname varchar(45) not null,
    phone varchar(35) not null,
    email varchar(50) not null,
    age int(3) not null,
    address varchar(50) not null,
    country varchar(50) not null,
    agreements boolean not null,
    idCamp varchar(36) not null,
    idUser varchar(36) not null,
    foreign key(idCamp) references camps(id),
    foreign key(idUser) references users(id)
);

create table emergency
(
    id varchar(36) not null primary key,
    firstname varchar(45) not null,
    lastname varchar(45) not null,
    phone varchar(35) not null,
    email varchar(50) not null,
    idUser varchar(36) null,
    foreign key(idUser) references users(id)
);

create table tickets
(
    id varchar(36) not null primary key,
    price int(4) not null,
    idCamp varchar(36) not null,
    idParticipant varchar(36) not null,
    foreign key(idCamp) references camps(id),
    foreign key(idParticipant) references participants(id)
);

insert into user(id, email, password, createdDate)
values (UUID(), 'on_alban@yahoo.fr', '357890', NOW());