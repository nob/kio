jQuery(function($){
    /*-------------------------------
     * Debug info 
     *-------------------------------*/    
    //Output window size for developemnt purpose.
    if($('#jsdebug').attr('id') == 'jsdebug') { 
        $("#jsdebug").text('window: ' + $(window).width() + ' x ' + $(window).height());
        $(window).resize(function() {
            $("#jsdebug").text('window: ' + $(window).width() + ' x ' + $(window).height());
        });
    }

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
        keyboard_nav        :   0,      //Keyboard navigation on/off
        image_path          :   'img/', //Default image path
        min_width           :   0,      //Min width allowed (in pixels)
        min_height          :   0,      //Min height allowed (in pixels)
        vertical_center     :   1,      //Vertically center background
        horizontal_center   :   1,      //Horizontally center background
        fit_portrait        :   1,      //Portrait images will not exceed browser height
        fit_landscape       :   0,      //Landscape images will not exceed browser width
        slides              :   [           // Slideshow Images
                                        {image : 'img/slide_c/slide-01.jpg'},
                                        {image : 'img/slide_c/slide-10.jpg'},
                                        {image : 'img/slide_c/slide-13.jpg'},
                                        {image : 'img/slide_c/slide-20.jpg'},  
                                        {image : 'img/slide_c/slide-27.jpg'},
                                        {image : 'img/slide_c/slide-28.jpg'},
                                        {image : 'img/slide_c/slide-29.jpg'},
                                        {image : 'img/slide_c/slide-05.jpg'},
                                        {image : 'img/slide_c/slide-06.jpg'},
                                        {image : 'img/slide_c/slide-08.jpg'},
                                        {image : 'img/slide_c/slide-07.jpg'},
                                        {image : 'img/slide_c/slide-11.jpg'},
                                        {image : 'img/slide_c/slide-19.jpg'},
                                        {image : 'img/slide_c/slide-15.jpg'},
                                        {image : 'img/slide_c/slide-14.jpg'},
                                        {image : 'img/slide_c/slide-22.jpg'},
                                        {image : 'img/slide_c/slide-24.jpg'},
                                        {image : 'img/slide_c/slide-23.jpg'},
                                        {image : 'img/slide_c/slide-30.jpg'},
                                        {image : 'img/slide_c/slide-31.jpg'},
                                        {image : 'img/slide_c/slide-32.jpg'},
                                        {image : 'img/slide_c/slide-25.jpg'},
                                        {image : 'img/slide_c/slide-26.jpg'}
                                ]
        
    });

    /*-------------------------------
     * Initial page fade In effect.
     *-------------------------------*/
    $('#blind').delay(1000).fadeOut(1200, function () {
        //Allows direct access to each panel according to hash in URL.
        switch (location.hash) {
        case '#company':
            $('#company').click();
            break;
        case '#inquiry':
            $('#inquiry').click();
            break;
        case '#products':
            $('#products').click();
            break;
        default:
            $('#logo').animate({height: 300}, 500);
            $('div#menu').show();
            break;
        }
        api.playToggle(); //start slide show.
    });

    /*-------------------------------
     * Text shadow effect for IE.
     *-------------------------------*/
    if ( jQuery.browser.msie  && jQuery.browser.version < 10) {
        $("div#company-pane h2," +
          "div#company-pane h3," +
          "div#company-pane h4," +
          "div#inquiry-pane h2," +
          "div#products-pane h2," +
          "input.button," +
          "a.button").textShadow();
    }

    /*-------------------------------
     * PDF (catelog file) overlay.
     *-------------------------------*/    
    $('#catalogs a[rel]').overlay({
        close: '.close',
        left: $(window).width() * 0.2 / 2, 
        top: $(window).height() * 0.1 / 2,
        mask: {
            color: '#000000',
            loadSpeed: 500,
            opacity: 0.80
        },
        closeOnClick: true,
        onBeforeLoad: function() { 
            var wrap = this.getOverlay().find('.wrap-overlay');
            wrap.width($(window).width() * 0.8); 
            wrap.height($(window).height() * 0.9);
            if ($('.download', wrap).attr('href') == '') { 
                //load iframe only when first time click.
                var pdf_path = this.getTrigger().attr('href');
                var pdf_url = window.location.protocol + '//' + 
                              window.location.host + 
                              window.location.pathname +
                              pdf_path; 
                var pdf_viewer_url 
                        = 'https://docs.google.com/viewer?embedded=true&url=';
                //alert(pdf_viewer_url + encodeURIComponent(pdf_url));
                $('.pdf-frame', wrap).attr(
                        'src', 
                        pdf_viewer_url + encodeURIComponent(pdf_url)
                );
                $('.download', wrap).attr('href', pdf_path);
            }
        },
        onLoad: function() {
        },
        onClose: function() { 
        }
    });

    /*-------------------------------
     * Map overlay.
     *-------------------------------*/    
     $('#open-map').overlay({
        close: '.close',
        left: 250, 
        top: 65,
        closeOnClick: true,
        onBeforeLoad: function() { 
            var wrap = this.getOverlay().find('.wrap-overlay');
            if (wrap.is(":empty")) {
                //load external page only when first time click.
                wrap.load(this.getTrigger().attr('href'));
            }
            $('#logo, .pane-close').click(function(event) {
                $('#open-map').data('overlay').close();
            });    
        },
        onLoad: function() {
        },
        onClose: function() { 
        }
    });

    /*-------------------------------
     * Facebook overlay.
     *-------------------------------*/    
     $('#open-fb-likebox').overlay({
        close: '.close',
        left: 180, 
        top: 35,
        closeOnClick: true,
        onBeforeLoad: function() { 
            var wrap = this.getOverlay().find('.wrap-overlay');
            if (wrap.is(":empty")) {
                //load external page only when first time click.
                wrap.load(this.getTrigger().attr('href'));
            }
            $('#logo, .pane-close').click(function(event) {
                $('#open-fb-likebox').data('overlay').close();
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
    $("#logo, .pane-close").click(function(event){
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        //Slide back panel if length of panel is defined.
        $("#company-pane").animate({width: 0}, 1000);
        $("#company-pane").css('border-right-width', 0);
        $("#inquiry-pane").animate({width: 0}, 1000);
        $("#inquiry-pane").css('border-left-width', 0);
        $("#products-pane").animate({height: 0}, 1000);
        $("#products-pane").css('border-top-width', 0);

        //Show background navi.
        $("#nextslide, #prevslide").show();

        //Slide main-ctlr back to original state. 
        $("#main-ctlr").animate({top: 100, left: 0}, 700);
        $("#logo").animate({height: 300}, 500);
        $("#menu").show();
        var m_top = -50;
        var m_left = 20;
        if ( jQuery.browser.msie  && jQuery.browser.version < 8) {
            m_top = -55;
            m_left = 0;
        }
        $(".circle").stop().animate(
                    {
                     width : '80px', 
                     height : '80px', 
                     'margin-top' : m_top + 'px', 
                     'margin-left' : m_left + 'px'  
                    }, 
                    500);
        $(".menu-title").fadeTo(500, 1.00);

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
        var logo_img_h = $('#logo img').height()

        //main-ctlr shrinking
        $(".menu-title").fadeTo(500, 0.00);
        $(".circle").stop().animate(
                     {
                      width : '0px', 
                      height : '0px', 
                      'margin-top' : '-10px', 
                      'margin-left' : '60px'  
                     }, 
                     500).queue(function(){
                        $("#menu").hide();
                        $("#logo").animate({height: logo_img_h}, 500);
                     });

        //Hide background navi.
        $("#nextslide, #prevslide").hide();

        //Slide the pane.
        var sliding;
        var pane_length;
        var win_w = $(window).width();
        var win_h = $(window).height();
        var logo_w = $("#logo").outerWidth();
        var logo_offset = $("#logo").offset();
        if (direction == 'left')  { 
            pane_length = 650;
            border_position = 'left';
            sliding = {width: pane_length}; 
            overlap = pane_length - (win_w - logo_offset.left - logo_w); 
        } else if (direction == 'right') {
            pane_length = 650;
            border_position = 'right';
            sliding = {width: pane_length}; 
            overlap = pane_length - logo_offset.left; 
        } else if (direction == 'up') {
            pane_length = 265;
            border_position = 'top';
            sliding = {height: pane_length}; 
            overlap = pane_length - (win_h - logo_offset.top - logo_img_h - 30); 
        }
        $(menu_id + "-pane").animate(sliding, 1800, 'easeOutBounce');
        $(menu_id + "-pane").css('border-' + border_position + '-width', 8);

        //Slide main-ctlr if it is overlaped with sliding panel. 
        if (overlap > 0) {
            distance = overlap + 40;
            if (direction == 'left')  { 
                win_w = $(window).width();
                sliding = {left: -distance};
            } else if (direction == 'right') {
                sliding = {left: distance }; 
            } else if (direction == 'up') {
                sliding = {top: -distance + logo_offset.top }; 
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
    var m_top = -50;
    var m_left = 20;
    if ( jQuery.browser.msie  && jQuery.browser.version < 8) {
        m_top = -55;
        m_left = 0;
    }
    $(".circle", this).stop().animate(
                {
                 width : '80px', 
                 height : '80px', 
                 'margin-top' : m_top + 'px', 
                 'margin-left' : m_left + 'px'  
                }, 
                100);
}
