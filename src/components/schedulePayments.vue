<template>
	<div>
		<h1>Schedule a Payment</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
      <p>Scheduled pay date</p>
      <input type="date" v-model="scheduled_pay_date">
      <p>Scheduled payment amount</p>
      <input type="number" v-model.number="scheduled_payment_amount">
      <p>Installer</p>
      <select v-model.number="fk_installer_id">
        <option v-for="installer in installers" v-bind:value="installer.installer_id">
          {{installer.first_name}} {{installer.last_name}}
        </option>
      </select>
      <p>Payment type</p>
      <select v-model="fk_payment_type_id">
        <option v-for="payment_type in payment_types" v-bind:value="payment_type.payment_type_id">
          {{payment_type.payment_type}}
        </option>
      </select>
      <p>Jobs</p>
      <select v-model="fk_job_id">
        <option v-for="job in jobs" v-bind:value="job.job_id">
          {{job.job_name}}
        </option>
      </select>

      <input type="submit" value="Submit">
      <p class="hidden" id="confirmation">Payment scheduled</p>
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
      url: '/installers'
    })
    .then(req => {
      this.installers = req.data.installers;
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