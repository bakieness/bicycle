function slideNext($active, $type) {
    if ($active.next().is($type)) {
        $active.next().addClass("active");
        $active.removeClass("active");
    }
    else {
        $($type).first().addClass("active");
        $active.removeClass("active");
    }
}

function tweetNext($active, $left, $right, $type) {
    $left.removeClass( "left" ).addClass( "right" );
    $active.removeClass( "active" ).addClass( "left" );
    $right.removeClass( "right" ).addClass( "active" );
}
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