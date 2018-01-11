<template>
  	<div class="mainDiv">
      <div  class="header">
          <ul>
            <li><a v-on:click="$parent.updateView('add-user')" >Add User</a></li>
            <li><a v-on:click="$parent.updateView('delete-user')">Delete User</a></li>
            <li><a v-on:click="$parent.updateView('modify-project')" style="color:#4bc800">Modify project</a></li>
          </ul>
      </div>
           <p class="input_heading">Select project to modify</p>
              <select class="inputField" v-model="job_id">
                <option v-for="job in jobs" v-bind:value="job.job_id">
                  {{job.job_name}}
                </option>
              </select>

              <form v-if="selectedRole.job_id" v-on:submit.prevent="onSubmit">
                <input class="inputField" type="hidden" v-model="selectedRole.job_id">
                <p class="input_heading">Project name</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.job_name" required>
                <p class="input_heading">Hours Bid</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.hours_bid" required>
                <p class="input_heading">Estimated Start Date</p>
                <input class="inputField" type="date" v-model="selectedRole.est_end_date" required>
                <p class="input_heading">Bill rate</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.bill_rate" required>
                <p class="input_heading">Job status</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.job_status" required>
                <p class="input_heading">Max labor cost</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.max_labor_cost" required>
                <button class="button" type="submit" value="Submit">Update</button>
                <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Project updated successfully.</p>
              </form>
      
       <!--  <div class="job" v-for="job in jobs">
          <form v-on:submit.prevent="onSubmit">
            <input type="hidden" name="job_id" :value="job.job_id">
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
  		 -->
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
      selectedRole: {}
    }
  },
  
  methods: {

    date: function(d) {

      return dateFormat(d, ["YYYY-MM-DD"])

    },

    getDates: function() {

      for (let i = 0; i < this.jobs.length; i++) {
      
          this.jobs[i].est_start_date = this.date(this.jobs[i].est_start_date);
          this.jobs[i].est_end_date = this.date(this.jobs[i].est_end_date);
        }
  
    },

    onSubmit: function(){
      axios({
        method: 'put',
        url: 'jobs/update',
        data: {
          job_id: this.selectedRole.job_id,
          job_name: this.selectedRole.job_name,
          hours_bid: this.selectedRole.hours_bid,
          est_start_date: this.selectedRole.est_start_date,
          est_end_date: this.selectedRole.est_end_date,
          bill_rate: this.selectedRole.bill_rate,
          job_status: this.selectedRole.job_status,
          max_labor_cost: this.selectedRole.max_labor_cost,
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
      [this.selectedRole] = this.jobs.filter(r => r.job_id === id);
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
      console.log(this.user.roll)

      console.log(this.date(req.data.jobs.est_end_date))
      console.log(this.jobs);
    })
    .catch(err => {
      console.log(err);
    })
  }
};

//   data() {
//     return {

//       jobs: '',
//       job_name: '',
//       job_id: '',
//       start_date: '',
//       end_date: '',
//       hours_bid: '',
//       est_start_date: '',
//       est_end_date: '',
//       fk_customer_id: '',
//       bill_rate: '',
//       job_status: '',
//       max_labor_cost: ''

//     }
//   },
//   methods: {
//     onSubmit: function(){
//       console.log(this.job_id);
//       axios({
//       method: 'put',
//       url: '/jobs/update',
//       data: {
//       job_id: this.job_id,
//       job_name: this.job_name,
//       start_date: this.start_date,
//       end_date: this.end_date,
//       hours_bid: this.hours_bid,
//       est_start_date: this.est_start_date,
//       est_end_date: this.est_end_date,
//       fk_customer_id: this.fk_customer_id,
//       bill_rate: this.bill_rate,
//       job_status: this.job_status,
//       max_labor_cost: this.max_labor_cost
//       }
//     })
//     .then(req => {
//       if(req.data.ok){
//         console.log('Job added!');
//       };
//     })
//     .catch(err => {
//       console.log(err);
//     })
//     }
//   },
//   beforeMount() {
//   	axios({
//   		method: 'get',
//   		url: '/jobs'
//   	})
//   	.then(req => {
//   		console.log(req.data);
//       this.jobs = req.data.jobs;
//   	})
//   	.catch(err => {
//   		console.log(err);
//   	})
//   }
// };

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

