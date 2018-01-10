<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment History</a></li>
            
            <li><a v-on:click="$parent.updateView('modify-payments')">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')" style="color:#4bc800">Create Payments Types</a></li>
            <!-- <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li> -->
          </ul>
       </div>   
		
		<form v-on:submit.prevent="onSubmit" id="form">
       <div class="row row1">
          <div class="col-md-8">
      			  <input class="input" type="text" v-model.trim="payment_type">
          </div> 
           <div class="col-md-3"> 
      			  <button class="button" type="submit" value="Submit">Submit</button>
           </div> 
           <div class="row">
    			    <p style="text-align:center;" class="hidden" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Payment type added</p>
           </div> 
           <div class="row">  
              <p class="paragraph">Create payment Types</p>
           </div> 
        </div>      
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
     margin-top: 7%;
     margin-right: 7%;
     margin-left: 18%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}
form{
  margin-top: 30px;
}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
.paragraph{
    margin-top: 40px;
    color: #afaeb0;
    text-align: center;
    line-height: 1.5;
    margin-right: 12%;
    font-weight: bold;
    font-size: 17px;
}
.row1{
  margin-left: 10%;

}
.input:focus{
  outline: none;
}
.input{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 12px 18px 12px;
    width: 100%;
}
.button{
    color: #fff;
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    padding: 12px;
    margin-left: -15px;
    width: 50%;
    margin-top: 14px;

}
.button:focus{
  outline-color:  #4bc800;

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
