// THIS IS rpFunction
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

/*Prism.hooks.add("after-highlight",function(env){
    if(!$(env.element).parents('.rp-code-wrapper').length){
        $(env.element).parent('pre').wrap('<div class="rp-code-wrapper" data-language="' + env.language + '"></div>')
    }
})*/

function is_production(){
    return rpEnv == 'production';
}

// Animation 
function animateTags(selector){
    selector.each(function(){
        animateTag($(this))
    })
}
function animateTag(el){
    var str = el.text()
    if( el.text().indexOf('%') !== -1 && !el.hasClass('rp-Tag--gauge')){
        var percent = str.substring(str.lastIndexOf(":")+1,str.lastIndexOf("%"));
        var gauge = $('<span />')
        gauge.html('#' + str).css('width', 0)
        el.addClass('rp-Tag--gauge').append(gauge)
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
