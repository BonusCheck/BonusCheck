<template>
	<div class="mainDiv">
      <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')" >Enter Time Worked</a></li>
           <!-- <li><a v-on:click="$parent.updateView('')">Approve Time</a></li> -->
           <li><a v-on:click="$parent.updateView('view-time')">View time</a></li>
           <li><a v-on:click="$parent.updateView('modify-time')"  style="color:#4bc800">Modify time</a></li>
           <li><a v-on:click="$parent.updateView('approve-time')">Approve time</a></li>          
        </ul>        
      </div>
      <p class="input_heading">Select Installer</p>
            <select class="inputField" v-model="fk_installer_id" >
                  <option v-for="hour in hours" v-bind:value="hour.installers_hours_id">{{hour.installers_hours_id}} </option>
                </select>
            
            <form v-if="selectedRole.installers_hours_id" v-on:submit.prevent="onSubmit">              
                    <input class="inputField" type ="hidden" v-model="selectedRole.installers_hours_id">
                    <p class="input_heading">Regular Hours Worked</p>
                    <input class="inputField" type="text" v-model.trim="selectedRole.reg_hours_worked" required>
                    <p class="input_heading">Overtime hours worked</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.ot_hours_worked" required>
                    <p class="input_heading">Work date</p>
                    <input class="inputField" type="text" v-model="selectedRole.work_date" required>
                    
                    <button class="button" type="submit" value="Submit">Update</button>
                    <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo"> Updated successfully.</p>
            </form>    

</div>
</template> 

<script>
import axios from 'axios';
export default {
  name: 'modify-time',
  data(){
    return {
      fk_installer_id: '',
      hours: '',
      selectedRole: {}
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'installers/hours/update',
        data: {
          installers_hours_id: this.selectedRole.installers_hours_id,
          reg_hours_worked: this.selectedRole.reg_hours_worked,
          ot_hours_worked: this.selectedRole.ot_hours_worked,
          work_date: this.selectedRole.work_date
         
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
    fk_installer_id(id) {
      [this.selectedRole] = this.hours.filter(r => r.installers_hours_id === id);
    }
  },
  beforeMount(){
    axios({
      method: 'get',
      url: '/installers/hours'
    })
    .then(req => {
      this.hours = req.data.installer_hours;
      console.log(req.data.installer_hours);
    })
    .catch(err => {
      
    })
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
form{
  margin-top: 30px;
}
.inputField{
    background-color: #fff;
    font-family: Open Sans,Arial,sans-serif;
    line-height: normal!important;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 0;
    padding: 12px 18px 11px;
    width: 100%;
}
.inputField:focus{
  outline: none;
}
.input_heading{
    color: #afaeb0;
    
    margin-top: 30px;
    
    
   

}
.button{
    color: #fff;
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    padding: 9px;
    margin-top: 20px;
   

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