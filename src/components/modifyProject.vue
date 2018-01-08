<template>
	<div class="mainDiv">
    <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')">Enter Time Worked</a></li>
           <li><a v-on:click="$parent.updateView('')">Approve Time</a></li>
           <li><a v-on:click="$parent.updateView('create-project')">Create Project</a></li>
           <li><a v-on:click="$parent.updateView('modify-project')">Modify project</a></li>
            
        </ul>
      </div>
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
<style scoped>

.mainDiv{
     margin:90px 50px 0 200px;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
      padding: 0 60px;
    line-height: 4;
    border-bottom: 3px solid transparent;
    margin-bottom: -10px;
}
li:active{
  border-color:#4bc800; 
}

li:hover{
  border-color: #929292;
}
a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}
</style>