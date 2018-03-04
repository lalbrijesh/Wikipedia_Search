 $(document).ready(function() {

  $("#searchBar").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});

   $('#submitButton').click(function() {

    $("#footer").hide();

     var searchWord = $('#searchBar').val();
     var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWord + "&limit=10&namespace=0&format=json";
     console.log(url);

     $.ajax({
       type: "GET",
       dataType: "jsonp",
       url: url,
       success: function(data) {
         $( ".result" ).remove();
         for(var i=0;i<data[1].length;i++){
           $("body").append("<div class='result col-xs-offset-1 col-xs-10'><a class='result-title' href='"+data[3][i]+"' target='_blank'>"+data[1][i]+"</a><p class='result-description'>"+data[2][i]+"</p>");
         }
       },
       error: function(errorMesage) {
         console.log("error");
       }
     });

   });

   $('#clearButton').click(function() {
    if ($('#searchBar').val().length > 0) {
    $('#searchBar').val("");
    $( ".result" ).remove();
    $("#footer").show();
   }
   });
 });
