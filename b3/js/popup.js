$(document).ready(function() {
    $(document).on('click', '.item', function() {
        $.colorbox({
            //html: $(this).find('.hide').removeClass('hide').addClass('show').end().html()
            iframe: true
            , href: "cards.html"
            , transition: 'none'
            , width: '50%'
            , height: '85%'
            , onClosed: function() {

            }});

    });
});