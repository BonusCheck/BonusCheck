<template>

	    <div class="mainDiv">
        <div  class="header">
          <ul>
            <li><a v-on:click="$parent.updateView('modify-bonuses')" >Modify Bonuses</a></li>
            <li><a v-on:click="$parent.updateView('')" >View Bonus History</a></li>
            <li><a v-on:click="$parent.updateView('bonus-schedule')" style="color:#4bc800">View Bonus Schedule</a></li>
          </ul>
         </div>       
      <div>
    <h1>Bonus Schedule</h1>
    <div v-for="bonus in bonuses">
      <ul>Payment ID: {{ bonus.payment_id }}</ul>
      <li>Sheduled Pay Date: {{ bonus.scheduled_pay_date }}</li>
      <li>Total Bones: {{ bonus.payment_amount }}</li>
      <li>Date Paid: {{ bonus.date_paid }}</li>
    </div>
  </div>
        </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'bonus-schedule',
  props: ["user"],
  data() {
    return {
      bonuses: ''
    }
  },
  beforeMount(){
  	axios.get('/installers/payments')
  	.then(req => {
      this.bonuses = req.data.installer_payments;
  		console.log(req.data.installer_payments);
  	})
  }
};

</script>


<style scoped>

.mainDiv{
     margin:150px 50px 0 200px;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
      padding: 0 90px;
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
