<template>
	<div class="mainDiv">
      <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')">Enter Time Worked</a></li>
           <li><a v-on:click="$parent.updateView('')">Approve Time</a></li>
           <li><a v-on:click="$parent.updateView('create-project')">Create Project</a></li>
           <li><a v-on:click="$parent.updateView('modify-project')">Modify project</a></li>
            
        </ul>
      </div>

      		<h1>Add hours</h1>
      		<form v-on:submit.prevent="onSubmit" id="form">
      			<p>Job</p>
      			<select v-model="fk_job_id" required>
      				<option v-for="job in jobs" v-bind:value="job.job_id">{{job.job_name}}</option>
      			</select>
      			<p>Regular hours worked</p>
      			<input type="number" v-model.number="reg_hours_worked" required>
      			<p>Overtime hours worked</p>
      			<input type="number" v-model.number="ot_hours_worked" required>
      			<p>Work date</p>
      			<input type="date" v-model="work_date" required>
      			<input type="submit" value="Submit">
      			<p class="hidden" id="confirmation">Hours added</p>
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
	  	jobs: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: '/installers/hours/add',
  			data: {
  				created_by_id: this.user.userID,
  				modified_by_id: this.user.userID,
  				reg_hours_worked: this.reg_hours_worked,
  				ot_hours_worked: this.ot_hours_worked,
  				work_date: this.work_date,
  				fk_job_id: this.fk_job_id,
  				fk_installer_id: this.user.installerID
  			}
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
  			this.reg_hours_worked = '',
  			this.ot_hours_worked = '',
  			this.work_date = '',
  			this.fk_job_id = ''
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
<style scoped>

.mainDiv{
     margin:90px 50px 0 200px;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
      padding: 0 60px;
    line-height: 4;
    border-bottom: 3px solid transparent;
    margin-bottom: -10px;
}
li:active{
  border-color:#4bc800; 
}

li:hover{
  border-color: #929292;
}
a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}
</style>