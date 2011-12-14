//Show submission success message.
//After posting data to Wufoo, iframe page is reloaded with param 'success=1'.
if (document.location.search == '?success=1') {
    //close parents sliding panel and show 'thank you' message in parent window.
    parent.$('div.pane-close').trigger('click');
    var msg_left_pos = 
            ($(parent.window).width() / 2) - (parent.$('div#thx-inquiry-msg').width() / 2);
    parent.$('div#thx-inquiry-msg').css('left', msg_left_pos);
    parent.$('div#thx-inquiry-msg').fadeIn(500).delay(4000).fadeOut(900);
}

jQuery(function($){
    //input data validation setup.
    vapi = $('form#inquiry-form').validator({
            position: 'bottom center', 
            offset: [-5, 13],
            errorInputEvent: null,
            message: '<div><em/></div>' // em element is the arrow.
    });

    //custom required field error message.
    $.tools.validator.localize("en", {
        '[required]'    : 'Please fill out this field.'
    });

    //custom validation func for select box (subject)
    $.tools.validator.fn("[notfirst]", 'Please select one.', function(input) {
        var index = input.prop('selectedIndex');
        return (index == 0) ? false : true;
    });

    //custom validation func for KIOTO,inc. ordersheet file.
    $.tools.validator.fn("#ordersheet", function() {
        input = $('#ordersheet').get(0);
        console.log(input.files);
        if (! input.files) {
            return true;
        }
        console.log(input.files[0]);
        if (! input.files[0]) {
            return true;
        }
        var file = input.files[0];
        //This does not work stablely in IE...
        /*
        if (jQuery.browser.msie) {
            
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            file = fso.getFile(input.value); 
        }
        */
       //alert(file.type);
        if (file.type != 'application/pdf') {
            return 'Please upload our ordersheet(PDF file).';
        } 
        var size = (! file.fileSize) ? file.size : file.fileSize; //for browser compatibility. 
        if (size > 5000000) {
            //max 5MB.
            return 'File size is too big. Maximum is 5MB.'; 
        }
        return true;
    });

    $("form#inquiry-form").bind("onFail", function(e, errors) {
        //input field border color change. 
        if (e.originalEvent.type == 'submit') {
            //we are only doing stuff when the form is submitted.
            //loop through Error objects and add the border color.
            $.each(errors, function()  {
                var input = this.input;
                input.css('border-color', '#D6452B').focus(function() {
                    input.css('border-color', '#afacac');
                    input.css('border-right-color', '#ffffff');
                    input.css('border-bottom-color', '#ffffff');
                });
                if (input.attr('id') == 'ordersheet') {
                    input.click(function() {
                        input.css('border-color', '#afacac');
                        input.css('border-right-color', '#ffffff');
                        input.css('border-bottom-color', '#ffffff');
                    });
                }
            });

            if (!Modernizr.input.placeholder) {
                $('form#inquiry-form input[placeholder]').each(function(){
                    var placeholderText = $(this).attr('placeholder');
                    if ($(this).val() == placeholderText || $(this).val() == '') {
                        $(this).addClass('placeholder');
                        $(this).attr('value',placeholderText);
                    }
                }); 
            }
        }
    });

    $("form#inquiry-form").bind("onBeforeValidate", function(e, fields) {
    });

    $('form#inquiry-form button#send').click(function(event){
        vapi.data('validator').reset();
        init_subject_field();

        if (!Modernizr.input.placeholder) {
            //remove placeholder text before validation.
            $('form#inquiry-form input[placeholder]').each(function(){
                if($(this).val() == $(this).attr('placeholder')) {
                    $(this).attr('value','');
                    $(this).removeClass('placeholder');
                }
            });
        }
    });

    //form data submission.
    $('form#inquiry-form').submit(function(event){
        //this event occurs after validation, but nothin' to do so far. 

        //event.preventDefault ? event.preventDefault() : event.returnValue = false;
        //location.href = 'form.html?success=1';        
    });


    //Cross brwoser styling for Select box first option('Please select...' option).
    //(It is so inconsistent depends on browser. 
    //It better to leave styling...Is it worth the bother?)
    //[ref article] 
    //http://goo.gl/Nv0Fv
    //http://goo.gl/pjGWJ
    if ($("select#subject").prop('selectedIndex') == 0) {
        $("select#subject").css("font-style", "italic");
        $("select#subject").css("color", "#918f8f");
    } else {
        $("select#subject").css("font-style", "normal");
        $("select#subject").css("color", "#000000");
    }

    init_subject_field();
    //HTML 5 placeholder fallback support.
    if (!Modernizr.input.placeholder) {
        $('form#inquiry-form input[placeholder]').each(function(){
            var placeholderText = $(this).attr('placeholder');
            $(this).attr('value',placeholderText);
            $(this).addClass('placeholder');
        });
    } 

    //Help text tooltip
    $("img.help").tooltip({
        relative: true, 
        effect:'slide', 
        offset: [10, 0], 
        position:'bottom center'
    });
});

