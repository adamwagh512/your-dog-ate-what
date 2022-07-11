
var access_key = '6orO8TB9RRot89tK';
var userInput = "Cheese";

//generateBtn.addEventListener("click", writeItem);

        $.ajax({ 
            type: 'GET',
            url: 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=' + userInput,
            dataType: 'json',
            success: function(data) {
                
                for (i=0; i< data.items.length; i++){
                    console.log(data.items[i])
                    console.log(data.items[i].ingredients)
                }
            }         
        });




