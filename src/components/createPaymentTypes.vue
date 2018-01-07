<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment History</a></li>
            <li><a v-on:click="$parent.updateView('create-payments')">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payments')">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li>
          </ul>
       </div>   
		<h1>Create Payment Types</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			<input type="text" v-model.trim="payment_type">
			<input type="submit" value="Submit">
			<p class="hidden" id="confirmation">Payment type added</p>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-payment-types',
  props: ['user'],
  data(){
  	return {
  		payment_type: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: '/payments/add',
  			data: {
  				created_by_id: this.user.userID,
  				modified_by_id: this.user.userID,
  				payment_type: this.payment_type
  			}
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
  			this.payment_type = '';
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
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
      padding: 0 27px;
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
}
</style>
