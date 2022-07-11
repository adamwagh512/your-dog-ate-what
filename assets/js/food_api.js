
var access_key = '6orO8TB9RRot89tK';
var userInput = "bread";

        $.ajax({ 
            type: 'GET',
            url: 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=egg',
            dataType: 'json',
            success: function(data) {

                for (i=0; i< 10; i++){
                console.log(data.items[i].name);
                console.log(data.items[i].ingredients);
             }
            }
        });

