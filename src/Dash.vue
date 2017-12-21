<template>
  <side-bar></side-bar>
</template>

<script>
import sidebar from './sidebar';

const axios = require('axios');

export default {
  name: 'Dash',
  components: {
  	'side-bar': sidebar
  },
  data(){
  	return {
      user: {}
    }
  }, 
  methods: {

  },

  beforeMount(){
	 axios.get('/session-data')
	 .then(req => {
		  console.log(req.data);
      this.user = req.data;
	 })
	.catch(function(err){
		console.log(err);
	});
}
};

</script>


