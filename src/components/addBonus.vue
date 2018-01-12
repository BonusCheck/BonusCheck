<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('add-bonus')" style="color:#4bc800">Add Bonus</a></li>
           <li><a v-on:click="$parent.updateView('paid-bonus')">Paid Bonus</a></li>
           <li><a v-on:click="$parent.updateView('bonus-schedule')" >Unpaid Bonus</a></li>
           <li><a v-on:click="$parent.updateView('all-bonus')">All Bonus</a></li>
           <li><a class="header_a" v-on:click="$parent.updateView('create-payments')">Modify Bonus</a></li>
        </ul>
      </div>  
		
		<form v-on:submit.prevent="onSubmit" id="form">
     
        			  <p class="input_heading">Installer Name</p>
            		<select class="inputField" v-model="fk_installer_id" required>
                    <option value='' placeholder="Choose a role"></option>
                    <option v-for="installer in installers" v-bind:value="installer.installer_id">
                     {{installer.first_name}} {{installer.last_name}}
                   </option>
                </select>
          
                <p class="input_heading">Job name</p>
                <select class="inputField" v-model="fk_job_id" required>
                    <option value='' placeholder="Choose a role"></option>
                    <option v-for="job in jobs" v-bind:value="job.job_id">
                      {{job.job_name}}
                   </option>
                </select>
          
                <p class="input_heading">Scheduled pay date</p>
                    <input  class="inputField" type="date" v-model="scheduled_pay_date">

                 <p class="input_heading">Scheduled payment amount</p>

                <input  step="0.01" class="inputField" type="number" v-model.number="scheduled_payment_amount">

                <p class="input_heading">Actual pay date</p>
                    <input  class="inputField" type="date" v-model="date_paid">
              
                <p class="input_heading">Actual Payment</p>
                		<input  class="inputField" type="number" v-model.number="payment_amount">
              
               
            	
                    

            		<p class="input_heading">Payment type</p>
            		<select class="inputField" v-model="fk_payment_type_id" required>
                    <option value='' placeholder="Choose a role"></option>
                    <option v-for="payment_type in payment_types" v-bind:value="payment_type.payment_type_id">
                      {{payment_type.payment_type}}
                   </option>
                </select>
          
         
            		<button class="button" type="submit" value="Submit">Add</button>
            		<p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Bonus added</p>
    </form>
	</div>
</template>

<script>
    import axios from 'axios';
    export default {
      name: 'add-bonus',
       props: ['user'],
     data() {
        return {
          installers: '',
          payment_types: '',
          jobs:'',
          fk_installer_id:'',
          fk_payment_type_id:'',
          fk_job_id:'',
          scheduled_payment_amount:'',
          payment_amount:'',
          scheduled_pay_date:'',
          date_paid:'',
          created_by_id:'', 
          modified_by_id:''
        }
      },
      methods: {
        onSubmit: function(){
          axios({
            method: 'post',
            url: '/installers/payments/schedule/add',
            data: {
              fk_installer_id:this.fk_installer_id,
              fk_payment_type_id: this.fk_payment_type_id,
              fk_job_id: this.fk_job_id,
              scheduled_payment_amount: this.scheduled_payment_amount,
              payment_amount: this.payment_amount,
              scheduled_pay_date: this.scheduled_pay_date,
              date_paid: this.date_paid,
              created_by_id:this.user.userID, 
              modified_by_id:this.user.userID
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
       beforeMount(){

      //Get installer list
        axios.get('/installers')
        .then(req => {
          this.installers = req.data.installers;
          console.log(req.data.installers);
        })

         //Get installer list
        axios.get('/jobs')
        .then(req => {
          this.jobs = req.data.jobs;
          console.log(req.data.jobs);
        })

          //Get installer list
        axios.get('/payment-types')
        .then(req => {
          this.payment_types = req.data.payment_types;
          console.log(req.data.payment_types);
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
.heading{
    color: #afaeb0;
    text-align: center;
    line-height: 3.5;
    font-size: 18px;

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
    width: 15%;
}
.inputField{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 8px 18px 8px;
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
    padding-left: 4%;
    padding-right: 4%;
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