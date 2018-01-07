DROP DATABASE IF EXISTS installers_db;
CREATE DATABASE installers_db;
USE installers_db;

set foreign_key_checks=0;

CREATE TABLE user_roles(
user_role_id INT NOT NULL AUTO_INCREMENT,
user_role_name CHAR(75) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (user_role_id)
);

CREATE TABLE change_orders (
change_orders_id INT NOT NULL AUTO_INCREMENT,
fk_original_job_id INT,
fk_change_job_id INT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
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
user_id INT NOT NULL AUTO_INCREMENT,
user_name CHAR(75) NOT NULL,
password CHAR(75) NOT NULL,
token CHAR(20),
fk_user_role_id INT,
PRIMARY KEY (user_id),
	FOREIGN KEY (fk_user_role_id)
	REFERENCES installers_db.user_roles (user_role_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE installers(
installer_id INT NOT NULL AUTO_INCREMENT,
first_name CHAR(50) NOT NULL,
last_name  CHAR(50) NOT NULL,
current_wage DOUBLE(25,2) NOT NULL,
fk_user_id INT,
fk_installer_role_id INT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
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
installer_role_id INT NOT NULL AUTO_INCREMENT,
installer_role_name CHAR(75) NOT NULL,
role_weight DOUBLE(10,5) NOT NULL,
min_base DOUBLE(10,2) NOT NULL,
max_base DOUBLE(10,2) NOT NULL,
individual_bonus DOUBLE(5,4) NOT NULL,
team_bonus DOUBLE(5,4) NOT NULL,
bonus_weight DOUBLE(5,4) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (installer_role_id)
);

CREATE TABLE installer_hours(
installers_hours_id INT NOT NULL AUTO_INCREMENT,
reg_hours_worked DOUBLE(10,2),
ot_hours_worked DOUBLE(10,2),
work_date DATE,
fk_job_id INT,
fk_installer_id INT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (installers_hours_id),
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_installer_id)
	REFERENCES installers_db.installers (installer_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE installer_payments(
payment_id INT NOT NULL AUTO_INCREMENT,
date_paid DATE,
scheduled_pay_date DATE,
payment_amount DOUBLE(10,2),
scheduled_payment_amount DOUBLE(10,2),
fk_installer_id INT,
fk_payment_type_id INT,
fk_job_id INT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (payment_id),
	FOREIGN KEY (fk_payment_type_id)
	REFERENCES installers_db.payment_types (payment_type_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	FOREIGN KEY (fk_installer_id)
	REFERENCES installers_db.installers (installer_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE payment_types(
payment_type_id INT NOT NULL AUTO_INCREMENT,
payment_type CHAR(75),
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (payment_type_id)
);

CREATE TABLE jobs(
job_id INT NOT NULL AUTO_INCREMENT,
job_name CHAR(255) NOT NULL,
start_date DATE,
end_date DATE,
hours_bid DOUBLE(25,2),
est_start_date DATE,
est_end_date DATE,
fk_customer_id INT,
bill_rate DOUBLE(7,2) NOT NULL,
job_status CHAR(255) NOT NULL DEFAULT "Open",
max_labor_cost DOUBLE(5,2) DEFAULT 43.5 NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (job_id),
    FOREIGN KEY (fk_customer_id)
	REFERENCES installers_db.customers (customer_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE bonuses(
bonus_id INT NOT NULL AUTO_INCREMENT,
production_min DOUBLE(5,2) NOT NULL,
production_max DOUBLE(5,2) NOT NULL,
bonus_weight DOUBLE(5,2) NOT NULL,
fk_job_id INT,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (bonus_id),
	FOREIGN KEY (fk_job_id)
	REFERENCES installers_db.jobs (job_id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

CREATE TABLE jobs_installers(
job_installer_id INT NOT NULL AUTO_INCREMENT,
hours_bid INT NOT NULL,
wage DOUBLE(25,2),
fk_job_id INT NOT NULL ,
fk_installer_id INT NOT NULL,
fk_installer_role_id INT NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
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
customer_id INT NOT NULL AUTO_INCREMENT,
customer_name CHAR(50) NOT NULL,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
created_by_id INT,
date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
modified_by_id INT,
PRIMARY KEY (customer_id)
);

ALTER TABLE bonuses AUTO_INCREMENT=1001;
ALTER TABLE change_orders AUTO_INCREMENT=50000001;
ALTER TABLE customers AUTO_INCREMENT=50001;
ALTER TABLE installers AUTO_INCREMENT=10001;
ALTER TABLE installer_hours AUTO_INCREMENT=100000001;
ALTER TABLE installer_roles AUTO_INCREMENT=2001;
ALTER TABLE installer_payments AUTO_INCREMENT=200000001;
ALTER TABLE jobs AUTO_INCREMENT=10000001;
ALTER TABLE jobs_installers AUTO_INCREMENT=600000001;
ALTER TABLE payment_types AUTO_INCREMENT=4001;
ALTER TABLE users AUTO_INCREMENT=5001;
ALTER TABLE user_roles AUTO_INCREMENT=3001;