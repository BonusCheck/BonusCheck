<template>
	<div class="mainDiv">
      <div  class="header">
	       <ul>
           <li><a class="header_a"  v-on:click="$parent.updateView('create-roles')" >Create roles</a></li>
           <li><a class="header_a"  v-on:click="$parent.updateView('modify-roles')">Modify Roles</a></li>
           <li><a class="header_a"  v-on:click="$parent.updateView('view-roles')" style="color:#4bc800">View Roles</a></li>
          </ul>
      </div> 
      <div  class="container">
                <div class="row  custyle">
                    <table class="table table-striped custab">
                            <thead>
                                <tr>
                                    <th>installerID</th>
                                    <th>installerRoleName</th>
                                    <th>Role Weight</th>
                                    <th>Min base</th>
                                    <th>Max base</th>
                                    <th>Individual Bonus</th>
                                    <th>Team Bonus</th>
                                    <th class="text-center">Modify</th>
                                    <th class="text-center">Delete</th>
                                </tr>
                            </thead>
                            <tr v-for="role in roles">
                                <td>{{ role.installer_role_id }} </td>
                                <td>{{ role.installer_role_name }}</td>
                                <td>{{ role.role_weight }}</td>
                                <td>{{ role.min_base }}</td>
                                <td>{{ role.max_base }}</td>
                                <td>{{ role.individual_bonus }} </td>
                                <td>{{ role.team_bonus }} </td>
                                <td class="text-center"><a href="#" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit
                                      </a>
                                </td>
                                <td class="text-center"><a href="#" @click="deleterole(role)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del
                                </a>
                                </td>
                            </tr>
                    </table>
                </div>
          </div>  
		
	</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'view-roles',
      props: ["user"],
      data() {
        return {
          installer_role_id:'',
          roles: ''
        }
      },
    methods: {
       deleterole (role) {
        // open the modal using the refs
         this.installer_role_id = role.installer_role_id;
           axios({
            method: 'delete',
            url: '/installers/roles/delete',
            data: {
              installer_role_id: this.installer_role_id
            }
          })
          .then(req => {
            this.installer_role_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/installers/roles')
        .then(req => {
          this.roles = req.data.roles;
          console.log(req.data.roles);
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

.header{
  border-bottom: 1px solid #ebebeb;
    
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