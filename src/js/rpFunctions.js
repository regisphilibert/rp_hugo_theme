function runFunction(name)
{
    var fn = window[name];
    if(typeof fn !== 'function')
        return;

    fn.apply(window);
}

function apLog(log){
    if(is_debug_user()){
        console.log("artpublic : "+log);
    }
}

function apAjax(data, thisUrl, pushState, params){
    currentView = $('.rp-view.active');

    if(currentView.find('.rp-project-media-video').length){
        currentView.find('.rp-project-media-video')[0].pause();
    }
    buildNewView = 0;
    if(data === 0){
        newView = $(".rp-view[data-url='"+thisUrl+"']");
        console.log("We already have " + thisUrl);
    }
    else{
        newView = $('<div class="rp-view" />').append(data);
        newView.attr('data-url', thisUrl);
        rpContainViews();
        $('.rp-views').append(newView);
        buildNewView = 1;
    }
    rpData = $.parseJSON(newView.find('.rp-data').text());
    newView.attr('data-record', Date.now() / 1000 | 0);
    if(rpData.data_attributes){
        $.each(rpData.data_attributes, function (index, value){
            newView.attr('data-' + index, value);
        });
    }
    action = false;
    if(rpData.action !== 'undefined'){
        action = rpData.action;
    }
    if(typeof params !== "undefined"){
        if(typeof params.action !== "undefined"){
            action = params.action;
        }
    }
    $("head").find('title').html(rpData.title);

    mapIsOn = 0;
    newView.css('opacity', 0);
    currentView.fadeTo(0 , 0 , function(){
        currentView.removeClass('active').attr('style', '');
        newView.addClass('active').fadeTo(150, 1, function(){
            newView.attr('style', '');
        });
    });


    $('html, body').animate({scrollTop:0}, 0);
    $('body').css("overflow", "visible");
    if(rpData.filter){
        $("#date-selector").attr('data-filter', rpData.filter);
        currentFilter = rpData.filter;
    }
    //We run the function named in action parameter.

    //On instantie cetains script jq sur le contenu à loader.
    $('body').attr('class', rpData.body_class);
    //Google Analytics
    if(rp_ga){
        gaTrack(thisUrl.replace(rpWebroot, ''), rpData.title)
    }
    if(buildNewView){
       rpInitView(newView);
    }
    if(action){
        runFunction(action);
    }
    if(pushState){
        window.history.pushState({"pageTitle":rpData.title, "params":params},"", thisUrl);
    }
    $(newView).imagesLoaded(function(){
        rpDoneLoading($(".rp-views"));
    })
    
    //DEALING WITH rpData;
    
    if(rpData.translation_url){
        $('.rp-lang-switch a').attr('href', rpData.translation_url)
    }
}
Prism.hooks.add("after-highlight",function(env){
    $(env.element).parent('pre').wrap('<div class="rp-code-wrapper" data-language="' + env.language + '"></div>')
})
function rpInitView(parent, params){
    ajaxPage = 2;
    isMasoning = 1;
    if(parent.find('.wysiwyg-content pre').length){
        Prism.highlightElement(parent.find('.wysiwyg-content pre')[0]);
    }

    $('.rp-project').fitVids();
/*    if(parent.find('.rp-project-media-video').length){
        var inview = new Waypoint.Inview({
            element: parent.find('.rp-project-media-video')[0],
            enter: function(direction) {
                if(!$(this.element)[0].ended){
                    $(this.element)[0].play();
                }
            },
            exited: function(direction) {
                $(this.element)[0].pause();
            }
        });
    }*/
    parent.find('.wysiwyg-content a, .rp-project-desc a').each(function(){
        if($(this).attr('href').indexOf(BaseURL) == -1){
            $(this).attr('target', '_blank')
        }
    })

    parent.find('.rp-project-meta').on('inview', function(event, isInView) {
      if (isInView) {
        // element is now visible in the viewport
        animateTags($(this).find('.rp-taxo'))
      } else {
        // element has gone out of viewport
      }
    });
}

function rpThisUrlForAJax(thisUrl){
    return thisUrl
    dataKnot = thisUrl.indexOf('?') > 0 ? '&' : '?';
    return thisUrl + dataKnot + 'rp_ajax=1';
}

