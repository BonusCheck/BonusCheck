<template>
	<div class="container">
		
		<div class="row">
			<app-joblist
				:jobs="jobs"
				
			></app-joblist>
			<app-jobdetails
				:job="job"
				
			></app-jobdetails>
		</div>
		
	</div>
</template>

<script>

import Servers from './components/Server/Servers.vue';
import ServerDetails from './';
export default {
	components: {
		"app-joblist": Servers,
		'app-jobdetails': ServerDetails
	},
	computed: {
    	jobs() {
	      return  [
	          {id: 0, text: 'Blow Me' },
	          {id: 1, text: 'Bathe me' }
	        ]
	    }
	}
}
</script>
