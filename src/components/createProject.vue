<template>
	<div  class="mainDiv">
      <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')">Enter Time Worked</a></li>
           <li><a v-on:click="$parent.updateView('')">Approve Time</a></li>
           <li><a v-on:click="$parent.updateView('create-project')">Create Project</a></li>
           <li><a v-on:click="$parent.updateView('modify-project')">Modify project</a></li>
            
        </ul>
      </div>
		<h1>Create a Project</h1>
		<form v-on:submit.prevent="onSubmit">
    	<p>Project Name</p>
    	<input type="text" name="job_name" v-model.trim="job_name">
    	<p>Start Date</p>
    	<input type="date" name="start_date" v-model.trim="start_date">
    	<p>End Date</p>
    	<input type="date" name="end_date" v-model.trim="end_date">
    	<p>Hours Bid</p>
    	<input type="number" name ="hours_bid" v-model.number="hours_bid">
    	<p>Estimated Start Date</p>
    	<input type="date" name="est_start_date" v-model.trim="est_start_date">
    	<p>Estimated End Date</p>
    	<input type="date" name="est_end_date" v-model.trim="est_end_date">
    	<p>Customer ID</p>
    	<input type="number" name="fk_customer_id" v-model.number="fk_customer_id">
    	<p>Bill Rate</p>
    	<input type="text" name="bill_rate" v-model.trim="bill_rate">
    	<p>Job Status</p>
    	<input type="text" name="job_status" v-model.trim="job_status">
    	<p>Max Labor Cost</p>
    	<input type="number" name="max_labor_cost" v-model.number="max_labor_cost">

    	<input type="submit" value="Submit">
    </form>
	</div>
</template>

<script>

import axios from "axios";

export default {
  name: 'create-project',
  props: ["user"],
  data() {
    return {

    	created_by_id: this.user.userID,
    	modified_by_id: this.user.userID, 
    	job_name: '',
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
      console.log(this.start_date);
      axios({
        method: 'post',
        url: '/jobs/add',
        data: {
        created_by_id: this.user.userID,
    	modified_by_id: this.user.userID, 
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
  beforeMount(){
  	console.log(this);
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

li:active a {
  color:#4bc800; 
}

li:hover{
  border-color: #4bc800;
}
a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}
</style>