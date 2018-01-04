<template>
  <div>
    <h1>Add Installer</h1>
    <form method="post" action="/installers/add">
    	<input type="hidden" name="created_by_id" :value="this.user">
      <input type="hidden" name="modified_by_id" :value="this.user">
      <input type="text" name="first_name" placeholder="First name" required>
      <input type="text" name="last_name" placeholder="Last name" required>
      <input type="text" name="current_wage" placeholder="Current wage" required>
      <select name="fk_installer_role_id" placeholder="Role" required>
        <option value="Installer">Installer</option>
        <option value="Project Coordinator">Project Coordinator</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Admin">Admin</option>
      </select>
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
