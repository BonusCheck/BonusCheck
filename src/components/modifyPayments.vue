<template>
	<div class="mainDiv">
  <div  class="header">
    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment History</a></li>
            <li><a v-on:click="$parent.updateView('create-payments')">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payments')" style="color:#4bc800">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments Types</a></li>
            <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li>
          </ul>
      </div>    
		<h1>Modify Payments</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-payments',
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/payments'
  	})
  	.then(req => {
  		
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>
<style scoped>

.mainDiv{
     margin-top: 7%;
     margin-right: 7%;
     margin-left: 18%;
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
    padding-left: 7%;
    padding-right: 8%;
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