<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('create-project')" >Create Project</a></li>
           <li><a v-on:click="$parent.updateView('open-jobs')" >View open jobs</a></li>
           <li><a v-on:click="$parent.updateView('close-jobs')" >View close jobs</a></li>
           <li><a v-on:click="$parent.updateView('all-jobs')" style="color:#4bc800">View all jobs</a></li>
          </ul>
       </div>   
		   <div class="container">
                <div class="row  custyle">
                    <table class="table table-striped custab">
                            <thead>
                                <tr>
                                    <th>JobID</th>
                                    <th>JobName</th>
                                    <th>Hours Bid</th>
                                    <th>Bill Rate</th>
                                    <th>Job Status</th>
                                    <th>Max Labor</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tr v-for="job in jobs">
                                <td>{{job.job_id}}</td>
                                <td>{{job.job_name}}</td>
                                <td>{{job.hours_bid}}</td>
                                <td>{{job.bill_rate}}</td>
                                <td>{{job.job_status}}</td>
                                <td>{{job.max_labor_cost}}</td>
                                <td class="text-center"><a href="#" @click="deletejob(job)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
                            </tr>                           
                    </table>
                </div>
        </div>          
	</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'all-jobs',
      data() {
        return {
          job_id:'',
          jobs: ''
        }
      },
    methods: {
       deletejob (job) {
        // open the modal using the refs
         this.job_id = job.job_id;
           axios({
            method: 'delete',
            url: '/jobs/delete',
            data: {
              job_id: this.job_id
            }
          })
          .then(req => {
            this.job_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/jobs')
        .then(req => {
          this.jobs = req.data.jobs;
          console.log(req.data.jobs);
        })
      }
    },
      
      beforeMount(){
       
       this.getData(); 
         
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
.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
  tr:nth-child(even){
      background-color: #f9f9f9;
    }

.header{
  border-bottom: 1px solid #ebebeb;
    
}
table{
  width: 91%;
}
td{
    padding: 8px;
    line-height: 1.42857143;
    
    border-top: 1px solid #ddd;
    text-align: center;
}
th{
  text-align: center;
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