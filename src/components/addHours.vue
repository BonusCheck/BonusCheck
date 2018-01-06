<template>
	<div>
		<h1>Add hours</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			<p>Regular hours worked</p>
			<input type="number" v-model.number="reg_hours_worked" requird>
			<p>Overtime hours worked</p>
			<input type="number" v-model.number="ot_hours_worked" requird>
			<p>Work date</p>
			<input type="date" v-model="work_date">
			<p></p>

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
  		reg_hours_worked: '',
  		ot_hours_worked: '',
  		work_date: '',
  		fk_job_id: '',
  		fk_installer_id: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'put',
  			url: 'installers/hours/add',
  			data: {
  				created_by_id: this.user,
  				modified_by_id: this.user,
  				reg_hours_worked: '',
  				ot_hours_worked: '',
  				work_date: '',
  				fk_job_id: '',
  				fk_installer_id: ''
  			}
  		})
  	}
  }
};
</script>