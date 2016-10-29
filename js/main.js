$(function () {
  var $orders = $("#orders");
  var $drink = $("#drink");
  var $name = $("#name");

  var orderTemplate = $("#order-template").html();
      
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

  //
  //delete
  //
  $orders.delegate('.remove','click', function(){

    var $li = $(this).closest('li');

    if (confirm("¿Seguro que deseas eliminar la comanda?")){
      $.ajax({
        type: 'DELETE',
        url: 'http://rest.learncode.academy/api/adrian/orders/'+ $(this).attr('data-id'),
        success: function(){
          $li.fadeOut(300, function(){
            $(this).remove();
          });
        }
      });
    }

  });

  //
  //edit
  //
  $orders.delegate('.editOrder','click', function(){

    var $li = $(this).closest('li');
    $li.find('input.name').val( $li.find('span.name').html() );
    $li.find('input.drink').val( $li.find('span.drink').html() );
    $li.addClass('edit');
    
  });
  
  //
  //cancel edit
  //
  $orders.delegate('.cancelEdit','click', function(){

    var $li = $(this).closest('li').removeClass('edit');

  });

  //
  //save edit
  //
  $orders.delegate('.saveEdit','click', function(){

    var $li = $(this).closest('li');
    var order ={
      name: $li.find('input.name').val(),
      drink: $li.find('input.drink').val()
    };

     $.ajax({
      type: 'PUT',
      url: 'http://rest.learncode.academy/api/adrian/orders/'+ $li.attr('data-id'),
      data: order,
      success : function(newOrder) {
        $li.find('span.name').html(order.name);
        $li.find('span.drink').html(order.drink);
        $li.removeClass('edit');
        window.location.reload(true);
      },
      error: function(){
        alert("error updating orders");
      }

    });

  });



});
