function register() {
    $(document).ready(function() {
        $.ajax({
            url: "http://rest-service.guides.spring.io/greeting"
        }).then(function(data) {
           $('.greeting-id').append(data.id);
           $('.greeting-content').append(data.content);
        });
    });

    $(document).ready(function() {
        $(".list-group-item").click(function() {

            var moreInformation = document.getElementById("more-information");
            var img = document.getElementById("materials-image");

            if (this.id == "pourover-contraption") {
                moreInformation.innerHTML = "A pourover contraption is a vital part of this process.";
                img.src = "pourover.jpg";
            }
            else if (this.id == "filters") {
                moreInformation.innerHTML = "filters";
                img.src = "filter.png";
            }
            else if (this.id == "coffee-beans") {
                moreInformation.innerHTML = "coffee beans";
                img.src = "beans.jpeg";
            }
            else if (this.id == "coffee-grinder") {
                moreInformation.innerHTML = "coffee grinder";
                img.src = "grinder.jpg";
            }
            else if (this.id == "gooseneck-kettle") {
                moreInformation.innerHTML = "gooseneck kettle";
                img.src = "kettle.jpeg";
            }
            else {
                moreInformation.innerHTML = "scale";
                img.src = "scale.jpg";
            }
        });
    });

}
