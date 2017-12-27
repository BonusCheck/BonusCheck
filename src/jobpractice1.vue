<template>
	<div class="col-xs-12 col-sm-6">
		<ul class="list-group">
			<li
				class="list-group-item"
				v-for="job in jobs">
					Job #{{ server.id }}
					Description {{job.text}}
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props: {
		jobs: {
			type: Array,
			required: true
		}
	},
}
</script>
