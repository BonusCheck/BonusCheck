<template>
    <div class="mainDiv">
        <div  class="header">
           <ul>
              <li><a class="header_a" v-on:click="$parent.updateView('add-installer')"  >Add installer</a></li>
              <li><a class="header_a" v-on:click="$parent.updateView('view-installer')" style="color:#4bc800" >View installer</a></li>
              <li><a class="header_a" v-on:click="$parent.updateView('modify-installer')"  >Modify installer</a></li>
              
            </ul>
        </div>
        <div class="container">
                <div class="row  custyle">
                    <table class="table table-striped custab">
                            <thead>
                                <tr>
                                    <th>InstallerID</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>CurrentWage</th>
                                    <th>Role</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tr v-for="installer in installers">
                                <td>{{installer.installer_id}}</td>
                                <td>{{installer.first_name}}</td>
                                <td>{{installer.last_name}}</td>
                                <td>{{installer.current_wage}}</td>
                                <td>{{installer.fk_installer_role_id}}</td>
                                <td class="text-center"><a href="#" @click="deleteinstaller(installer)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
                            </tr>                           
                    </table>
                </div>
        </div>          
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
      name: 'view-installer',
      data() {
        return {
          installer_id:'',
          installers: '',
          roles: ''
        }
      },
    methods: {
       deleteinstaller (installer) {
        // open the modal using the refs
         this.installer_id = installer.installer_id;
           axios({
            method: 'delete',
            url: '/installers/delete',
            data: {
              installer_id: this.installer_id
            }
          })
          .then(req => {
            this.installer_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/installers')
        .then(req => {
          this.installers = req.data.installers;
          console.log(req.data.installers);
        })
      },
      getRoleName: function(roleid){
         var role_name = "";
        for (var i=0; this.roles.length ; i++) {
            if(this.roles[i].installer_role_id==roleid){
             role_name= this.roles[i].installer_role_name;

            }
          return role_name;  
         }
      }   
      },
      beforeMount(){
       
        //Get role list
        axios({
          method: 'get',
          url: '/installers/roles'
        })
        .then(req => {
          this.roles = req.data.roles;
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });

         
      }
     
    };
</script>

<style scoped>

.mainDiv{
     margin-left: 12%;
     margin-top: 5%;
     margin-right: 5%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     /*height: 200px;*/
     background-color: #fff;
     font-size: 16px;
     padding: 40px;

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
    vertical-align: top;
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