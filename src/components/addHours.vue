<template>
	<div class="mainDiv">
      <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')" style="color:#4bc800">Enter Time Worked</a></li>
           <!-- <li><a v-on:click="$parent.updateView('')">Approve Time</a></li> -->
           <li><a v-on:click="$parent.updateView('view-time')">View time</a></li>
           <li><a v-on:click="$parent.updateView('modify-time')">Modify time</a></li>
           <li><a v-on:click="$parent.updateView('approve-time')">Approve time</a></li>
           
            
        </ul>
      </div>
      		<!-- <h1>Add hours</h1> -->
      		<form v-on:submit.prevent="onSubmit" id="form">
          			<p class="input_heading">Job</p>
          			<select class="inputField" v-model="fk_job_id" required>
          				<option v-for="job in jobs" v-bind:value="job.job_id">{{job.job_name}}</option>
          			</select>
                <p class="input_heading">Installer</p>
                <select class="inputField" v-model="fk_installer_id" required>
                  <option v-for="installer in installers" v-bind:value="installer.installer_id">{{installer.first_name}} {{installer.first_name}}</option>
                </select>
          			<p class="input_heading">Regular hours worked</p>
          			<input class="inputField" type="number" step="0.1" v-model.number="reg_hours_worked" required>
          			<p class="input_heading">Overtime hours worked</p>
          			<input class="inputField" type="number" step="0.1" v-model.number="ot_hours_worked" required>
          			<p class="input_heading">Work date</p>
          			<input class="inputField" type="date" v-model="work_date" required>
          			 <button class="button" type="submit" value="Submit">Add hours</button>
          			<p class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Hours added</p>
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
	  	jobs: '',
      installers: ''
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
  				fk_installer_id: this.fk_installer_id
  			}
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
  			this.reg_hours_worked = '',
  			this.ot_hours_worked = '',
  			this.work_date = '',
  			this.fk_job_id = '',
        this.fk_installer_id=''
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

      axios({
      method: 'get',
      url: '/installers'
    })
    .then(req => {
      console.log(req.data.installers);
      this.installers = req.data.installers;
    })
    .catch(err => {
      console.log(err);
    })
  }
};
</script>
<style scoped>

.mainDiv{
     margin-left: 12%;
     margin-top: 5%;
     margin-right: 5%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}
form{
  margin-top: 30px;
}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
.input_heading{
    color: #afaeb0;
    margin-left: 18px;
    
 }   
.inputField{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 12px 18px 12px;
    width: 97%;
}
.inputField:focus{
  outline: none;
}
.button:focus{
  outline-color:  #4bc800;

}
.button{
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    margin: 15px;
    padding: 12px 18px 12px;
    margin-top: 10px;
}
.inputField{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 12px 18px 12px;
    width: 97%;
}
.inputField:focus{
  outline: none;
}
.button:focus{
  outline-color:  #4bc800;

}

ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
    padding-left: 6%;
    padding-right: 6%;
    padding-bottom: 2%;
    padding-top: 2%;
    text-align: center;
    border-bottom: 3px solid transparent;
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