function init_subject_field() {
    init_fields();
    $("select#subject").change(function(){
        //reset current error messages for dynamic 3 fields.
        vapi.data('validator').reset($('#ordersheet'));
        vapi.data('validator').reset($('#note'));
        vapi.data('validator').reset($('#inq-message'));
        init_fields(); //reset causes removing all functions binded to the fields...

        $('form#inquiry-form .field').each(function(){
            $(this).css('border-color', '#afacac');
            $(this).css('border-right-color', '#ffffff');
            $(this).css('border-bottom-color', '#ffffff');
        });

        var index = $(this).prop('selectedIndex');

        if (index == 0) {
            $("select#subject").css("font-style", "italic");
            $("select#subject").css("color", "#918f8f");
        } else {
            $("select#subject").css("font-style", "normal");
            $("select#subject").css("color", "#000000");
        }

        //Rules for hiding/showing fields.
        if (index == 2) {
            $("li#foli-ordersheet").show();
            $("input#ordersheet").removeAttr('disabled');
            $("input#ordersheet").attr('required', 'required');
        } else {
            $("li#foli-ordersheet").hide();
            $("input#ordersheet").attr('disabled', true);
            $("input#ordersheet").removeAttr('required');
        }
        if (index == 1 || index == 2) {
            $("li#foli-note").show();
            $("textarea#note").removeAttr('disabled');

            $("li#foli-inq-message").hide();
            $("textarea#inq-message").attr('disabled', true);
            $("textarea#inq-message").removeAttr('required');
        } else {
            $("li#foli-note").hide();
            $("textarea#note").attr('disabled', true);

            $("li#foli-inq-message").show();
            $("textarea#inq-message").removeAttr('disabled');
            if (index != 0) {
                $("textarea#inq-message").attr('required', 'required');
            } else { 
                $("textarea#inq-message").removeAttr('required');
            }
        }
    });
}
function init_fields() {
    $("select#subject").focus(function(){
        $("select#subject").css("font-style", "normal");
        $("select#subject").css("color", "#000000");
    });

    //field focus hilighting
    var org_color = '#F7E8C5';
    var hi_color = '#ffffff'; 
    var org_fontsize = '22px';
    var hi_fontsize = '24px';
    $("form#inquiry-form .field").focus(function() {
        $(this).css('background-color', hi_color);
        $(this).next().css('color', hi_color);
        $(this).parent().prev().css('color', hi_color);
        $(this).parent().prev().css('font-size', hi_fontsize);
    });
    $("form#inquiry-form .field").blur(function() {
        $(this).css('background-color', org_color);
        $(this).next().css('color', org_color);
        $(this).parent().prev().css('color', org_color);
        $(this).parent().prev().css('font-size', org_fontsize);
    });


    //HTML 5 placeholder fallback support.
    if (!Modernizr.input.placeholder) {
        $('form#inquiry-form input[placeholder]').each(function(){
            var placeholderText = $(this).attr('placeholder');

            $(this).focus(function() {
                if($(this).val() == placeholderText) {
                    $(this).attr('value','');
                    $(this).removeClass('placeholder');
                    set_end($(this).get(0));
                }
            });

            $(this).blur(function() {
                if ($(this).val() == placeholderText || $(this).val() == '') {
                    $(this).addClass('placeholder');
                    $(this).attr('value',placeholderText);
                }
            });
        }); 
    }

    //retailer address(url) field.
    $("form#inquiry-form input#r-url").focus(function() {
        if (! $(this).val().match(/^http:\/\//i) && 
            $(this).val() != $(this).attr('placeholder')) {
            $(this).val('http://' + $(this).val());
            set_end($(this).get(0));
        }
    });
    $("form#inquiry-form input#r-url").blur(function() {
        if ($(this).val() == 'http://' || $(this).val() == '') {
            $(this).attr('value', '');
        } else if (! $(this).val().match(/^http:\/\//i) &&
            $(this).val() != $(this).attr('placeholder')) {
            $(this).val('http://' + $(this).val());
        }
    });
}

//move cursor to the end of text.
function set_end(input) {  
  if (input.createTextRange) {  
   //IE  
   var FieldRange = input.createTextRange();  
   FieldRange.moveStart('character', input.value.length);  
   FieldRange.collapse();  
   FieldRange.select();  
  }  
  else {  
   //Firefox and Opera  
   input.focus();  
   var length = input.value.length;  
   input.setSelectionRange(length, length);  
  }  
}   
