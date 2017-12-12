DROP DATABASE IF EXISTS installers_db;
CREATE DATABASE installers_db;
USE installers_db;

set foreign_key_checks=0;

CREATE TABLE user_roles(
user_role_id MEDIUMINT NOT NULL AUTO_INCREMENT,
user_role_name CHAR(75) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (user_role_id)
);

CREATE TABLE change_orders (
change_orders_id MEDIUMINT NOT NULL AUTO_INCREMENT,
fk_original_job_id MEDIUMINT,
fk_change_job_id MEDIUMINT,
PRIMARY KEY (change_orders_id),
	FOREIGN KEY (fk_original_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_change_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE users(
user_id MEDIUMINT NOT NULL AUTO_INCREMENT,
user_name CHAR(75) NOT NULL,
password CHAR(20) NOT NULL,
token CHAR(20),
fk_user_role_id MEDIUMINT,
PRIMARY KEY (user_id),
	FOREIGN KEY (fk_user_role_id)
	REFERENCES installers_db.user_roles (user_role_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE installers(
installer_id MEDIUMINT NOT NULL AUTO_INCREMENT,
first_name CHAR(50) NOT NULL,
last_name  CHAR(50) NOT NULL,
current_wage DOUBLE(25,2) NOT NULL,
fk_user_id MEDIUMINT,
fk_installer_role_id MEDIUMINT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (installer_id),
	FOREIGN KEY (fk_user_id)
	REFERENCES installers_db.users (user_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
    FOREIGN KEY (fk_installer_role_id)
	REFERENCES installers_db.installer_roles (installer_role_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE installer_roles(
installer_role_id MEDIUMINT NOT NULL AUTO_INCREMENT,
installer_role_name CHAR(75) NOT NULL,
role_weight DOUBLE(10,5) NOT NULL,
min_base DOUBLE(10,2) NOT NULL,
max_base DOUBLE(10,2) NOT NULL,
individual_bonus DOUBLE(5,4) NOT NULL,
team_bonus DOUBLE(5,4) NOT NULL,
bonus_weight DOUBLE(5,4) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (installer_role_id)
);

CREATE TABLE installer_hours(
installers_hours_id MEDIUMINT NOT NULL AUTO_INCREMENT,
reg_hours_worked DOUBLE(10,2),
ot_hours_worked DOUBLE(10,2),
work_date DATE,
fk_job_id MEDIUMINT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (installers_hours_id),
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE installer_payments(
payment_id MEDIUMINT NOT NULL AUTO_INCREMENT,
date_paid DATE,
scheduled_pay_date DATE,
fk_payment_type_id MEDIUMINT,
fk_job_id MEDIUMINT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (payment_id),
	FOREIGN KEY (fk_payment_type_id)
	REFERENCES installers_db.payment_types (payment_type_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE payment_types(
payment_type_id MEDIUMINT NOT NULL AUTO_INCREMENT,
payment_type CHAR(75),
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (payment_type_id)
);

CREATE TABLE jobs(
job_id MEDIUMINT NOT NULL AUTO_INCREMENT,
job_name CHAR(255) NOT NULL,
start_date DATE,
end_date DATE,
hours_bid DOUBLE(25,2),
est_start_date DATE,
est_end_date DATE,
fk_customer_id MEDIUMINT,
bill_rate DOUBLE(7,2) NOT NULL,
job_status CHAR(255) NOT NULL DEFAULT "Open",
max_labor_cost DOUBLE(5,2) DEFAULT 43.5 NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (job_id),
    FOREIGN KEY (fk_customer_id)
	REFERENCES installers_db.customers (customer_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE bonuses(
bonus_id MEDIUMINT NOT NULL AUTO_INCREMENT,
production_min DOUBLE(5,2) NOT NULL,
production_max DOUBLE(5,2) NOT NULL,
bonus_weight DOUBLE(5,2) NOT NULL,
fk_job_id MEDIUMINT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (bonus_id),
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE jobs_installers(
job_installer_id MEDIUMINT NOT NULL AUTO_INCREMENT,
hours_bid MEDIUMINT NOT NULL,
wage DOUBLE(25,2),
fk_job_id MEDIUMINT NOT NULL ,
fk_installer_id MEDIUMINT NOT NULL,
fk_installer_role_id MEDIUMINT NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (job_installer_id),
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_installer_id)
	REFERENCES installers_db.installers (installer_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_installer_role_id)
	REFERENCES installers_db.installer_rolls (installer_roll_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE customers(
customer_id MEDIUMINT NOT NULL AUTO_INCREMENT,
customer_name CHAR(50) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id MEDIUMINT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id MEDIUMINT,
PRIMARY KEY (customer_id)
);

ALTER TABLE installers AUTO_INCREMENT=10001;
ALTER TABLE installer_roles AUTO_INCREMENT=101;
ALTER TABLE jobs AUTO_INCREMENT=50001;
ALTER TABLE bonuses AUTO_INCREMENT=501;
ALTER TABLE jobs_installers AUTO_INCREMENT=1000001;

INSERT INTO users(user_name, password) VALUES("Admin", "1234");

INSERT INTO payment_types(created_by_id, modified_by_id, payment_type) VALUES(1, 1, "team_bonus_1"),(1, 1, "team_bonus_2"),(1, 1, "team_bonus_3"),(1, 1, "team_bonus_4"),(1, 1, "Indvidual_bonus_1"),(1, 1, "Indvidual_bonus_2"),(1, 1, "Indvidual_bonus_3"),(1, 1, "Indvidual_bonus_4"),(1, 1, "base_wage");

INSERT INTO jobs(created_by_id, modified_by_id, job_name, start_date, end_date, bill_rate, max_labor_cost) VALUES(1, 1, "Samuel Iuka","2017-10-10","2017-11-04",65,43.5),(1, 1, "Samuel Wisconsin","2017-10-17","2017-11-04",65,43.5);

INSERT INTO bonuses(created_by_id, modified_by_id, production_min, production_max, bonus_weight) VALUES(1, 1, 69.99,0.00,0.75),(1, 1, 79.99,70,0.55),(1, 1, 89.99,80,0.35),(1, 1, 99.99,90,0.25),(1, 1, 109.99,100,0.15);

INSERT INTO installers(created_by_id, modified_by_id, first_name, last_name, current_wage, fk_installer_role_id) VALUES(1, 1, "Sam","Fisher",17.5,105),(1, 1, "Tom","Schulze",17.5,106);

INSERT INTO installer_roles(created_by_id, modified_by_id, installer_role_name, role_weight, min_base, max_base, individual_bonus, team_bonus, bonus_weight) VALUES(1, 1, "Field Operations Manager",1.25,20,27.5,0.25,0.75,1),(1, 1, "Sr. Project Manager",1.2,18.50,22.5,0.3,0.7,1),(1, 1, "Project Manager",1.15,17.5,21.5,0.35,0.65,1),(1, 1, "Jr. Project Manager",1.1,16.5,20,0.4,0.6,0.95),(1, 1, "Sr. Project Lead",1.05,15,19,0.45,0.55,0.85),(1, 1, "Project Lead",1,15,17.5,0.5,0.5,0.85),(1, 1, "Jr. Project Lead",0.95,13.5,16,0.55,0.45,0.75),(1, 1, "Sr. Technician",0.9,12,15,0.60,0.40,0.75),(1, 1, "Technician",0.85,11,12.5,0.65,0.35,0.65),(1, 1, "Jr. Technician",0.8,10,11,0.7,0.3,0.55),(1, 1, "Laborer",0.75,8.15,11,0.75,0.25,0.5);

INSERT INTO jobs_installers(created_by_id, modified_by_id, fk_job_id, fk_installer_id, fk_installer_role_id, hours_bid) VALUES(1, 1, 50001,10001,105,100),(1, 1, 50001,10002,106,100),(1, 1, 50002,10001,105,50),(1, 1, 50002,10002,106,50);

INSERT INTO user_roles(created_by_id, modified_by_id, user_role_name) VALUES(1, 1, "Admin"),(1, 1, "Installer"),(1, 1, "Project Coordinator"),(1, 1, "Project Manager");

SELECT * FROM installer_roles;
SELECT * FROM installers;
SELECT * FROM jobs;
SELECT * FROM jobs_installers;
SELECT * FROM bonuses;
SELECT * FROM jobs ORDER BY end_date;