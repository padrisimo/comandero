$(function () {
  var $orders = $("#orders");
  var $drink = $("#drink");
  var $name = $("#name");

  var orderTemplate = ""+
      "<li>"+
      "<p><strong>Name:</strong> {{name}}</p>" +
      "<p><strong>Drink:</strong> {{drink}}</p>" +
      "<button data-id='{{id}}' class='remove'>X</button>"
      "</li>";





  function addOrder(order){
    $orders.append(Mustache.render(orderTemplate, order));
  }

  //
  //get
  //

  $.ajax({
    type: "GET",
    url: "http://rest.learncode.academy/api/adrian/orders",
    success : function(orders) {
      console.log(orders);
      $.each(orders, function(i, order) {
        addOrder(order);
      });
    },
    error: function(){
      alert("error loading orders");
    }
  });

  //
  // add order submit
  //

  $("#add-order").on("click", function(){
    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };

//
// post
//

    $.ajax({
      type: "POST",
      url: "http://rest.learncode.academy/api/adrian/orders",
      data: order,
      success : function(newOrder) {
        console.log(newOrder);
          addOrder(newOrder);
          $('#name').val('');
          $('#drink').val('');
          $('#name').focus('');
      },
      error: function(){
        alert("error loading orders");
      }
    });



  });

  $orders.delegate('.remove','click', function(){

    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/adrian/orders/'+ $(this).attr('data-id'),
      success: function(){
        $li.fadeOut(300, function(){
          $(this).remove();
        });
      }
    });
  });

});
