//Add jquery plugins here !
//

$ = jQuery;

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});


/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c="CSS1Compat"===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data("inview");if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data("inview",!0).trigger("inview",[!0]):m&&h.data("inview",!1).trigger("inview",[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on("scroll resize scrollstop",function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent("onfocusin",function(){d=null})});

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(count){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

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
    currentView.removeClass('active').attr('style', '');

    newView.addClass('active');
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
    newView.imagesLoaded(function(){
        //rpDoneLoading();
    })
    if(action){
        runFunction(action);
    }
    if(pushState){
        window.history.pushState({"pageTitle":rpData.title, "params":params},"", thisUrl);
    }

    
    //DEALING WITH rpData;
    
    if(rpData.translation_url){
        $('.rp-lang-switch a').attr('href', rpData.translation_url)
    }
}
Prism.hooks.add("after-highlight",function(env){
    if(!$(env.element).parents('.rp-code-wrapper').length){
        $(env.element).parent('pre').wrap('<div class="rp-code-wrapper" data-language="' + env.language + '"></div>')
    }
})
function rpInitView(parent, params){
    ajaxPage = 2;
    isMasoning = 1;
    Prism.highlightAll();
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
var show_loading = false;
function rpLoading(e){
    var elem = typeof e !== 'undefined' ? e : $('.rp-main');
    $('.rp-views').fadeTo(0,0);
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
    show_loading = setTimeout(function(){
        elem.addClass('rp-loading');
    }, 500)
    
}
function rpDoneLoading(e){
    if($(window).width() < xl){
        //return true;
    }
    var elem = typeof e !== 'undefined' ? e : $('.rp-main');
    elem.removeClass("rp-loading");
    elem.find('.rp-loader').attr('style', '');
    $('.rp-views').fadeTo(150, 1, function() {
        if(show_loading){
            clearTimeout(show_loading)
        }
    });
    removeSplash();
}
function rpUpdateView(thisUrl, pushState, params){
    //$('.apm-lang-switch a').attr('href', apData.alternate_language_url);
    //rpLoading()
    if($(".rp-view[data-url='"+thisUrl+"']").length){
        apAjax(0, thisUrl, pushState, params);
        rpPopped = true;
    }
    else{
        $.ajax({
          url: rpThisUrlForAJax(thisUrl),
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
            _gaq.push(['_trackEvent','contact', 'submitted', 'success']);
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

