<template>
  <div >
    <side-bar :user="user"></side-bar>
    <component :is="currentView" :user="user" ></component> 
 
  </div>
</template>

<script>
import sidebar from './components/sidebar';
import viewRole from './components/viewRole';
import paidBonus from './components/paidBonus';
import allBonus from './components/allBonus';
import viewCustomer from './components/viewCustomer';
import viewInstaller from './components/viewInstaller';
import modifyInstaller from './components/modifyInstaller';
import addUser from './components/addUser';
import openJobs from './components/openJobs';
import closeJobs from './components/closeJobs';
import allJobs from './components/allJobs';
import addBonus from './components/addBonus';
import deleteUser from './components/deleteUser';
import addInstaller from './components/addInstaller';
import addHours from './components/addHours';
import viewTime from './components/viewTime';
import modifyTime from './components/modifyTime';
import approveTime from './components/approveTime';
import bonusSchedule from './components/bonusSchedule';
import paymentHistory from './components/paymentHistory';
import createProject from './components/createProject';
import createCustomer from './components/createCustomer';
import createRoles from './components/createRoles';
import modifyRoles from './components/modifyRoles';
import deleteRoles from './components/deleteRoles';
import modifyCustomer from './components/modifyCustomer';
import modifyProject from './components/modifyProject';
import modifyBonuses from './components/modifyBonuses';
import createPayments from './components/createPayments';
import modifyPayments from './components/modifyPayments';
import createPaymentTypes from './components/createPaymentTypes';
// import modifyPaymentTypes from './components/modifyPaymentTypes';
import schedulePayments from './components/schedulePayments'

const axios = require('axios');

export default {
  name: 'Dash',
  components: {
    'side-bar': sidebar,
    'add-user': addUser,
    'open-jobs': openJobs,
    'close-jobs': closeJobs,
    'all-jobs': allJobs,
    'paid-bonus': paidBonus,
    'all-bonus': allBonus,
    'add-bonus': addBonus,
    'delete-user': deleteUser,
    'view-customer': viewCustomer,
    'view-roles': viewRole,
    'view-installer': viewInstaller,
    'modify-installer': modifyInstaller,
    'add-installer': addInstaller,
    'add-hours': addHours,
    'view-time': viewTime,
    'modify-time': modifyTime,
    'approve-time': approveTime,
    'bonus-schedule': bonusSchedule,
    'payment-history': paymentHistory,
    'create-project': createProject,
    'create-customer': createCustomer,
    'create-roles': createRoles,
    'modify-roles': modifyRoles,
    'delete-roles': deleteRoles,
    'modify-customer': modifyCustomer,
    'modify-project': modifyProject,
    'modify-bonuses': modifyBonuses,
    'create-payments': createPayments,
    'schedule-payments': schedulePayments,
    'modify-payments': modifyPayments,
    'create-payment-types': createPaymentTypes,
    // 'modify-payment-types': modifyPaymentTypes,
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
    },
    logout: function(){
      console.log('In dash board');
    this.$router.push('/');
    }
  },

  beforeMount(){
  
	 axios.get('/session/data')
	 .then(req => {
      console.log(req.data);
      this.user = {
        userID: req.data.userID,
        installerID: req.data.installerID,
        username:req.data.username
      }
      //If no session received, return home
      if(!req.data.roll){
        this.$router.push('/');
      }

     
   })
  .catch(function(err){
    console.log("Error R"+err);
  });
},
mounted (){
  
  
  }



};

</script>

