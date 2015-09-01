$(function() {
    // slider container
    $slider_container = $('#vertical-slider');
    // slider marking container
    $slider_marks = $('#slider-marks');
    // container for options that display on change
    $selection_display = $('#selection-display');
    // form input to insert the selected value
    $slider_value = $('#amount_extra');
    // initial slide value
    $start_slide_value = 0;
    
    // array to match slider value with actual value to save from the form
    // slide = value from slider, value = text to put in form input, div = box to display on selection
    $slide_options = {
          option1 : { slide : 10, value : 0, div : 'no-thanks', text : 'No Thanks'}
        , option2 : { slide : 9, value : 5, div : 'ribbon', text : 'Ribbon'}
        , option3 : { slide : 8, value : 10, div : 'button', text : 'Button'}
        , option4 : { slide : 7, value : 20, div : 'shirt', text : 'Shirt'}
        , option5 : { slide : 6, value : 40, div : 'guitar-keychain', text : 'Guitar Keychain'}
        , option6 : { slide : 5, value : 50, div : 'early-supporter', text : 'Early Supporter'}
        , option7 : { slide : 4, value : 80, div : 'supporter', text : 'Supporter Package'}
        , option8 : { slide : 3, value : 100, div : 'battery-pack', text : 'Battery Pack'}
        , option9 : { slide : 2, value : 160, div : 'season-pass', text : 'Season Pass'}
        , option10 : { slide : 1, value : 250, div : 'canvas-art-print', text : 'Canvas Art Print'}
        , option11 : { slide : 0, value : 500, div : 'decorative-air-guitar', text : 'Decorative Air Guitar'}
    };
    
    // set slide value based on input value
    inputValue = getOption( 'value' , parseInt($slider_value.val()) );
    $start_slide_value = inputValue.slide;
    
    // initialize slider
    $slider_container.slider({
          orientation : 'vertical' // how do you want to display the slider?
        , min : 0 // minimum value
        , max : Object.keys($slide_options).length - 1 // maximum value, number of addon options
        , step : 1 // value change
        , value : $start_slide_value // value to start the slider
        , create : function(event,ui) { // special stuff to do when the slider is created
            fillHeight = fillBoxHeight($start_slide_value);
            
            // add filler box
            fillBox = '<div id="slider-fill" style="height:' + fillHeight + 'px;"></div>';
            $slider_container.prepend(fillBox);
            
            // add the level marks
            for ( i in $slide_options ) {
                if ( $slide_options.hasOwnProperty(i) ) {
                    obj = $slide_options[i];
                    thisMark = '<div class="slide-mark" data-slide-value="' + obj.slide + '">&mdash;&emsp;+ $' + obj.value + ' : ' + obj.text + '</div>';
                    $slider_marks.append(thisMark);
                }
            }
            
            // bold selected options
            $('.slide-mark').each(function() {
                if ( $(this).data('slide-value') >= $start_slide_value ) {
                    $(this).css('font-weight','bold');
                } else {
                    $(this).css('font-weight','normal');
                }
            });
        }
        , change : function(event,ui) { // what to do when the slider is moved
            slideValue = getOption( 'slide' , ui.value ); // get the value of the slider
            $slider_value.val( slideValue.value ); // update the input box
        }
        , slide : function(event,ui) { // what to do while the slider is moving
            $('#slider-fill').height( fillBoxHeight(ui.value) ); // change the height of the filler box
            $('.slide-mark').each(function() {
                if ( $(this).data('slide-value') >= ui.value ) {
                    $(this).css('font-weight','bold');
                } else {
                    $(this).css('font-weight','normal');
                }
            });
            
        }
    });
    
    // get the selected option information
    function getOption( inputType, value ) {
        for ( i in $slide_options ) {
            if ( $slide_options.hasOwnProperty(i) ) {
                var obj = $slide_options[i];
                for ( prop in obj ) {
                    if ( obj.hasOwnProperty(prop) ) {
                        if ( prop == inputType && obj[prop] == value ) {
                            // hide all option information boxes
                            $selection_display.children().each(function() {
                                $(this).hide();
                            });
                            // show the selected div
                            showDiv = '#' + obj.div;
                            $(showDiv).show();
                            return obj;
                        }
                    }
                }
            }
        }
    }
    
    // get filler box height
    function fillBoxHeight( slideValue ) {
        boxHeight = $slider_container.height();
        numOptions = Object.keys($slide_options).length - 1;
        slidePct = (numOptions - slideValue) / numOptions;
        slideHeight = slidePct * boxHeight;
        return slideHeight;
    }
});