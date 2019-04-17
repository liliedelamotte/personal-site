// ldelamotte17@georgefox.edu
// Final Project Pt. II
// 2019-04-26

/* adds descriptions to each material upon click */
$(document).ready(function() {
    $('.list-group-item').click(function() {

        var moreInformation = document.getElementById('more-information');
        var img = document.getElementById('materials-image');

        if (this.id == 'pourover-contraption') {
            moreInformation.innerHTML = 
            'A pourover contraption is a vital part of this process. It is what holds the coffee and allows it to ' +
            'brew properly. You can use a Chemex, a V-60, a Kalita Wave, or anything of the like. You can now find ' +
            'these contraptions at most grocery stores, coffee shops, and online.';
            img.src = 'img/pourover.jpg';
        }
        else if (this.id == 'filters') {
            moreInformation.innerHTML = 
            'Filters keep the coffee clean and prevent coffee grounds from getting into the coffee. ' +
            'They are available both bleached and unbleached, but either will work for this brewing method.';
            img.src = 'img/filter.jpeg';
        }
        else if (this.id == 'coffee-beans') {
            moreInformation.innerHTML = 'Coffee beans are the most important part of the entire process. ' +
            'Typically light roasts allow for the most flavor. For the highest quality coffee, beans ' +
            'should not be older than about two weeks. It is encouraged to buy fair trade and local coffee, so ' +
            'consider stopping buy your local coffee shop to pick up a freshly-roasted bag of beans.';
            img.src = 'img/beans.jpeg';
        }
        else if (this.id == 'coffee-grinder') {
            moreInformation.innerHTML = 'There are many kinds of grinders that can be used to produce ' +
            'groud coffee, although burr grinders are highly regarded by coffee connoisseurs. For the best ' + 
            'cup, coffee beans should be ground just before brewing, so having a at-home grinder is vital to ' + 
            'the coffe-making process.';
            img.src = 'img/grinder.jpg';
        }
        else if (this.id == 'gooseneck-kettle') {
            moreInformation.innerHTML = 'Although a plain kettle theoretically does the job, gooseneck kettles ' +
            'have a unique shape which allows the brewer to have maximum control over the amount of water ' + 
            'released at a time. Additionally, it is easier to ensure a circular motion of pouring with a ' + 
            'gooseneck kettle.';
            img.src = 'img/kettle.jpeg';
        }
        else {
            moreInformation.innerHTML = 'Scales allow for consistency in the ratio between beans and water ' +
            'and allow the brewer to make numerical adjustments to the way they make their coffee.';
            img.src = 'img/scale.jpeg';
        }
    });
});

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
                        if (totalresults > 0){
                            $('#coffee-search').append('<div class="p-3 mb-2"><h5>Showing results for ' + location + ':</h5></div>');
                            $.each(result.businesses, function(i, item) {
                                // store each business's object in a variable
                                var id = item.id;
                                var alias = item.alias;
                                var phone = item.display_phone;
                                var image = item.image_url;
                                var name = item.name;
                                var rating = item.rating;
                                var reviewcount = item.review_count;
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


$(document).ready(function() {

    var commentArea = document.getElementById('comment-area');

    /* ensures that the user must sign in or 
    create an account before allowing commenting */
    setLoginStatus(false);


    /* a function to handle signing up to comment */
    $('#open-sign-up-modal').click(function() {
        $('#sign-up-modal').modal();
    });

    /* a function and ajax call to handle a user signing up for an account */
    $('#sign-up-submit').click(function() {

        var signUpUsername = $('#sign-up-username').val();
        var signUpPassword = $('#sign-up-password').val();
        $('#sign-up-username').val('');
        $('#sign-up-password').val('');
        var signUpURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/user/' + signUpUsername;

        $.ajax({
            type: 'POST', 
            url: signUpURL,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                password: signUpPassword
            }),
            crossDomain: true,
            success: function() {
                setLoginStatus(true);
                /* todo */
            },
            error: function(data) {
                alert(JSON.stringify(data));
            }

        })
    })

    /* a function to handle logging in to comment */
    $('#open-login-modal').click(function() {
        $('#login-modal').modal();
    });

    /* a function and ajax call to handle a user signing up for an account */
    $('#login-submit').click(function() {

        var loginUsername = $('#login-username').val();
        var loginPassword = $('#login-password').val();
        $('#login-username').val('');
        $('#login-password').val('');
        var loginURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/login';

        $.ajax({
            type: 'POST', 
            url: loginURL,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            }),
            crossDomain: true,
            success: function() {
                setLoginStatus(true);
                /* todo */
            },
            error: function(data) {
                alert(JSON.stringify(data));
            }

        })
    })

    /* changes the login status of the user to either allow 
    them to comment or force them to log in or sign up */
    function setLoginStatus(loggedIn) {
        if (!loggedIn) {
            commentArea.innerHTML = '<div><p>Sign up or log in to comment.</p></div>';
        }
        else {
            commentArea.innerHTML = "<input type='text' class='form-control' id='new-comment' placeholder='Join the conversation.'>";
        }
    }

    /* allows a user to post a new comment */
    $('#new-comment').keypress(function() {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        
        // action is only triggered when the user presses the 'enter' key
        if (keycode == '13') {

            var commentContent = this.val();

            $.ajax({
                type: 'POST', 
                url: loginURL,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    comment: commentContent
                }),
                crossDomain: true,
                success: function() {
                    $('#comments').append("<tr><td><h5>liliedelamotte</h5><p id='comment-content'>Wow, this site looks amazing.</p><button type='button' class='btn btn-link' id='edit'>Edit</button></td></tr>");
                    /* todo */
                },
                error: function(data) {
                    alert(JSON.stringify(data));
                }
    
            })

            // clears the input
            $('#new-comment').val('');

            // reset the url
        }
    })
    
    /* a function to handle editing comments */
    $('#edit').click(function() {
        var commentContent = this.$('#comment-content');
        this.innerHTML = "<div class='card comment'><div class='card-body'><h5>Lilie de la Motte</h5><textarea class='form-control' aria-label='With textarea'>" + commentContent + "</textarea></div><button type='button' class='btn btn-outline-dark btn-sm' id='save'>Save</button></div></div>";
    })
});
