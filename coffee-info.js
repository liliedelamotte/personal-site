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