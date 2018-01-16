<template>
	  <div class="mainDiv">
          <div  class="header">
            <ul>
               <li v-if="user.roll == 'Admin' || 'Project Coordinator'"><a class="header_a" v-on:click="$parent.updateView('add-bonus')">Add Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('paid-bonus')">Paid Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('bonus-schedule')"  style="color:#4bc800">Unpaid Bonus</a></li>

               <li><a class="header_a" v-on:click="$parent.updateView('all-bonus')">All Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('create-payments')">Modify Bonus</a></li>
            </ul>
          </div>     
      
      
          <div  class="container">
                    <div class="row custyle">
                        <table class="table table-striped custab">
                              <thead>
                                  <tr>
                                      <th>Scheduled Payment </th>
                                      <th>Scheduled Date</th>   
                                      <th class="text-center">Modify</th>
                                      <th class="text-center">Delete</th>
                                  </tr>
                              </thead>
                                <tr v-for="bonus in bonuses">
                                      <td>{{ bonus.scheduled_payment_amount }}</td>
                                      <td>{{ date(bonus.scheduled_pay_date) }}</td> 
                                      <td class="text-center"><a href="#" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> Edit
                                        </a>
                                      </td>                                                                                               
                                      <td class="text-center"><a href="#"  @click="deletebonus(bonus)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
                                </tr>
                                
                        </table>
                    </div>
              </div>

    </div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'date-fns/format';

export default {
  name: 'bonus-schedule',
  props: ["user"],
  data() {
    return {
      bonuses: '',
      dates: ''
    }
  },
  methods: {
   deletebonus (bonus) {
      axios({
        method: 'delete',
        url: '/installers/payments/delete',
        data: {
          payment_id: bonus.payment_id
        }
      })
      .then(req => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      })
   } ,
   getData: function(){
    axios.get('/installers/payments')
      .then(req => {
        this.bonuses = req.data.installer_payments;
        console.log(req.data.installer_payments);
      })
    },
    date: function(d) {
      return dateFormat(d, ["YYYY-MM-DD"])
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
  th{
    text-align: center;
  }
  td{
    padding: 8px;
    line-height: 1.42857143;
    text-align: center;
    border-top: 1px solid #ddd;
}  

.header{
  border-bottom: 1px solid #ebebeb;
    
}
table{
  width: 91%;
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
    padding-left: 4%;
    padding-right: 4%;
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
