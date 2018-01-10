<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
            <li><a v-on:click="$parent.updateView('modify-bonuses')"  style="color:#4bc800">Modify Bonuses</a></li>
            <li><a v-on:click="$parent.updateView('')"  >View Bonus History</a></li>
            <li><a v-on:click="$parent.updateView('bonus-schedule')"  >View Bonus Schedule</a></li>
          </ul>
     </div>     
		<h1>Modify Bonuses</h1>
    <div class="row">
        <div class="col-md-10">
            <select class="input" v-model="payment_id">
              <option v-for="bonus in bonuses" v-bind:value="bonus.payment_id">
                {{bonus.payment_id}}
              </option>
            </select> 
          <form v-if="selectedPayment.payment_id" v-on:submit.prevent="onSubmit">
            <input type='hidden' v-model="selectedPayment.fk_payment_type_id">
            <input type="hidden" v-model="selectedPayment.payment_id">
            <p>Scheduled Payment Date</p>
            <input type="date" name="scheduled_pay_date" v-model="selectedPayment.scheduled_pay_date">
            <p>Payment Amount</p>s
            <input type="number" name="payment_amount" v-model="selectedPayment.payment_amount">
            <p>Date Paid</p>
            <input type="date" name="date_paid" v-model="selectedPayment.date_paid">
            <input type="submit" value="Submit">
          </form>
      </div>
        </div>    
    </div> 
	</div>
</template>

<script>

import axios from 'axios';
export default {

  name: 'modify-bonuses',
  props: ["user"],
  data() {
    return {

      bonuses: '',
      payment_id: '',
      selectedPayment: {}
    }
  },

  watch: {
    payment_id(id) {
      [this.selectedPayment] = this.bonuses.filter(r => r.payment_id === id);
    }
  },

  beforeMount() {
    axios.get('/installers/payments')
    .then(req => {
      this.bonuses = req.data.installer_payments;
      console.log(req.data.installer_payments);
    })
  },

  methods: {
    onSubmit: function(){
      
      axios({
      method: 'put',
      url: '/payments/update',
      data: {
      
      payment_type_id: this.selectedPayment.fk_payment_type_id,
      scheduled_pay_date: this.selectedPayment.scheduled_pay_date,
      payment_amount: this.selectedPayment.payment_amount,
      date_paid: this.selectedPayment.date_paid,
      modified_by_id: this.user.userID,
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