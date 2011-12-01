jQuery(function($){
    /*-------------------------------
     * Debug info 
     *-------------------------------*/    
    //Output window size for developemnt purpose.
    //$("#debug").text('window: ' + $(window).width() + ' x ' + $(window).height());
    /*----------------------------------------
     * fullscreen background slideshow setup. 
     *----------------------------------------*/    
    $.supersized({
        autoplay            :   0,
        start_slide         :   1,      //Start slide (0 is random)
        random              :   0,      //Randomize slide order (Ignores start slide)
        slide_interval      :   4500,   //Length between transitions
        transition          :   1,      //0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        image_protect       :   1,
        transition_speed    :   700,    //Speed of transition
        new_window          :   0,      //Image links open in new window/tab
        keyboard_nav        :   1,      //Keyboard navigation on/off
        image_path          :   '/img/', //Default image path
        min_width           :   0,      //Min width allowed (in pixels)
        min_height          :   0,      //Min height allowed (in pixels)
        vertical_center     :   1,      //Vertically center background
        horizontal_center   :   1,      //Horizontally center background
        fit_portrait        :   1,      //Portrait images will not exceed browser height
        fit_landscape       :   1,      //Landscape images will not exceed browser width
        slides              :   [           // Slideshow Images
                                        {image : 'img/slide/tmp-69.jpg'},
                                        {image : 'img/slide/tmp-81.jpg'},
                                        {image : 'img/slide/tmp-04.jpg'},
                                        {image : 'img/slide/tmp-08.jpg'},  
                                        {image : 'img/slide/tmp-13.jpg'},
                                        {image : 'img/slide/tmp-20.jpg'},
                                        {image : 'img/slide/tmp-23.jpg'},
                                        {image : 'img/slide/tmp-31.jpg'},
                                        {image : 'img/slide/tmp-40.jpg'},
                                        {image : 'img/slide/tmp-41.jpg'},
                                        {image : 'img/slide/tmp-42.jpg'},
                                        {image : 'img/slide/tmp-48.jpg'},
                                        {image : 'img/slide/tmp-47.jpg'},
                                        {image : 'img/slide/tmp-55.jpg'},
                                        {image : 'img/slide/tmp-57.jpg'},
                                        {image : 'img/slide/tmp-58.jpg'},
                                        {image : 'img/slide/tmp-60.jpg'},
                                        {image : 'img/slide/tmp-62.jpg'},
                                        {image : 'img/slide/tmp-65.jpg'},
                                        {image : 'img/slide/tmp-66.jpg'},  
                                        {image : 'img/slide/tmp-71.jpg'},
                                        {image : 'img/slide/tmp-75.jpg'},
                                        {image : 'img/slide/tmp-77.jpg'},
                                        {image : 'img/slide/tmp-79.jpg'}
                                ]
        
    });

    /*-------------------------------
     * Fade In effect.
     *-------------------------------*/
    $('#blind').delay(100).fadeOut(1500, function () {
        api.playToggle();
    });

    /*-------------------------------
     * Catelog file overlay.
     *-------------------------------*/    
    $('#catalogs a[rel]').overlay({
        close: '.download',
        //speed: 'slow', 
        left: $(window).width() * 0.2 / 2, 
        top: $(window).height() * 0.1 / 2,
        //effect: 'apple',
        mask: {
            color: '#ebecff',
            loadSpeed: 200,
            opacity: 0.9
        },
        closeOnClick: true,
        onBeforeLoad: function() { 
            var overlay = this.getOverlay();
            overlay.width($(window).width() * 0.8); 
            overlay.height($(window).height() * 0.9);
            /*
            var wrap = overlay.find('.wrap-overlay');
            wrap.load(this.getTrigger().attr('href'));
            */
            overlay.load(this.getTrigger().attr('href'));

            /*
            //for IE8 (or lower) & jQuery fadeIn() bug.
            if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= 8) {
                $('#overlay').css('filter', 'progid:DXImageTransform.Microsoft.gradient(startColorStr=#992E292A,endColorStr=#992E292A)');
            }   
            // load the page specified in the trigger 
            $('#wrap').hide('fast'); //hide current content by fast before loading next.
            $('#wrap').load(this.getTrigger().attr("href")); 
            $('#wrap').show('fast'); //now show the content by fast.
            //activate the trigger to change it's color.
            this.getTrigger().toggleClass('active', true);
            */
        },
        onLoad: function() {
        },
        onClose: function() { 
            /*
            //deactivate the trigger to change it's color.
            this.getTrigger().toggleClass('active', false);
            */
        }
    });
    /*-------------------------------
     * Map overlay.
     *-------------------------------*/    
     $('#open-map').overlay({
        left: 550, 
        top: $('#open-map').position().top - 240,
        onBeforeLoad: function() { 
            var wrap = this.getOverlay().find('.wrap-overlay');
            wrap.load(this.getTrigger().attr('href'));
            $('#logo>a').click(function(event) {
                $('#open-map').data('overlay').close();
            });    
        },
        onLoad: function() {
        },
        onClose: function() { 
        }
    });

    /*-------------------------------
     * Sliding panel 
     *-------------------------------*/    
    //Slide In
    slide_pane('#company', 'right');
    slide_pane('#inquiry', 'left');
    slide_pane('#products', 'up');

    //Slide Out
    $("#logo").click(function(event){
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        //Slide back panel if length of panel is defined.
        $("#company-pane").animate({width: 0}, 1000);
        $("#inquiry-pane").animate({width: 0}, 1000);
        $("#products-pane").animate({height: 0}, 1000);

        //Slide main-ctlr back to original state if distance is defined. 
        $("#main-ctlr").animate({top: 100, left: 0}, 700);
        $("#logo").animate({height: 310}, 500);
        $("#main-ctlr").width(450);
        $("#menu").show();
        $(".circle").stop().animate(
                    {
                     width : '80px', 
                     height : '80px', 
                     'margin-top' : '-50px', 
                     'margin-left' : '20px'  
                    }, 
                    500);
        $(".menu-title").fadeTo(500, 1.00);
        $("#menu>a").hover(circleExpand, circleBack);
    });

    /*-------------------------------
     * Circle Expansion
     *-------------------------------*/    
    $("#menu>a").hover(circleExpand, circleBack);
});


