<template>
  <div>
  	<nav class="navbar navbar-fixed-top">
      <div class="container">		           
    	<a class="navbar-brand " href="#page-top"><img style="margin-top:5px;" src="/dist/assets/images/logo-web3.gif"></a>
    	<button  class="navbar-toggle" data-toggle="collapse" data-target="#navbar-item"  >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        <div id="navbar-item" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li ><router-link :to="'jobs'">Home</router-link></li>
            <li><a   href="#">Contact</a></li>
            <li ><a  href="#"><router-link :to="'signup'"  >Sign up</router-link></a></li>
            <li>
            	<button class='btn-danger navbar-btn'><router-link :to="'login'"  ><a style="color: #fff;">Log in</a></router-link></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Navbar END -->

    <!-- Heading container -->
	<div class="home-container">
	  <div class="opacity">
        <div class="overlay">    
            <section class="title">
            	<h1>WHBD</h1>
            	<h2 class="home-hero-subtitle">
                   Global Intelligent Building Design, Build, and Implementation Roll Out Company
                </h2>
            </section>
        </div>
      </div>        
    </div>
	 <!-- Heading container END -->

    <!-- Section starts for laptop row -->
    <section id="showcase">
      <div class="container">
      	<div class="row">
      	  <div class="col-md-6 col-sm-6">
      	    <div class="showcase-left">
      	       <img src="/dist/assets/images/laptop5.png">
       	    </div>
      	  </div>
      	  <div class="col-md-6 col-sm-6 readme">
      	    <div class="showcase-right">
      	       <h1>WHBD is a US based company that specializes in technology based role outs on a global scale. </h1>
      	       <p>With over 1,600 partners globally WHBD can deliver multi-site, multi-disciplined turnkey solutions.  The founding partners of WHBD have decades of experience in the IT Infrastructure and Low Voltage Cabling disciplines so the vision of creating a global solution for intelligent buildings has become a reality for the partners. </p>
       	    </div>
       	    <br>
       	    <a href="" class="btn btn-danger btn-default btn-lg showcase-btn">Read More</a>
      	  </div>      		
      	</div>
      </div>    	
    </section>

    <!-- Section END for first row -->

    <!-- footer -->
    <footer id="main-footer">
        <nav id="social-nav" class="clearfix">
            <p>Follow Us On:</p>	                
            <ul>
                <li>
                  <a href="" title="Twitter" class="social-button round twitter">
                  <div class="logo icon-twitter"><img src="/dist/assets/images/twitter.png"></div>
                  </a>
                </li>
                <li>
                   <a href="" title="Facebook" class="social-button round facebook">
                   <div class="logo icon-facebook"><img src="/dist/assets/images/goggle.png"></div>
                   </a>
                </li>
                <li>
                   <a href="" title="Google Plus" class="social-button round google-plus">
                   <div class="logo icon-google"><img src="/dist/assets/images/facebook.png"></div>
                   </a>
                </li>
                <li>
                   <a href="" title="Linked In" class="social-button round linked-in">
                   <div class="logo icon-linkedin"><img src="/dist/assets/images/linkedin.png"></div>
                   </a>
                </li>
            </ul>
        </nav>
          <p id="copyright">Terms of Service | Privacy Policy |
           © 2017 Survey Planet, LLC. All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  beforeMount(){
  	axios.get('/session/data')
  	.then(req => {
  		if(req.data.roll){
  			this.$router.push('/dash');
  		}
  	});
  },
  mounted (){
  	this.$nextTick(() => {
  		window.sr = ScrollReveal();
	  	   sr.reveal('.navbar-brand',{
	  	   	duration: 2000,
	  	   	origin: 'left'
	  	   });
         sr.reveal('.collapse',{
          duration: 2000,
          origin: 'right'
         });
	  	   sr.reveal('.title',{
	  	   	duration: 2000,
	  	   	origin: 'bottom'
	  	   });
	  	   sr.reveal('.showcase-left',{
	  	   	duration: 2000,
	  	   	origin: 'left',
	  	   	distance: '300px'
	  	   });
	  	   sr.reveal('.showcase-right',{
	  	   	duration: 2000,
	  	   	origin: 'right',
	  	   	distance: '300px'
	  	   });
	  	   sr.reveal('.showcase-btn',{
	  	   	duration: 2000,
	  	   	
	  	   	origin: 'bottom'
	  	   });

  		})
  	}

  }

</script>

<style scoped>
	body{
		
		font-family: "Open Sans", sans-serif;
			
	}
	.home-container{
	    background-image: url("/dist/assets/images/4.jpg");
	    background-color: rgba(0, 0, 0, 0.5);
	    background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		position: relative;
	    top:0;
	    bottom: 0;
		height: 90vh;
		width: 100%;
		z-index: -10;	
	}
	.opacity{
		position: absolute;
		background-color: rgba(0,0,0,0.5);
	    top:0;
	    bottom: 0;
		height: 90vh;
		width: 100%;
		z-index: -5;
	}
	.overlay{
		position: absolute;
		
		top:0;
	    bottom: 0;
		height: 100%;
		width: 100%;
		z-index: -5;

	}
	/*Body and background image END*/


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

	.btn-danger{

		border-radius: 10px;
		font-weight: 800;	
		line-height: 1.7;
		margin-left: 40px;
		font-size: 18px;
		width: 80%;
		
	}
 .btn-danger:hover{
 	background-color: #d43f3a;
 }
	/*NAVBAR  END*/


	/*HEADING TEXT START*/
	.title{
	   
	   margin-top: 300px;
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
		line-height: 27px;
		letter-spacing: -0.5px;
		color: #aaa;

	}
	.title a{
		color: inherit;
		text-decoration: underline;

	}

	/*HEADING TEXT END*/

	/*LAPTOP row style start*/
	#showcase{
		margin-top: 40px;
	}
	#showcase h1{
		font-size: 40px;
		margin-bottom: 20px;
	}
	#showcase img{
		width: 95%;
		margin-top: 40px;

	}
	.showcase-right h1{
		font-size: 31px;
		line-height: 45px;
		color: #333;
		font-weight: 800;
		letter-spacing: -1px;
	}
	.showcase-right p{
		font-size: 22px;
		line-height: 27px;
		letter-spacing: -0.5px;
		color: #aaa;
	}
	#showcase .showcase-right{
		margin-top: 90px;
	}
	.btn{
		background-color: #7ABA05;
		color: #fff;
		border: 2px solid transparent;
		border-radius: 80px;
		font-weight: 800;
		width: 40%;
		font-size: 24px;
		font-size: 20px;
		line-height: 1.7;
		margin-left: -5px;
		margin-top: 10px;


	}

	/*LAPTOP row style END*/
	/**---------fotter----------*/
	#main-footer{

	    background-color: #333;
	    text-align: center;
	    margin-top: 140px;
	}


	#main-footer{

	    background-color: #333;
	    text-align: center;
	}
	#social-nav{
		
		width: 340px;
		padding: 40px 10px 20px;
		margin:0 auto;
		color: #bfbfbf;
	}
	#social-nav p{
		
		
		margin-left: 40px;
	}
	nav ul {
		list-style: none;

	}
	 nav ul li {
		float: left;
	}

	#copyright {

		margin-left: 50px;
		color: #666;
	}
	.logo{
		margin: 10px;
	}
	.navbar-toggle{
		border: none;
		
	}
	.navbar-toggle span{
		background-color: #000;
	}
</style>