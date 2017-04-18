//@codekit-prepend "plugins.js"
//@codekit-prepend "rpFunctions.js"
xl = 1170;
xxl = 1500;

var rpPopped = false;

$(document).ready(function(){

    if(typeof $('.rp-view').attr('data-record') == 'undefined'){
        $('.rp-view').attr('data-record', Date.now() / 1000 | 0);
    }
    if($('video').length ){
        $('#project-video-art-public-montreal').on("ended", function(){
            $(this).removeClass('is-playing');
        });
        $('#project-video-art-public-montreal').on("play", function(){
            console.log("Video is starting");
            $(this).addClass('is-playing');
        });
    }
    if(!$("html.rp-splash").length){
        rpInitView($('.rp-view'));
    }

    if(Modernizr.history){

        $(document).on('click', '.history body.rp-full-js a', function(e){
            thisUrl = $ (this).attr('href');
            console.log(thisUrl);
            var that = $(this);
            if (e.isDefaultPrevented() || e.metaKey || e.ctrlKey) {
                return;
            }
            if(that.attr('target') == "_blanc" || that.parents('.lang-switch').length || that.parents('no-ajax').length || that.hasClass('no-ajax') || that.is('[class*="js"]') || thisUrl.indexOf(rpWebroot) == -1 || thisUrl.indexOf(".pdf") != -1){
                return true;
            }
/*            if(thisUrl == $('.rp-view.active').attr('data-url')){
                removeSplash();
                rpInitView($('.rp-view.active'));
                return false;
            }*/
            var action = false;
            var params;
            if(typeof $(this).attr('data-params') != 'undefined'){
                params = $.parseJSON($(this).attr('data-params'));
            }
            else{
                params = [];
            }
            if(typeof that.attr('data-action') !== 'undefined' &&  that.attr('data-action') !== false){
                action = that.attr('data-action');
            }
            else if(typeof params.action != 'undefined'){
                action = params.action;
            }
            if($('.rp-splash').length){
                $('.rp-header').addClass('is-loading');
            }
            rpUpdateView(thisUrl, true, params);
            return false;
        });
        if(Modernizr.history){
            window.addEventListener("popstate", function() {
                if (!rpPopped){ return true;}
                params = {};
                rpUpdateView(location.href, false,  params);
            });
        }
    }
    mobileBodyPaddingTop = 0;
    $('.js-action-removeSplash').click(function(){
        removeSplash();
    });
    $('.js-action-showSplash').click(function(){
        showSplash();
    });
    $(".js-action-toTop").click(function(e){
        e.preventDefault();
        that = $(this);
        duration = $('.rp-wrapper').height() / 10;
        $('html, body').delay(300).animate({scrollTop: 0}, duration);
        gaEvent('Browsing', 'click', 'BackToTop')
        return false;
    });
    $(".magin-input").keyup(function(){
       text = $(this).val();
       $('.magic-content').html(text);
    });
    $('.js-action-doLoading').click(function(){
        console.log('go');
        rpLoading();
        setTimeout(function(){
            rpDoneLoading();
        }, 3000);
    });

    /*FORM*/
    $(document).on('click', '[href="#talk"]', function(){
        contactEasing = 'easeOutBounce'
        if($('.rp-contact').hasClass('rp-contact--is-sent')){
            $('.rp-contact').find('.rp-input').val('').removeAttr('disabled');
            contactSubmit = $('#rp-contact-form-submit');
            contactSubmit.removeAttr('disabled').html(contactSubmit.attr('data-default-message'));
            $('.rp-contact-inputs').slideDown(300);
        }
        else{
            if($('.rp-contact').is(':visible')){
                contactEasing = 'easeInBack'
            }
            $('.rp-contact').slideToggle(500, contactEasing, function(){
                $(this).addClass('is-active');
                if(rp_ga){
                    gaEvent('contact', 'click', 'open')
                }
            });
/*            $('.rp-contact .rp-input-wrapper').each(function(i){
                    var speed = 150;
                    $(this).delay((i++) * speed).slideToggle(speed);
            });*/
        }
        $(this).toggleClass('is-active');
        return false;
    });
    var rgMail = new RegExp(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);
    function showError(element){
        //$('.action span.error_message').html(error_message).stop(true,true).fadeOut(50).fadeIn(300);
        element.addClass('rp-input--error');
    }
    function hideError(element){
        element.removeClass('rp-input--error');
    }
    function successForm(){
        contactSubmit = $('#rp-contact-form-submit');
        contactSubmit.html(contactSubmit.attr('data-success-message'));
        $('.rp-contact-inputs').slideUp(250, function(){
            $('.rp-contact .rp-input, .rp-contact .rp-button').removeClass('rp-input--is-loading');
        });
        $('.rp-contact').addClass('rp-contact--is-sent');
        if(rp_ga){
            gaEvent('contact', 'submit', 'success')
        }
        console.log('sent...')
    }
    function sendingForm(){
        contactSubmit = $('#rp-contact-form-submit');
        contactSubmit.html(contactSubmit.attr('data-sending-message'));
        $('.rp-contact .rp-input, .rp-contact .rp-button').addClass('rp-input--is-loading');
    }

    $(document).on('input propertychange', '.adjust-textarea-height textarea', function(){
        var replace = $(this).val().replace(/\n/g, '<br/>');
        $(this).siblings('.fill-me').html(replace);
    });
    formIsBusy = false;
    $(document).on('submit', '#rp-contact-form', function(){
        if(formIsBusy){
            return;
        }
        var form = $(this);
        valid = true;
        form.find('input, textarea').each(function(){
            that = $(this);
            that.val = that.val();
            that.name = that.attr('name');
            switch(that.name){
                case 'rpContactEmail':
                    if(!that.val.match(rgMail)){
                        //showError("Ce n'est un format d'email valide.");
                        showError(that);
                        valid = false;
                    }
                    else{
                        hideError(that);

                    }
                break;
                case 'rpContactMessage':
                    if(that.val == ""){
                       showError(that);
                        valid = false;
                    }
                    else{
                        hideError(that);
                    }
                break;
            }
        });
        if(valid){
            sendingForm();
            formIsBusy = true;
            //return false;
            $.ajax({
                type: "POST",
                url: BaseURL + "/ajax/mail/",
                data:form.serialize(),
                success: function(response){
                    successForm();
                    console.log(response);
                }
            });
        }
        return false;
    });
    $(document).on('focus', '.rp-input--error', function(){
        $(this).removeClass('rp-input--error');
        return false;
    });

    function rpResize(){
        if($('.rp-splash').length && $(window).width() < xl){
            mobileBodyPaddingTop = eval($('.rp-header .rp-container').height()) + eval(20);
            $('.rp-splash body').css('padding-top', mobileBodyPaddingTop + 'px');
        }
        else{
            $('body').css('padding-top', 0);
        }
    }

    var resizeTimeout;

    // Resize event handler
    function onResize(){
        if(resizeTimeout){
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(rpResize, 200);    // performance: we don't want to redraw/recalculate as the user is dragging the window
    }

    // Resize listener
    $(window).resize(onResize);

    // first time we trigger the event manually
    onResize();

});