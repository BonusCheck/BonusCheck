<template>
	<div class="col-xs-12 col-sm-6">
		<div v-if="job">
			<p>Job #{{ job.id }}</p>
			<p>Job descriptoin: {{ job.text }}</p>
			<hr>	
		</div>
	</div>

</template>

<script>
export default {
	props: {
		job: {
			type: [Object, undefined]
		}
	}
}
</script>