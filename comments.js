// ldelamotte17@georgefox.edu
// Final Project Pt. II
// 2019-04-26

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

function openErrorModal() {
    $('#error-modal').modal();
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
            if (password.length == 0 || username.length == 0) {
                openErrorModal();
            }
            else {
                $("#open-sign-up-modal").remove();
            }
        },
        error: openErrorModal
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
        },
        error: openErrorModal
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