/*-------------------------------
 * Functions 
 *-------------------------------*/    
function slide_pane(menu_id, direction) {
    $(menu_id).click(function(event){
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var logo_w = $("#logo").width();
        var logo_h = $("#logo").height();
        var logo_offset = $("#logo").offset();
        var logo_img_h = $('#logo img').height()

        //main-ctlr shrinking
        $("#menu>a").unbind('hover');
        $(".menu-title").fadeTo(500, 0.00);
        $(".circle").stop().animate(
                     {
                      width : '0px', 
                      height : '0px', 
                      'margin-top' : '-10px', 
                      'margin-left' : '60px'  
                     }, 
                     500).queue(function(){
                        $("#main-ctlr").width(logo_w);
                        $("#menu").hide();
                        $("#logo").animate({height: logo_img_h + 20}, 500);
                     });

        //Slide the pane.
        var sliding;
        var pane_length;
        var win_w;
        var win_h;
        if (direction == 'left')  { 
            pane_length = 650;
            sliding = {width: pane_length}; 
            overlap = pane_length - logo_offset.left; 
        } else if (direction == 'right') {
            pane_length = 650;
            sliding = {width: pane_length}; 
            win_w = $(window).width();
            overlap = pane_length - (win_w - logo_offset.left - logo_w); 
        } else if (direction == 'up') {
            pane_length = 265;
            sliding = {height: pane_length}; 
            win_h = $(window).height();
            //overlap = pane_length - (win_h - logo_offset.top - logo_h); 
            overlap = logo_h - (win_h - logo_offset.top - pane_length); 
        }
        $(menu_id + "-pane").animate(sliding, 1800, 'easeOutBounce');

        //Slide main-ctlr if it is overlaped with sliding panel. 
        if (overlap > 0) {
            distance = overlap + 40;
            if (direction == 'left')  { 
                win_w = $(window).width();
                sliding = {left: -distance};
            } else if (direction == 'right') {
                sliding = {left: distance }; 
            } else if (direction == 'up') {
                sliding = {top: distance }; 
            }
            $("#main-ctlr").animate(sliding, 700);        
        }
    });
}

circleExpand = function() {
        $(".circle", this).stop().animate(
                     {
                      width : '160px', 
                      height : '160px', 
                      'margin-top' : '-90px', 
                      'margin-left' : '-20px'  
                     }, 
                     200);
}

circleBack = function() {    
    $(".circle", this).stop().animate(
                {
                 width : '80px', 
                 height : '80px', 
                 'margin-top' : '-50px', 
                 'margin-left' : '20px'  
                }, 
                100);
}
