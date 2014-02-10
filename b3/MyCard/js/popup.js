$(document).ready(function() {
    $('.item').click(function() {
        $.colorbox({html: $(this).html()
            , transition: 'none'
            , width: '40%'
            , height: '75%'});
    });

});