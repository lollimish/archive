$(function(){
    
  var $container = $('#container');
  var initialOptions = {
    itemSelector : '.color-shape',
    masonry: {
      columnWidth: 80
    },
    getSortData: {
      color: function( $elem ) {
        return $elem.attr('data-color');
      },
      shape: function( $elem ) {
        return $elem.attr('data-shape');
      },
      size: function( $elem ) {
        return $elem.attr('data-size');
      }
    }
  };
  // build a hash for all our options
  var options = {
    // special hash for combination filters
    comboFilters: {}
  };


  // filter buttons
  $('.filter').on( 'click', 'a', function( event ) {
    event.preventDefault();
    var $this = $(this);
    // don't proceed if already selected
    if ( $this.hasClass('selected') ) {
      return false;
    }

    // console.log('hello world');
    var $optionSet = $this.parents('.option-set');
    var group = $optionSet.attr('data-filter-group');
    options.comboFilters[ group ] = $this.attr('data-filter-value');
    $.bbq.pushState( options );
  });

  var $sortBy = $('#sort-by').on( 'click', 'a', function( event ) {
    event.preventDefault();
    var $this = $(this);
    // don't proceed if already selected
    if ( $this.hasClass('selected') ) {
      return false;
    }
    options.sortBy = $this.attr('data-option-value');
    // console.log( options );
    $.bbq.pushState( options );
  });

  function selectLink( $link ) {
    $link.parents('.option-set').find('.selected').removeClass('selected');
    $link.addClass('selected')
  }

  var location = window.location;
  var $comboFilterOptionSets = $('.combo-filters .option-set');


  function getComboFilterSelector( comboFilters ) {
    // build filter
    var isoFilters = [];
    var filterValue, $link, $optionSet;
    for ( var prop in comboFilters ) {
      filterValue = comboFilters[ prop ];
      isoFilters.push( filterValue );
      // change selected combo filter link
      $optionSet = $comboFilterOptionSets.filter('[data-filter-group="' + prop + '"]');
      $link = $optionSet.find('a[data-filter-value="' + filterValue + '"]');
      selectLink( $link );
    }
    var selector = isoFilters.join('');
    return selector;
  }

  $( window ).on( 'hashchange', function() {
    // get options from hash
    if ( location.hash ) {
      $.extend( options, $.deparam.fragment( location.hash, true ) );
    }
    // build options from hash and initial options
    var isoOptions = $.extend( {}, initialOptions, options );

    if ( options.comboFilters ) {
      isoOptions.filter = getComboFilterSelector( options.comboFilters );
    }

    // change selected link for sortBy
    if ( options.sortBy ) {
      var $link = $sortBy.find('a[data-option-value="' + options.sortBy + '"]');
      selectLink( $link );
    }

    $container.isotope( isoOptions );
  })
    // trigger hashchange to capture initial hash options
    .trigger( 'hashchange' );

});
  
