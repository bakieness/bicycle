$(document).ready(function () {
    setInterval(function () {
        var $activeSlide = $(".slide.active");
        var $activePost = $(".tweet.active");
        var $leftPost = $(".tweet.left");
        var $rightPost = $(".tweet.right");
        
        slideNext($activeSlide, ".slide");
        tweetNext($activePost, $leftPost, $rightPost, ".tweet");
        
    }, 5000);
});