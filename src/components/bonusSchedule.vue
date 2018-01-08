<template>
	<div>
		<h1>Bonus Schedule</h1>
    <div v-for="bonus in bonuses">
      <ul>Payment ID: {{ bonus.payment_id }}</ul>
      <li>Sheduled Pay Date: {{ bonus.scheduled_pay_date }}</li>
      <li>Total Bones: {{ bonus.payment_amount }}</li>
      <li>Date Paid: {{ bonus.date_paid }}</li>
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
