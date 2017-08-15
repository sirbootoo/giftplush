jQuery(document).ready(function () {


  jQuery('[data-toggle="offcanvas"]').on('click', function () {
    jQuery('.row-offcanvas').toggleClass('active');
  });



});



document.querySelector('body').addEventListener('click', function(){
  if(event.target.className === 'row-offcanvas'){
    console.log('Toggle Should Work');
  }
});


