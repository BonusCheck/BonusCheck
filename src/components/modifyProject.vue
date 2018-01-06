<template>
	<div>
		<h1>Modify a Project</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-project',
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/jobs'
  	})
  	.then(req => {
  		console.log(req.data);
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>