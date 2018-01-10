<template>
  	<div class="mainDiv">
      <div  class="header">
          <ul>
            <li><a v-on:click="$parent.updateView('add-user')" >Add User</a></li>
            <li><a v-on:click="$parent.updateView('delete-user')">Delete User</a></li>
            <li><a v-on:click="$parent.updateView('modify-project')" style="color:#4bc800">Modify project</a></li>
          </ul>
      <div>
      <h1>Modify a Project</h1>
       <div class="row">
        <div class="col-md-10">
            <select class="input" v-model="job_id">
              <option v-for="job in jobs" v-bind:value="job.job_id">
                {{job.job_name}}
              </option>
            </select>
        </div>    
    </div> 
          <form v-if="selectedJob.job_id" v-on:submit.prevent="onSubmit">
            <input type="hidden" v-model="selectedJob.job_id">
            <p>Project Name</p>
            <input type="text" name="job_name" v-model="selectedJob.job_name">
            <p>Start Date</p>
            <input type="date" name="start_date" v-model="selectedJob.start_date | dateFormat">
            <p>End Date</p>
            <input type="date" name="end_date" v-model="selectedJob.end_date">
            <p>Hours Bid</p>
            <input type="text" name ="hours_bid" v-model="selectedJob.hours_bid">
            <p>Estimated Start Date</p>
            <input type="date" name="est_start_date" v-model="selectedJob.est_start_date">
            <p>Estimated End Date</p>
            <input type="date" name="est_end_date" v-model="selectedJob.est_end_date">
            <p>Bill Rate</p>
            <input type="text" name="bill_rate" v-model="selectedJob.bill_rate">
            <p>Job Status</p>
            <input type="text" name="job_status" v-model="selectedJob.job_status">
            <p>Max Labor Cost</p>
            <input type="text" name="max_labor_cost" v-model="selectedJob.max_labor_cost">
            <input type="submit" value="Submit">
          </form>
      </div>
    </div>
  </div>
</template>

<script>

import dateFormat from 'date-fns/format';
import axios from 'axios';

export default {
  name: 'modify-project',
  props: ["user"],

  data() {
    return {

      jobs: '',
      job_id: '',
      selectedJob: {}

    }
  },
  
  methods: {
    onSubmit: function(){
      
      axios({
      method: 'put',
      url: '/jobs/update',
      data: {
      job_id: this.selectedJob.job_id,
      job_name: this.selectedJob.job_name,
      start_date: this.selectedJob.start_date,
      end_date: this.selectedJob.end_date,
      hours_bid: this.selectedJob.hours_bid,
      est_start_date: this.selectedJob.est_start_date,
      est_end_date: this.selectedJob.est_end_date,
      fk_customer_id: this.selectedJob.fk_customer_id,
      bill_rate: this.selectedJob.bill_rate,
      job_status: this.selectedJob.job_status,
      max_labor_cost: this.selectedJob.max_labor_cost
      }
    })
    .then(req => {
      if(req.data.ok){
        console.log('Job added!');
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
  beforeMount() {
  	axios({
  		method: 'get',
  		url: '/jobs'
  	})
  	.then(req => {
  		console.log(req.data.jobs[0].start_date);

      this.jobs = req.data.jobs;
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
     margin-top: 7%;
     margin-right: 7%;
     margin-left: 18%;
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
    padding-left: 6%;
    padding-right: 6%;
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

