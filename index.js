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

$(document).ready(function() {

    getPreviousComments();

    if (sessionStorage.getItem("username") == 'null') {
        $('#login-space').append("<p class='text-right'><button type='button' class='btn btn-link' id='open-sign-up-modal' onclick='openSignUpModal();'>Sign Up</button><button type='button' class='btn btn-link' id='open-login-modal' onclick='openLoginModal();'>Login</button></p>");
        setLoginStatus(false)
    }
    else {
        $("#login-space").append("<p class='text-right'><button type='button' class='btn btn-link' id='logout' onclick='logout();'>Log Out</button></p>");
        setLoginStatus(true);
    }               

});


/* changes the login status of the user to either allow 
them to comment or force them to log in or sign up */
function setLoginStatus(loggedIn) {

    var commentArea = document.getElementById('comment-area');

    if (!loggedIn) {
        commentArea.innerHTML = '<div><p>Log in to comment.</p></div>';
    }
    else {
        commentArea.innerHTML = "<div class='input-group'><input type='text' class='form-control' id='new-comment' placeholder='Join the conversation.'></div>";

        /* allows a user to post a new comment */
        $('#new-comment').keypress(function() {

            var keycode = (event.keyCode ? event.keyCode : event.which);
            
                /* action is only triggered when the user presses the 'enter' key */
            if (keycode == '13') {

                var commentContent = $("#new-comment").val();
                var commentURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/comment/comments/' + sessionStorage.getItem("username");

                $.ajax({
                    type: 'POST', 
                    url: commentURL,
                    dataType: 'json',
                    contentType: 'application/json',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: JSON.stringify({
                        comment: commentContent
                    }),
                    crossDomain: true,
                    success: function() {
                        getPreviousComments();
                    }
                })

                /* clears the input */
                $('#new-comment').val('');
            }
        })    
    }

}

/* gets all previous comments that have been made and displays them */
function getPreviousComments() {

    /* clears the existing comments to prevent duplicates */
    $('#comments').empty();

    $.ajax({
        type: 'GET',
        url: 'http://web.cs.georgefox.edu/comment/ldelamotte17/comment/comments',
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        /* goes through all comments and displays them with corresponding buttons */
        success: function(data) {
            data.forEach(function(comment) {
                var user = comment.username;
                var content = comment.post_text; 
                var id = comment.id;  

                /* if the current user, if any, is the one who made the comment, 
                they are given the option to either edit or delete that comment*/
                if (sessionStorage.getItem("username") == user) {
                    $('#comments').prepend("<tr><td><h5>" + user + "</h5><p id='comment-content'>" + content + "</p><button type='button' class='btn btn-link' id='edit'>Edit</button><button type='button' class='btn btn-link' id='delete'>Delete</button></td></tr>");
                    
                    /* adds a handler to the delete button and removes the comment if pressed */
                    $("#delete").click(function() {
                        $(this).closest('tr').remove();
                        $.ajax({
                            type: 'DELETE',
                            url: 'http://web.cs.georgefox.edu/comment/ldelamotte17/comment/comments/' + user + '/' + id,
                            dataType: 'json',
                            contentType: 'application/json',
                            crossDomain: true,
                            success: getPreviousComments
                        })
                    })

                    /* if the user clicks the edit button, a text box appears to edit the comment */
                    $("#edit").click(function() {

                        $(this).closest('tr').replaceWith("<tr><td><h5>" + user + "</h5><div class='input-group'><input type='text' class='form-control' id='edit-comment' value='" + content + "'></div></td></tr>");
                        /* allows a user to edit a previous comment */
                        $('#edit-comment').keypress(function() {

                            var keycode = (event.keyCode ? event.keyCode : event.which);
                            
                            /* action is only triggered when the user presses the 'enter' key */
                            if (keycode == '13') {
                                var commentContent = $("#edit-comment").val();
                                var editCommentURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/comment/comments/' + user + '/' + id;
                                $.ajax({
                                    type: 'PUT', 
                                    url: editCommentURL,
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    data: JSON.stringify({
                                        comment: commentContent
                                    }),
                                    crossDomain: true,
                                    success: getPreviousComments
                                })
                            }
                        })    
                    })
                }
                else {
                    $('#comments').prepend("<tr><td><h5>" + user + "</h5><p id='comment-content'>" + content + "</p></td></tr>");
                }
            })
        }
    })

}

/* opens the modal that allows a user to sign up */
function openSignUpModal() {
    $('#sign-up-modal').modal();
}

/* opens the modal that allows a user to login */
function openLoginModal() {
    $('#login-modal').modal();
}

/* changes permissions when a user signs up for an account */
function signUp() {

    /* gathers the username and password*/
    var username = $('#sign-up-username').val();
    var password = $('#sign-up-password').val();
    /* resets the input fields */
    $('#sign-up-username').val('');
    $('#sign-up-password').val('');
    var signUpURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/user/' + username;

    $.ajax({
        type: 'POST', 
        url: signUpURL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            password: password
        }),
        crossDomain: true,
        success: function() {
            $("#open-sign-up-modal").remove();
        }
    })

}

/* changes permissions when a user logs into their account */
function login() {

    var username = $('#login-username').val();
    var password = $('#login-password').val();
    $('#login-username').val('');
    $('#login-password').val('');
    var loginURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/login';

    $.ajax({
        type: 'POST', 
        url: loginURL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        crossDomain: true,
        success: function() {
            if ($("#open-sign-up-modal").length) {$("#open-sign-up-modal").remove();}
            $('#login-space').empty();
            $("#login-space").append("<p class='text-right'><button type='button' class='btn btn-link' id='logout' onclick='logout();'>Log Out</button></p>");
            sessionStorage.setItem("username", username);
            setLoginStatus(true);
            getPreviousComments();
        }
    })

}

/* changes permissions when a user logs out of their account */
function logout() {

    var loginURL = 'http://web.cs.georgefox.edu/comment/ldelamotte17/login';

    $.ajax({
        type: 'DELETE', 
        url: loginURL,
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        success: function() {
            sessionStorage.setItem("username", null);
            setLoginStatus(false);
            getPreviousComments();
            $('#login-space').empty();
            $('#login-space').append("<p class='text-right'><button type='button' class='btn btn-link' id='open-sign-up-modal' onclick='openSignUpModal();'>Sign Up</button><button type='button' class='btn btn-link' id='open-login-modal' onclick='openLoginModal();'>Login</button></p>");
        }
    })

}
