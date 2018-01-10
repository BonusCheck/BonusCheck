<template>
	  <div class="mainDiv">
          <div  class="header">
            <ul>
               <li><a class="header_a" v-on:click="$parent.updateView('add-bonus')">Add Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('paid-bonus')" style="color:#4bc800">Paid Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('bonus-schedule')"  >Unpaid Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('all-bonus')">All Bonus</a></li>
               <li><a class="header_a" v-on:click="$parent.updateView('create-payments')">Modify Bonus</a></li>
            </ul>
          </div>     
      
      
          <div  class="container">
                    <div class="row col-md-10 custyle">
                        <table class="table table-striped custab">
                              <thead>
                                  <tr>
                                      <th>Scheduled payment amount</th>
                                      <th>Scheduled Pay Date</th>
                                      <th>Total Bonus</th>
                                      <th>Date Paid</th>
                                      <th class="text-center">Action</th>
                                  </tr>
                              </thead>
                                <tr>
                                    <td>ddddd</td>
                                    <td>ddddd</td>
                                    <td>dddd</td>
                                    <td>dddd</td>
                                    <td class="text-center"><a href="#" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Del</a></td>
                                </tr>
                                
                        </table>
                    </div>
              </div>

    </div>
</template>

<script>

    export default {
      name: 'paid-bonus'
     
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
  td{
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
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
.header_a{
  color: #adadad;
  text-decoration: none;
  font-weight: bold;
}
</style>