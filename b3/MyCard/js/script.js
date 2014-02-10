/* Author:
 
 */
var items_name = [],
        items_client = [],
        items_hashtag = [],
        $container = jQuery('.iso-container');
jQuery('document').ready(function($) {
    $(".inline").colorbox({inline: true, width: "50%"});

    var initialOptions =
            {
                // options
                itemSelector: '.item',
                layoutMode: 'fitRows',
                getSortData: {
                    name: function($elem) {
                        return $elem.find('.name').text();
                    },
                    client: function($elem) {
                        return $elem.find('.name').text();
                    },
                    color: function($elem) {
                        return $elem.attr('data-color');
                    }
                }
            };
    var options = {
        comboFilters: {}
    };

    $('span.name').each(function() {
        var tmp = {};
        tmp.id = $(this).parent().attr('id');
        tmp.name = ($(this).text().toLowerCase());
        items_name.push(tmp);
    });

    $('span.client').each(function() {
        var tmp = {};
        tmp.id = $(this).parent().attr('id');
        tmp.name = ($(this).text().toLowerCase());
        items_client.push(tmp);
    });

    $('span.hashtag').each(function() {
        var tmp = {};
        tmp.id = $(this).parent().attr('id');
        tmp.name = ($(this).text().toLowerCase());
        items_hashtag.push(tmp);
    });

    $("select#search_method")
            .change(function() {
                $('.search').attr('id', $(this).attr('value'));
                $('.search').attr('name', $(this).attr('value'));
            });

    $(document).on('keyup', '#search_name', function() {
        isotopeSearch($(this).val().toLowerCase(), items_name);
    });

    $(document).on('keyup', '#search_client', function() {
        isotopeSearch($(this).val().toLowerCase(), items_client);
    });

    $(document).on('keyup', '#search_hashtag', function() {
        isotopeSearch($(this).val().toLowerCase(), items_hashtag);
    });

    $('#showAll').click(function() {
        $('#search').val('');
        isotopeSearch(false);
        return false;
    });


    function isotopeSearch(kwd, items)
    {
        var matches = [];
        var misses = [];

        $('.item').removeClass('match miss'); // get rid of any existing classes
        $('#noMatches').hide(); // ensure this is always hidden when we start a new query

        if ((kwd != '') && (kwd.length >= 2)) { // min 2 chars to execute query:

            // loop through brands array		
            _.each(items, function(item) {
                if (item.name.indexOf(kwd) !== -1) {

                    // keyword matches element
                    matches.push($('#' + item.id)[0]);
                } else {
                    misses.push($('#' + item.id)[0]);
                }
            });

            // add appropriate classes and call isotope.filter
            $(matches).addClass('match');
            $(misses).addClass('miss');
            $container.isotope({filter: $(matches)});
            options.comboFilters[items] = $(matches);
            console.log(options);
//            var $optionSet = $this.parents('.option-set');
//    var group = $optionSet.attr('data-filter-group');
//    options.comboFilters[ group ] = $this.attr('data-filter-value');
//  
            $.bbq.pushState(options);


            if (matches.length == 0) {
                $('#noMatches').show(); // deal with empty results set
            }
        } else {
            // show all if keyword less than 2 chars
            $container.isotope({filter: '.item'});
        }

    }
    var $sortBy = $('#sort-by').on('click', 'a', function(event) {
        event.preventDefault();
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        options.sortBy = $this.attr('data-option-value');
        // console.log( options );
        $.bbq.pushState(options);


    });


    function selectLink($link) {
        $link.parents('.option-set').find('.selected').removeClass('selected');
        $link.addClass('selected');
    }

    var location = window.location;
    var $comboFilterOptionSets = $('.combo-filters .option-set');


    function getComboFilterSelector(comboFilters) {
        // build filter
        var isoFilters = [];
        var filterValue, $link, $optionSet;
        for (var prop in comboFilters) {
            filterValue = comboFilters[ prop ];
            isoFilters.push(filterValue);
            // change selected combo filter link
            $optionSet = $comboFilterOptionSets.filter('[data-filter-group="' + prop + '"]');
            $link = $optionSet.find('a[data-filter-value="' + filterValue + '"]');
            selectLink($link);
        }
        var selector = isoFilters.join('');
        return selector;
    }

    $(window).on('hashchange', function() {
        // get options from hash
        if (location.hash) {
            $.extend(options, $.deparam.fragment(location.hash, true));
        }
        // build options from hash and initial options
        var isoOptions = $.extend({}, initialOptions, options);

        if (options.comboFilters) {
            isoOptions.filter = getComboFilterSelector(options.comboFilters);
        }

        // change selected link for sortBy
        if (options.sortBy) {
            var $link = $sortBy.find('a[data-option-value="' + options.sortBy + '"]');
            selectLink($link);
        }

        $container.isotope(isoOptions);
    })
            // trigger hashchange to capture initial hash options
            .trigger('hashchange');


});