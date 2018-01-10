<template>
	<div class="mainDiv">
   <div  class="header">
    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment History</a></li>
            <li><a v-on:click="$parent.updateView('create-payments')" style="color:#4bc800">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payments')">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments Types</a></li>
            <!-- <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li> -->
          </ul>
      </div>    
		 <p class="heading">Schedule a Payment</p>
        <form v-on:submit.prevent="onSubmit" id="form">
            <p class="input_heading">Scheduled pay date</p>
            <input class="inputField" type="date" v-model="scheduled_pay_date">
            <p class="input_heading">Scheduled payment amount</p>
            <input class="inputField" type="number" v-model.number="scheduled_payment_amount">
            <p class="input_heading">Installer</p>
            <select class="inputField" v-model.number="fk_installer_id">
              <option v-for="installer in installers" v-bind:value="installer.installer_id">
                {{installer.first_name}} {{installer.last_name}}
              </option>
            </select>
            <p class="input_heading">Payment type</p>
            <select class="inputField" v-model="fk_payment_type_id">
              <option v-for="payment_type in payment_types" v-bind:value="payment_type.payment_type_id">
                {{payment_type.payment_type}}
              </option>
            </select>
            <p class="input_heading">Jobs</p>
            <select class="inputField" v-model="fk_job_id">
              <option v-for="job in jobs" v-bind:value="job.job_id">
                {{job.job_name}}
              </option>
            </select>

            <button class="button" type="submit" value="Submit">Submit</button>
            <p style="text-align:center;" class="hidden" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Payment scheduled</p>
        </form>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-payments',
  props: ['user'],
  data(){ 
  	return {
		  scheduled_pay_date: '',
		  scheduled_payment_amount: '',
		  fk_installer_id: '',
		  fk_payment_type_id: '',
		  fk_job_id: '',
      installers: '',
      payment_types: '',
      jobs: ''
		}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: 'installers/payments/schedule/add',
  			data: {
          created_by_id: this.user.userID,
          modified_by_id: this.user.userID,
          scheduled_pay_date: this.scheduled_pay_date,
          scheduled_payment_amount: this.scheduled_payment_amount,
          fk_installer_id: this.fk_installer_id,
          fk_payment_type_id: this.fk_payment_type_id,
          fk_job_id: this.fk_job_id
  			}
  		})
      .then(req => {
        document.getElementById('confirmation').classList.remove('hidden');
        this.scheduled_pay_date = '';
        this.scheduled_payment_amount = '';
        this.fk_installer_id = '';
        this.fk_payment_type_id = '';
        this.fk_job_id = '';
      })
      .catch(err => {
        console.log(err);
      })
  	}
  },
  beforeMount(){
    //Get installers
    axios({
      method: 'get',
      url: '/installers/payments'
    })
    .then(req => {
      console.log(req.data)
    })
    .catch(err => {
      console.log(err);
    })

    //Get payment types
    axios({
      method: 'get',
      url: '/payment-types'
    })
    .then(req => {
      this.payment_types = req.data.payment_types;
    })
    .catch(err => {
      console.log(err);
    })

    //Get jobs
    axios({
      method: 'get',
      url: '/jobs'
    })
    .then(req => {
      this.jobs = req.data.jobs;
    })
    .catch(err => {
      console.log(err);
    })
  }
};
</script>
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
.heading{
    color: #afaeb0;
    text-align: center;
    line-height: 3.5;
    font-weight: bold;
    font-size: 20px;

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
    width: 20%;
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
    padding-left: 7%;
    padding-right: 8%;
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