<template>
  <div>
    <form method="post" action="/installers/add">
    	<input type="hidden" name="created_by_id" value="">
      <input type="hidden" name="modified_by_id" value="">
      <input type="text" name="first_name" placeholder="First name" required>
      <input type="text" name="last_name" placeholder="Last name" required>
      <input type="text" name="current_wage" placeholder="Current wage" required>
      <input type="text" name="fk_installer_role_id" placeholder="Role" required>
    	<input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>

export default {
  name: "add-installer",
  props: ["user"]
}; 
</script>
