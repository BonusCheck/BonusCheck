<template >
	
    <div class="mainDiv"> 
		<!-- <h1>Create a Customer</h1> -->
    <div  class="header">
      <ul>
            <li><a v-on:click="$parent.updateView('create-customer')"  style="color:#4bc800">Add customer</a></li>
            <li><a v-on:click="$parent.updateView('view-customer')"  >View customer</a></li>
            <li><a v-on:click="$parent.updateView('modify-customer')" >Modify customer</a></li>
          </ul>
     </div> 
    
		<form v-on:submit.prevent="onSubmit">
      <div class="row row1">
            <div class="col-md-6">
      		   	<input class="inputField" type="text" name="customer_name" placeholder="Enter customer name..." v-model.trim="customer_name" required>
            </div>
            <div class="col-md-3">  
              <button class="button " type="submit" value="Submit">Submit</button>
      		  </div>  
      </div>  
		</form>
      <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Customer added successfully.</p>

      <div class="row row2">
        <p class="paragraph" style="display: block;">
          <strong>Create a customer</strong> and add it to a project on Project Edit Page. <br>
          This will allow you to <strong>filter and group</strong> your time by clients in reports.
        </p>  
        
        
       
      </div>
	</div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-customer',
  props: ['user'],
  data(){
    return {
      customer_name: '',
      created_by_id: this.user.userID,
      modified_by_id: this.user.userID
    }
  },
  methods: {
    onSubmit: function(){
      console.log(this.customer_name);
      axios({
        method: 'post',
        url: '/customers/add',
        data: {
        customer_name: this.customer_name,
        created_by_id: this.created_by_id,
        modified_by_id: this.modified_by_id
      }
      })
      .then(req => {
       if(req.status===200){
          $('.inputField').val('');
          document.getElementById('confirmation').classList.remove('hidden');
          console.log('Customer added!');
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
     margin-left: 18%;
     margin-top: 7%;
     margin-right: 7%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     background-color: #fff;
     font-size: 16px;
     padding: 40px;

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
.button{
    color: #fff;
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    padding: 9px;
    margin-left: -30px;
    width: 85%;

}
.button:focus{
  outline-color:  #4bc800;

}
.row1{
  margin-left: 26%;

}
.row2{

}
.paragraph{
    margin-top: 40px;
    color: #afaeb0;
    text-align: center;
    line-height: 1.5;
    margin-left: 3%;
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
    padding-right: 7%;
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