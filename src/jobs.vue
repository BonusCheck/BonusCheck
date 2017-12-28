<template v-for="job in jobs">
	<div class="col-md-4">
		<h1>{{job.id}}</h1>
		<h3>{{job.text}}</h3>                               
    </div>
</template>

<script>
	export default {
		name: 'jobs',
		computed: {
		}
	}
</script>