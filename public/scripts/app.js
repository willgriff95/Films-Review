$(()=>{
  $('.dropdown-trigger').dropdown();
  $('input#input_text, textarea#textarea2').characterCounter();


  var elem = document.querySelector('.fixed-action-btn');
  var instance = M.FloatingActionButton.init(elem, {
    direction: 'right',
    hoverEnabled: false
  });

});
