USE installers_db;

SELECT * FROM jobs INNER JOIN jobs_installers ON jobs.job_id = jobs_installers.fk_job_id;

SELECT jobs.job_name, jobs.start_date, jobs.end_date, installers.first_name, installers.last_name, jobs_installers.job_installer_id FROM jobs LEFT JOIN jobs_installers ON jobs.job_id = jobs_installers.fk_job_id
  LEFT JOIN installers ON jobs_installers.fk_installer_id = installers.installer_id;