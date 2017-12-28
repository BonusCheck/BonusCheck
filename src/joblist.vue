<template>
  <div class="container">
    <div class="row">
            <h2>Job History</h2>
    </div>
      <div class='row'>
        <div class='col-md-12'>
          <div class="carousel slide media-carousel" id="media">
            <div class="carousel-inner">
              <div class="item  active">
                <div class="row">
                  <jobs></jobs>
                  <a data-slide="prev" href="#media" class="left carousel-control">&lArr;</a>
                  <a data-slide="next" href="#media" class="right carousel-control">&rArr;</a> 
                </div> 
              </div>
            </div>
          </div>                       
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import jobs from './jobs';

export default {
  name: 'joblist',
  components: {
    jobs
  },
  computed: {
    jobs() {
      return  [
          {id: 0, text: 'Blow Me' },
          {id: 1, text: 'Bathe me' }
        ]
    }
  }
};
</script>


<style>
.media-carousel 
{
  margin-bottom: 0;
  padding: 0 40px 30px 40px;
  margin-top: 30px;
}
/* Previous button  */
.media-carousel .carousel-control.left 
{
  left: -12px;
  background-image: none;
  background: none repeat scroll 0 0 #222222;
  border: 4px solid #FFFFFF;
  border-radius: 23px 23px 23px 23px;
  height: 40px;
  width : 40px;
  margin-top: 30px
}
/* Next button  */
.media-carousel .carousel-control.right 
{
  right: -12px !important;
  background-image: none;
  background: none repeat scroll 0 0 #222222;
  border: 4px solid #FFFFFF;
  border-radius: 23px 23px 23px 23px;
  height: 40px;
  width : 40px;
  margin-top: 30px
}
/* Changes the position of the indicators */
.media-carousel .carousel-indicators 
{
  right: 50%;
  top: auto;
  bottom: 0px;
  margin-right: -19px;
}
/* Changes the colour of the indicators */
.media-carousel .carousel-indicators li 
{
  background: #c0c0c0;
}
.media-carousel .carousel-indicators .active 
{
  background: #333333;
}
.media-carousel img
{
  width: 250px;
  height: 100px
}
</style>