<template>
	<div class="mainDiv">
      <div  class="header">
        <ul>
            <li><a class="header_a" v-on:click="$parent.updateView('add-hours')" >Enter Time Worked</a></li>
           <!-- <li><a v-on:click="$parent.updateView('')">Approve Time</a></li> -->
           <li><a class="header_a" v-on:click="$parent.updateView('view-time')" style="color:#4bc800">View time</a></li>
           <li><a class="header_a" v-on:click="$parent.updateView('modify-time')">Modify time</a></li>
           <li><a class="header_a" v-on:click="$parent.updateView('approve-time')">Approve time</a></li>
                       
        </ul>
      </div>
      <div class="container">
                <div class="row  custyle">
                    <table class="table table-striped custab">
                            <thead>
                                <tr>
                                    <th>Job Name</th>
                                    <th>Installer Name</th>
                                    <th>Installer Hours ID</th>
                                    <th>Regular Hours Worked</th>
                                    <th>Overtime hours worked</th>
                                    <th>Work date</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tr v-for="hour in hours">
                                <td>{{hour.fk_job_id}}</td>
                                <td>{{hour.fk_installer_id}}</td>
                                <td>{{hour.installers_hours_id}}</td>
                                <td>{{hour.reg_hours_worked}}</td>
                                <td>{{hour.ot_hours_worked}}</td>
                                <td>{{hour.work_date}}</td>
                                <td class="text-center"><a href="#" @click="deletehour(hour)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
                            </tr>                           
                    </table>
                </div>
        </div>          
</div>
</template> 

<script>
import axios from 'axios';
export default {
  name: 'view-time',
      data() {
        return {
          installers_hours_id:'',
          hours: '',
          
        }
      },
    methods: {
       deletehour (hour) {
        // open the modal using the refs
         this.installers_hours_id = hour.installers_hours_id;
           axios({
            method: 'delete',
            url: '/installers/hours/delete',
            data: {
              installers_hours_id: this.installers_hours_id
            }
          })
          .then(req => {
            this.installers_hours_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/installers/hours')
        .then(req => {
          this.hours = req.data.installer_hours;
          console.log(req.data.installer_hours);
        })
      },
      // getRoleName: function(roleid){
      //    var role_name = "";
      //   for (var i=0; this.roles.length ; i++) {
      //       if(this.roles[i].installer_role_id==roleid){
      //        role_name= this.roles[i].installer_role_name;

      //       }
      //     return role_name;  
      //    }
      // }   
      },
      beforeMount(){
       
        this.getData(); 
        // //Get role list
        // axios({
        //   method: 'get',
        //   url: '/installers/roles'
        // })
        // .then(req => {
        //   this.roles = req.data.roles;
        //   this.getData();
        // })
        // .catch(err => {
        //   console.log(err);
        // });

         
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
.header_a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}
</style>