function rpLoading(e){
    var elem = typeof e !== 'undefined' ? e : $('.rp-views');
    if($(window).width() >= xl){
        headerWidth = $('.rp-header').outerWidth();
        rpLoaderCss = {'left':headerWidth + 'px'};
    }
    else{
        headerHeight = $('.rp-header').outerHeight();
        rpLoaderCss = {'height': $(window).height() - headerHeight, 'top':headerHeight + 'px'};
    }
    if(!elem.find('.rp-loader').length){
        loadingDots = '<div class="loading-dot"></div><div class="loading-dot"></div>';
        rpLoader = $('<div class="rp-loader"><div class="loading-dots">'+loadingDots+'</div></div>');
        elem.append(rpLoader);
    }
    rpLoader.css(rpLoaderCss);
    elem.addClass('rp-loading');
}
function rpDoneLoading(e){
    if($(window).width() < xl){
        //return true;
    }
    var elem = typeof e !== 'undefined' ? e : $('.rp-views');
    elem.removeClass("rp-loading");
    elem.find('.rp-loader').attr('style', '');
    removeSplash();
}
function rpUpdateView(thisUrl, pushState, params){
    //$('.apm-lang-switch a').attr('href', apData.alternate_language_url);
    if($(".rp-view[data-url='"+thisUrl+"']").length){
        apAjax(0, thisUrl, pushState, params);
        rpPopped = true;
    }
    else{
        $.ajax({
          url: rpThisUrlForAJax(thisUrl),
          beforeSend:rpLoading(),
        }).done(function(data) {
            content = $(data).find('.rp-view').html();
            apAjax(content, thisUrl, pushState, params);
            rpPopped = true;
        });
    }
}

function rpContainViews(limit){
    console.log($('.rp-view').length + " views already");
    if(typeof limit == 'undefined'){
        limit = 4;
    }
    preservedView = $(".rp-view[data-preserve=1]");
    $('.rp-view').each(function(){
        if($(this).find('html5-video-player.el-embedded').length){
            $(this).remove();
        }
    })
    if($(".rp-view").length >= limit){
        $('.rp-view').not(preservedView).sort(function (a, b) {
            return + a.getAttribute('data-record') - + b.getAttribute('data-record');
        })
        .first().remove();
    }
}

function is_production(){
    return rpEnv == 'production';
}

function getRpData(view){
    if(!view.data('rpData')){
        rpData = $.parseJSON(view.find('.rp-data').text());
        view.data('rpData', rpData);
    }
    else{
        rpData = view.data('rpData');
    }
    return rpData;
}

/*
Animation
 */
function removeSplash(){
    if(!$('html.rp-splash').length){
        return true;
    }
    cssAnimate = {'height':mobileBodyPaddingTop};
    if($(window).width() >= xl){
        cssAnimate = {'width':400};
    }
    if($(window).width() >= xxl){
        cssAnimate = {'width':500};
    }
    $('.rp-header').addClass('is-moving').animate(cssAnimate, function(){
        $('html').removeClass('rp-splash');
        $(this).removeClass('is-moving is-loading');
        $(this).attr('style', '');
    });
}

function showSplash(){
    $('html').addClass('rp-splash');
    return true;
    cssAnimate = {'height':'100%'};
    if($(window).width() >= xl){
        cssAnimate = {'width':'100%'};
    }
    $('.rp-header').animate(cssAnimate, function(){
        $('html').addClass('rp-splash');
        $(this).attr('style', '');
    });
}

// Animation 
function animateTags(selector){
    selector.each(function(){
        animateTag($(this))
    })
}
function animateTag(el){
    var str = el.text()
    if( el.text().indexOf('%') !== -1 && !el.hasClass('rp-gauge')){
        var percent = str.substring(str.lastIndexOf(":")+1,str.lastIndexOf("%"));
        var gauge = $('<span />')
        gauge.html('#' + str).css('width', 0)
        el.addClass('rp-gauge').append(gauge)
        gauge.animate({
                width: percent + '%',
            },
            300 / percent * 100, 
            'easeOutCubic'
        );
    }
}

function gaEvent(category, action, label){
    ga('send', 'event', category, action, label)
}

function gaTrack(path, title) {
  ga('set', { page: path, title: title });
  ga('send', 'pageview');
}