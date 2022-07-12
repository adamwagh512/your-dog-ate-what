
var access_key = '6orO8TB9RRot89tK';
var userInput = "bread";

//
//Element.addEventListener("click", onclick);

   // function onclick() {
        $.ajax({ 
            type: 'GET',
            url: 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=egg',
            dataType: 'json',
            success: function(data) {
                
                var ourData = " ";
                var ourName = " ";
                    
                for (i=0; i< 10; i++){
                    ourName = ourData[i].name;
                    ourIngredients = data.items[i].ingredients;
                    console.log(ourName, ourIngredients);
                }
            }
        });
    //}
//}