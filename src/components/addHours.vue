<template>
	<div>
		<h1>Add hours</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			<select v-model="form.fk_job_id">
				<option v-for="job in jobs" v-bind:value="job.job_id">{{job.job_name}}</option>
			</select>
			<p>Regular hours worked</p>
			<input type="number" v-model.number="form.reg_hours_worked" required>
			<p>Overtime hours worked</p>
			<input type="number" v-model.number="form.ot_hours_worked" required>
			<p>Work date</p>
			<input type="date" v-model="form.work_date">
			<input type="submit" value="Submit">
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'add-hours',
  props: ['user'],
  data(){
  	return {
  		form: {
	  		reg_hours_worked: '',
	  		ot_hours_worked: '',
	  		work_date: '',
	  		fk_job_id: '',
	  		fk_installer_id: ''
	  	},
	  	jobs: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'put',
  			url: '/installers/hours/add',
  			data: {
  				created_by_id: this.user,
  				modified_by_id: this.user,
  				reg_hours_worked: form.reg_hours_worked,
  				ot_hours_worked: form.ot_hours_worked,
  				work_date: form.work_date,
  				fk_job_id: form.fk_job_id,
  				fk_installer_id: ''
  			}
  		})
  		.then(req => {

  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/jobs'
  	})
  	.then(req => {
  		console.log(req.data.jobs);
  		this.jobs = req.data.jobs;
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>