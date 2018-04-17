$(()=>{
  $('.dropdown-trigger').dropdown();

  var elem = document.querySelector('.fixed-action-btn');
  var instance = M.FloatingActionButton.init(elem, {
    direction: 'right',
    hoverEnabled: false
  });

});
