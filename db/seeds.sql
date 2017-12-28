USE installers_db;

INSERT INTO bonuses(created_by_id, modified_by_id, production_min, production_max, bonus_weight) VALUES(5001, 5001, 69.99,0.00,0.75),(5001, 5001, 79.99,70,0.55),(5001, 5001, 89.99,80,0.35),(5001, 5001, 99.99,90,0.25),(5001, 5001, 109.99,100,0.15);

INSERT INTO change_orders (created_by_id, modified_by_id, fk_original_job_id, fk_change_job_id) VALUES(5001, 5001, 600000001, 600000003),(5001, 5001, 600000001, 600000004),(5001, 5001, 600000002, 600000005);

INSERT INTO customers (created_by_id, modified_by_id, customer_name) VALUES(5001, 5001, "Samuel"),(5001, 5001, "Heilind Electronics"),(5001, 5001, "Air Products");

INSERT INTO installers(created_by_id, modified_by_id, first_name, last_name, current_wage, fk_installer_role_id) VALUES(5001, 5001, "Sam","Fisher",17.5,2005),(5001, 5001, "Tom","Schulze",17.5,2006);

INSERT INTO installer_roles (created_by_id, modified_by_id, installer_role_name, role_weight, min_base, max_base, individual_bonus, team_bonus, bonus_weight) VALUES(5001, 5001, "Field Operations Manager",1.25,20,27.5,0.25,0.75,1),(5001, 5001, "Sr. Project Manager",1.2,18.50,22.5,0.3,0.7,1),(5001, 5001, "Project Manager",1.15,17.5,21.5,0.35,0.65,1),(5001, 5001, "Jr. Project Manager",1.1,16.5,20,0.4,0.6,0.95),(5001, 5001, "Sr. Project Lead",1.05,15,19,0.45,0.55,0.85),(5001, 5001, "Project Lead",1,15,17.5,0.5,0.5,0.85),(5001, 5001, "Jr. Project Lead",0.95,13.5,16,0.55,0.45,0.75),(5001, 5001, "Sr. Technician",0.9,12,15,0.60,0.40,0.75),(5001, 5001, "Technician",0.85,11,12.5,0.65,0.35,0.65),(5001, 5001, "Jr. Technician",0.8,10,11,0.7,0.3,0.55),(5001, 5001, "Laborer",0.75,8.15,11,0.75,0.25,0.5);

INSERT INTO installer_hours (created_by_id, modified_by_id, fk_installer_id, reg_hours_worked, ot_hours_worked, work_date, fk_job_id) VALUES (5001, 5001, 10001, 8, 4, "2017-11-04", 600000001),(5001, 5001, 10001, 8, 0, "2017-11-05", 600000001),(5001, 5001, 10001, 8, 1, "2017-11-06", 600000001),(5001, 5001, 10001, 8, 3, "2017-11-07", 600000001),(5001, 5001, 10001, 8, 2, "2017-11-08", 600000001),(5001, 5001, 10001, 8, 1, "2017-11-11", 600000001),(5001, 5001, 10001, 8, 0, "2017-11-12", 600000001),(5001, 5001, 10001, 8, 2, "2017-11-13", 600000001),(5001, 5001, 10001, 8, 2, "2017-11-14", 600000001),(5001, 5001, 10001, 8, 3, "2017-11-15", 600000001);

INSERT INTO installer_payments (created_by_id, modified_by_id, date_paid, scheduled_pay_date, fk_payment_type_id, fk_job_id, payment_amount, fk_installer_id) VALUES(5001, 5001, "2017-11-24", "2017-11-26", 4001, 600000001, 124.53, 10001),(5001, 5001, "2017-12-08", "2017-12-08", 4002, 600000001, 124.53, 10001),(5001, 5001, "2017-12-22", "2017-12-22", 4003, 600000001, 124.53, 10001), (5001, 5001, "2018-01-05", "2018-01-05", 4004, 600000001, 124.53, 10001),(5001, 5001, "2017-11-24", "2017-11-26", 4005, 600000001, 124.53, 10001),(5001, 5001, "2017-12-08", "2017-12-08", 4006, 600000001, 124.53, 10001),(5001, 5001, "2017-12-22", "2017-12-22", 4007, 600000001, 124.53, 10001), (5001, 5001, "2018-01-05", "2018-01-05", 4008, 600000001, 124.53, 10001),(5001, 5001, "2018-01-05", "2018-01-05", 4009, 600000001, 1925.00, 10001);

INSERT INTO jobs(created_by_id, modified_by_id, job_name, est_start_date, est_end_date, bill_rate, max_labor_cost, hours_bid) VALUES (5001, 5001, "Samuel Iuka Remediation & Cut Over","2017-10-10","2017-11-04",65,43.5, 400),(5001, 5001, "Samuel Wisconsin Remediation & Cut Over","2017-10-17","2017-11-04",65,43.5, 250),(5001, 5001, "Samuel Iuka Remediation & Cut Over Add Office Drops","2017-10-10","2017-11-04",65,43.5, 75),(5001, 5001, "Samuel Iuka Remediation & Cut Over Add IDF","2017-10-10","2017-11-04",65,43.5, 50),(5001, 5001, "Samuel Wisconsin Remediation & Cut Over Add Redundant Fiber","2017-10-10","2017-11-04",65,43.5, 125);

INSERT INTO jobs_installers(created_by_id, modified_by_id, fk_job_id, fk_installer_id, fk_installer_role_id, hours_bid) VALUES(5001, 5001, 50001,10001,2005,100),(5001, 5001, 50001,10002,2006,100),(5001, 5001, 50002,10001,2005,50),(5001, 5001, 50002,10002,2006,50);

INSERT INTO payment_types(created_by_id, modified_by_id, payment_type) VALUES(5001, 5001, "team_bonus_1"),(5001, 5001, "team_bonus_2"),(5001, 5001, "team_bonus_3"),(5001, 5001, "team_bonus_4"),(5001, 5001, "Indvidual_bonus_1"),(5001, 5001, "Indvidual_bonus_2"),(5001, 5001, "Indvidual_bonus_3"),(5001, 5001, "Indvidual_bonus_4"),(5001, 5001, "base_wage");

INSERT INTO users(user_name, password, fk_user_role_id) VALUES("Admin", "$2a$10$sacDeNTqL93iXs1knsBQle5biSw71k5evbPr17TeId6586W.GeVB2", "3001");

INSERT INTO user_roles(created_by_id, modified_by_id, user_role_name) VALUES(5001, 5001, "Admin"),(5001, 5001, "Installer"),(5001, 5001, "Project Coordinator"),(5001, 5001, "Project Manager");

INSERT INTO users(user_name, password, fk_user_role_id) VALUES("matt", "1234", "5000");