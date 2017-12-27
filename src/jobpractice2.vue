<template>
	<div class="container">
		
		<div class="row">
			<app-servers
				:servers="servers"
				@clickedServer="server = $event"
			></app-servers>
			<app-server-details
				:server="server"
				@changedStatus="updateServer"
			></app-server-details>
		</div>
		
	</div>
</template>

<script>

import Servers from './components/Server/Servers.vue';
import ServerDetails from './components/Server/ServerDetails.vue';
export default {
	components: {
		
		"app-servers": Servers,
		'app-server-details': ServerDetails,
	
	},
	data() {
		return {
			server: undefined,
			servers: [
				{id: 1, status: "Normal"},
				{id: 2, status: "Critical"},
				{id: 3, status: "Unknown"},
				{id: 4, status: "Normal"},
				{id: 5, status: "Normal"},
			]
		};
	},
	methods: {
		updateServer(server) {
			this.server.status = server.status;
		}
	}
}
</script>
