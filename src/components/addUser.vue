<template>
  <div>
    <form action="/user/add">
    	<input type="text" name="user_name" placeholder="Enter username">
    	<input type="text" name ="password" placeholder="password">
    	<input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>

export default {
  name: "add-user",
  props: ["user"],
  beforeMount(){
  	console.log(this);
  }
}; 
</script>
