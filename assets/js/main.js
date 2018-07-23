
// THIS IS MAIN
xl = 1170;
xxl = 1500;

var rpPopped = false;


function toggleLogos(el){
  var isChecked = el.checked;
  var parent = document.querySelector('.rp-Badges')
  if(isChecked){ //checked
    parent.classList.remove('rp-Badges--show-logos')
  }else{ //unchecked
    parent.classList.add('rp-Badges--show-logos');
  }
}

$(document).ready(function(){
    
    if(rpPrism){
        Prism.highlightAll(true, function(){
            $('body').addClass('prism-ready')
        });        
    }
    
    if(typeof $('.rp-view').attr('data-record') == 'undefined'){
        $('.rp-view').attr('data-record', Date.now() / 1000 | 0);
    }

    $(document).on('click', '.rp-Badge', function(){
        $(this).toggleClass('rp-Badge--open').siblings('.rp-Badge').removeClass('rp-Badge--open');

    })

    if($('video').length ){
        $('#project-video-art-public-montreal').on("ended", function(){
            $(this).removeClass('is-playing');
        });
        $('#project-video-art-public-montreal').on("play", function(){
            console.log("Video is starting");
            $(this).addClass('is-playing');
        });
    }

    mobileBodyPaddingTop = 0;

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

    /*FORM*/

    var rgMail = new RegExp(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);
    function showError(element){
        //$('.action span.error_message').html(error_message).stop(true,true).fadeOut(50).fadeIn(300);
        element.addClass('rp-input--error');
    }
    function hideError(element){
        element.removeClass('rp-input--error');
    }
    function successForm(){
        $('.rp-contact__success').imagesLoaded(function(){
            contactTitle = $('.rp-contact__title');
            contactTitle.fadeTo(500, 0, function(){
                contactTitle.html(contactTitle.attr('data-success-message'))
                contactTitle.fadeTo(500, 1);
            });
            $('.rp-contact__success').find('[data-input="rpContactEmail"]').html($('#rp-contact-form').find('[name="rpContactEmail"]').val());
            $('.rp-contact__success').find('[data-input="rpContactMessage"]').html($('#rp-contact-form').find('[name="rpContactMessage"]').val());
            $('.rp-contact').addClass('rp-contact--is-sent');
            $('.rp-contact__success').slideDown(500);
            $('.rp-contact__form').slideUp(500);
            $('.rp-contact .rp-input, .rp-contact .rp-button').removeClass('rp-input--is-loading');
            if(rp_ga){
                gaEvent('contact', 'submit', 'success')
            }
        })
        
    }
    function sendingForm(){
        contactSubmit = $('#rp-contact-form-submit');
        contactSubmit.html(contactSubmit.attr('data-sending-message'));
        $('.rp-contact .rp-InputGroup').add(contactSubmit).addClass('rp-input--is-loading');
    }

    $(document).on('input propertychange', '.adjust-textarea-height textarea', function(){
        var replace = $(this).val().replace(/\n/g, '<br/>');
        $(this).siblings('.fill-me').html(replace);
    });
    formIsBusy = false;
    $(document).on('submit', '#rp-contact-form', function(){
        if(formIsBusy){
            return false;
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
            $.ajax({
                type: "POST",
                url: contactFormApi,
                data:form.serialize(),
                success: function(response){
                    successForm();
                },
                error: function(jqXHR, textStatus, errorThrown ){
                    if(rp_ga){
                        gaEvent('contact', 'submit', 'error')
                    }
                }
            });
        }
        return false;
    });
    $(document).on('focus', '.rp-input--error', function(){
        $(this).removeClass('rp-input--error');
        return false;
    });

});