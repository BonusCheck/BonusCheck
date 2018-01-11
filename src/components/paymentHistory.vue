<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')" style="color:#4bc800">View Payment </a></li>
            
            <li><a v-on:click="$parent.updateView('modify-payments')">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments Types</a></li>
            <!-- <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li> -->
          </ul>
      </div>
      <div  class="container">
                <div class="row col-md-10 custyle">
                    <table class="table table-striped custab">
                          <thead>
                              <tr>
                                  <th>PaymentID</th>
                                  <th>PaymentType</th>
                                  <th>DateCreated</th>
                                  <th>DateModified</th>
                                  <th class="text-center">Action</th>
                              </tr>
                          </thead>
                            <tr v-for="payment in payments">
                            
                                <td>{{ payment.payment_type_id }} </td>
                                <td>{{ payment.payment_type }}</td>
                                <td>{{ payment.date_created }}</td>
                                <td>{{ payment.date_modified }}</td>
                                <td class="text-center"><a href="#" @click="deletepayment(payment)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del
                                </a>
                                </td>
                              
                            </tr>
                         
                    </table>
                </div>
          </div>    
		
	</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'payment-history',
      props: ["user"],
      data() {
        return {
          payment_type_id:'',
          payments: ''
        }
      },
    methods: {
       deletepayment (Payment) {
        // open the modal using the refs
         this.payment_type_id = payment.payment_type_id;
           axios({
            method: 'delete',
            url: '/payment-types/delete',
            data: {
              payment_type_id: this.payment_type_id
            }
          })
          .then(req => {
            this.payment_type_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/payment-types')
        .then(req => {
          this.payments = req.data.payment_types;
          console.log(req.data.payments);
        })
     }   
      },
      beforeMount(){
        this.getData(); 
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
.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
  tr:nth-child(even){
      background-color: #f9f9f9;
    }
.header{
  border-bottom: 1px solid #ebebeb;
    
}
td{
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
    text-align: center;
}
th{
  text-align: center;
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
    padding-left: 5%;
    padding-right: 5%;
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
