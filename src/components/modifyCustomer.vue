<template>
	<div class="temp">
		<h1>Modify a Customer</h1>
    <p>Select customer to modify</p>
    <select v-model="customer_id">
      <option v-for="customer in customers" v-bind:value="customer.customer_id">
        {{customer.customer_name}}
      </option>
    </select>

    <form v-if="selectedRole.customer_id" v-on:submit.prevent="onSubmit">
      <input type="hidden" v-model="selectedRole.customer_id">
      <p>Customer name</p>
      <input type="text" v-model.trim="selectedRole.customer_name" required>
      <button class="button" type="submit" value="Submit">Create</button>
      <p class="hidden" id="confirmation">Customer updated</p>
    </form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-customer',
  props: ['user'],
  data(){
    return {
      customer_id: '',
      customers: '',
      selectedRole: {}
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'customers/update',
        data: {
          customer_id: this.selectedRole.customer_id,
          customer_name: this.selectedRole.customer_name,
          modified_by_id: this.user.userID
        }
      })
      .then(req => {
        console.log(req);
        document.getElementById('confirmation').classList.remove('hidden');
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    customer_id(id) {
      [this.selectedRole] = this.customers.filter(r => r.customer_id === id);
    }
  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/customers'
  	})
  	.then(req => {
  		this.customers = req.data.customers;
      console.log(this.customers);
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>

<style scoped>
  .temp {
  margin-left: 25%;
}
</style>