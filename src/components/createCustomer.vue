<template>
	<div>
		<h1>Create a Customer</h1>

		<form v-on:submit.prevent="onSubmit">
		   	<input type="text" name="customer_name" placeholder="Enter Customer Name" v-model.trim="customer_name" required>
		    <input type="submit" value="Submit">
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-customer',
  props: ['user'],
  data(){
    return {
      customer_name: '',
      created_by_id: this.user.userID,
      modified_by_id: this.user.userID
    }
  },
  methods: {
    onSubmit: function(){
      console.log(this.customer_name);
      axios({
        method: 'post',
        url: '/customers/add',
        data: {
        customer_name: this.customer_name,
        created_by_id: this.created_by_id,
        modified_by_id: this.modified_by_id
      }
      })
      .then(req => {
        if(req.data.ok){
          console.log('Customer added!');
        };
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  beforeMount(){
  	console.log(this);
  }
};
</script>