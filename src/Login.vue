<template>
  <div class="overlay">
     <div class="opacity"> 
	    <!-- Navbar starts -->       
	    <nav class="navbar navbar-fixed-top">
		    <div class="container">		       
	            <a class="navbar-brand " href="index.html"><img style="margin-top:5px;" src="/dist/assets/images/logo-web3.gif"></a>
	           	<button  class="navbar-toggle" data-toggle="collapse" data-target="#navbar-item"  >
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		        </button>		          
			    <div id="navbar-item" class="collapse  navbar-collapse">
			          <ul class="nav navbar-nav navbar-right">
			            <li ><router-link :to="'home'">Home</router-link></li>
			            <li><a   href="#">Contact</a></li>
			            <li ><a  href="#"><router-link :to="'signup'"  >Sign up</router-link></a></li>
			            <li><button class=" btn-danger navbar-btn "><a style="color: #fff;" href="#">Log in</a></button></li>
			          </ul>
			    </div><!--/.nav-collapse -->
	        </div>
	    </nav>
	    <!-- Navbar END -->
			      			      		        
	    <div class="row">
			<!-- <div class="col-md-6 col-sm-6 title">
	            	<h1>Lorem ipsum dolor </h1>
	            	<h2 class="home-hero-subtitle">
	                   elit scripta suavitate his ea dico veritus no usu
	                    <a target="_blank" href="/employee-recognition-guide">transform employee recognition</a>
	                </h2>
	                		    	
			</div> -->
		    <div class="col-md-12 col-sm-12 login-col">
				<section id="content">
					<form v-on:submit.prevent="onSubmit" id="form">
						<h1>Login </h1>
						<div>
							<input type="text" placeholder="Username" required id="username" v-model.trim="username"/>
						</div>
						<div>
							<input type="password" placeholder="Password" required id="password" v-model.trim="password"/>
						</div>
						<div>
							<p id="error" class="hidden">Login failed!</p>
						</div>
						<div>
							<input type="submit" class="login" value="Log in" />
							<a style="color: #FF0000 ;" href="#">
								Forgot password?
							</a>							
						</div>
					</form><!-- form -->			
				</section><!-- content -->
			</div>	
	    </div>
    </div>
   </div> 
</template>

<script>
const axios = require('axios');

