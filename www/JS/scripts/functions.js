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