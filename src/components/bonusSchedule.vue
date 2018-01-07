<template>
	<div>
		<h1>Bonus Schedule</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'bonus-schedule',
  beforeMount(){
  	axios.get('/installers/payments')
  	.then(req => {
  		console.log(req.data.bonuses);
  	})
  }
};
</script>