export default {
  name: 'login',
  data(){
  	return {
  		username: '',
  		password: '',
  		valid: '',
  	}
  },
  watch: {
  	valid(valid){
  		if(!valid){
  			document.getElementById('error').classList.remove('hidden');
  		}
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: '/auth',
  			data: {
  				user_name: this.username,
  				password: this.password
  			}
  		})
  		.then(req => {
  			this.$router.push('/dash');
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  },
  beforeMount(){
  	axios.get('/session/data')
  	.then(req => {
  		if(req.data.roll){
  			this.$router.push('/dash')
  		}
  	});
  }
};
</script>



<style scoped>
	.overlay{
	   
	background-image: url("/dist/assets/images/5.jpg");
	background-color: rgba(0, 0, 0, 0.5);
    background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: fixed;
    top:0;
    bottom: 0;
	height:100%;
	z-index: -10;
	width:100%;
	}
	.opacity{
		position: absolute;
		background-color: rgba(0,0,0,0.5);
	    top:0;
	    bottom: 0;
		height: 100%;
		width: 100%;
		z-index: -5;
	}


	/*NAVBAR START*/
	.navbar-brand{
		margin-top: -10px;
		
	}
	.navbar{
		background-color: #fff;
		position: fixed;
		font-weight: 800;
		letter-spacing: -1px;
		margin-top: 20px;
	}
	.nav li a{
		color: #000;
		font-size: 20px;
			
	}
	.nav li a:hover {
	text-decoration: none;
	}


	.title{
	   
	   margin-top: 260px;
	   text-align: center;
	}
	.title h1{
		font-size: 45px;
		line-height: 45px;
		color: #fff;
		font-weight: 800;
		letter-spacing: -1px;
		
	}
	.title h2{
		font-size: 27px;
		font-weight: bold;
		line-height: 27px;
		letter-spacing: -0.5px;
		color: #C0C0C0;

	}
	.title a{
		color: inherit;
		text-decoration: underline;

	}

	.btn-danger{
		border-radius: 10px;
		font-weight: 800;	
		line-height: 1.7;
		margin-left: 40px;
		font-size: 18px;
		width: 80%;
	}
    .navbar-toggle span{
		background-color: #000;
	}
	
	/*NAVBAR END*/


	/*LOGIN BOX START*/
	h1{ font-size:28px;}
	h2{ font-size:26px;}
	h3{ font-size:18px;}
	h4{ font-size:16px;}
	h5{ font-size:14px;}
	h6{ font-size:12px;}
	h1,h2,h3,h4,h5,h6{ color:#563D64;}
	small{ font-size:10px;}
	b, strong{ font-weight:bold;}
	a{ text-decoration: none; }
	a:hover{ text-decoration: underline; }
	.left { float:left; }
	.right { float:right; }
	.alignleft { float: left; margin-right: 15px; }
	.alignright { float: right; margin-left: 15px; }
	.clearfix:after,
	form:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}


	#content {
		background: #f9f9f9;
		background: -moz-linear-gradient(top,  rgba(248,248,248,1) 0%, rgba(249,249,249,1) 100%);
		background: -webkit-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: -o-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: -ms-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f8f8f8', endColorstr='#f9f9f9',GradientType=0 );
		-webkit-box-shadow: 0 1px 0 #fff inset;
		-moz-box-shadow: 0 1px 0 #fff inset;
		-ms-box-shadow: 0 1px 0 #fff inset;
		-o-box-shadow: 0 1px 0 #fff inset;
		box-shadow: 0 1px 0 #fff inset;
		border: 1px solid #c4c6ca;
		margin: 0;
		padding: 65px 0 0;
		position: relative;
		text-align: center;
		text-shadow: 0 1px 0 #fff;
		width: 33%;
	    margin-left: 33%;
	    margin-top: 15%;


	}
	#content h1 {
		color: #7E7E7E;
		font: bold 25px Helvetica, Arial, sans-serif;
		letter-spacing: -0.05em;
		line-height: 20px;
		margin: 10px 0 30px;
	}
	#content h1:before,
	#content h1:after {
		content: "";
		height: 1px;
		position: absolute;
		top: 10px;
		width: 27%;
	}
	#content h1:after {
		background: rgb(126,126,126);
		background: -moz-linear-gradient(left,  rgba(126,126,126,1) 0%, rgba(255,255,255,1) 100%);
		background: -webkit-linear-gradient(left,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: -o-linear-gradient(left,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: -ms-linear-gradient(left,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: linear-gradient(left,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
	    right: 0;
	}
	#content h1:before {
		background: rgb(126,126,126);
		background: -moz-linear-gradient(right,  rgba(126,126,126,1) 0%, rgba(255,255,255,1) 100%);
		background: -webkit-linear-gradient(right,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: -o-linear-gradient(right,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: -ms-linear-gradient(right,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
		background: linear-gradient(right,  rgba(126,126,126,1) 0%,rgba(255,255,255,1) 100%);
	    left: 0;
	}
	#content:after,
	#content:before {
		background: #f9f9f9;
		background: -moz-linear-gradient(top,  rgba(248,248,248,1) 0%, rgba(249,249,249,1) 100%);
		background: -webkit-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: -o-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: -ms-linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		background: linear-gradient(top,  rgba(248,248,248,1) 0%,rgba(249,249,249,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f8f8f8', endColorstr='#f9f9f9',GradientType=0 );
		border: 1px solid #c4c6ca;
		content: "";
		display: block;
		height: 100%;
		left: -1px;
		position: absolute;
		width: 100%;
	}
	#content:after {
		-webkit-transform: rotate(2deg);
		-moz-transform: rotate(2deg);
		-ms-transform: rotate(2deg);
		-o-transform: rotate(2deg);
		transform: rotate(2deg);
		top: 0;
		z-index: -1;
	}
	#content:before {
		-webkit-transform: rotate(-3deg);
		-moz-transform: rotate(-3deg);
		-ms-transform: rotate(-3deg);
		-o-transform: rotate(-3deg);
		transform: rotate(-3deg);
		top: 0;
		z-index: -2;
	}
	#content form { margin: 0 20px; position: relative }
	#content form input[type="text"],
	#content form input[type="password"] {
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		-ms-border-radius: 3px;
		-o-border-radius: 3px;
		border-radius: 3px;
		-webkit-box-shadow: 0 1px 0 #fff, 0 -2px 5px rgba(0,0,0,0.08) inset;
		-moz-box-shadow: 0 1px 0 #fff, 0 -2px 5px rgba(0,0,0,0.08) inset;
		-ms-box-shadow: 0 1px 0 #fff, 0 -2px 5px rgba(0,0,0,0.08) inset;
		-o-box-shadow: 0 1px 0 #fff, 0 -2px 5px rgba(0,0,0,0.08) inset;
		box-shadow: 0 1px 0 #fff, 0 -2px 5px rgba(0,0,0,0.08) inset;
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-ms-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
		background: #eae7e7 url(https://cssdeck.com/uploads/media/items/8/8bcLQqF.png) no-repeat;
		border: 1px solid #c8c8c8;
		color: #777;
		font: 13px Helvetica, Arial, sans-serif;
		margin: 0 0 20px;
		padding: 15px 10px 15px 40px;
		width: 90%;
	}
	#content form input[type="text"]:focus,
	#content form input[type="password"]:focus {
		-webkit-box-shadow: 0 0 2px #ed1c24 inset;
		-moz-box-shadow: 0 0 2px #ed1c24 inset;
		-ms-box-shadow: 0 0 2px #ed1c24 inset;
		-o-box-shadow: 0 0 2px #ed1c24 inset;
		box-shadow: 0 0 2px #ed1c24 inset;
		background-color: #fff;
		border: 1px solid #ed1c24;
		outline: none;
	}
	#username { background-position: 10px 10px !important }
	#password { background-position: 10px -53px !important }
	#content form input[type="submit"] {
		background: rgb(254,231,154);
		background: -moz-linear-gradient(top,  rgba(254,231,154,1) 0%, rgba(254,193,81,1) 100%);
		background: -webkit-linear-gradient(top,  rgba(254,231,154,1) 0%,rgba(254,193,81,1) 100%);
		background: -o-linear-gradient(top,  rgba(254,231,154,1) 0%,rgba(254,193,81,1) 100%);
		background: -ms-linear-gradient(top,  rgba(254,231,154,1) 0%,rgba(254,193,81,1) 100%);
		background: linear-gradient(top,  rgba(254,231,154,1) 0%,rgba(254,193,81,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fee79a', endColorstr='#fec151',GradientType=0 );
		-webkit-border-radius: 30px;
		-moz-border-radius: 30px;
		-ms-border-radius: 30px;
		-o-border-radius: 30px;
		border-radius: 30px;
		-webkit-box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset;
		-moz-box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset;
		-ms-box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset;
		-o-box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset;
		box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset;
		border: 1px solid #D69E31;
		color: #85592e;
		cursor: pointer;
		float: left;
		font: bold 15px Helvetica, Arial, sans-serif;
		height: 35px;
		margin: 20px 0 35px 15px;
		position: relative;
		text-shadow: 0 1px 0 rgba(255,255,255,0.5);
		width: 120px;
	}
	#content form input[type="submit"]:hover {
		background: rgb(254,193,81);
		background: -moz-linear-gradient(top,  rgba(254,193,81,1) 0%, rgba(254,231,154,1) 100%);
		background: -webkit-linear-gradient(top,  rgba(254,193,81,1) 0%,rgba(254,231,154,1) 100%);
		background: -o-linear-gradient(top,  rgba(254,193,81,1) 0%,rgba(254,231,154,1) 100%);
		background: -ms-linear-gradient(top,  rgba(254,193,81,1) 0%,rgba(254,231,154,1) 100%);
		background: linear-gradient(top,  rgba(254,193,81,1) 0%,rgba(254,231,154,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fec151', endColorstr='#fee79a',GradientType=0 );
	}
	#content form div a {
		color: #004a80;
	    float: right;
	    font-size: 12px;
	    margin: 30px 15px 0 0;
	    text-decoration: underline;
	}
	.button {
		background: rgb(247,249,250);
		background: -moz-linear-gradient(top,  rgba(247,249,250,1) 0%, rgba(240,240,240,1) 100%);
		background: -webkit-linear-gradient(top,  rgba(247,249,250,1) 0%,rgba(240,240,240,1) 100%);
		background: -o-linear-gradient(top,  rgba(247,249,250,1) 0%,rgba(240,240,240,1) 100%);
		background: -ms-linear-gradient(top,  rgba(247,249,250,1) 0%,rgba(240,240,240,1) 100%);
		background: linear-gradient(top,  rgba(247,249,250,1) 0%,rgba(240,240,240,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f9fa', endColorstr='#f0f0f0',GradientType=0 );
		-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.1) inset;
		-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.1) inset;
		-ms-box-shadow: 0 1px 2px rgba(0,0,0,0.1) inset;
		-o-box-shadow: 0 1px 2px rgba(0,0,0,0.1) inset;
		box-shadow: 0 1px 2px rgba(0,0,0,0.1) inset;
		-webkit-border-radius: 0 0 5px 5px;
		-moz-border-radius: 0 0 5px 5px;
		-o-border-radius: 0 0 5px 5px;
		-ms-border-radius: 0 0 5px 5px;
		border-radius: 0 0 5px 5px;
		border-top: 1px solid #CFD5D9;
		padding: 15px 0;
	}
	.button a {
		background: url(https://cssdeck.com/uploads/media/items/8/8bcLQqF.png) 0 -112px no-repeat;
		color: #7E7E7E;
		font-size: 17px;
		padding: 2px 0 2px 40px;
		text-decoration: none;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		-ms-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		transition: all 0.3s ease;
	}
	.button a:hover {
		background-position: 0 -135px;
		color: #00aeef;
}
</style>