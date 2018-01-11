<template>
	<div class="mainDiv">
      <div  class="header">
  	    <ul>
              <li><a v-on:click="$parent.updateView('payment-history')">View Payment </a></li>
              
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
              </div> 
          </form>
          <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Payment type added successfully.</p> 
          <p class="paragraph" style="display: block;">Creat payment type</p>    
		
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-payment-types',
  props: ['user'],
  data(){
  	return {
  		payment_type: '',
      created_by_id: this.user.userID,
      modified_by_id: this.user.userID
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: '/payment-types/add',
  			data: {
  				created_by_id: this.user.userID,
  				modified_by_id: this.user.userID,
  				payment_type: this.payment_type
  			}
  		})
  		.then(req => {
        if(req.status===200){
          $('.inputField').val('');
  			document.getElementById('confirmation').classList.remove('hidden');
  			
      };
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  },
  beforeMount(){
    console.log(this);
  }



};
</script>
<style scoped>

.mainDiv{
     margin-left: 12%;
     margin-top: 5%;
     margin-right: 5%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
    
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}
form{
  margin-top: 30px;
}
.inputField{
    background-color: #fff;
    font-family: Open Sans,Arial,sans-serif;
    line-height: normal!important;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 0;
    padding: 12px 18px 11px;
    width: 100%;
}
.inputField:focus{
  outline: none;
}
.input_heading{
    color: #afaeb0;
    margin-top: 10px;
    
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
    padding-left: 6%;
    padding-right: 6%;
    padding-bottom: 2%;
    padding-top: 2%;
    text-align: center;
    border-bottom: 3px solid transparent;
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
