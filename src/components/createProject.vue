<template>
	<div>
		<h1>Create a Project</h1>
		<form v-on:submit.prevent="onSubmit">
    	<p>Project Name</p>
    	<input type="text" name="job_name" v-model="job_name">
    	<p>Start Date</p>
    	<input type="date" name="start_date" v-model="start_date">
    	<p>End Date</p>
    	<input type="date" name="end_date" v-model="end_date">
    	<p>Hours Bid</p>
    	<input type="text" name ="hours_bid" v-model="hours_bid">
    	<p>Estimated Start Date</p>
    	<input type="date" name="est_start_date" v-model="est_start_date">
    	<p>Estimated End Date</p>
    	<input type="date" name="est_end_date" v-model="est_end_date">
    	<p>Customer ID</p>
    	<input type="text" name="fk_customer_id" v-model="fk_customer_id">
    	<p>Bill Rate</p>
    	<input type="text" name="bill_rate" v-model="bill_rate">
    	<p>Job Status</p>
    	<input type="text" name="job_status" v-model="job_status">
    	<p>Max Labor Cost</p>
    	<input type="text" name="max_labor_cost" v-model="max_labor_cost">

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
