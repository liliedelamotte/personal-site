// ldelamotte17@georgefox.edu
// Final Project Pt. II
// 2019-04-26

/* a function to handle the Yelp API */
$(document).ready(function() {

    var coffeeURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=';

    $('#location').keypress(function() {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        
        // action is only triggered when the user presses the 'enter' key
        if (keycode == '13') {

            $('#results').empty();
            $('#coffee-search').empty();

            var location = $('#location').val().replace(' ', '');
            coffeeURL += location

            // clears the input
            $('#location').val('');

            $.ajax({
                type: 'GET',
                url: coffeeURL,
                contentType: 'json',
                dataType: "json",
                headers: { 
                    'Authorization' : 'Bearer HTcmmj6AMYa5ghaqZD_89yDIFeqNLB5TS1ukKSiJiJ3ImTfY5dDaiKiuEWv_8wvi_E3KyvgscGxKzdqGN2I2P2aYhNjKdtMwZOVfvwIO-57FTO7kAEY5O0FhPg-dXHYx',
                    'Access-Control-Allow-Origin': '*'
                },
                term: 'coffee',
                success: function(result) {
                        // saves all results in a single variable
                        var totalresults = result.total;
                        // if there are results, they'll be displayed
                        if (totalresults > 0) {
                            $('#coffee-search').append('<div class="p-3 mb-2"><h5>Showing results for ' + location + ':</h5></div>');
                            $.each(result.businesses, function(i, item) {
                                // store each business's object in a variable
                                var image = item.image_url;
                                var name = item.name;
                                var address = item.location.address1;
                                var city = item.location.city;
                                var state = item.location.state;
                                var zipcode = item.location.zip_code;
                                // append the results into the page in card format
                                $('#results').append('<div><div class="col top-buffer"><div class="card" style="width: 15rem;"><img src="' + image + '" class="card-img-top" alt="Coffee Shop"><div class="card-body"><h6 class="card-title">' + name + '</h6><p class="card-text text-muted">' + address + ' ' + city + ', ' + state + ' ' + zipcode + '</p></div></div></div>')
                            });
                        } else {
                            // we let the user know if there are no results
                            $('#results').append('<h5>Sorry, looks like there\'s no coffee at that location. Guess you\'ll have to make it yourself. 😉</h5>');
                        }
                }        
            });

            // reset the url
            coffeeURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=';
        }
    })

});