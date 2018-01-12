<template>
	<div  class="mainDiv">
      <div  class="header">
        <ul>
            <!-- <li><a v-on:click="$parent.updateView('add-hours')">Enter Time Worked</a></li> -->
           <!-- <li><a v-on:click="$parent.updateView('')">Approve Time</a></li> -->
           <li><a v-on:click="$parent.updateView('create-project')" style="color:#4bc800">Create Project</a></li>
           <li><a v-on:click="$parent.updateView('open-jobs')">View open jobs</a></li>
           <li><a v-on:click="$parent.updateView('close-jobs')">View close jobs</a></li>
           <li><a v-on:click="$parent.updateView('all-jobs')">View all jobs</a></li>
           
            
        </ul>
      </div>
		
		<form v-on:submit.prevent="onSubmit">
        <div class="row">
            <div class="col-md-6">
            	<p class="input_heading">Project Name</p>
            	<input class="inputField" type="text" name="job_name" v-model.trim="job_name">
            </div> 
            <div class="col-md-6"> 
            	<p class="input_heading">Start Date</p>
            	<input class="inputField" type="date" name="start_date" v-model.trim="start_date">
            </div>  
        </div>
        <div class="row"> 
            <div class="col-md-6">     
            	<p class="input_heading">End Date</p>
            	<input class="inputField" type="date" name="end_date" v-model.trim="end_date">
            </div>
            <div class="col-md-6">  
            	<p class="input_heading">Hours Bid</p>
            	<input class="inputField" type="number" name ="hours_bid" v-model.number="hours_bid">
            </div>  
        </div>      
        <div class="row">
            <div class="col-md-6">
            	<p class="input_heading">Estimated Start Date</p>
            	<input class="inputField" type="date" name="est_start_date" v-model.trim="est_start_date">
            </div>
            <div class="col-md-6">  
            	<p class="input_heading">Estimated End Date</p>
            	<input class="inputField" type="date" name="est_end_date" v-model.trim="est_end_date">
            </div>  
        </div>
        <div class="row">
            <div class="col-md-6">      
            	<p class="input_heading">Customer ID</p>
            	<input class="inputField" type="number" name="fk_customer_id" v-model.number="fk_customer_id">
            </div>
            <div class="col-md-6">  
            	<p class="input_heading">Bill Rate</p>
            	<input class="inputField" type="text" name="bill_rate" v-model.trim="bill_rate">
            </div>
        </div>    
        <div class="row">    
            <div class="col-md-6">  
            	<p class="input_heading">Job Status</p>
            	<input class="inputField" type="text" name="job_status" v-model.trim="job_status">
            </div> 
            <div class="col-md-6"> 
            	<p class="input_heading">Max Labor Cost</p>
            	<input class="inputField" type="number" step="0.01" name="max_labor_cost" v-model.number="max_labor_cost">
            </div> 
        </div>     

            <button class="button" type="submit" value="Submit">Create Project</button>
             
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