<template >
	
    <div class="mainDiv"> 
		<!-- <h1>Create a Customer</h1> -->
          <div  class="header">
            <ul>
                  <li><a class="header_a" v-on:click="$parent.updateView('create-customer')">Add customer</a></li>
                  <li><a class="header_a" v-on:click="$parent.updateView('view-customer')" style="color:#4bc800" >View customer</a></li>
                  <li><a class="header_a" v-on:click="$parent.updateView('modify-customer')" >Modify customer</a></li>
                </ul>
          </div> 
          <div  class="container">
                <div class="row  custyle">
                    
                        <table class="table table-striped custab">
                                  <thead>
                                      <tr>
                                          <th>CustomerID</th>
                                          <th>CustomerName</th>
                                          <th>DateCreated</th>
                                          <th>DateModified</th>
                                          <th class="text-center">Modify</th>
                                          <th class="text-center">Delete</th>
                                      </tr>
                                  </thead>
                                  <tr v-for="customer in customers">                             
                                      <td>{{ customer.customer_id }} </td>
                                      <td>{{ customer.customer_name }}</td>
                                      <td>{{ customer.date_created }}</td>
                                      <td>{{ customer.date_modified }}</td>
                                      <td class="text-center"><a href="#" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit
                                      </a>
                                      </td> 
                                      <td class="text-center"><a href="#" @click="deletecustomer(customer)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del
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
      name: 'view-customer',
      props: ["user"],
      data() {
        return {
          customer_id:'',
          customers: ''
        }
      },
    methods: {
       deletecustomer (customer) {
        // open the modal using the refs
         this.customer_id = customer.customer_id;
           axios({
            method: 'delete',
            url: '/customers/delete',
            data: {
              customer_id: this.customer_id
            }
          })
          .then(req => {
            this.customer_id = '';
            this.getData();
          })
          .catch(err => {
            console.log(err);
          })
       } ,
       getData: function(){
       axios.get('/customers')
        .then(req => {
          this.customers = req.data.customers;
          console.log(req.data.customers);
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
     margin-left: 12%;
     margin-top: 5%;
     margin-right: 5%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     /*height: 200px;*/
     background-color: #fff;
     font-size: 16px;
     padding: 40px;

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
table{
  width: 91%;
}
td{
    padding: 8px;
    line-height: 1.42857143;
    
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

.header_a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}  
</style>