<template>
  <div class="cd-side-nav">
			<ul>
				<li v-for="button in buttons">
					<a v-on:click="$parent.updateView(button.link)">{{button.name}}</a>
				</li>

				<!-- <li class="has-children Overviews">
					<button  class="button" onclick="openTab('dashboard')" > <i class="fa fa-th-large" ></i> </button>										
				</li>				
				<li class="has-children comments">
					<button  class="button" onclick="openTab('project')"><i class="fa fa-tasks"></i>{{user}}</button>										
				</li>

				<li class="has-children bookmarks">
					<button  class="button" onclick="openTab('tables')" ><i class="fa fa-table"></i> Tables</button>
					<ul>
						<li><a href="#0">option 1</a></li>
						<li><a href="#0">option 2</a></li>
						<li><a href="#0">option 3</a></li>
					</ul>
				</li>								
				<li class="has-children users">
					<button  class="button"  onclick="openTab('user')"><i class="fa fa-user"></i> User</button>				
					<ul>
						<li><a href="#0">All Users</a></li>
						<li><a href="#0">Edit User</a></li>
						<li><a href="#0">Add User</a></li>
					</ul>
				</li>
				<li class="has-children comments">
					<button  class="button" onclick="openTab('admin')" ><i class="fa fa-user-circle"></i> Admin</button>										
				</li> -->							
			</ul>
		</div>
</template>

<script>

export default {
  name: 'side-bar',
  props: ['buttons']
};

</script>