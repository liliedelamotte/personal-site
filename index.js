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
                moreInformation.innerHTML = 
                "A pourover contraption is a vital part of this process.";
                img.src = "img/pourover.jpg";
            }
            else if (this.id == "filters") {
                moreInformation.innerHTML = 
                "Filters keep the coffee clean and prevent coffee grounds from getting into the coffee." +
                " Filters typically come both bleached and unbleached, but either will work for this brewing method.";
                img.src = "img/filter.jpeg";
            }
            else if (this.id == "coffee-beans") {
                moreInformation.innerHTML = "Coffee beans are the most important part of the entire process. " +
                "Typically light roasts allow for the most flavor. For the highest quality coffee, beans" +
                " should not be older than about two weeks.";
                img.src = "img/beans.jpeg";
            }
            else if (this.id == "coffee-grinder") {
                moreInformation.innerHTML = "There are many kinds of grinders that can be used. Burr grinders" +
                " are highly regarded by coffee connoisseurs. For the best cup, coffee beans should be ground" +
                " just before brewing, therefore having a at-home grinder is vital to the process.";
                img.src = "img/grinder.jpg";
            }
            else if (this.id == "gooseneck-kettle") {
                moreInformation.innerHTML = "Gooseneck kettles have a unique shape to allow the brewer to have" +
                " maximum control over the amount of water released at a time. Additionally, it is easier to" +
                " ensure a circular motion of pouring with a gooseneck kettle.";
                img.src = "img/kettle.jpeg";
            }
            else {
                moreInformation.innerHTML = "Scales allow for consistency in the ratio between beans and water.";
                img.src = "img/scale.jpeg";
            }
        });
    });

}
