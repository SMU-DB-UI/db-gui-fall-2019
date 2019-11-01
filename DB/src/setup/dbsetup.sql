-- TABLE REMOVAL --

DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employee_history;
DROP TABLE IF EXISTS perf_reviews;
DROP TABLE IF EXISTS employees;


-- TABLE CREATION --
CREATE TABLE departments(
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE employees(
    id int primary key, 
    fname varchar(50) NOT null,
    lname varchar(50) NOT null,
    dep_id int,
    pos varchar(50) NOT null,
    manager int,
    addr varchar(100),
    phn_num varchar(50),
    rating int,
    strikes int
);

CREATE TABLE reports(
    id int primary key,
    by_emp_id int not null,
    for_emp_id int not null,
    report TEXT not null,
    creation_date VARCHAR(50) not null,
    status varchar(50) not null,
    severity int not null,
    foreign key (by_emp_id) references employees(id),
    foreign key (for_emp_id) references employees(id)
);

CREATE TABLE employee_history(
    id int primary key, 
    position varchar(50) not null,
    date_began VARCHAR(50) not null,
    foreign key (id) references employees(id)
);

CREATE TABLE perf_reviews(
    id int primary key,
    emp_id int not null,
    review TEXT not null,
    score int not null,
    creation_date VARCHAR(50) not null,
    foreign key (emp_id) references employees(id)
);

-- SAMPLE DATA INSERTION --

INSERT INTO departments VALUES(1, 'Computer Science');

INSERT INTO employees VALUES
    (1, 'mark', 'fontenot', 1, 'prof', null, 'address', 214, 5, 0),
    (2, 'Marcus', 'Sykora', 1, 'Student', '1', 'address', 214, 5, 0);