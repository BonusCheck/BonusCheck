<template>
  	<div class="mainDiv">
      <div  class="header">
          <ul>
            <li><a v-on:click="$parent.updateView('add-hours')">Enter Time Worked</a></li>
             <li><a v-on:click="$parent.updateView('')">Approve Time</a></li>
             <li><a v-on:click="$parent.updateView('create-project')">Create Project</a></li>
             <li><a v-on:click="$parent.updateView('modify-project')" style="color:#4bc800">Modify project</a></li>
          </ul>
      <div>
      <h1>Modify a Project</h1>
        <div class="job" v-for="job in jobs">
          <form v-on:submit.prevent="onSubmit">
            <input type="hidden" name="job_id" :value="job.job_id">
            <p>Project Name</p>
            <input type="text" name="job_name" :placeholder="job.job_name" :value="job_name">
            <p>Start Date</p>
            <input type="date" name="start_date"  :value="job.start_date">
            <p>End Date</p>
            <input type="date" name="end_date" :value="job.end_date">
            <p>Hours Bid</p>
            <input type="text" name ="hours_bid" :value="job.hours_bid">
            <p>Estimated Start Date</p>
            <input type="date" name="est_start_date" :value="job.est_start_date">
            <p>Estimated End Date</p>
            <input type="date" name="est_end_date" :value="job.est_end_date">
            <p>Bill Rate</p>
            <input type="text" name="bill_rate" :value="job.bill_rate">
            <p>Job Status</p>
            <input type="text" name="job_status" :value="job.job_status">
            <p>Max Labor Cost</p>
            <input type="text" name="max_labor_cost" :value="job.max_labor_cost">
            <input type="submit" value="Submit">
          </form>
        </div>
      </div>
        </div>
  		
	  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-project',
  props: ["user"],

  data() {
    return {

      jobs: '',
      job_name: '',
      job_id: '',
      start_date: '',
      end_date: '',
      hours_bid: '',
      est_start_date: '',
      est_end_date: '',
      fk_customer_id: '',
      bill_rate: '',
      job_status: '',
      max_labor_cost: ''

    }
  },
  methods: {
    onSubmit: function(){
      console.log(this.job_id);
      axios({
      method: 'put',
      url: '/jobs/update',
      data: {
      job_id: this.job_id,
      job_name: this.job_name,
      start_date: this.start_date,
      end_date: this.end_date,
      hours_bid: this.hours_bid,
      est_start_date: this.est_start_date,
      est_end_date: this.est_end_date,
      fk_customer_id: this.fk_customer_id,
      bill_rate: this.bill_rate,
      job_status: this.job_status,
      max_labor_cost: this.max_labor_cost
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
  beforeMount() {
  	axios({
  		method: 'get',
  		url: '/jobs'
  	})
  	.then(req => {
  		console.log(req.data);
      this.jobs = req.data.jobs;
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>
<<<<<<< HEAD

<style scoped>

  .job {
    display: inline-block;
    height: auto;
    width: 400px;
    border: 4px double blue;
    overflow: auto;
  }
</style>>
=======
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
>>>>>>> 802442b046feca1bcd6f97923a1cf3076da6ce84
