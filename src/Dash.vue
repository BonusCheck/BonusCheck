<template>
  <div>

    <side-bar :user="user"></side-bar>
    <component :is="currentView" :user="user"></component> 
     
 
  </div>
</template>

<script>
import sidebar from './components/sidebar';
import addUser from './components/addUser';
import deleteUser from './components/deleteUser';
import addInstaller from './components/addInstaller';
import addHours from './components/addHours';
import bonusSchedule from './components/bonusSchedule';
import paymentHistory from './components/paymentHistory';
import createProject from './components/createProject';
import createCustomer from './components/createCustomer';
import createRoles from './components/createRoles';
import modifyRoles from './components/modifyRoles';
import modifyCustomer from './components/modifyCustomer';
import modifyProject from './components/modifyProject';
import modifyBonuses from './components/modifyBonuses';
import createPayments from './components/createPayments';
import modifyPayments from './components/modifyPayments';
import createPaymentTypes from './components/createPaymentTypes';
import modifyPaymentTypes from './components/modifyPaymentTypes';

const axios = require('axios');

export default {
  name: 'Dash',
  components: {
    'side-bar': sidebar,
    'add-user': addUser,
    'delete-user': deleteUser,
    'add-installer': addInstaller,
    'add-hours': addHours,
    'bonus-schedule': bonusSchedule,
    'payment-history': paymentHistory,
    'create-project': createProject,
    'create-customer': createCustomer,
    'create-roles': createRoles,
    'modify-roles': modifyRoles,
    'modify-customer': modifyCustomer,
    'modify-project': modifyProject,
    'modify-bonuses': modifyBonuses,
    'create-payments': createPayments,
    'modify-payments': modifyPayments,
    'create-payment-types': createPaymentTypes,
    'modify-payment-types': modifyPaymentTypes,
  },
  data(){
    return {
      user: '',
      buttons: [],
      currentView: ''
    }
  }, 
  methods: {
    updateView: function(view){
      this.currentView = view;
    }
  },

  beforeMount(){
   axios.get('/session/data')
   .then(req => {
      console.log(req.data.roll);
      this.user = req.data.username;

      //If no session received, return home
      if(!req.data.roll){
        this.$router.push('/');
      }

      if(req.data.roll === 'Admin'){
        this.buttons.push(
          {
            name: 'Add user',
            link: 'add-user'
          },
          {
            name: 'Delete user',
            link: 'delete-user'
          },
          {
            name: 'Add installer',
            link: 'add-installer'
          },
          {
            name: 'View transaction logs'
          },
          {
            name: 'Enter time worked',
            link: 'add-hours'
          },
          {
            name: 'View project data'
          },
          {
           name: 'View bonus schedule',
           link: 'bonus-schedule' 
          },
          {
            name: 'View bonus history'
          },
          {
            name: 'View payment history',
            link: 'payment-history'
          },
          {
            name: 'Approve time'
          },
          {
            name: 'Create a project',
            link: 'create-project'
          },
          {
            name: 'Create a customer',
            link: 'create-customer'
          },
          {
            name: 'Create roles',
            link: 'create-roles'
          },
          {
            name: 'Modify roles',
            link: 'modify-roles'
          },
          {
            name: 'Modify project',
            link: 'modify-project'
          },
          {
            name: 'Modify bonuses',
            link: 'modify-bonuses'
          },
          {
            name: 'Create payments',
            link: 'create-payments'
          },
          {
            name: 'Modify payments',
            link: 'modify-payments'
          },
          {
            name: 'Create payment types',
            link: 'create-payment-types'
          },
          {
            name: 'Modify payment types',
            link: 'modify-payment-types'
          }
        );
      }
      console.log(this.buttons);
   })
  .catch(function(err){
    console.log(err);
  });
},
mounted (){
  
  ////


   ///// 
  }



};

</script>

