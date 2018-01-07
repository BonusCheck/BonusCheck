<template>
	<div>
		<h1>Modify Roles</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-roles',
  data(){
  	return {

  	}
  },
  methods: {

  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/installers/roles'
  	})
  	.then(req => {

  	})
  	.catch(err => {
  		
  	})
  }
};
</script>
