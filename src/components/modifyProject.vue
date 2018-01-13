<template>
  	<div class="mainDiv">
      <div  class="header">
          <ul>
           <li><a v-on:click="$parent.updateView('create-project')" style="color:#4bc800">Create Jobs</a></li>
           <li><a v-on:click="$parent.updateView('open-jobs')">View Open Jobs</a></li>
           <li><a v-on:click="$parent.updateView('close-jobs')">View Close Jobs</a></li>
           <li><a v-on:click="$parent.updateView('all-jobs')">View All Jobs</a></li>
           <li v-if="user.roll === 'Admin' || 'Project-Cooridnator'"><a v-on:click="$parent.updateView('modify-project')">Modify Job</a></li>
          </ul>
      </div>
           <p class="input_heading">Select project to modify</p>
              <select class="inputField" v-model="job_id">
                <option v-for="job in jobs" v-bind:value="job.job_id">
                  {{job.job_name}}
                </option>
              </select>

              <form v-if="selectedJob.job_id" v-on:submit.prevent="onSubmit">
                <input class="inputField" type="hidden" v-model="selectedJob.job_id">
                <p class="input_heading">Project name</p>
                <input class="inputField" type="text" v-model.trim="selectedJob.job_name">
                <p class="input_heading">Hours Bid</p>
                <input class="inputField" type="text" v-model.trim="selectedJob.hours_bid">
                <p class="input_heading">Estimated Start Date</p>
                <input class="inputField" type="date" v-model="selectedJob.est_start_date">
                 <p class="input_heading">Estimated End Date</p>
                <input class="inputField" type="date" v-model="selectedJob.est_end_date">
                 <p class="input_heading">Start Date</p>
                <input class="inputField" type="date" v-model="selectedJob.start_date">
                 <p class="input_heading">End Date</p>
                <input class="inputField" type="date" v-model="selectedJob.end_date">
                <p class="input_heading">Bill rate</p>
                <input class="inputField" type="text" v-model.trim="selectedJob.bill_rate">
                <p class="input_heading">Job status</p>
                <input class="inputField" type="text" v-model.trim="selectedJob.job_status">
                <p class="input_heading">Max labor cost</p>
                <input class="inputField" type="text" v-model.trim="selectedJob.max_labor_cost">
                <button class="button" type="submit" value="Submit">Update</button>
                <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Project updated successfully.</p>
              </form>
	  </div>
</template>

<script>

import dateFormat from 'date-fns/format';
import axios from 'axios';

export default {
  name: 'modify-project',
  props: ["user"],
   data(){
    return {
      job_id: '',
      jobs: '',
      selectedJob: {}
    }
  },
  
  methods: {

    date: function(d) {

      return dateFormat(d, ["YYYY-MM-DD"])

    },

    getDates: function() {

      for (let i = 0; i < this.jobs.length; i++) {


          this.jobs[i].start_date = this.date(this.jobs[i].start_date);
          this.jobs[i].end_date = this.date(this.jobs[i].end_date);
          this.jobs[i].est_start_date = this.date(this.jobs[i].est_start_date);
          this.jobs[i].est_end_date = this.date(this.jobs[i].est_end_date);
        }
  
    },

    onSubmit: function(){
      axios({
        method: 'put',
        url: 'jobs/update',
        data: {
          job_id: this.selectedJob.job_id,
          job_name: this.selectedJob.job_name,
          hours_bid: this.selectedJob.hours_bid,
          est_start_date: this.selectedJob.est_start_date,
          est_end_date: this.selectedJob.est_end_date,
          start_date: this.selectedJob.start_date,
          end_date: this.selectedJob.end_date,
          bill_rate: this.selectedJob.bill_rate,
          job_status: this.selectedJob.job_status,
          max_labor_cost: this.selectedJob.max_labor_cost,
          modified_by_id: this.user.userID
        }
      })
      .then(req => {
        if(req.status===200){
          $('.inputField').val('');
        document.getElementById('confirmation').classList.remove('hidden');
      };
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    job_id(id) {
      [this.selectedJob] = this.jobs.filter(r => r.job_id === id);
    }
  },
  beforeMount(){
    axios({
      method: 'get',
      url: '/jobs'
    })
    .then(req => {
      this.jobs = req.data.jobs;
      this.getDates();
    })
    .catch(err => {
      console.log(err);
    })
  }
};

</script>


<style scoped>

  .job {
    display: inline-block;
    height: auto;
    width: 400px;
    border: 4px double blue;
    overflow: auto;
  }
</style>>

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

.input_heading{
    color: #afaeb0;
    margin-left: 18px;
    
}


.header{
  border-bottom: 1px solid #ebebeb;
    
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
    width: 20%;
    margin-top: 10px;
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

