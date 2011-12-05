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
        image_path          :   'img/', //Default image path
        min_width           :   0,      //Min width allowed (in pixels)
        min_height          :   0,      //Min height allowed (in pixels)
        vertical_center     :   1,      //Vertically center background
        horizontal_center   :   1,      //Horizontally center background
        fit_portrait        :   1,      //Portrait images will not exceed browser height
        fit_landscape       :   1,      //Landscape images will not exceed browser width
        slides              :   [           // Slideshow Images
                                        {image : 'img/slide/slide-01.jpg'},
                                        {image : 'img/slide/slide-02.jpg'},
                                        {image : 'img/slide/slide-03.jpg'},
                                        {image : 'img/slide/slide-04.jpg'},  
                                        {image : 'img/slide/slide-05.jpg'},
                                        {image : 'img/slide/slide-06.jpg'},
                                        {image : 'img/slide/slide-07.jpg'},
                                        {image : 'img/slide/slide-08.jpg'},
                                        {image : 'img/slide/slide-09.jpg'},
                                        {image : 'img/slide/slide-10.jpg'},
                                        {image : 'img/slide/slide-11.jpg'},
                                        {image : 'img/slide/slide-12.jpg'},
                                        {image : 'img/slide/slide-13.jpg'},
                                        {image : 'img/slide/slide-14.jpg'},
                                        {image : 'img/slide/slide-15.jpg'},
                                        {image : 'img/slide/slide-16.jpg'},
                                        {image : 'img/slide/slide-17.jpg'},
                                        {image : 'img/slide/slide-18.jpg'},
                                        {image : 'img/slide/slide-19.jpg'},
                                        {image : 'img/slide/slide-20.jpg'},  
                                        {image : 'img/slide/slide-21.jpg'},
                                        {image : 'img/slide/slide-22.jpg'},
                                        {image : 'img/slide/slide-23.jpg'},
                                        {image : 'img/slide/slide-24.jpg'}
                                ]
        
    });

    /*-------------------------------
     * Fade In effect.
     *-------------------------------*/
    $('#blind').delay(100).fadeOut(1200, function () {
        $("#logo").animate({height: 300}, 500);
        $('div#menu').show();
        api.playToggle();
    });

    /*-------------------------------
     * Text shadow effect for IE.
     *-------------------------------*/
    $("div#company-pane h2," +
      "div#company-pane h3," +
      "div#company-pane h4," +
      "div#inquiry-pane h2," +
      "div#products-pane h2," +
      "input.button," + 
      "a.button").textShadow(); 

    /*-------------------------------
     * PDF (catelog file) overlay.
     *-------------------------------*/    
    $('#catalogs a[rel]').overlay({
        close: '.close',
        left: $(window).width() * 0.2 / 2, 
        top: $(window).height() * 0.1 / 2,
        mask: {
            color: '#ebecff',
            loadSpeed: 200,
            opacity: 0.9
        },
        closeOnClick: true,
        onBeforeLoad: function() { 
            var wrap = this.getOverlay().find('.wrap-overlay');
            wrap.width($(window).width() * 0.8); 
            wrap.height($(window).height() * 0.9);
            if ($('.download', wrap).attr('href') === '') { 
                //load iframe only when first time click.
                var pdf_path = this.getTrigger().attr('href');
                var pdf_url = window.location.protocol + '//' + 
                              window.location.host + 
                              window.location.pathname +
                              pdf_path; 
                var pdf_viewer_url 
                        = 'http://docs.google.com/viewer?embedded=true&url=';
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
        top: $('div.info h4').position().top - 350,
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
        $("#inquiry-pane").animate({width: 0}, 1000);
        $("#products-pane").animate({height: 0}, 1000);

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

        //Slide the pane.
        var sliding;
        var pane_length;
        var win_w = $(window).width();
        var win_h = $(window).height();
        var logo_w = $("#logo").outerWidth();
        var logo_offset = $("#logo").offset();
        if (direction == 'left')  { 
            pane_length = 650;
            sliding = {width: pane_length}; 
            overlap = pane_length - (win_w - logo_offset.left - logo_w); 
        } else if (direction == 'right') {
            pane_length = 650;
            sliding = {width: pane_length}; 
            overlap = pane_length - logo_offset.left; 
        } else if (direction == 'up') {
            pane_length = 265;
            sliding = {height: pane_length}; 
            overlap = pane_length - (win_h - logo_offset.top - logo_img_h - 30); 
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
