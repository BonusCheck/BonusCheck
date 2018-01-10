<template>
	<div class="mainDiv">
      <div  class="header">
        <ul>
            <li><a v-on:click="$parent.updateView('add-hours')" >Enter Time Worked</a></li>
           <!-- <li><a v-on:click="$parent.updateView('')">Approve Time</a></li> -->
           <li><a v-on:click="$parent.updateView('view-time')" >View time</a></li>
           <li><a v-on:click="$parent.updateView('modify-time')">Modify time</a></li>
           <li><a v-on:click="$parent.updateView('approve-time')" style="color:#4bc800">Approve time</a></li>
                       
        </ul>
        <h1>Approve time</h1>
      </div>
</div>
</template> 

<script>

export default {
  name: 'approve-time'
 
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
      padding-left: 6%;
    padding-right: 6%;
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