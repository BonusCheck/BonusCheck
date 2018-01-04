<template>
	<div>
		<h1>Create a Customer</h1>

	<form method="post" action="/customers/add">
		<input type="hidden" name="created_by_id" :value="this.user">
    	<input type="hidden" name="modified_by_id" :value="this.user">
	   	<input type="text" name="customer_name" placeholder="Enter Customer Name" required>
	    <input type="submit" value="Submit">
	</form>
  </div>
</template>

<script>

export default {
  name: 'create-customer',
  props: ['user'],
  data() {
  	return {
  		customer_name: ''
  	}
  },
  	onSubmit() {

  	}
};
</script>