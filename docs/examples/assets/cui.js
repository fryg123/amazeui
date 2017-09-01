(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["AMUI"] = factory(require("jquery"));
	else
		root["AMUI"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);

	if (typeof $ === 'undefined') {
	  throw new Error('Amaze UI 2.x requires jQuery :-(\n' +
	  '\u7231\u4e0a\u4e00\u5339\u91ce\u9a6c\uff0c\u53ef\u4f60' +
	  '\u7684\u5bb6\u91cc\u6ca1\u6709\u8349\u539f\u2026');
	}

	var UI = $.AMUI || {};
	var $win = $(window);
	var doc = window.document;
	var $html = $('html');

	UI.VERSION = '{{VERSION}}';

	UI.support = {};

	UI.support.transition = (function() {
	  var transitionEnd = (function() {
	    // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
	    var element = doc.body || doc.documentElement;
	    var transEndEventNames = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };

	    for (var name in transEndEventNames) {
	      if (element.style[name] !== undefined) {
	        return transEndEventNames[name];
	      }
	    }
	  })();

	  return transitionEnd && {end: transitionEnd};
	})();

	UI.support.animation = (function() {
	  var animationEnd = (function() {
	    var element = doc.body || doc.documentElement;
	    var animEndEventNames = {
	      WebkitAnimation: 'webkitAnimationEnd',
	      MozAnimation: 'animationend',
	      OAnimation: 'oAnimationEnd oanimationend',
	      animation: 'animationend'
	    };

	    for (var name in animEndEventNames) {
	      if (element.style[name] !== undefined) {
	        return animEndEventNames[name];
	      }
	    }
	  })();

	  return animationEnd && {end: animationEnd};
	})();

	/* eslint-disable dot-notation */
	UI.support.touch = (
	('ontouchstart' in window &&
	navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
	(window.DocumentTouch && document instanceof window.DocumentTouch) ||
	(window.navigator['msPointerEnabled'] &&
	window.navigator['msMaxTouchPoints'] > 0) || // IE 10
	(window.navigator['pointerEnabled'] &&
	window.navigator['maxTouchPoints'] > 0) || // IE >=11
	false);
	/* eslint-enable dot-notation */

	// https://developer.mozilla.org/zh-CN/docs/DOM/MutationObserver
	UI.support.mutationobserver = (window.MutationObserver ||
	window.WebKitMutationObserver || null);

	// https://github.com/Modernizr/Modernizr/blob/924c7611c170ef2dc502582e5079507aff61e388/feature-detects/forms/validation.js#L20
	UI.support.formValidation = (typeof document.createElement('form').
	  checkValidity === 'function');

	UI.utils = {};

	/**
	 * Debounce function
	 *
	 * @param {function} func  Function to be debounced
	 * @param {number} wait Function execution threshold in milliseconds
	 * @param {bool} immediate  Whether the function should be called at
	 *                          the beginning of the delay instead of the
	 *                          end. Default is false.
	 * @description Executes a function when it stops being invoked for n seconds
	 * @see  _.debounce() http://underscorejs.org
	 */
	UI.utils.debounce = function(func, wait, immediate) {
	  var timeout;
	  return function() {
	    var context = this;
	    var args = arguments;
	    var later = function() {
	      timeout = null;
	      if (!immediate) {
	        func.apply(context, args);
	      }
	    };
	    var callNow = immediate && !timeout;

	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);

	    if (callNow) {
	      func.apply(context, args);
	    }
	  };
	};

	UI.utils.isInView = function(element, options) {
	  var $element = $(element);
	  var visible = !!($element.width() || $element.height()) &&
	    $element.css('display') !== 'none';

	  if (!visible) {
	    return false;
	  }

	  var windowLeft = $win.scrollLeft();
	  var windowTop = $win.scrollTop();
	  var offset = $element.offset();
	  var left = offset.left;
	  var top = offset.top;

	  options = $.extend({topOffset: 0, leftOffset: 0}, options);

	  return (top + $element.height() >= windowTop &&
	  top - options.topOffset <= windowTop + $win.height() &&
	  left + $element.width() >= windowLeft &&
	  left - options.leftOffset <= windowLeft + $win.width());
	};

	UI.utils.parseOptions = UI.utils.options = function(string) {
	  if ($.isPlainObject(string)) {
	    return string;
	  }

	  var start = (string ? string.indexOf('{') : -1);
	  var options = {};

	  if (start != -1) {
	    try {
	      options = (new Function('',
	        'var json = ' + string.substr(start) +
	        '; return JSON.parse(JSON.stringify(json));'))();
	    } catch (e) {
	    }
	  }

	  return options;
	};

	UI.utils.generateGUID = function(namespace) {
	  var uid = namespace + '-' || 'am-';

	  do {
	    uid += Math.random().toString(36).substring(2, 7);
	  } while (document.getElementById(uid));

	  return uid;
	};

	// @see https://davidwalsh.name/get-absolute-url
	UI.utils.getAbsoluteUrl = (function() {
	  var a;

	  return function(url) {
	    if (!a) {
	      a = document.createElement('a');
	    }

	    a.href = url;

	    return a.href;
	  };
	})();

	/**
	 * Plugin AMUI Component to jQuery
	 *
	 * @param {String} name - plugin name
	 * @param {Function} Component - plugin constructor
	 * @param {Object} [pluginOption]
	 * @param {String} pluginOption.dataOptions
	 * @param {Function} pluginOption.methodCall - custom method call
	 * @param {Function} pluginOption.before
	 * @param {Function} pluginOption.after
	 * @since v2.4.1
	 */
	UI.plugin = function UIPlugin(name, Component, pluginOption) {
	  var old = $.fn[name];
	  pluginOption = pluginOption || {};

	  $.fn[name] = function(option) {
	    var allArgs = Array.prototype.slice.call(arguments, 0);
	    var args = allArgs.slice(1);
	    var propReturn;
	    var $set = this.each(function() {
	      var $this = $(this);
	      var dataName = 'amui.' + name;
	      var dataOptionsName = pluginOption.dataOptions || ('data-am-' + name);
	      var instance = $this.data(dataName);
	      var options = $.extend({},
	        UI.utils.parseOptions($this.attr(dataOptionsName)),
	        typeof option === 'object' && option);

	      if (!instance && option === 'destroy') {
	        return;
	      }

	      if (!instance) {
	        $this.data(dataName, (instance = new Component(this, options)));
	      }

	      // custom method call
	      if (pluginOption.methodCall) {
	        pluginOption.methodCall.call($this, allArgs, instance);
	      } else {
	        // before method call
	        pluginOption.before &&
	        pluginOption.before.call($this, allArgs, instance);

	        if (typeof option === 'string') {
	          propReturn = typeof instance[option] === 'function' ?
	            instance[option].apply(instance, args) : instance[option];
	        }

	        // after method call
	        pluginOption.after && pluginOption.after.call($this, allArgs, instance);
	      }
	    });

	    return (propReturn === undefined) ? $set : propReturn;
	  };

	  $.fn[name].Constructor = Component;

	  // no conflict
	  $.fn[name].noConflict = function() {
	    $.fn[name] = old;
	    return this;
	  };

	  UI[name] = Component;
	};

	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function(duration) {
	  var called = false;
	  var $el = this;

	  $(this).one(UI.support.transition.end, function() {
	    called = true;
	  });

	  var callback = function() {
	    if (!called) {
	      $($el).trigger(UI.support.transition.end);
	    }
	    $el.transitionEndTimmer = undefined;
	  };
	  this.transitionEndTimmer = setTimeout(callback, duration);
	  return this;
	};

	$.fn.redraw = function() {
	  return this.each(function() {
	    /* eslint-disable */
	    var redraw = this.offsetHeight;
	    /* eslint-enable */
	  });
	};

	$.fn.transitionEnd = function(callback) {
	  var endEvent = UI.support.transition.end;
	  var dom = this;

	  function fireCallBack(e) {
	    callback.call(this, e);
	    endEvent && dom.off(endEvent, fireCallBack);
	  }

	  if (callback && endEvent) {
	    dom.on(endEvent, fireCallBack);
	  }

	  return this;
	};

	$.fn.removeClassRegEx = function() {
	  return this.each(function(regex) {
	    var classes = $(this).attr('class');

	    if (!classes || !regex) {
	      return false;
	    }

	    var classArray = [];
	    classes = classes.split(' ');

	    for (var i = 0, len = classes.length; i < len; i++) {
	      if (!classes[i].match(regex)) {
	        classArray.push(classes[i]);
	      }
	    }

	    $(this).attr('class', classArray.join(' '));
	  });
	};

	//
	$.fn.alterClass = function(removals, additions) {
	  var self = this;

	  if (removals.indexOf('*') === -1) {
	    // Use native jQuery methods if there is no wildcard matching
	    self.removeClass(removals);
	    return !additions ? self : self.addClass(additions);
	  }

	  var classPattern = new RegExp('\\s' +
	  removals.
	    replace(/\*/g, '[A-Za-z0-9-_]+').
	    split(' ').
	    join('\\s|\\s') +
	  '\\s', 'g');

	  self.each(function(i, it) {
	    var cn = ' ' + it.className + ' ';
	    while (classPattern.test(cn)) {
	      cn = cn.replace(classPattern, ' ');
	    }
	    it.className = $.trim(cn);
	  });

	  return !additions ? self : self.addClass(additions);
	};

	// handle multiple browsers for requestAnimationFrame()
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// https://github.com/gnarf/jquery-requestAnimationFrame
	UI.utils.rAF = (function() {
	  return window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	      // if all else fails, use setTimeout
	    function(callback) {
	      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
	    };
	})();

	// handle multiple browsers for cancelAnimationFrame()
	UI.utils.cancelAF = (function() {
	  return window.cancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.oCancelAnimationFrame ||
	    function(id) {
	      window.clearTimeout(id);
	    };
	})();

	// via http://davidwalsh.name/detect-scrollbar-width
	UI.utils.measureScrollbar = function() {
	  if (document.body.clientWidth >= window.innerWidth) {
	    return 0;
	  }

	  // if ($html.width() >= window.innerWidth) return;
	  // var scrollbarWidth = window.innerWidth - $html.width();
	  var $measure = $('<div ' +
	  'style="width: 100px;height: 100px;overflow: scroll;' +
	  'position: absolute;top: -9999px;"></div>');

	  $(document.body).append($measure);

	  var scrollbarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;

	  $measure.remove();

	  return scrollbarWidth;
	};

	UI.utils.imageLoader = function($image, callback) {
	  function loaded() {
	    callback($image[0]);
	  }

	  function bindLoad() {
	    this.one('load', loaded);
	    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
	      var src = this.attr('src');
	      var param = src.match(/\?/) ? '&' : '?';

	      param += 'random=' + (new Date()).getTime();
	      this.attr('src', src + param);
	    }
	  }

	  if (!$image.attr('src')) {
	    loaded();
	    return;
	  }

	  if ($image[0].complete || $image[0].readyState === 4) {
	    loaded();
	  } else {
	    bindLoad.call($image);
	  }
	};

	/**
	 * @see https://github.com/cho45/micro-template.js
	 * (c) cho45 http://cho45.github.com/mit-license
	 */
	UI.template = function(id, data) {
	  var me = UI.template;

	  if (!me.cache[id]) {
	    me.cache[id] = (function() {
	      var name = id;
	      var string = /^[\w\-]+$/.test(id) ?
	        me.get(id) : (name = 'template(string)', id); // no warnings

	      var line = 1;
	      /* eslint-disable max-len, quotes */
	      var body = ('try { ' + (me.variable ?
	      'var ' + me.variable + ' = this.stash;' : 'with (this.stash) { ') +
	      "this.ret += '" +
	      string.
	        replace(/<%/g, '\x11').replace(/%>/g, '\x13'). // if you want other tag, just edit this line
	        replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27').
	        replace(/^\s*|\s*$/g, '').
	        replace(/\n/g, function() {
	          return "';\nthis.line = " + (++line) + "; this.ret += '\\n";
	        }).
	        replace(/\x11-(.+?)\x13/g, "' + ($1) + '").
	        replace(/\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '").
	        replace(/\x11(.+?)\x13/g, "'; $1; this.ret += '") +
	      "'; " + (me.variable ? "" : "}") + "return this.ret;" +
	      "} catch (e) { throw 'TemplateError: ' + e + ' (on " + name +
	      "' + ' line ' + this.line + ')'; } " +
	      "//@ sourceURL=" + name + "\n" // source map
	      ).replace(/this\.ret \+= '';/g, '');
	      /* eslint-enable max-len, quotes */
	      var func = new Function(body);
	      var map = {
	        '&': '&amp;',
	        '<': '&lt;',
	        '>': '&gt;',
	        '\x22': '&#x22;',
	        '\x27': '&#x27;'
	      };
	      var escapeHTML = function(string) {
	        return ('' + string).replace(/[&<>\'\"]/g, function(_) {
	          return map[_];
	        });
	      };

	      return function(stash) {
	        return func.call(me.context = {
	          escapeHTML: escapeHTML,
	          line: 1,
	          ret: '',
	          stash: stash
	        });
	      };
	    })();
	  }

	  return data ? me.cache[id](data) : me.cache[id];
	};

	UI.template.cache = {};

	UI.template.get = function(id) {
	  if (id) {
	    var element = document.getElementById(id);
	    return element && element.innerHTML || '';
	  }
	};

	// Dom mutation watchers
	UI.DOMWatchers = [];
	UI.DOMReady = false;
	UI.ready = function(callback) {
	  UI.DOMWatchers.push(callback);
	  if (UI.DOMReady) {
	    // console.log('Ready call');
	    callback(document);
	  }
	};

	UI.DOMObserve = function(elements, options, callback) {
	  var Observer = UI.support.mutationobserver;
	  if (!Observer) {
	    return;
	  }

	  options = $.isPlainObject(options) ?
	    options : {childList: true, subtree: true};

	  callback = typeof callback === 'function' && callback || function() {
	  };

	  $(elements).each(function() {
	    var element = this;
	    var $element = $(element);

	    if ($element.data('am.observer')) {
	      return;
	    }

	    try {
	      var observer = new Observer(UI.utils.debounce(
	        function(mutations, instance) {
	          callback.call(element, mutations, instance);
	          // trigger this event manually if MutationObserver not supported
	          $element.trigger('changed.dom.amui');
	        }, 50));

	      observer.observe(element, options);

	      $element.data('am.observer', observer);
	    } catch (e) {
	    }
	  });
	};

	$.fn.DOMObserve = function(options, callback) {
	  return this.each(function() {
	    /* eslint-disable new-cap */
	    UI.DOMObserve(this, options, callback);
	    /* eslint-enable new-cap */
	  });
	};

	if (UI.support.touch) {
	  $html.addClass('am-touch');
	}

	$(document).on('changed.dom.amui', function(e) {
	  var element = e.target;

	  // TODO: just call changed element's watcher
	  //       every watcher callback should have a key
	  //       use like this: <div data-am-observe='key1, key2'>
	  //       get keys via $(element).data('amObserve')
	  //       call functions store with these keys
	  $.each(UI.DOMWatchers, function(i, watcher) {
	    watcher(element);
	  });
	});

	$(function() {
	  var $body = $(document.body);

	  UI.DOMReady = true;

	  // Run default init
	  $.each(UI.DOMWatchers, function(i, watcher) {
	    watcher(document);
	  });

	  // watches DOM
	  /* eslint-disable new-cap */
	  UI.DOMObserve('[data-am-observe]');
	  /* eslint-enable */

	  $html.removeClass('no-js').addClass('js');

	  UI.support.animation && $html.addClass('cssanimations');

	  // iOS standalone mode
	  if (window.navigator.standalone) {
	    $html.addClass('am-standalone');
	  }

	  $('.am-topbar-fixed-top').length &&
	  $body.addClass('am-with-topbar-fixed-top');

	  $('.am-topbar-fixed-bottom').length &&
	  $body.addClass('am-with-topbar-fixed-bottom');

	  // Remove responsive classes in .am-layout
	  var $layout = $('.am-layout');
	  $layout.find('[class*="md-block-grid"]').alterClass('md-block-grid-*');
	  $layout.find('[class*="lg-block-grid"]').alterClass('lg-block-grid');

	  // widgets not in .am-layout
	  $('[data-am-widget]').each(function() {
	    var $widget = $(this);
	    // console.log($widget.parents('.am-layout').length)
	    if ($widget.parents('.am-layout').length === 0) {
	      $widget.addClass('am-no-layout');
	    }
	  });
	});

	module.exports = UI;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	Array.prototype.unpush = function () {
	    this.length = this.length - 1;
	}
	Array.prototype.indexOf = function (item, fromIndex) {
	    var aryLen = this.length;
	    if (!fromIndex) fromIndex = 0;
	    else if (fromIndex < 0) fromIndex = Math.max(0, aryLen + fromIndex);
	    for (var i = fromIndex; i < aryLen; i++) {
	        if (this[i] == item) {
	            return i;
	        }
	    }
	    return -1;
	}
	Array.prototype.remove = function (item) {
	    var index = this.indexOf(item);
	    if (index > -1) {
	        this.splice(index, 1);
	    }
	    return (index > -1);
	}
	Array.prototype.removeAt = function (index) {
	    return this.splice(index, 1);
	}
	Array.prototype.removeReItem = function (item) {
	    var temp = {};
	    var aryLen = this.length;
	    for (var i = 0; i < aryLen; i++) {
	        if (typeof temp[this[i]] == "undefined") {
	            if (this[i] != item) {
	                temp[this[i]] = 1;
	            }
	        }
	    }
	    this.length = 0;
	    for (var o in temp) {
	        this[this.length] = o;
	    }
	    return this;
	}
	Array.prototype.clearRepeat = function () {
	    var temp = {};
	    var aryLen = this.length;
	    for (var i = 0; i < aryLen; i++) {
	        if (typeof temp[this[i]] == "undefined") {
	            temp[this[i]] = this[i];
	        }
	    }
	    this.length = 0;
	    for (var o in temp) {
	        this[this.length] = o;
	    }
	    return this;
	}
	Array.prototype.hasRepeat = function () {
	    var temp = {};
	    var aryLen = this.length;
	    for (var i = 0; i < aryLen; i++) {
	        if (typeof temp[this[i]] == "undefined") {
	            temp[this[i]] = this[i];
	        } else {
	            return true;
	        }
	    }
	    return false;
	}
	Array.prototype.exists = function (item) {
	    return (this.indexOf(item) != -1);
	}
	Array.prototype.any = function (cb) {
	    for (var i = 0; i < this.length; i++)
	        if (cb(this[i]))
	            return true;
	    return false;
	}
	Array.prototype.first = function (cb) {
	    for (var i = 0; i < this.length; i++) {
	        var item = cb(this[i]);
	        if (item) return item;
	    }
	    return null;
	}
	Array.prototype.getMax = function () {
	    var aryLen = this.length;
	    for (var i = 1,
	    maxValue = this[0]; i < aryLen; i++) {
	        if (maxValue < this[i]) {
	            maxValue = this[i];
	        }
	    }
	    return maxValue;
	}
	Array.prototype.getMin = function () {
	    var aryLen = this.length;
	    for (var i = 1,
	    minValue = this[0]; i < aryLen; i++) {
	        if (minValue > this[i]) {
	            minValue = this[i];
	        }
	    }
	    return minValue;
	}
	Array.prototype.clear = function () {
	    this.length = 0;
	}
	Array.prototype.addArray = function (array) {
	    var newLen = array.length;
	    for (var i = 0; i < newLen; i++) {
	        this.push(array[i]);
	    }
	}
	Array.prototype.insertAt = function (index, item) {
	    this.splice(index, 0, item);
	}
	Array.prototype.insertBefore = function (aryItem, item) {
	    var index = this.indexOf(aryItem);
	    if (index == -1) {
	        this.push(item);
	    } else {
	        this.splice(index, 0, item);
	    }
	}
	if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function forEach(callback, thisArg) {
	        var T, k;
	        if (this == null) {
	            throw new TypeError("this is null or not defined");
	        }
	        var O = Object(this);
	        var len = O.length >>> 0;
	        if (typeof callback !== "function") {
	            throw new TypeError(callback + " is not a function");
	        }
	        if (arguments.length > 1) {
	            T = thisArg;
	        }
	        k = 0;
	        while (k < len) {
	            var kValue;
	            if (k in O) {

	                kValue = O[k];
	                callback.call(T, kValue, k, O);
	            }
	            k++;
	        }
	    };
	}
	String.prototype.trim = function () {
	    return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	String.prototype.ltrim = function () {
	    return this.replace(/(^\s*)/g, "");
	}
	String.prototype.rtrim = function () {
	    return this.replace(/(\s*$)/g, "");
	}
	String.prototype.contains = function (charstring) {
	    return (this.indexOf(charstring) > -1);
	}
	String.prototype.startWith = function (str) {
	    var reg=new RegExp("^"+str);     
	    return reg.test(this);    
	}
	String.prototype.endWith=function(str){
	    var reg=new RegExp(str+"$");
	    return reg.test(this);
	}
	String.prototype.isDate = function () {
	    var regExp = this.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/);
	    if (regExp == null) {
	        return false;
	    }
	    var date = new Date(regExp[1], regExp[3] - 1, regExp[4]);
	    return (date.getFullYear() == regExp[1] && eval(date.getMonth() + 1) == regExp[3] && date.getDate() == regExp[4]);
	}
	String.prototype.toDate = function () {
	    var regExp = this.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})\s(\d{1,2})(:)(\d{1,2})\6(\d{1,2})$/);
	    if (regExp == null) {
	        return false;
	    }
	    var date = new Date(regExp[1], regExp[3] - 1, regExp[4]);
	    return date;
	}
	String.prototype.HtmlEncode = function () {
	    return this.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	String.prototype.toHtml = function () {
	    var re = new RegExp("((?:http|https|ftp|mms|rtsp)://(&(?=amp;)|[A-Za-z0-9\./=\?%_~@&#:;\+\-])+)", "ig");
	    return this.replace(re, "<a href='$1' target='_blank'>$1</a>");
	}
	String.prototype.ChLen = function () {
	    return this.replace(/[^\x00-\xff]/g, "aa").length;
	}
	String.prototype.IsChinese = function () {
	    var re = /^[\u4E00-\u9FA5]*$/;
	    return re.test(this);
	}
	String.prototype.toMoney = function (prefix) {
	    var ch = parseFloat(this) < 0 ? "-" : "";
	    var s = Math.abs(parseFloat(this)).toString();
	    if (/[^0-9\.]/.test(s)) return "无效的数值";
	    s = s.replace(/^(\d*)$/, "$1.");
	    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	    s = s.replace(".", ",");
	    var re = /(\d)(\d{3},)/;
	    while (re.test(s)) s = s.replace(re, "$1,$2");
	    s = s.replace(/,(\d\d)$/, ".$1");
	    if (prefix == undefined)
	        prefix = "￥";
	    return prefix + ch + s.replace(/^\./, "0.")
	}
	Date.prototype.toFormat = function (_format) {
	    if (!_format)
	        _format = "yyyy/MM/dd HH:mm:ss";
	    var year = this.getFullYear();
	    var month = parseInt(this.getMonth() + 1, 10);
	    var day = this.getDate();
	    var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
	    var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
	    var second = this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds();
	    return _format.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, day).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
	}
	Date.prototype.addDays = function (days) {
	    var times = this.getTime() + (days * 24 * 60 * 60 * 1000);
	    var d = new Date();
	    d.setTime(times);
	    return d;
	}
	Date.prototype.addMinutes = function (minutes) {
	    var times = this.getTime() + (minutes * 60 * 1000);
	    var d = new Date();
	    d.setTime(times);
	    return d;
	}
	Date.prototype.addSeconds = function (seconds) {
	    var seconds = this.getTime() + (seconds * 1000);
	    var d = new Date();
	    d.setTime(seconds);
	    return d;
	}
	function isArray(obj) {
	    return obj && !(obj.propertyIsEnumerable('length')) && typeof obj === 'object' && typeof obj.length === 'number';
	}
	function copyTo(source, target, filters) {
	    for (var key in source) {
	        if (filters && filters.exists(key)) continue;
	        target[key] = source[key];
	    }
	}
	/*HTMLElement*/
	HTMLElement.prototype.fireEvent = function (type) {
	    var evt = document.createEvent('HTMLEvents');
	    evt.initEvent(type, false, false);
	    this.dispatchEvent(evt);
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*! Hammer.JS - v2.0.8 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	  return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	  if (Array.isArray(arg)) {
	    each(arg, context[fn], context);
	    return true;
	  }
	  return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	  var i;

	  if (!obj) {
	    return;
	  }

	  if (obj.forEach) {
	    obj.forEach(iterator, context);
	  } else if (obj.length !== undefined) {
	    i = 0;
	    while (i < obj.length) {
	      iterator.call(context, obj[i], i, obj);
	      i++;
	    }
	  } else {
	    for (i in obj) {
	      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	    }
	  }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	  var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	  return function() {
	    var e = new Error('get-stack-trace');
	    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	      .replace(/^\s+at\s+/gm, '')
	      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	    var log = window.console && (window.console.warn || window.console.log);
	    if (log) {
	      log.call(window.console, deprecationMessage, stack);
	    }
	    return method.apply(this, arguments);
	  };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	  assign = function assign(target) {
	    if (target === undefined || target === null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source !== undefined && source !== null) {
	        for (var nextKey in source) {
	          if (source.hasOwnProperty(nextKey)) {
	            output[nextKey] = source[nextKey];
	          }
	        }
	      }
	    }
	    return output;
	  };
	} else {
	  assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	  var keys = Object.keys(src);
	  var i = 0;
	  while (i < keys.length) {
	    if (!merge || (merge && dest[keys[i]] === undefined)) {
	      dest[keys[i]] = src[keys[i]];
	    }
	    i++;
	  }
	  return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	  return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	  var baseP = base.prototype,
	    childP;

	  childP = child.prototype = Object.create(baseP);
	  childP.constructor = child;
	  childP._super = baseP;

	  if (properties) {
	    assign(childP, properties);
	  }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	  return function boundFn() {
	    return fn.apply(context, arguments);
	  };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	  if (typeof val == TYPE_FUNCTION) {
	    return val.apply(args ? args[0] || undefined : undefined, args);
	  }
	  return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	  return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.addEventListener(type, handler, false);
	  });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.removeEventListener(type, handler, false);
	  });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	  while (node) {
	    if (node == parent) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	  return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	  return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	  if (src.indexOf && !findByKey) {
	    return src.indexOf(find);
	  } else {
	    var i = 0;
	    while (i < src.length) {
	      if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	        return i;
	      }
	      i++;
	    }
	    return -1;
	  }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	  return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	  var results = [];
	  var values = [];
	  var i = 0;

	  while (i < src.length) {
	    var val = key ? src[i][key] : src[i];
	    if (inArray(values, val) < 0) {
	      results.push(src[i]);
	    }
	    values[i] = val;
	    i++;
	  }

	  if (sort) {
	    if (!key) {
	      results = results.sort();
	    } else {
	      results = results.sort(function sortUniqueArray(a, b) {
	        return a[key] > b[key];
	      });
	    }
	  }

	  return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	  var prefix, prop;
	  var camelProp = property[0].toUpperCase() + property.slice(1);

	  var i = 0;
	  while (i < VENDOR_PREFIXES.length) {
	    prefix = VENDOR_PREFIXES[i];
	    prop = (prefix) ? prefix + camelProp : property;

	    if (prop in obj) {
	      return prop;
	    }
	    i++;
	  }
	  return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	  return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	  var doc = element.ownerDocument || element;
	  return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	  var self = this;
	  this.manager = manager;
	  this.callback = callback;
	  this.element = manager.element;
	  this.target = manager.options.inputTarget;

	  // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	  // so when disabled the input events are completely bypassed.
	  this.domHandler = function(ev) {
	    if (boolOrFn(manager.options.enable, [manager])) {
	      self.handler(ev);
	    }
	  };

	  this.init();

	}

	Input.prototype = {
	  /**
	   * should handle the inputEvent data and trigger the callback
	   * @virtual
	   */
	  handler: function() { },

	  /**
	   * bind the events
	   */
	  init: function() {
	    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  },

	  /**
	   * unbind the events
	   */
	  destroy: function() {
	    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	  var Type;
	  var inputClass = manager.options.inputClass;

	  if (inputClass) {
	    Type = inputClass;
	  } else if (SUPPORT_POINTER_EVENTS) {
	    Type = PointerEventInput;
	  } else if (SUPPORT_ONLY_TOUCH) {
	    Type = TouchInput;
	  } else if (!SUPPORT_TOUCH) {
	    Type = MouseInput;
	  } else {
	    Type = TouchMouseInput;
	  }
	  return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	  var pointersLen = input.pointers.length;
	  var changedPointersLen = input.changedPointers.length;
	  var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	  var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	  input.isFirst = !!isFirst;
	  input.isFinal = !!isFinal;

	  if (isFirst) {
	    manager.session = {};
	  }

	  // source event is the normalized value of the domEvents
	  // like 'touchstart, mouseup, pointerdown'
	  input.eventType = eventType;

	  // compute scale, rotation etc
	  computeInputData(manager, input);

	  // emit secret event
	  manager.emit('hammer.input', input);

	  manager.recognize(input);
	  manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	  var session = manager.session;
	  var pointers = input.pointers;
	  var pointersLength = pointers.length;

	  // store the first input to calculate the distance and direction
	  if (!session.firstInput) {
	    session.firstInput = simpleCloneInputData(input);
	  }

	  // to compute scale and rotation we need to store the multiple touches
	  if (pointersLength > 1 && !session.firstMultiple) {
	    session.firstMultiple = simpleCloneInputData(input);
	  } else if (pointersLength === 1) {
	    session.firstMultiple = false;
	  }

	  var firstInput = session.firstInput;
	  var firstMultiple = session.firstMultiple;
	  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	  var center = input.center = getCenter(pointers);
	  input.timeStamp = now();
	  input.deltaTime = input.timeStamp - firstInput.timeStamp;

	  input.angle = getAngle(offsetCenter, center);
	  input.distance = getDistance(offsetCenter, center);

	  computeDeltaXY(session, input);
	  input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	  input.overallVelocityX = overallVelocity.x;
	  input.overallVelocityY = overallVelocity.y;
	  input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	  input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	  session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	  computeIntervalInputData(session, input);

	  // find the correct target
	  var target = manager.element;
	  if (hasParent(input.srcEvent.target, target)) {
	    target = input.srcEvent.target;
	  }
	  input.target = target;
	}

	function computeDeltaXY(session, input) {
	  var center = input.center;
	  var offset = session.offsetDelta || {};
	  var prevDelta = session.prevDelta || {};
	  var prevInput = session.prevInput || {};

	  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	    prevDelta = session.prevDelta = {
	      x: prevInput.deltaX || 0,
	      y: prevInput.deltaY || 0
	    };

	    offset = session.offsetDelta = {
	      x: center.x,
	      y: center.y
	    };
	  }

	  input.deltaX = prevDelta.x + (center.x - offset.x);
	  input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	  var last = session.lastInterval || input,
	    deltaTime = input.timeStamp - last.timeStamp,
	    velocity, velocityX, velocityY, direction;

	  if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	    var deltaX = input.deltaX - last.deltaX;
	    var deltaY = input.deltaY - last.deltaY;

	    var v = getVelocity(deltaTime, deltaX, deltaY);
	    velocityX = v.x;
	    velocityY = v.y;
	    velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	    direction = getDirection(deltaX, deltaY);

	    session.lastInterval = input;
	  } else {
	    // use latest velocity info if it doesn't overtake a minimum period
	    velocity = last.velocity;
	    velocityX = last.velocityX;
	    velocityY = last.velocityY;
	    direction = last.direction;
	  }

	  input.velocity = velocity;
	  input.velocityX = velocityX;
	  input.velocityY = velocityY;
	  input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = [];
	  var i = 0;
	  while (i < input.pointers.length) {
	    pointers[i] = {
	      clientX: round(input.pointers[i].clientX),
	      clientY: round(input.pointers[i].clientY)
	    };
	    i++;
	  }

	  return {
	    timeStamp: now(),
	    pointers: pointers,
	    center: getCenter(pointers),
	    deltaX: input.deltaX,
	    deltaY: input.deltaY
	  };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	  var pointersLength = pointers.length;

	  // no need to loop when only one touch
	  if (pointersLength === 1) {
	    return {
	      x: round(pointers[0].clientX),
	      y: round(pointers[0].clientY)
	    };
	  }

	  var x = 0, y = 0, i = 0;
	  while (i < pointersLength) {
	    x += pointers[i].clientX;
	    y += pointers[i].clientY;
	    i++;
	  }

	  return {
	    x: round(x / pointersLength),
	    y: round(y / pointersLength)
	  };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	  return {
	    x: x / deltaTime || 0,
	    y: y / deltaTime || 0
	  };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	  if (x === y) {
	    return DIRECTION_NONE;
	  }

	  if (abs(x) >= abs(y)) {
	    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	  }
	  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];

	  return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];
	  return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	  mousedown: INPUT_START,
	  mousemove: INPUT_MOVE,
	  mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	  this.evEl = MOUSE_ELEMENT_EVENTS;
	  this.evWin = MOUSE_WINDOW_EVENTS;

	  this.pressed = false; // mousedown state

	  Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function MEhandler(ev) {
	    var eventType = MOUSE_INPUT_MAP[ev.type];

	    // on start we want to have the left mouse button down
	    if (eventType & INPUT_START && ev.button === 0) {
	      this.pressed = true;
	    }

	    if (eventType & INPUT_MOVE && ev.which !== 1) {
	      eventType = INPUT_END;
	    }

	    // mouse must be down
	    if (!this.pressed) {
	      return;
	    }

	    if (eventType & INPUT_END) {
	      this.pressed = false;
	    }

	    this.callback(this.manager, eventType, {
	      pointers: [ev],
	      changedPointers: [ev],
	      pointerType: INPUT_TYPE_MOUSE,
	      srcEvent: ev
	    });
	  }
	});

	var POINTER_INPUT_MAP = {
	  pointerdown: INPUT_START,
	  pointermove: INPUT_MOVE,
	  pointerup: INPUT_END,
	  pointercancel: INPUT_CANCEL,
	  pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	  2: INPUT_TYPE_TOUCH,
	  3: INPUT_TYPE_PEN,
	  4: INPUT_TYPE_MOUSE,
	  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	  this.evEl = POINTER_ELEMENT_EVENTS;
	  this.evWin = POINTER_WINDOW_EVENTS;

	  Input.apply(this, arguments);

	  this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function PEhandler(ev) {
	    var store = this.store;
	    var removePointer = false;

	    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	    var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	    // get index of the event in the store
	    var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	    // start and mouse must be down
	    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	      if (storeIndex < 0) {
	        store.push(ev);
	        storeIndex = store.length - 1;
	      }
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	      removePointer = true;
	    }

	    // it not found, so the pointer hasn't been down (so it's probably a hover)
	    if (storeIndex < 0) {
	      return;
	    }

	    // update the event in the store
	    store[storeIndex] = ev;

	    this.callback(this.manager, eventType, {
	      pointers: store,
	      changedPointers: [ev],
	      pointerType: pointerType,
	      srcEvent: ev
	    });

	    if (removePointer) {
	      // remove from the store
	      store.splice(storeIndex, 1);
	    }
	  }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	  this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	  this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	  this.started = false;

	  Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	  handler: function TEhandler(ev) {
	    var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	    // should we handle the touch events?
	    if (type === INPUT_START) {
	      this.started = true;
	    }

	    if (!this.started) {
	      return;
	    }

	    var touches = normalizeSingleTouches.call(this, ev, type);

	    // when done, reset the started state
	    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	      this.started = false;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	  var all = toArray(ev.touches);
	  var changed = toArray(ev.changedTouches);

	  if (type & (INPUT_END | INPUT_CANCEL)) {
	    all = uniqueArray(all.concat(changed), 'identifier', true);
	  }

	  return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	  this.evTarget = TOUCH_TARGET_EVENTS;
	  this.targetIds = {};

	  Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	  handler: function MTEhandler(ev) {
	    var type = TOUCH_INPUT_MAP[ev.type];
	    var touches = getTouches.call(this, ev, type);
	    if (!touches) {
	      return;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	  var allTouches = toArray(ev.touches);
	  var targetIds = this.targetIds;

	  // when there is only one touch, the process can be simplified
	  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	    targetIds[allTouches[0].identifier] = true;
	    return [allTouches, allTouches];
	  }

	  var i,
	    targetTouches,
	    changedTouches = toArray(ev.changedTouches),
	    changedTargetTouches = [],
	    target = this.target;

	  // get target touches from touches
	  targetTouches = allTouches.filter(function(touch) {
	    return hasParent(touch.target, target);
	  });

	  // collect touches
	  if (type === INPUT_START) {
	    i = 0;
	    while (i < targetTouches.length) {
	      targetIds[targetTouches[i].identifier] = true;
	      i++;
	    }
	  }

	  // filter changed touches to only contain touches that exist in the collected target ids
	  i = 0;
	  while (i < changedTouches.length) {
	    if (targetIds[changedTouches[i].identifier]) {
	      changedTargetTouches.push(changedTouches[i]);
	    }

	    // cleanup removed touches
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	      delete targetIds[changedTouches[i].identifier];
	    }
	    i++;
	  }

	  if (!changedTargetTouches.length) {
	    return;
	  }

	  return [
	    // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	    changedTargetTouches
	  ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	  Input.apply(this, arguments);

	  var handler = bindFn(this.handler, this);
	  this.touch = new TouchInput(this.manager, handler);
	  this.mouse = new MouseInput(this.manager, handler);

	  this.primaryTouch = null;
	  this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	  /**
	   * handle mouse and touch events
	   * @param {Hammer} manager
	   * @param {String} inputEvent
	   * @param {Object} inputData
	   */
	  handler: function TMEhandler(manager, inputEvent, inputData) {
	    var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	      isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	    if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	      return;
	    }

	    // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	    if (isTouch) {
	      recordTouches.call(this, inputEvent, inputData);
	    } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	      return;
	    }

	    this.callback(manager, inputEvent, inputData);
	  },

	  /**
	   * remove the event listeners
	   */
	  destroy: function destroy() {
	    this.touch.destroy();
	    this.mouse.destroy();
	  }
	});

	function recordTouches(eventType, eventData) {
	  if (eventType & INPUT_START) {
	    this.primaryTouch = eventData.changedPointers[0].identifier;
	    setLastTouch.call(this, eventData);
	  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	    setLastTouch.call(this, eventData);
	  }
	}

	function setLastTouch(eventData) {
	  var touch = eventData.changedPointers[0];

	  if (touch.identifier === this.primaryTouch) {
	    var lastTouch = {x: touch.clientX, y: touch.clientY};
	    this.lastTouches.push(lastTouch);
	    var lts = this.lastTouches;
	    var removeLastTouch = function() {
	      var i = lts.indexOf(lastTouch);
	      if (i > -1) {
	        lts.splice(i, 1);
	      }
	    };
	    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	  }
	}

	function isSyntheticEvent(eventData) {
	  var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	  for (var i = 0; i < this.lastTouches.length; i++) {
	    var t = this.lastTouches[i];
	    var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	      return true;
	    }
	  }
	  return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	  this.manager = manager;
	  this.set(value);
	}

	TouchAction.prototype = {
	  /**
	   * set the touchAction value on the element or enable the polyfill
	   * @param {String} value
	   */
	  set: function(value) {
	    // find out the touch-action by the event handlers
	    if (value == TOUCH_ACTION_COMPUTE) {
	      value = this.compute();
	    }

	    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	    }
	    this.actions = value.toLowerCase().trim();
	  },

	  /**
	   * just re-set the touchAction value
	   */
	  update: function() {
	    this.set(this.manager.options.touchAction);
	  },

	  /**
	   * compute the value for the touchAction property based on the recognizer's settings
	   * @returns {String} value
	   */
	  compute: function() {
	    var actions = [];
	    each(this.manager.recognizers, function(recognizer) {
	      if (boolOrFn(recognizer.options.enable, [recognizer])) {
	        actions = actions.concat(recognizer.getTouchAction());
	      }
	    });
	    return cleanTouchActions(actions.join(' '));
	  },

	  /**
	   * this method is called on each input cycle and provides the preventing of the browser behavior
	   * @param {Object} input
	   */
	  preventDefaults: function(input) {
	    var srcEvent = input.srcEvent;
	    var direction = input.offsetDirection;

	    // if the touch action did prevented once this session
	    if (this.manager.session.prevented) {
	      srcEvent.preventDefault();
	      return;
	    }

	    var actions = this.actions;
	    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	    if (hasNone) {
	      //do not prevent defaults if this is a tap gesture

	      var isTapPointer = input.pointers.length === 1;
	      var isTapMovement = input.distance < 2;
	      var isTapTouchTime = input.deltaTime < 250;

	      if (isTapPointer && isTapMovement && isTapTouchTime) {
	        return;
	      }
	    }

	    if (hasPanX && hasPanY) {
	      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	      return;
	    }

	    if (hasNone ||
	      (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	      (hasPanX && direction & DIRECTION_VERTICAL)) {
	      return this.preventSrc(srcEvent);
	    }
	  },

	  /**
	   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	   * @param {Object} srcEvent
	   */
	  preventSrc: function(srcEvent) {
	    this.manager.session.prevented = true;
	    srcEvent.preventDefault();
	  }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	  // none
	  if (inStr(actions, TOUCH_ACTION_NONE)) {
	    return TOUCH_ACTION_NONE;
	  }

	  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	  // if both pan-x and pan-y are set (different recognizers
	  // for different directions, e.g. horizontal pan but vertical swipe?)
	  // we need none (as otherwise with pan-x pan-y combined none of these
	  // recognizers will work, since the browser would handle all panning
	  if (hasPanX && hasPanY) {
	    return TOUCH_ACTION_NONE;
	  }

	  // pan-x OR pan-y
	  if (hasPanX || hasPanY) {
	    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	  }

	  // manipulation
	  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	    return TOUCH_ACTION_MANIPULATION;
	  }

	  return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	  if (!NATIVE_TOUCH_ACTION) {
	    return false;
	  }
	  var touchMap = {};
	  var cssSupports = window.CSS && window.CSS.supports;
	  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	    // If css.supports is not supported but there is native touch-action assume it supports
	    // all values. This is the case for IE 10 and 11.
	    touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	  });
	  return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	  this.options = assign({}, this.defaults, options || {});

	  this.id = uniqueId();

	  this.manager = null;

	  // default is enable true
	  this.options.enable = ifUndefined(this.options.enable, true);

	  this.state = STATE_POSSIBLE;

	  this.simultaneous = {};
	  this.requireFail = [];
	}

	Recognizer.prototype = {
	  /**
	   * @virtual
	   * @type {Object}
	   */
	  defaults: {},

	  /**
	   * set options
	   * @param {Object} options
	   * @return {Recognizer}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // also update the touchAction, in case something changed about the directions/enabled state
	    this.manager && this.manager.touchAction.update();
	    return this;
	  },

	  /**
	   * recognize simultaneous with an other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  recognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	      return this;
	    }

	    var simultaneous = this.simultaneous;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (!simultaneous[otherRecognizer.id]) {
	      simultaneous[otherRecognizer.id] = otherRecognizer;
	      otherRecognizer.recognizeWith(this);
	    }
	    return this;
	  },

	  /**
	   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRecognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    delete this.simultaneous[otherRecognizer.id];
	    return this;
	  },

	  /**
	   * recognizer can only run when an other is failing
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  requireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	      return this;
	    }

	    var requireFail = this.requireFail;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (inArray(requireFail, otherRecognizer) === -1) {
	      requireFail.push(otherRecognizer);
	      otherRecognizer.requireFailure(this);
	    }
	    return this;
	  },

	  /**
	   * drop the requireFailure link. it does not remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRequireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    var index = inArray(this.requireFail, otherRecognizer);
	    if (index > -1) {
	      this.requireFail.splice(index, 1);
	    }
	    return this;
	  },

	  /**
	   * has require failures boolean
	   * @returns {boolean}
	   */
	  hasRequireFailures: function() {
	    return this.requireFail.length > 0;
	  },

	  /**
	   * if the recognizer can recognize simultaneous with an other recognizer
	   * @param {Recognizer} otherRecognizer
	   * @returns {Boolean}
	   */
	  canRecognizeWith: function(otherRecognizer) {
	    return !!this.simultaneous[otherRecognizer.id];
	  },

	  /**
	   * You should use `tryEmit` instead of `emit` directly to check
	   * that all the needed recognizers has failed before emitting.
	   * @param {Object} input
	   */
	  emit: function(input) {
	    var self = this;
	    var state = this.state;

	    function emit(event) {
	      self.manager.emit(event, input);
	    }

	    // 'panstart' and 'panmove'
	    if (state < STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }

	    emit(self.options.event); // simple 'eventName' events

	    if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	      emit(input.additionalEvent);
	    }

	    // panend and pancancel
	    if (state >= STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }
	  },

	  /**
	   * Check that all the require failure recognizers has failed,
	   * if true, it emits a gesture event,
	   * otherwise, setup the state to FAILED.
	   * @param {Object} input
	   */
	  tryEmit: function(input) {
	    if (this.canEmit()) {
	      return this.emit(input);
	    }
	    // it's failing anyway
	    this.state = STATE_FAILED;
	  },

	  /**
	   * can we emit?
	   * @returns {boolean}
	   */
	  canEmit: function() {
	    var i = 0;
	    while (i < this.requireFail.length) {
	      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	        return false;
	      }
	      i++;
	    }
	    return true;
	  },

	  /**
	   * update the recognizer
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    // make a new copy of the inputData
	    // so we can change the inputData without messing up the other recognizers
	    var inputDataClone = assign({}, inputData);

	    // is is enabled and allow recognizing?
	    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	      this.reset();
	      this.state = STATE_FAILED;
	      return;
	    }

	    // reset when we've reached the end
	    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	      this.state = STATE_POSSIBLE;
	    }

	    this.state = this.process(inputDataClone);

	    // the recognizer has recognized a gesture
	    // so trigger an event
	    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	      this.tryEmit(inputDataClone);
	    }
	  },

	  /**
	   * return the state of the recognizer
	   * the actual recognizing happens in this method
	   * @virtual
	   * @param {Object} inputData
	   * @returns {Const} STATE
	   */
	  process: function(inputData) { }, // jshint ignore:line

	  /**
	   * return the preferred touch-action
	   * @virtual
	   * @returns {Array}
	   */
	  getTouchAction: function() { },

	  /**
	   * called when the gesture isn't allowed to recognize
	   * like when another is being recognized or it is disabled
	   * @virtual
	   */
	  reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	  if (state & STATE_CANCELLED) {
	    return 'cancel';
	  } else if (state & STATE_ENDED) {
	    return 'end';
	  } else if (state & STATE_CHANGED) {
	    return 'move';
	  } else if (state & STATE_BEGAN) {
	    return 'start';
	  }
	  return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	  if (direction == DIRECTION_DOWN) {
	    return 'down';
	  } else if (direction == DIRECTION_UP) {
	    return 'up';
	  } else if (direction == DIRECTION_LEFT) {
	    return 'left';
	  } else if (direction == DIRECTION_RIGHT) {
	    return 'right';
	  }
	  return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	  var manager = recognizer.manager;
	  if (manager) {
	    return manager.get(otherRecognizer);
	  }
	  return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	  Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof AttrRecognizer
	   */
	  defaults: {
	    /**
	     * @type {Number}
	     * @default 1
	     */
	    pointers: 1
	  },

	  /**
	   * Used to check if it the recognizer receives valid input, like input.distance > 10.
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {Boolean} recognized
	   */
	  attrTest: function(input) {
	    var optionPointers = this.options.pointers;
	    return optionPointers === 0 || input.pointers.length === optionPointers;
	  },

	  /**
	   * Process the input and return the state for the recognizer
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {*} State
	   */
	  process: function(input) {
	    var state = this.state;
	    var eventType = input.eventType;

	    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	    var isValid = this.attrTest(input);

	    // on cancel input and we've recognized before, return STATE_CANCELLED
	    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	      return state | STATE_CANCELLED;
	    } else if (isRecognized || isValid) {
	      if (eventType & INPUT_END) {
	        return state | STATE_ENDED;
	      } else if (!(state & STATE_BEGAN)) {
	        return STATE_BEGAN;
	      }
	      return state | STATE_CHANGED;
	    }
	    return STATE_FAILED;
	  }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	  AttrRecognizer.apply(this, arguments);

	  this.pX = null;
	  this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PanRecognizer
	   */
	  defaults: {
	    event: 'pan',
	    threshold: 10,
	    pointers: 1,
	    direction: DIRECTION_ALL
	  },

	  getTouchAction: function() {
	    var direction = this.options.direction;
	    var actions = [];
	    if (direction & DIRECTION_HORIZONTAL) {
	      actions.push(TOUCH_ACTION_PAN_Y);
	    }
	    if (direction & DIRECTION_VERTICAL) {
	      actions.push(TOUCH_ACTION_PAN_X);
	    }
	    return actions;
	  },

	  directionTest: function(input) {
	    var options = this.options;
	    var hasMoved = true;
	    var distance = input.distance;
	    var direction = input.direction;
	    var x = input.deltaX;
	    var y = input.deltaY;

	    // lock to axis?
	    if (!(direction & options.direction)) {
	      if (options.direction & DIRECTION_HORIZONTAL) {
	        direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        hasMoved = x != this.pX;
	        distance = Math.abs(input.deltaX);
	      } else {
	        direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	        hasMoved = y != this.pY;
	        distance = Math.abs(input.deltaY);
	      }
	    }
	    input.direction = direction;
	    return hasMoved && distance > options.threshold && direction & options.direction;
	  },

	  attrTest: function(input) {
	    return AttrRecognizer.prototype.attrTest.call(this, input) &&
	      (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	  },

	  emit: function(input) {

	    this.pX = input.deltaX;
	    this.pY = input.deltaY;

	    var direction = directionStr(input.direction);

	    if (direction) {
	      input.additionalEvent = this.options.event + direction;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'pinch',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	  },

	  emit: function(input) {
	    if (input.scale !== 1) {
	      var inOut = input.scale < 1 ? 'in' : 'out';
	      input.additionalEvent = this.options.event + inOut;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	  Recognizer.apply(this, arguments);

	  this._timer = null;
	  this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PressRecognizer
	   */
	  defaults: {
	    event: 'press',
	    pointers: 1,
	    time: 251, // minimal time of the pointer to be pressed
	    threshold: 9 // a minimal movement is ok, but keep it low
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_AUTO];
	  },

	  process: function(input) {
	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTime = input.deltaTime > options.time;

	    this._input = input;

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	      this.reset();
	    } else if (input.eventType & INPUT_START) {
	      this.reset();
	      this._timer = setTimeoutContext(function() {
	        this.state = STATE_RECOGNIZED;
	        this.tryEmit();
	      }, options.time, this);
	    } else if (input.eventType & INPUT_END) {
	      return STATE_RECOGNIZED;
	    }
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function(input) {
	    if (this.state !== STATE_RECOGNIZED) {
	      return;
	    }

	    if (input && (input.eventType & INPUT_END)) {
	      this.manager.emit(this.options.event + 'up', input);
	    } else {
	      this._input.timeStamp = now();
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof RotateRecognizer
	   */
	  defaults: {
	    event: 'rotate',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	  }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof SwipeRecognizer
	   */
	  defaults: {
	    event: 'swipe',
	    threshold: 10,
	    velocity: 0.3,
	    direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	    pointers: 1
	  },

	  getTouchAction: function() {
	    return PanRecognizer.prototype.getTouchAction.call(this);
	  },

	  attrTest: function(input) {
	    var direction = this.options.direction;
	    var velocity;

	    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	      velocity = input.overallVelocity;
	    } else if (direction & DIRECTION_HORIZONTAL) {
	      velocity = input.overallVelocityX;
	    } else if (direction & DIRECTION_VERTICAL) {
	      velocity = input.overallVelocityY;
	    }

	    return this._super.attrTest.call(this, input) &&
	      direction & input.offsetDirection &&
	      input.distance > this.options.threshold &&
	      input.maxPointers == this.options.pointers &&
	      abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	  },

	  emit: function(input) {
	    var direction = directionStr(input.offsetDirection);
	    if (direction) {
	      this.manager.emit(this.options.event + direction, input);
	    }

	    this.manager.emit(this.options.event, input);
	  }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	  Recognizer.apply(this, arguments);

	  // previous time and center,
	  // used for tap counting
	  this.pTime = false;
	  this.pCenter = false;

	  this._timer = null;
	  this._input = null;
	  this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'tap',
	    pointers: 1,
	    taps: 1,
	    interval: 300, // max time between the multi-tap taps
	    time: 250, // max time of the pointer to be down (like finger on the screen)
	    threshold: 9, // a minimal movement is ok, but keep it low
	    posThreshold: 10 // a multi-tap can be a bit off the initial position
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_MANIPULATION];
	  },

	  process: function(input) {
	    var options = this.options;

	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTouchTime = input.deltaTime < options.time;

	    this.reset();

	    if ((input.eventType & INPUT_START) && (this.count === 0)) {
	      return this.failTimeout();
	    }

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (validMovement && validTouchTime && validPointers) {
	      if (input.eventType != INPUT_END) {
	        return this.failTimeout();
	      }

	      var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	      this.pTime = input.timeStamp;
	      this.pCenter = input.center;

	      if (!validMultiTap || !validInterval) {
	        this.count = 1;
	      } else {
	        this.count += 1;
	      }

	      this._input = input;

	      // if tap count matches we have recognized it,
	      // else it has began recognizing...
	      var tapCount = this.count % options.taps;
	      if (tapCount === 0) {
	        // no failing requirements, immediately trigger the tap event
	        // or wait as long as the multitap interval to trigger
	        if (!this.hasRequireFailures()) {
	          return STATE_RECOGNIZED;
	        } else {
	          this._timer = setTimeoutContext(function() {
	            this.state = STATE_RECOGNIZED;
	            this.tryEmit();
	          }, options.interval, this);
	          return STATE_BEGAN;
	        }
	      }
	    }
	    return STATE_FAILED;
	  },

	  failTimeout: function() {
	    this._timer = setTimeoutContext(function() {
	      this.state = STATE_FAILED;
	    }, this.options.interval, this);
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function() {
	    if (this.state == STATE_RECOGNIZED) {
	      this._input.tapCount = this.count;
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	  options = options || {};
	  options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	  return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	  /**
	   * set if DOM events are being triggered.
	   * But this is slower and unused by simple implementations, so disabled by default.
	   * @type {Boolean}
	   * @default false
	   */
	  domEvents: false,

	  /**
	   * The value for the touchAction property/fallback.
	   * When set to `compute` it will magically set the correct value based on the added recognizers.
	   * @type {String}
	   * @default compute
	   */
	  touchAction: TOUCH_ACTION_COMPUTE,

	  /**
	   * @type {Boolean}
	   * @default true
	   */
	  enable: true,

	  /**
	   * EXPERIMENTAL FEATURE -- can be removed/changed
	   * Change the parent input target element.
	   * If Null, then it is being set the to main element.
	   * @type {Null|EventTarget}
	   * @default null
	   */
	  inputTarget: null,

	  /**
	   * force an input class
	   * @type {Null|Function}
	   * @default null
	   */
	  inputClass: null,

	  /**
	   * Default recognizer setup when calling `Hammer()`
	   * When creating a new Manager these will be skipped.
	   * @type {Array}
	   */
	  preset: [
	    // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	    [RotateRecognizer, {enable: false}],
	    [PinchRecognizer, {enable: false}, ['rotate']],
	    [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	    [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	    [TapRecognizer],
	    [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	    [PressRecognizer]
	  ],

	  /**
	   * Some CSS properties can be used to improve the working of Hammer.
	   * Add them to this method and they will be set when creating a new Manager.
	   * @namespace
	   */
	  cssProps: {
	    /**
	     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userSelect: 'none',

	    /**
	     * Disable the Windows Phone grippers when pressing an element.
	     * @type {String}
	     * @default 'none'
	     */
	    touchSelect: 'none',

	    /**
	     * Disables the default callout shown when you touch and hold a touch target.
	     * On iOS, when you touch and hold a touch target such as a link, Safari displays
	     * a callout containing information about the link. This property allows you to disable that callout.
	     * @type {String}
	     * @default 'none'
	     */
	    touchCallout: 'none',

	    /**
	     * Specifies whether zooming is enabled. Used by IE10>
	     * @type {String}
	     * @default 'none'
	     */
	    contentZooming: 'none',

	    /**
	     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userDrag: 'none',

	    /**
	     * Overrides the highlight color shown when the user taps a link or a JavaScript
	     * clickable element in iOS. This property obeys the alpha value, if specified.
	     * @type {String}
	     * @default 'rgba(0,0,0,0)'
	     */
	    tapHighlightColor: 'rgba(0,0,0,0)'
	  }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	  this.options = assign({}, Hammer.defaults, options || {});

	  this.options.inputTarget = this.options.inputTarget || element;

	  this.handlers = {};
	  this.session = {};
	  this.recognizers = [];
	  this.oldCssProps = {};

	  this.element = element;
	  this.input = createInputInstance(this);
	  this.touchAction = new TouchAction(this, this.options.touchAction);

	  toggleCssProps(this, true);

	  each(this.options.recognizers, function(item) {
	    var recognizer = this.add(new (item[0])(item[1]));
	    item[2] && recognizer.recognizeWith(item[2]);
	    item[3] && recognizer.requireFailure(item[3]);
	  }, this);
	}

	Manager.prototype = {
	  /**
	   * set options
	   * @param {Object} options
	   * @returns {Manager}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // Options that need a little more setup
	    if (options.touchAction) {
	      this.touchAction.update();
	    }
	    if (options.inputTarget) {
	      // Clean up existing event listeners and reinitialize
	      this.input.destroy();
	      this.input.target = options.inputTarget;
	      this.input.init();
	    }
	    return this;
	  },

	  /**
	   * stop recognizing for this session.
	   * This session will be discarded, when a new [input]start event is fired.
	   * When forced, the recognizer cycle is stopped immediately.
	   * @param {Boolean} [force]
	   */
	  stop: function(force) {
	    this.session.stopped = force ? FORCED_STOP : STOP;
	  },

	  /**
	   * run the recognizers!
	   * called by the inputHandler function on every movement of the pointers (touches)
	   * it walks through all the recognizers and tries to detect the gesture that is being made
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    var session = this.session;
	    if (session.stopped) {
	      return;
	    }

	    // run the touch-action polyfill
	    this.touchAction.preventDefaults(inputData);

	    var recognizer;
	    var recognizers = this.recognizers;

	    // this holds the recognizer that is being recognized.
	    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	    // if no recognizer is detecting a thing, it is set to `null`
	    var curRecognizer = session.curRecognizer;

	    // reset when the last recognizer is recognized
	    // or when we're in a new session
	    if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	      curRecognizer = session.curRecognizer = null;
	    }

	    var i = 0;
	    while (i < recognizers.length) {
	      recognizer = recognizers[i];

	      // find out if we are allowed try to recognize the input for this one.
	      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	      //      that is being recognized.
	      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	      //      this can be setup with the `recognizeWith()` method on the recognizer.
	      if (session.stopped !== FORCED_STOP && ( // 1
	        !curRecognizer || recognizer == curRecognizer || // 2
	        recognizer.canRecognizeWith(curRecognizer))) { // 3
	        recognizer.recognize(inputData);
	      } else {
	        recognizer.reset();
	      }

	      // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	      // current active recognizer. but only if we don't already have an active recognizer
	      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	        curRecognizer = session.curRecognizer = recognizer;
	      }
	      i++;
	    }
	  },

	  /**
	   * get a recognizer by its event name.
	   * @param {Recognizer|String} recognizer
	   * @returns {Recognizer|Null}
	   */
	  get: function(recognizer) {
	    if (recognizer instanceof Recognizer) {
	      return recognizer;
	    }

	    var recognizers = this.recognizers;
	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i].options.event == recognizer) {
	        return recognizers[i];
	      }
	    }
	    return null;
	  },

	  /**
	   * add a recognizer to the manager
	   * existing recognizers with the same event name will be removed
	   * @param {Recognizer} recognizer
	   * @returns {Recognizer|Manager}
	   */
	  add: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'add', this)) {
	      return this;
	    }

	    // remove existing
	    var existing = this.get(recognizer.options.event);
	    if (existing) {
	      this.remove(existing);
	    }

	    this.recognizers.push(recognizer);
	    recognizer.manager = this;

	    this.touchAction.update();
	    return recognizer;
	  },

	  /**
	   * remove a recognizer by name or instance
	   * @param {Recognizer|String} recognizer
	   * @returns {Manager}
	   */
	  remove: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'remove', this)) {
	      return this;
	    }

	    recognizer = this.get(recognizer);

	    // let's make sure this recognizer exists
	    if (recognizer) {
	      var recognizers = this.recognizers;
	      var index = inArray(recognizers, recognizer);

	      if (index !== -1) {
	        recognizers.splice(index, 1);
	        this.touchAction.update();
	      }
	    }

	    return this;
	  },

	  /**
	   * bind event
	   * @param {String} events
	   * @param {Function} handler
	   * @returns {EventEmitter} this
	   */
	  on: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }
	    if (handler === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      handlers[event] = handlers[event] || [];
	      handlers[event].push(handler);
	    });
	    return this;
	  },

	  /**
	   * unbind event, leave emit blank to remove all handlers
	   * @param {String} events
	   * @param {Function} [handler]
	   * @returns {EventEmitter} this
	   */
	  off: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      if (!handler) {
	        delete handlers[event];
	      } else {
	        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	      }
	    });
	    return this;
	  },

	  /**
	   * emit event to the listeners
	   * @param {String} event
	   * @param {Object} data
	   */
	  emit: function(event, data) {
	    // we also want to trigger dom events
	    if (this.options.domEvents) {
	      triggerDomEvent(event, data);
	    }

	    // no handlers, so skip it all
	    var handlers = this.handlers[event] && this.handlers[event].slice();
	    if (!handlers || !handlers.length) {
	      return;
	    }

	    data.type = event;
	    data.preventDefault = function() {
	      data.srcEvent.preventDefault();
	    };

	    var i = 0;
	    while (i < handlers.length) {
	      handlers[i](data);
	      i++;
	    }
	  },

	  /**
	   * destroy the manager and unbinds all events
	   * it doesn't unbind dom events, that is the user own responsibility
	   */
	  destroy: function() {
	    this.element && toggleCssProps(this, false);

	    this.handlers = {};
	    this.session = {};
	    this.input.destroy();
	    this.element = null;
	  }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	  var element = manager.element;
	  if (!element.style) {
	    return;
	  }
	  var prop;
	  each(manager.options.cssProps, function(value, name) {
	    prop = prefixed(element.style, name);
	    if (add) {
	      manager.oldCssProps[prop] = element.style[prop];
	      element.style[prop] = value;
	    } else {
	      element.style[prop] = manager.oldCssProps[prop] || '';
	    }
	  });
	  if (!add) {
	    manager.oldCssProps = {};
	  }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	  var gestureEvent = document.createEvent('Event');
	  gestureEvent.initEvent(event, true, true);
	  gestureEvent.gesture = data;
	  data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	  INPUT_START: INPUT_START,
	  INPUT_MOVE: INPUT_MOVE,
	  INPUT_END: INPUT_END,
	  INPUT_CANCEL: INPUT_CANCEL,

	  STATE_POSSIBLE: STATE_POSSIBLE,
	  STATE_BEGAN: STATE_BEGAN,
	  STATE_CHANGED: STATE_CHANGED,
	  STATE_ENDED: STATE_ENDED,
	  STATE_RECOGNIZED: STATE_RECOGNIZED,
	  STATE_CANCELLED: STATE_CANCELLED,
	  STATE_FAILED: STATE_FAILED,

	  DIRECTION_NONE: DIRECTION_NONE,
	  DIRECTION_LEFT: DIRECTION_LEFT,
	  DIRECTION_RIGHT: DIRECTION_RIGHT,
	  DIRECTION_UP: DIRECTION_UP,
	  DIRECTION_DOWN: DIRECTION_DOWN,
	  DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	  DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	  DIRECTION_ALL: DIRECTION_ALL,

	  Manager: Manager,
	  Input: Input,
	  TouchAction: TouchAction,

	  TouchInput: TouchInput,
	  MouseInput: MouseInput,
	  PointerEventInput: PointerEventInput,
	  TouchMouseInput: TouchMouseInput,
	  SingleTouchInput: SingleTouchInput,

	  Recognizer: Recognizer,
	  AttrRecognizer: AttrRecognizer,
	  Tap: TapRecognizer,
	  Pan: PanRecognizer,
	  Swipe: SwipeRecognizer,
	  Pinch: PinchRecognizer,
	  Rotate: RotateRecognizer,
	  Press: PressRecognizer,

	  on: addEventListeners,
	  off: removeEventListeners,
	  each: each,
	  merge: merge,
	  extend: extend,
	  assign: assign,
	  inherit: inherit,
	  bindFn: bindFn,
	  prefixed: prefixed
	});

	// jquery.hammer.js
	// This jQuery plugin is just a small wrapper around the Hammer() class.
	// It also extends the Manager.emit method by triggering jQuery events.
	// $(element).hammer(options).bind("pan", myPanHandler);
	// The Hammer instance is stored at $element.data("hammer").
	// https://github.com/hammerjs/jquery.hammer.js

	(function($, Hammer) {
	  function hammerify(el, options) {
	    var $el = $(el);
	    if (!$el.data('hammer')) {
	      $el.data('hammer', new Hammer($el[0], options));
	    }
	  }

	  $.fn.hammer = function(options) {
	    return this.each(function() {
	      hammerify(this, options);
	    });
	  };

	  // extend the emit method to also trigger jQuery events
	  Hammer.Manager.prototype.emit = (function(originalEmit) {
	    return function(type, data) {
	      originalEmit.call(this, type, data);
	      $(this.element).trigger({
	        type: type,
	        gesture: data
	      });
	    };
	  })(Hammer.Manager.prototype.emit);
	})($, Hammer);

	module.exports = UI.Hammer = Hammer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);

	/**
	 * @via https://github.com/twbs/bootstrap/blob/master/js/collapse.js
	 * @copyright (c) 2011-2014 Twitter, Inc
	 * @license The MIT License
	 */

	var Collapse = function(element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Collapse.DEFAULTS, options);
	  this.transitioning = null;

	  if (this.options.parent) {
	    this.$parent = $(this.options.parent);
	  }

	  if (this.options.toggle) {
	    this.toggle();
	  }
	};

	Collapse.DEFAULTS = {
	  toggle: true
	};

	Collapse.prototype.open = function() {
	  if (this.transitioning || this.$element.hasClass('am-in')) {
	    return;
	  }

	  var startEvent = $.Event('open.collapse.amui');
	  this.$element.trigger(startEvent);

	  if (startEvent.isDefaultPrevented()) {
	    return;
	  }

	  var actives = this.$parent && this.$parent.find('> .am-panel > .am-in');

	  if (actives && actives.length) {
	    var hasData = actives.data('amui.collapse');

	    if (hasData && hasData.transitioning) {
	      return;
	    }

	    Plugin.call(actives, 'close');

	    hasData || actives.data('amui.collapse', null);
	  }

	  this.$element
	    .removeClass('am-collapse')
	    .addClass('am-collapsing').height(0);

	  this.transitioning = 1;

	  var complete = function() {
	    this.$element
	      .removeClass('am-collapsing')
	      .addClass('am-collapse am-in')
	      .height('')
	      .trigger('opened.collapse.amui');
	    this.transitioning = 0;
	  };

	  if (!UI.support.transition) {
	    return complete.call(this);
	  }

	  var scrollHeight = this.$element[0].scrollHeight;

	  this.$element
	    .one(UI.support.transition.end, $.proxy(complete, this))
	    .emulateTransitionEnd(300)
	    .css({height: scrollHeight}); // 当折叠的容器有 padding 时，如果用 height() 只能设置内容的宽度
	};

	Collapse.prototype.close = function() {
	  if (this.transitioning || !this.$element.hasClass('am-in')) {
	    return;
	  }

	  var startEvent = $.Event('close.collapse.amui');
	  this.$element.trigger(startEvent);

	  if (startEvent.isDefaultPrevented()) {
	    return;
	  }

	  this.$element.height(this.$element.height()).redraw();

	  this.$element.addClass('am-collapsing').
	    removeClass('am-collapse am-in');

	  this.transitioning = 1;

	  var complete = function() {
	    this.transitioning = 0;
	    this.$element
	      .trigger('closed.collapse.amui')
	      .removeClass('am-collapsing')
	      .addClass('am-collapse');
	    // css({height: '0'});
	  };

	  if (!UI.support.transition) {
	    return complete.call(this);
	  }

	  this.$element.height(0)
	    .one(UI.support.transition.end, $.proxy(complete, this))
	    .emulateTransitionEnd(300);
	};

	Collapse.prototype.toggle = function() {
	  this[this.$element.hasClass('am-in') ? 'close' : 'open']();
	};

	// Collapse Plugin
	function Plugin(option) {
	  return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('amui.collapse');
	    var options = $.extend({}, Collapse.DEFAULTS,
	      UI.utils.options($this.attr('data-am-collapse')),
	      typeof option == 'object' && option);

	    if (!data && options.toggle && option === 'open') {
	      option = !option;
	    }

	    if (!data) {
	      $this.data('amui.collapse', (data = new Collapse(this, options)));
	    }

	    if (typeof option == 'string') {
	      data[option]();
	    }
	  });
	}

	$.fn.collapse = Plugin;

	// Init code
	$(document).on('click.collapse.amui.data-api', '[data-am-collapse]',
	  function(e) {
	    var href;
	    var $this = $(this);
	    var options = UI.utils.options($this.attr('data-am-collapse'));
	    var target = options.target ||
	      e.preventDefault() ||
	      (href = $this.attr('href')) &&
	      href.replace(/.*(?=#[^\s]+$)/, '');
	    var $target = $(target);
	    var data = $target.data('amui.collapse');
	    var option = data ? 'toggle' : options;
	    var parent = options.parent;
	    var $parent = parent && $(parent);

	    if (!data || !data.transitioning) {
	      if ($parent) {
	        // '[data-am-collapse*="{parent: \'' + parent + '"]
	        $parent.find('[data-am-collapse]').not($this).addClass('am-collapsed');
	      }

	      $this[$target.hasClass('am-in') ?
	        'addClass' : 'removeClass']('am-collapsed');
	    }

	    Plugin.call($target, option);
	  });

	module.exports = UI.collapse = Collapse;

	// TODO: 更好的 target 选择方式
	//       折叠的容器必须没有 border/padding 才能正常处理，否则动画会有一些小问题
	//       寻找更好的未知高度 transition 动画解决方案，max-height 之类的就算了


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var animation = UI.support.animation;

	/**
	 * @via https://github.com/Minwe/bootstrap/blob/master/js/dropdown.js
	 * @copyright (c) 2011-2014 Twitter, Inc
	 * @license The MIT License
	 */

	// var toggle = '[data-am-dropdown] > .am-dropdown-toggle';

	var Dropdown = function(element, options) {
	  this.options = $.extend({}, Dropdown.DEFAULTS, options);

	  options = this.options;

	  this.$element = $(element);
	  this.$toggle = this.$element.find(options.selector.toggle);
	  this.$dropdown = this.$element.find(options.selector.dropdown);
	  this.$boundary = (options.boundary === window) ? $(window) :
	    this.$element.closest(options.boundary);
	  this.$justify = (options.justify && $(options.justify).length &&
	  $(options.justify)) || undefined;

	  !this.$boundary.length && (this.$boundary = $(window));

	  this.active = this.$element.hasClass('am-active') ? true : false;
	  this.animating = null;

	  this.events();
	};

	Dropdown.DEFAULTS = {
	  animation: 'am-animation-slide-top-fixed',
	  boundary: window,
	  justify: undefined,
	  selector: {
	    dropdown: '.am-dropdown-content',
	    toggle: '.am-dropdown-toggle'
	  },
	  trigger: 'click'
	};

	Dropdown.prototype.toggle = function() {
	  this.clear();

	  if (this.animating) {
	    return;
	  }

	  this[this.active ? 'close' : 'open']();
	};

	Dropdown.prototype.open = function(e) {
	  var $toggle = this.$toggle;
	  var $element = this.$element;
	  var $dropdown = this.$dropdown;

	  if ($toggle.is('.am-disabled, :disabled')) {
	    return;
	  }

	  if (this.active) {
	    return;
	  }

	  $element.trigger('open.dropdown.amui').addClass('am-active');

	  $toggle.trigger('focus');

	  this.checkDimensions(e);

	  var complete = $.proxy(function() {
	    $element.trigger('opened.dropdown.amui');
	    this.active = true;
	    this.animating = 0;
	  }, this);

	  if (animation) {
	    this.animating = 1;
	    $dropdown.addClass(this.options.animation).
	      one(animation.end + '.open.dropdown.amui', $.proxy(function() {
	        complete();
	        $dropdown.removeClass(this.options.animation);
	      }, this));
	  } else {
	    complete();
	  }
	};

	Dropdown.prototype.close = function() {
	  if (!this.active) {
	    return;
	  }

	  // fix #165
	  // var animationName = this.options.animation + ' am-animation-reverse';
	  var animationName = 'am-dropdown-animation';
	  var $element = this.$element;
	  var $dropdown = this.$dropdown;

	  $element.trigger('close.dropdown.amui');

	  var complete = $.proxy(function complete() {
	    $element.
	      removeClass('am-active').
	      trigger('closed.dropdown.amui');
	    this.active = false;
	    this.animating = 0;
	    this.$toggle.blur();
	  }, this);

	  if (animation) {
	    $dropdown.removeClass(this.options.animation);
	    $dropdown.addClass(animationName);
	    this.animating = 1;
	    // animation
	    $dropdown.one(animation.end + '.close.dropdown.amui', function() {
	      $dropdown.removeClass(animationName);
	      complete();
	    });
	  } else {
	    complete();
	  }
	};

	Dropdown.prototype.enable = function() {
	  this.$toggle.prop('disabled', false);
	},

	Dropdown.prototype.disable = function() {
	  this.$toggle.prop('disabled', true);
	},

	Dropdown.prototype.checkDimensions = function(e) {
	  if (!this.$dropdown.length) {
	    return;
	  }

	  var $dropdown = this.$dropdown;

	  // @see #873
	  if (e && e.offset) {
	    $dropdown.offset(e.offset);
	  }

	  var offset = $dropdown.offset();
	  var width = $dropdown.outerWidth();
	  var boundaryWidth = this.$boundary.width();
	  var boundaryOffset = $.isWindow(this.boundary) && this.$boundary.offset() ?
	    this.$boundary.offset().left : 0;

	  if (this.$justify) {
	    // jQuery.fn.width() is really...
	    $dropdown.css({'min-width': this.$justify.css('width')});
	  }

	  if ((width + (offset.left - boundaryOffset)) > boundaryWidth) {
	    this.$element.addClass('am-dropdown-flip');
	  }
	};

	Dropdown.prototype.clear = function() {
	  $('[data-am-dropdown]').not(this.$element).each(function() {
	    var data = $(this).data('amui.dropdown');
	    data && data.close();
	  });
	};

	Dropdown.prototype.events = function() {
	  var eventNS = 'dropdown.amui';
	  // triggers = this.options.trigger.split(' '),
	  var $toggle = this.$toggle;

	  $toggle.on('click.' + eventNS, $.proxy(function(e) {
	    e.preventDefault();
	    this.toggle();
	  }, this));

	  /*for (var i = triggers.length; i--;) {
	   var trigger = triggers[i];

	   if (trigger === 'click') {
	   $toggle.on('click.' + eventNS, $.proxy(this.toggle, this))
	   }

	   if (trigger === 'focus' || trigger === 'hover') {
	   var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
	   var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

	   this.$element.on(eventIn + '.' + eventNS, $.proxy(this.open, this))
	   .on(eventOut + '.' + eventNS, $.proxy(this.close, this));
	   }
	   }*/

	  $(document).on('keydown.dropdown.amui', $.proxy(function(e) {
	    e.keyCode === 27 && this.active && this.close();
	  }, this)).on('click.outer.dropdown.amui', $.proxy(function(e) {
	    // var $target = $(e.target);

	    if (this.active &&
	      (this.$element[0] === e.target || !this.$element.find(e.target).length)) {
	      this.close();
	    }
	  }, this));
	};

	// Dropdown Plugin
	UI.plugin('dropdown', Dropdown);

	// Init code
	UI.ready(function(context) {
	  $('[data-am-dropdown]', context).dropdown();
	});

	$(document).on('click.dropdown.amui.data-api', '.am-dropdown form',
	  function(e) {
	    e.stopPropagation();
	  });

	module.exports = UI.dropdown = Dropdown;

	// TODO: 1. 处理链接 focus
	//       2. 增加 mouseenter / mouseleave 选项
	//       3. 宽度适应


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var $w = $(window);

	/**
	 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
	 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
	 */

	var Popover = function(element, options) {
	  this.options = $.extend({}, Popover.DEFAULTS, options);
	  this.$element = $(element);
	  this.active = null;
	  this.$popover = (this.options.target && $(this.options.target)) || null;

	  this.init();
	  this._bindEvents();
	};

	Popover.DEFAULTS = {
	  theme: null,
	  trigger: 'click',
	  content: '',
	  open: false,
	  target: null,
	  tpl: '<div class="am-popover">' +
	    '<div class="am-popover-inner"></div>' +
	    '<div class="am-popover-caret"></div></div>'
	};

	Popover.prototype.init = function() {
	  var _this = this;
	  var $element = this.$element;
	  var $popover;

	  if (!this.options.target) {
	    this.$popover = this.getPopover();
	    this.setContent();
	  }

	  $popover = this.$popover;

	  $popover.appendTo($('body'));

	  this.sizePopover();

	  function sizePopover() {
	    _this.sizePopover();
	  }

	  // TODO: 监听页面内容变化，重新调整位置

	  $element.on('open.popover.amui', function() {
	    $(window).on('resize.popover.amui', UI.utils.debounce(sizePopover, 50));
	  });

	  $element.on('close.popover.amui', function() {
	    $(window).off('resize.popover.amui', sizePopover);
	  });

	  this.options.open && this.open();
	};

	Popover.prototype.sizePopover = function sizePopover() {
	  var $element = this.$element;
	  var $popover = this.$popover;

	  if (!$popover || !$popover.length) {
	    return;
	  }

	  var popWidth = $popover.outerWidth();
	  var popHeight = $popover.outerHeight();
	  var $popCaret = $popover.find('.am-popover-caret');
	  var popCaretSize = ($popCaret.outerWidth() / 2) || 8;
	  // 取不到 $popCaret.outerHeight() 的值，所以直接加 8
	  var popTotalHeight = popHeight + 8; // $popCaret.outerHeight();

	  var triggerWidth = $element.outerWidth();
	  var triggerHeight = $element.outerHeight();
	  var triggerOffset = $element.offset();
	  var triggerRect = $element[0].getBoundingClientRect();

	  var winHeight = $w.height();
	  var winWidth = $w.width();
	  var popTop = 0;
	  var popLeft = 0;
	  var diff = 0;
	  var spacing = 2;
	  var popPosition = 'top';

	  $popover.css({left: '', top: ''}).removeClass('am-popover-left ' +
	  'am-popover-right am-popover-top am-popover-bottom');

	  // $popCaret.css({left: '', top: ''});

	  if (popTotalHeight - spacing < triggerRect.top + spacing) {
	    // Popover on the top of trigger
	    popTop = triggerOffset.top - popTotalHeight - spacing;
	  } else if (popTotalHeight <
	    winHeight - triggerRect.top - triggerRect.height) {
	    // On bottom
	    popPosition = 'bottom';
	    popTop = triggerOffset.top + triggerHeight + popCaretSize + spacing;
	  } else { // On middle
	    popPosition = 'middle';
	    popTop = triggerHeight / 2 + triggerOffset.top - popHeight / 2;
	  }

	  // Horizontal Position
	  if (popPosition === 'top' || popPosition === 'bottom') {
	    popLeft = triggerWidth / 2 + triggerOffset.left - popWidth / 2;

	    diff = popLeft;

	    if (popLeft < 5) {
	      popLeft = 5;
	    }

	    if (popLeft + popWidth > winWidth) {
	      popLeft = (winWidth - popWidth - 20);
	      // console.log('left %d, win %d, popw %d', popLeft, winWidth, popWidth);
	    }

	    if (popPosition === 'top') {
	      // This is the Popover position, NOT caret position
	      // Popover on the Top of trigger, caret on the bottom of Popover
	      $popover.addClass('am-popover-top');
	    }

	    if (popPosition === 'bottom') {
	      $popover.addClass('am-popover-bottom');
	    }

	    diff = diff - popLeft;
	    // $popCaret.css({left: (popWidth / 2 - popCaretSize + diff) + 'px'});

	  } else if (popPosition === 'middle') {
	    popLeft = triggerOffset.left - popWidth - popCaretSize;
	    $popover.addClass('am-popover-left');
	    if (popLeft < 5) {
	      popLeft = triggerOffset.left + triggerWidth + popCaretSize;
	      $popover.removeClass('am-popover-left').addClass('am-popover-right');
	    }

	    if (popLeft + popWidth > winWidth) {
	      popLeft = winWidth - popWidth - 5;
	      $popover.removeClass('am-popover-left').addClass('am-popover-right');
	    }
	    // $popCaret.css({top: (popHeight / 2 - popCaretSize / 2) + 'px'});
	  }

	  // Apply position style
	  $popover.css({top: popTop + 'px', left: popLeft + 'px'});
	};

	Popover.prototype.toggle = function() {
	  return this[this.active ? 'close' : 'open']();
	};

	Popover.prototype.open = function() {
	  var $popover = this.$popover;

	  this.$element.trigger('open.popover.amui');
	  this.sizePopover();
	  $popover.show().addClass('am-active');
	  this.active = true;
	};

	Popover.prototype.close = function() {
	  var $popover = this.$popover;

	  this.$element.trigger('close.popover.amui');

	  $popover
	    .removeClass('am-active')
	    .trigger('closed.popover.amui')
	    .hide();

	  this.active = false;
	};

	Popover.prototype.getPopover = function() {
	  var uid = UI.utils.generateGUID('am-popover');
	  var theme = [];

	  if (this.options.theme) {
	    $.each(this.options.theme.split(' '), function(i, item) {
	      theme.push('am-popover-' + $.trim(item));
	    });
	  }

	  return $(this.options.tpl).attr('id', uid).addClass(theme.join(' '));
	};

	Popover.prototype.setContent = function(content) {
	  content = content || this.options.content;
	  this.$popover && this.$popover.find('.am-popover-inner')
	    .empty().html(content);
	};

	Popover.prototype._bindEvents = function() {
	  var eventNS = 'popover.amui';
	  var triggers = this.options.trigger.split(' ');

	  for (var i = triggers.length; i--;) {
	    var trigger = triggers[i];

	    if (trigger === 'click') {
	      this.$element.on('click.' + eventNS, $.proxy(this.toggle, this));
	    } else { // hover or focus
	      var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
	      var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

	      this.$element.on(eventIn + '.' + eventNS, $.proxy(this.open, this));
	      this.$element.on(eventOut + '.' + eventNS, $.proxy(this.close, this));
	    }
	  }
	};

	Popover.prototype.destroy = function() {
	  this.$element.off('.popover.amui').removeData('amui.popover');
	  this.$popover.remove();
	};

	UI.plugin('popover', Popover);

	// Init code
	UI.ready(function(context) {
	  $('[data-am-popover]', context).popover();
	});

	module.exports = Popover;

	// TODO: 允许用户定义位置


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var UI = __webpack_require__(1);

	var Progress = (function() {
	  /**
	   * NProgress (c) 2013, Rico Sta. Cruz
	   * @via http://ricostacruz.com/nprogress
	   */

	  var NProgress = {};

	  NProgress.version = '0.2.0';

	  var Settings = NProgress.settings = {
	    minimum: 0.08,
	    easing: 'ease',
	    positionUsing: '',
	    speed: 200,
	    trickle: true,
	    trickleRate: 0.02,
	    trickleSpeed: 800,
	    showSpinner: true,
	    parent: 'body',
	    barSelector: '[role="nprogress-bar"]',
	    spinnerSelector: '[role="nprogress-spinner"]',
	    template: '<div class="nprogress-bar" role="nprogress-bar">' +
	    '<div class="nprogress-peg"></div></div>' +
	    '<div class="nprogress-spinner" role="nprogress-spinner">' +
	    '<div class="nprogress-spinner-icon"></div></div>'
	  };

	  /**
	   * Updates configuration.
	   *
	   *     NProgress.configure({
	   *       minimum: 0.1
	   *     });
	   */
	  NProgress.configure = function(options) {
	    var key, value;
	    for (key in options) {
	      value = options[key];
	      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
	    }

	    return this;
	  };

	  /**
	   * Last number.
	   */

	  NProgress.status = null;

	  /**
	   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
	   *
	   *     NProgress.set(0.4);
	   *     NProgress.set(1.0);
	   */

	  NProgress.set = function(n) {
	    var started = NProgress.isStarted();

	    n = clamp(n, Settings.minimum, 1);
	    NProgress.status = (n === 1 ? null : n);

	    var progress = NProgress.render(!started),
	      bar      = progress.querySelector(Settings.barSelector),
	      speed    = Settings.speed,
	      ease     = Settings.easing;

	    progress.offsetWidth; /* Repaint */

	    queue(function(next) {
	      // Set positionUsing if it hasn't already been set
	      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

	      // Add transition
	      css(bar, barPositionCSS(n, speed, ease));

	      if (n === 1) {
	        // Fade out
	        css(progress, {
	          transition: 'none',
	          opacity: 1
	        });
	        progress.offsetWidth; /* Repaint */

	        setTimeout(function() {
	          css(progress, {
	            transition: 'all ' + speed + 'ms linear',
	            opacity: 0
	          });
	          setTimeout(function() {
	            NProgress.remove();
	            next();
	          }, speed);
	        }, speed);
	      } else {
	        setTimeout(next, speed);
	      }
	    });

	    return this;
	  };

	  NProgress.isStarted = function() {
	    return typeof NProgress.status === 'number';
	  };

	  /**
	   * Shows the progress bar.
	   * This is the same as setting the status to 0%, except that it doesn't go backwards.
	   *
	   *     NProgress.start();
	   *
	   */
	  NProgress.start = function() {
	    if (!NProgress.status) NProgress.set(0);

	    var work = function() {
	      setTimeout(function() {
	        if (!NProgress.status) return;
	        NProgress.trickle();
	        work();
	      }, Settings.trickleSpeed);
	    };

	    if (Settings.trickle) work();

	    return this;
	  };

	  /**
	   * Hides the progress bar.
	   * This is the *sort of* the same as setting the status to 100%, with the
	   * difference being `done()` makes some placebo effect of some realistic motion.
	   *
	   *     NProgress.done();
	   *
	   * If `true` is passed, it will show the progress bar even if its hidden.
	   *
	   *     NProgress.done(true);
	   */

	  NProgress.done = function(force) {
	    if (!force && !NProgress.status) return this;

	    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
	  };

	  /**
	   * Increments by a random amount.
	   */

	  NProgress.inc = function(amount) {
	    var n = NProgress.status;

	    if (!n) {
	      return NProgress.start();
	    } else {
	      if (typeof amount !== 'number') {
	        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
	      }

	      n = clamp(n + amount, 0, 0.994);
	      return NProgress.set(n);
	    }
	  };

	  NProgress.trickle = function() {
	    return NProgress.inc(Math.random() * Settings.trickleRate);
	  };

	  /**
	   * Waits for all supplied jQuery promises and
	   * increases the progress as the promises resolve.
	   *
	   * @param $promise jQUery Promise
	   */
	  (function() {
	    var initial = 0, current = 0;

	    NProgress.promise = function($promise) {
	      if (!$promise || $promise.state() === "resolved") {
	        return this;
	      }

	      if (current === 0) {
	        NProgress.start();
	      }

	      initial++;
	      current++;

	      $promise.always(function() {
	        current--;
	        if (current === 0) {
	          initial = 0;
	          NProgress.done();
	        } else {
	          NProgress.set((initial - current) / initial);
	        }
	      });

	      return this;
	    };

	  })();

	  /**
	   * (Internal) renders the progress bar markup based on the `template`
	   * setting.
	   */

	  NProgress.render = function(fromStart) {
	    if (NProgress.isRendered()) return document.getElementById('nprogress');

	    addClass(document.documentElement, 'nprogress-busy');

	    var progress = document.createElement('div');
	    progress.id = 'nprogress';
	    progress.innerHTML = Settings.template;

	    var bar      = progress.querySelector(Settings.barSelector),
	      perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
	      parent   = document.querySelector(Settings.parent),
	      spinner;

	    css(bar, {
	      transition: 'all 0 linear',
	      transform: 'translate3d(' + perc + '%,0,0)'
	    });

	    if (!Settings.showSpinner) {
	      spinner = progress.querySelector(Settings.spinnerSelector);
	      spinner && removeElement(spinner);
	    }

	    if (parent != document.body) {
	      addClass(parent, 'nprogress-custom-parent');
	    }

	    parent.appendChild(progress);
	    return progress;
	  };

	  /**
	   * Removes the element. Opposite of render().
	   */

	  NProgress.remove = function() {
	    removeClass(document.documentElement, 'nprogress-busy');
	    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
	    var progress = document.getElementById('nprogress');
	    progress && removeElement(progress);
	  };

	  /**
	   * Checks if the progress bar is rendered.
	   */

	  NProgress.isRendered = function() {
	    return !!document.getElementById('nprogress');
	  };

	  /**
	   * Determine which positioning CSS rule to use.
	   */

	  NProgress.getPositioningCSS = function() {
	    // Sniff on document.body.style
	    var bodyStyle = document.body.style;

	    // Sniff prefixes
	    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
	      ('MozTransform' in bodyStyle) ? 'Moz' :
	        ('msTransform' in bodyStyle) ? 'ms' :
	          ('OTransform' in bodyStyle) ? 'O' : '';

	    if (vendorPrefix + 'Perspective' in bodyStyle) {
	      // Modern browsers with 3D support, e.g. Webkit, IE10
	      return 'translate3d';
	    } else if (vendorPrefix + 'Transform' in bodyStyle) {
	      // Browsers without 3D support, e.g. IE9
	      return 'translate';
	    } else {
	      // Browsers without translate() support, e.g. IE7-8
	      return 'margin';
	    }
	  };

	  /**
	   * Helpers
	   */

	  function clamp(n, min, max) {
	    if (n < min) return min;
	    if (n > max) return max;
	    return n;
	  }

	  /**
	   * (Internal) converts a percentage (`0..1`) to a bar translateX
	   * percentage (`-100%..0%`).
	   */

	  function toBarPerc(n) {
	    return (-1 + n) * 100;
	  }


	  /**
	   * (Internal) returns the correct CSS for changing the bar's
	   * position given an n percentage, and speed and ease from Settings
	   */

	  function barPositionCSS(n, speed, ease) {
	    var barCSS;

	    if (Settings.positionUsing === 'translate3d') {
	      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
	    } else if (Settings.positionUsing === 'translate') {
	      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
	    } else {
	      barCSS = { 'margin-left': toBarPerc(n)+'%' };
	    }

	    barCSS.transition = 'all '+speed+'ms '+ease;

	    return barCSS;
	  }

	  /**
	   * (Internal) Queues a function to be executed.
	   */

	  var queue = (function() {
	    var pending = [];

	    function next() {
	      var fn = pending.shift();
	      if (fn) {
	        fn(next);
	      }
	    }

	    return function(fn) {
	      pending.push(fn);
	      if (pending.length == 1) next();
	    };
	  })();

	  /**
	   * (Internal) Applies css properties to an element, similar to the jQuery
	   * css method.
	   *
	   * While this helper does assist with vendor prefixed property names, it
	   * does not perform any manipulation of values prior to setting styles.
	   */

	  var css = (function() {
	    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
	      cssProps    = {};

	    function camelCase(string) {
	      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
	        return letter.toUpperCase();
	      });
	    }

	    function getVendorProp(name) {
	      var style = document.body.style;
	      if (name in style) return name;

	      var i = cssPrefixes.length,
	        capName = name.charAt(0).toUpperCase() + name.slice(1),
	        vendorName;
	      while (i--) {
	        vendorName = cssPrefixes[i] + capName;
	        if (vendorName in style) return vendorName;
	      }

	      return name;
	    }

	    function getStyleProp(name) {
	      name = camelCase(name);
	      return cssProps[name] || (cssProps[name] = getVendorProp(name));
	    }

	    function applyCss(element, prop, value) {
	      prop = getStyleProp(prop);
	      element.style[prop] = value;
	    }

	    return function(element, properties) {
	      var args = arguments,
	        prop,
	        value;

	      if (args.length == 2) {
	        for (prop in properties) {
	          value = properties[prop];
	          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
	        }
	      } else {
	        applyCss(element, args[1], args[2]);
	      }
	    }
	  })();

	  /**
	   * (Internal) Determines if an element or space separated list of class names contains a class name.
	   */

	  function hasClass(element, name) {
	    var list = typeof element == 'string' ? element : classList(element);
	    return list.indexOf(' ' + name + ' ') >= 0;
	  }

	  /**
	   * (Internal) Adds a class to an element.
	   */

	  function addClass(element, name) {
	    var oldList = classList(element),
	      newList = oldList + name;

	    if (hasClass(oldList, name)) return;

	    // Trim the opening space.
	    element.className = newList.substring(1);
	  }

	  /**
	   * (Internal) Removes a class from an element.
	   */

	  function removeClass(element, name) {
	    var oldList = classList(element),
	      newList;

	    if (!hasClass(element, name)) return;

	    // Replace the class name.
	    newList = oldList.replace(' ' + name + ' ', ' ');

	    // Trim the opening and closing spaces.
	    element.className = newList.substring(1, newList.length - 1);
	  }

	  /**
	   * (Internal) Gets a space separated list of the class names on the element.
	   * The list is wrapped with a single space on each end to facilitate finding
	   * matches within the list.
	   */

	  function classList(element) {
	    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
	  }

	  /**
	   * (Internal) Removes an element from the DOM.
	   */

	  function removeElement(element) {
	    element && element.parentNode && element.parentNode.removeChild(element);
	  }

	  return NProgress;
	})();

	module.exports = UI.progress = Progress;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var dimmer = __webpack_require__(10);
	var $doc = $(document);
	var supportTransition = UI.support.transition;

	/**
	 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
	 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
	 */

	var Modal = function(element, options) {
	  this.options = $.extend({}, Modal.DEFAULTS, options || {});
	  this.$element = $(element);
	  this.$dialog = this.$element.find('.am-modal-dialog');

	  if (!this.$element.attr('id')) {
	    this.$element.attr('id', UI.utils.generateGUID('am-modal'));
	  }

	  this.isPopup = this.$element.hasClass('am-popup');
	  this.isActions = this.$element.hasClass('am-modal-actions');
	  this.isPrompt = this.$element.hasClass('am-modal-prompt');
	  this.isLoading = this.$element.hasClass('am-modal-loading');
	  this.active = this.transitioning = this.relatedTarget = null;
	  this.dimmer = this.options.dimmer ? dimmer : {
	    open: function() {
	    },
	    close: function() {
	    }
	  };

	  this.events();
	};

	Modal.DEFAULTS = {
	  className: {
	    active: 'am-modal-active',
	    out: 'am-modal-out'
	  },
	  selector: {
	    modal: '.am-modal',
	    active: '.am-modal-active'
	  },
	  closeViaDimmer: true,
	  cancelable: true,
	  onConfirm: function() {
	  },
	  onCancel: function() {
	  },
	  closeOnCancel: true,
	  closeOnConfirm: true,
	  dimmer: true,
	  height: undefined,
	  width: undefined,
	  duration: 300, // must equal the CSS transition duration
	  transitionEnd: supportTransition && supportTransition.end + '.modal.amui'
	};

	Modal.prototype.toggle = function(relatedTarget) {
	  return this.active ? this.close() : this.open(relatedTarget);
	};

	Modal.prototype.open = function(relatedTarget) {
	  var $element = this.$element;
	  var options = this.options;
	  var isPopup = this.isPopup;
	  var width = options.width;
	  var height = options.height;
	  var style = {};

	  if (this.active) {
	    return;
	  }

	  if (!this.$element.length) {
	    return;
	  }

	  // callback hook
	  relatedTarget && (this.relatedTarget = relatedTarget);

	  // 判断如果还在动画，就先触发之前的closed事件
	  if (this.transitioning) {
	    clearTimeout($element.transitionEndTimmer);
	    $element.transitionEndTimmer = null;
	    $element.trigger(options.transitionEnd)
	      .off(options.transitionEnd);
	  }

	  isPopup && this.$element.show();

	  this.active = true;

	  $element.trigger($.Event('open.modal.amui', {relatedTarget: relatedTarget}));

	  this.dimmer.open($element);

	  $element.show().redraw();

	  // apply Modal width/height if set
	  if (!isPopup && !this.isActions) {
	    if (width) {
	      style.width = parseInt(width, 10) + 'px';
	    }

	    if (height) {
	      style.height = parseInt(height, 10) + 'px';
	    }

	    this.$dialog.css(style);
	  }

	  $element
	    .removeClass(options.className.out)
	    .addClass(options.className.active);

	  this.transitioning = 1;

	  var complete = function() {
	    $element.trigger($.Event('opened.modal.amui', {
	      relatedTarget: relatedTarget
	    }));
	    this.transitioning = 0;

	    // Prompt auto focus
	    if (this.isPrompt) {
	      this.$dialog.find('input').eq(0).focus();
	    }
	  };

	  if (!supportTransition) {
	    return complete.call(this);
	  }

	  $element
	    .one(options.transitionEnd, $.proxy(complete, this))
	    .emulateTransitionEnd(options.duration);
	};

	Modal.prototype.close = function(relatedTarget) {
	  if (!this.active) {
	    return;
	  }

	  var $element = this.$element;
	  var options = this.options;
	  var isPopup = this.isPopup;

	  // 判断如果还在动画，就先触发之前的opened事件
	  if (this.transitioning) {
	    clearTimeout($element.transitionEndTimmer);
	    $element.transitionEndTimmer = null;
	    $element.trigger(options.transitionEnd).off(options.transitionEnd);
	    this.dimmer.close($element, true);
	  }

	  this.$element.trigger($.Event('close.modal.amui', {
	    relatedTarget: relatedTarget
	  }));

	  this.transitioning = 1;

	  var complete = function() {
	    $element.trigger('closed.modal.amui');
	    isPopup && $element.removeClass(options.className.out);
	    $element.hide();
	    this.transitioning = 0;
	    // 不强制关闭 Dimmer，以便多个 Modal 可以共享 Dimmer
	    this.dimmer.close($element, false);
	    this.active = false;
	  };

	  $element.removeClass(options.className.active)
	    .addClass(options.className.out);

	  if (!supportTransition) {
	    return complete.call(this);
	  }

	  $element.one(options.transitionEnd, $.proxy(complete, this))
	    .emulateTransitionEnd(options.duration);
	};

	Modal.prototype.events = function() {
	  var _this = this;
	  var options = this.options;
	  var $element = this.$element;
	  var $dimmer = this.dimmer.$element;
	  var $ipt = $element.find('.am-modal-prompt-input');
	  var $confirm = $element.find('[data-am-modal-confirm]');
	  var $cancel = $element.find('[data-am-modal-cancel]');
	  var getData = function() {
	    var data = [];
	    $ipt.each(function() {
	      data.push($(this).val());
	    });

	    return (data.length === 0) ? undefined :
	      ((data.length === 1) ? data[0] : data);
	  };

	  // close via Esc key
	  if (this.options.cancelable) {
	    $element.on('keyup.modal.amui', function(e) {
	      if (_this.active && e.which === 27) {
	        $element.trigger('cancel.modal.amui');
	        _this.close();
	      }
	    });
	  }

	  // Close Modal when dimmer clicked
	  if (this.options.dimmer && this.options.closeViaDimmer && !this.isLoading) {
	    $dimmer.on('click.dimmer.modal.amui', function() {
	      _this.close();
	    });
	  }

	  // Close Modal when button clicked
	  $element.on(
	    'click.close.modal.amui',
	    '[data-am-modal-close], .am-modal-btn',
	    function(e) {
	      e.preventDefault();
	      var $this = $(this);

	      if ($this.is($confirm)) {
	        options.closeOnConfirm && _this.close();
	      } else if ($this.is($cancel)) {
	        options.closeOnCancel && _this.close();
	      } else {
	        _this.close();
	      }
	    }
	  )
	    // trigger dimmer click event if non-dialog area clicked
	    // fixes #882 caused by https://github.com/amazeui/amazeui/commit/b6be7719681193f1c4cb04af89cb9fd9f4422163
	    .on('click', function(e) {
	      // fixes #900
	      // e.stopPropagation();
	      $(e.target).is($element) && $dimmer.trigger('click.dimmer.modal.amui');
	    });

	  $confirm.on('click.confirm.modal.amui',
	    function() {
	      $element.trigger($.Event('confirm.modal.amui', {
	        trigger: this
	      }));
	    });

	  $cancel.on('click.cancel.modal.amui', function() {
	    $element.trigger($.Event('cancel.modal.amui', {
	      trigger: this
	    }));
	  });

	  $element.on('confirm.modal.amui', function(e) {
	    e.data = getData();
	    _this.options.onConfirm.call(_this, e);
	  }).on('cancel.modal.amui', function(e) {
	    e.data = getData();
	    _this.options.onCancel.call(_this, e);
	  });
	};

	function Plugin(option, relatedTarget) {
	  return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('amui.modal');
	    var options = typeof option == 'object' && option;

	    if (!data) {
	      $this.data('amui.modal', (data = new Modal(this, options)));
	    }

	    if (typeof option == 'string') {
	      data[option] && data[option](relatedTarget);
	    } else {
	      data.toggle(option && option.relatedTarget || undefined);
	    }
	  });
	}

	$.fn.modal = Plugin;

	// Init
	$doc.on('click.modal.amui.data-api', '[data-am-modal]', function() {
	  var $this = $(this);
	  var options = UI.utils.parseOptions($this.attr('data-am-modal'));
	  var $target = $(options.target ||
	    (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
	  var option = $target.data('amui.modal') ? 'toggle' : options;

	  Plugin.call($target, option, this);
	});

	module.exports = UI.modal = Modal;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var $doc = $(document);
	var transition = UI.support.transition;

	var Dimmer = function() {
	  this.id = UI.utils.generateGUID('am-dimmer');
	  this.$element = $(Dimmer.DEFAULTS.tpl, {
	    id: this.id
	  });

	  this.inited = false;
	  this.scrollbarWidth = 0;
	  this.$used = $([]);
	};

	Dimmer.DEFAULTS = {
	  tpl: '<div class="am-dimmer" data-am-dimmer></div>'
	};

	Dimmer.prototype.init = function() {
	  if (!this.inited) {
	    $(document.body).append(this.$element);
	    this.inited = true;
	    $doc.trigger('init.dimmer.amui');
	    this.$element.on('touchmove.dimmer.amui', function(e) {
	      e.preventDefault();
	    });
	  }

	  return this;
	};

	Dimmer.prototype.open = function(relatedElement) {
	  if (!this.inited) {
	    this.init();
	  }

	  var $element = this.$element;

	  // 用于多重调用
	  if (relatedElement) {
	    this.$used = this.$used.add($(relatedElement));
	  }

	  this.checkScrollbar().setScrollbar();

	  $element.show().trigger('open.dimmer.amui');

	  transition && $element.off(transition.end);

	  setTimeout(function() {
	    $element.addClass('am-active');
	  }, 0);

	  return this;
	};

	Dimmer.prototype.close = function(relatedElement, force) {
	  this.$used = this.$used.not($(relatedElement));

	  if (!force && this.$used.length) {
	    return this;
	  }

	  var $element = this.$element;

	  $element.removeClass('am-active').trigger('close.dimmer.amui');

	  function complete() {
	    $element.hide();
	    this.resetScrollbar();
	  }

	  // transition ? $element.one(transition.end, $.proxy(complete, this)) :
	  complete.call(this);

	  return this;
	};

	Dimmer.prototype.checkScrollbar = function() {
	  this.scrollbarWidth = UI.utils.measureScrollbar();

	  return this;
	};

	Dimmer.prototype.setScrollbar = function() {
	  var $body = $(document.body);
	  var bodyPaddingRight = parseInt(($body.css('padding-right') || 0), 10);

	  if (this.scrollbarWidth) {
	    $body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
	  }

	  $body.addClass('am-dimmer-active');

	  return this;
	};

	Dimmer.prototype.resetScrollbar = function() {
	  $(document.body).css('padding-right', '').removeClass('am-dimmer-active');

	  return this;
	};

	module.exports = UI.dimmer = new Dimmer();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var Hammer = __webpack_require__(4);
	var supportTransition = UI.support.transition;
	var animation = UI.support.animation;

	/**
	 * @via https://github.com/twbs/bootstrap/blob/master/js/tab.js
	 * @copyright 2011-2014 Twitter, Inc.
	 * @license MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	/**
	 * Tabs
	 * @param {HTMLElement} element
	 * @param {Object} options
	 * @constructor
	 */
	var Tabs = function(element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Tabs.DEFAULTS, options || {});
	  this.transitioning = this.activeIndex = null;

	  this.refresh();
	  this.init();
	};

	Tabs.DEFAULTS = {
	  selector: {
	    nav: '> .am-tabs-nav',
	    content: '> .am-tabs-bd',
	    panel: '> .am-tab-panel'
	  },
	  activeClass: 'am-active'
	};

	Tabs.prototype.refresh = function() {
	  var selector = this.options.selector;

	  this.$tabNav = this.$element.find(selector.nav);
	  this.$navs = this.$tabNav.find('a');

	  this.$content = this.$element.find(selector.content);
	  this.$tabPanels = this.$content.find(selector.panel);

	  var $active = this.$tabNav.find('> .' + this.options.activeClass);

	  // Activate the first Tab when no active Tab or multiple active Tabs
	  if ($active.length !== 1) {
	    this.open(0);
	  } else {
	    this.activeIndex = this.$navs.index($active.children('a'));
	  }
	};

	Tabs.prototype.init = function() {
	  var _this = this;
	  var options = this.options;

	  this.$element.on('click.tabs.amui', options.selector.nav + ' a', function(e) {
	    e.preventDefault();
	    _this.open($(this));
	  });

	  // TODO: nested Tabs touch events
	  if (!options.noSwipe) {
	    if (!this.$content.length) {
	      return this;
	    }

	    var hammer = new Hammer.Manager(this.$content[0]);
	    var swipe = new Hammer.Swipe({
	      direction: Hammer.DIRECTION_HORIZONTAL
	      // threshold: 40
	    });

	    hammer.add(swipe);

	    hammer.on('swipeleft', UI.utils.debounce(function(e) {
	      e.preventDefault();
	      _this.goTo('next');
	    }, 100));

	    hammer.on('swiperight', UI.utils.debounce(function(e) {
	      e.preventDefault();
	      _this.goTo('prev');
	    }, 100));

	    this._hammer = hammer;
	  }
	};

	/**
	 * Open $nav tab
	 * @param {jQuery|HTMLElement|Number} $nav
	 * @returns {Tabs}
	 */
	Tabs.prototype.open = function($nav) {
	  var activeClass = this.options.activeClass;
	  var activeIndex = typeof $nav === 'number' ? $nav : this.$navs.index($($nav));

	  $nav = typeof $nav === 'number' ? this.$navs.eq(activeIndex) : $($nav);

	  if (!$nav ||
	    !$nav.length ||
	    this.transitioning ||
	    $nav.parent('li').hasClass(activeClass)) {
	    return;
	  }

	  var $tabNav = this.$tabNav;
	  var href = $nav.attr('href');
	  var regexHash = /^#.+$/;
	  var $target = regexHash.test(href) && this.$content.find(href) ||
	    this.$tabPanels.eq(activeIndex);
	  var previous = $tabNav.find('.' + activeClass + ' a')[0];
	  var e = $.Event('open.tabs.amui', {
	    relatedTarget: previous
	  });

	  $nav.trigger(e);

	  if (e.isDefaultPrevented()) {
	    return;
	  }

	  // activate Tab nav
	  this.activate($nav.closest('li'), $tabNav);

	  // activate Tab content
	  this.activate($target, this.$content, function() {
	    $nav.trigger({
	      type: 'opened.tabs.amui',
	      relatedTarget: previous
	    });
	  });

	  this.activeIndex = activeIndex;
	};

	Tabs.prototype.activate = function($element, $container, callback) {
	  this.transitioning = true;

	  var activeClass = this.options.activeClass;
	  var $active = $container.find('> .' + activeClass);
	  var transition = callback && supportTransition && !!$active.length;

	  $active.removeClass(activeClass + ' am-in');

	  $element.addClass(activeClass);

	  if (transition) {
	    $element.redraw(); // reflow for transition
	    $element.addClass('am-in');
	  } else {
	    $element.removeClass('am-fade');
	  }

	  var complete = $.proxy(function complete() {
	    callback && callback();
	    this.transitioning = false;
	  }, this);



	  transition && !this.$content.is('.am-tabs-bd-ofv') ?
	    $active.one(supportTransition.end, complete) : complete();
	};

	/**
	 * Go to `next` or `prev` tab
	 * @param {String} direction - `next` or `prev`
	 */
	Tabs.prototype.goTo = function(direction) {
	  var navIndex = this.activeIndex;
	  var isNext = direction === 'next';
	  var spring = isNext ? 'am-animation-right-spring' :
	    'am-animation-left-spring';

	  if ((isNext && navIndex + 1 >= this.$navs.length) || // last one
	    (!isNext && navIndex === 0)) { // first one
	    var $panel = this.$tabPanels.eq(navIndex);

	    animation && $panel.addClass(spring).on(animation.end, function() {
	      $panel.removeClass(spring);
	    });
	  } else {
	    this.open(isNext ? navIndex + 1 : navIndex - 1);
	  }
	};

	Tabs.prototype.destroy = function() {
	  this.$element.off('.tabs.amui');
	  Hammer.off(this.$content[0], 'swipeleft swiperight');
	  this._hammer && this._hammer.destroy();
	  $.removeData(this.$element, 'amui.tabs');
	};

	// Plugin
	function Plugin(option) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  var methodReturn;

	  this.each(function() {
	    var $this = $(this);
	    var $tabs = $this.is('.am-tabs') && $this || $this.closest('.am-tabs');
	    var data = $tabs.data('amui.tabs');
	    var options = $.extend({}, UI.utils.parseOptions($this.data('amTabs')),
	      $.isPlainObject(option) && option);

	    if (!data) {
	      $tabs.data('amui.tabs', (data = new Tabs($tabs[0], options)));
	    }

	    if (typeof option === 'string') {
	      if (option === 'open' && $this.is('.am-tabs-nav a')) {
	        data.open($this);
	      } else {
	        methodReturn = typeof data[option] === 'function' ?
	          data[option].apply(data, args) : data[option];
	      }
	    }
	  });

	  return methodReturn === undefined ? this : methodReturn;
	}

	$.fn.tabs = Plugin;

	// Init code
	UI.ready(function(context) {
	  $('[data-am-tabs]', context).tabs();
	});

	$(document).on('click.tabs.amui.data-api', '[data-am-tabs] .am-tabs-nav a',
	  function(e) {
	  e.preventDefault();
	  Plugin.call($(this), 'open');
	});

	module.exports = UI.tabs = Tabs;

	// TODO: 1. Ajax 支持
	//       2. touch 事件处理逻辑优化


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @see https://github.com/sindresorhus/screenfull.js
	 * @license MIT © Sindre Sorhus
	 */

	var UI = __webpack_require__(1);
	var screenfull = (function() {
	  var keyboardAllowed = typeof Element !== 'undefined' &&
	    'ALLOW_KEYBOARD_INPUT' in Element;

	  var fn = (function() {
	    var val;
	    var valLength;

	    var fnMap = [
	      [
	        'requestFullscreen',
	        'exitFullscreen',
	        'fullscreenElement',
	        'fullscreenEnabled',
	        'fullscreenchange',
	        'fullscreenerror'
	      ],
	      // new WebKit
	      [
	        'webkitRequestFullscreen',
	        'webkitExitFullscreen',
	        'webkitFullscreenElement',
	        'webkitFullscreenEnabled',
	        'webkitfullscreenchange',
	        'webkitfullscreenerror'

	      ],
	      // old WebKit (Safari 5.1)
	      [
	        'webkitRequestFullScreen',
	        'webkitCancelFullScreen',
	        'webkitCurrentFullScreenElement',
	        'webkitCancelFullScreen',
	        'webkitfullscreenchange',
	        'webkitfullscreenerror'

	      ],
	      [
	        'mozRequestFullScreen',
	        'mozCancelFullScreen',
	        'mozFullScreenElement',
	        'mozFullScreenEnabled',
	        'mozfullscreenchange',
	        'mozfullscreenerror'
	      ],
	      [
	        'msRequestFullscreen',
	        'msExitFullscreen',
	        'msFullscreenElement',
	        'msFullscreenEnabled',
	        'MSFullscreenChange',
	        'MSFullscreenError'
	      ]
	    ];

	    var i = 0;
	    var l = fnMap.length;
	    var ret = {};

	    for (; i < l; i++) {
	      val = fnMap[i];
	      if (val && val[1] in document) {
	        for (i = 0, valLength = val.length; i < valLength; i++) {
	          ret[fnMap[0][i]] = val[i];
	        }
	        return ret;
	      }
	    }

	    return false;
	  })();

	  var screenfull = {
	    request: function(elem) {
	      var request = fn.requestFullscreen;

	      elem = elem || document.documentElement;

	      // Work around Safari 5.1 bug: reports support for
	      // keyboard in fullscreen even though it doesn't.
	      // Browser sniffing, since the alternative with
	      // setTimeout is even worse.
	      if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
	        elem[request]();
	      } else {
	        elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
	      }
	    },
	    exit: function() {
	      document[fn.exitFullscreen]();
	    },
	    toggle: function(elem) {
	      if (this.isFullscreen) {
	        this.exit();
	      } else {
	        this.request(elem);
	      }
	    },
	    raw: fn
	  };

	  if (!fn) {
	    return false;
	  }

	  Object.defineProperties(screenfull, {
	    isFullscreen: {
	      get: function() {
	        return !!document[fn.fullscreenElement];
	      }
	    },
	    element: {
	      enumerable: true,
	      get: function() {
	        return document[fn.fullscreenElement];
	      }
	    },
	    enabled: {
	      enumerable: true,
	      get: function() {
	        // Coerce to boolean in case of old WebKit
	        return !!document[fn.fullscreenEnabled];
	      }
	    }
	  });

	  screenfull.VERSION = '3.0.0';

	  return screenfull;
	})();

	module.exports = UI.fullscreen = screenfull;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var UI = __webpack_require__(1);

	/**
	 * store.js
	 * @see https://github.com/marcuswestin/store.js
	 * @license https://github.com/marcuswestin/store.js/blob/master/LICENSE
	 */

	var store = {};
	var win = (typeof window != 'undefined' ? window : global);
	var localStorageName = 'localStorage';
	var storage;

	store.disabled = false;
	store.version = '1.3.20';

	store.set = function(key, value) {
	};

	store.get = function(key, defaultVal) {
	};

	store.has = function(key) {
	  return store.get(key) !== undefined;
	};

	store.remove = function(key) {
	};

	store.clear = function() {
	};

	store.transact = function(key, defaultVal, transactionFn) {
	  if (transactionFn == null) {
	    transactionFn = defaultVal;
	    defaultVal = null;
	  }
	  if (defaultVal == null) {
	    defaultVal = {};
	  }

	  var val = store.get(key, defaultVal);
	  transactionFn(val);
	  store.set(key, val);
	};

	store.getAll = function() {
	};

	store.forEach = function() {
	};

	store.serialize = function(value) {
	  return JSON.stringify(value);
	};

	store.deserialize = function(value) {
	  if (typeof value != 'string') {
	    return undefined;
	  }

	  try {
	    return JSON.parse(value);
	  } catch (e) {
	    return value || undefined;
	  }
	};

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
	  try {
	    return (localStorageName in win && win[localStorageName]);
	  } catch (err) {
	    return false;
	  }
	}

	if (isLocalStorageNameSupported()) {
	  storage = win[localStorageName];

	  store.set = function(key, val) {
	    if (val === undefined) {
	      return store.remove(key);
	    }
	    storage.setItem(key, store.serialize(val));
	    return val;
	  };

	  store.get = function(key, defaultVal) {
	    var val = store.deserialize(storage.getItem(key));
	    return (val === undefined ? defaultVal : val);
	  };

	  store.remove = function(key) {
	    storage.removeItem(key);
	  };

	  store.clear = function() {
	    storage.clear();
	  };

	  store.getAll = function() {
	    var ret = {};
	    store.forEach(function(key, val) {
	      ret[key] = val;
	    });
	    return ret;
	  };

	  store.forEach = function(callback) {
	    for (var i = 0; i < storage.length; i++) {
	      var key = storage.key(i);
	      callback(key, store.get(key));
	    }
	  };
	}

	try {
	  var testKey = '__storejs__';
	  store.set(testKey, testKey);
	  if (store.get(testKey) != testKey) {
	    store.disabled = true;
	  }
	  store.remove(testKey);
	} catch (e) {
	  store.disabled = true;
	}

	store.enabled = !store.disabled;

	module.exports = UI.store = store;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_0__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_1__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * sifter.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_0__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.Sifter = factory();
		}
	}(this, function() {

		/**
		 * Textually searches arrays and hashes of objects
		 * by property (or multiple properties). Designed
		 * specifically for autocomplete.
		 *
		 * @constructor
		 * @param {array|object} items
		 * @param {object} items
		 */
		var Sifter = function(items, settings) {
			this.items = items;
			this.settings = settings || {diacritics: true};
		};

		/**
		 * Splits a search string into an array of individual
		 * regexps to be used to match results.
		 *
		 * @param {string} query
		 * @returns {array}
		 */
		Sifter.prototype.tokenize = function(query) {
			query = trim(String(query || '').toLowerCase());
			if (!query || !query.length) return [];

			var i, n, regex, letter;
			var tokens = [];
			var words = query.split(/ +/);

			for (i = 0, n = words.length; i < n; i++) {
				regex = escape_regex(words[i]);
				if (this.settings.diacritics) {
					for (letter in DIACRITICS) {
						if (DIACRITICS.hasOwnProperty(letter)) {
							regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
						}
					}
				}
				tokens.push({
					string : words[i],
					regex  : new RegExp(regex, 'i')
				});
			}

			return tokens;
		};

		/**
		 * Iterates over arrays and hashes.
		 *
		 * ```
		 * this.iterator(this.items, function(item, id) {
		 *    // invoked for each item
		 * });
		 * ```
		 *
		 * @param {array|object} object
		 */
		Sifter.prototype.iterator = function(object, callback) {
			var iterator;
			if (is_array(object)) {
				iterator = Array.prototype.forEach || function(callback) {
					for (var i = 0, n = this.length; i < n; i++) {
						callback(this[i], i, this);
					}
				};
			} else {
				iterator = function(callback) {
					for (var key in this) {
						if (this.hasOwnProperty(key)) {
							callback(this[key], key, this);
						}
					}
				};
			}

			iterator.apply(object, [callback]);
		};

		/**
		 * Returns a function to be used to score individual results.
		 *
		 * Good matches will have a higher score than poor matches.
		 * If an item is not a match, 0 will be returned by the function.
		 *
		 * @param {object|string} search
		 * @param {object} options (optional)
		 * @returns {function}
		 */
		Sifter.prototype.getScoreFunction = function(search, options) {
			var self, fields, tokens, token_count, nesting;

			self        = this;
			search      = self.prepareSearch(search, options);
			tokens      = search.tokens;
			fields      = search.options.fields;
			token_count = tokens.length;
			nesting     = search.options.nesting;

			/**
			 * Calculates how close of a match the
			 * given value is against a search token.
			 *
			 * @param {mixed} value
			 * @param {object} token
			 * @return {number}
			 */
			var scoreValue = function(value, token) {
				var score, pos;

				if (!value) return 0;
				value = String(value || '');
				pos = value.search(token.regex);
				if (pos === -1) return 0;
				score = token.string.length / value.length;
				if (pos === 0) score += 0.5;
				return score;
			};

			/**
			 * Calculates the score of an object
			 * against the search query.
			 *
			 * @param {object} token
			 * @param {object} data
			 * @return {number}
			 */
			var scoreObject = (function() {
				var field_count = fields.length;
				if (!field_count) {
					return function() { return 0; };
				}
				if (field_count === 1) {
					return function(token, data) {
						return scoreValue(getattr(data, fields[0], nesting), token);
					};
				}
				return function(token, data) {
					for (var i = 0, sum = 0; i < field_count; i++) {
						sum += scoreValue(getattr(data, fields[i], nesting), token);
					}
					return sum / field_count;
				};
			})();

			if (!token_count) {
				return function() { return 0; };
			}
			if (token_count === 1) {
				return function(data) {
					return scoreObject(tokens[0], data);
				};
			}

			if (search.options.conjunction === 'and') {
				return function(data) {
					var score;
					for (var i = 0, sum = 0; i < token_count; i++) {
						score = scoreObject(tokens[i], data);
						if (score <= 0) return 0;
						sum += score;
					}
					return sum / token_count;
				};
			} else {
				return function(data) {
					for (var i = 0, sum = 0; i < token_count; i++) {
						sum += scoreObject(tokens[i], data);
					}
					return sum / token_count;
				};
			}
		};

		/**
		 * Returns a function that can be used to compare two
		 * results, for sorting purposes. If no sorting should
		 * be performed, `null` will be returned.
		 *
		 * @param {string|object} search
		 * @param {object} options
		 * @return function(a,b)
		 */
		Sifter.prototype.getSortFunction = function(search, options) {
			var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

			self   = this;
			search = self.prepareSearch(search, options);
			sort   = (!search.query && options.sort_empty) || options.sort;

			/**
			 * Fetches the specified sort field value
			 * from a search result item.
			 *
			 * @param  {string} name
			 * @param  {object} result
			 * @return {mixed}
			 */
			get_field = function(name, result) {
				if (name === '$score') return result.score;
				return getattr(self.items[result.id], name, options.nesting);
			};

			// parse options
			fields = [];
			if (sort) {
				for (i = 0, n = sort.length; i < n; i++) {
					if (search.query || sort[i].field !== '$score') {
						fields.push(sort[i]);
					}
				}
			}

			// the "$score" field is implied to be the primary
			// sort field, unless it's manually specified
			if (search.query) {
				implicit_score = true;
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						implicit_score = false;
						break;
					}
				}
				if (implicit_score) {
					fields.unshift({field: '$score', direction: 'desc'});
				}
			} else {
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						fields.splice(i, 1);
						break;
					}
				}
			}

			multipliers = [];
			for (i = 0, n = fields.length; i < n; i++) {
				multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
			}

			// build function
			fields_count = fields.length;
			if (!fields_count) {
				return null;
			} else if (fields_count === 1) {
				field = fields[0].field;
				multiplier = multipliers[0];
				return function(a, b) {
					return multiplier * cmp(
						get_field(field, a),
						get_field(field, b)
					);
				};
			} else {
				return function(a, b) {
					var i, result, a_value, b_value, field;
					for (i = 0; i < fields_count; i++) {
						field = fields[i].field;
						result = multipliers[i] * cmp(
							get_field(field, a),
							get_field(field, b)
						);
						if (result) return result;
					}
					return 0;
				};
			}
		};

		/**
		 * Parses a search query and returns an object
		 * with tokens and fields ready to be populated
		 * with results.
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.prepareSearch = function(query, options) {
			if (typeof query === 'object') return query;

			options = extend({}, options);

			var option_fields     = options.fields;
			var option_sort       = options.sort;
			var option_sort_empty = options.sort_empty;

			if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
			if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
			if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

			return {
				options : options,
				query   : String(query || '').toLowerCase(),
				tokens  : this.tokenize(query),
				total   : 0,
				items   : []
			};
		};

		/**
		 * Searches through all items and returns a sorted array of matches.
		 *
		 * The `options` parameter can contain:
		 *
		 *   - fields {string|array}
		 *   - sort {array}
		 *   - score {function}
		 *   - filter {bool}
		 *   - limit {integer}
		 *
		 * Returns an object containing:
		 *
		 *   - options {object}
		 *   - query {string}
		 *   - tokens {array}
		 *   - total {int}
		 *   - items {array}
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.search = function(query, options) {
			var self = this, value, score, search, calculateScore;
			var fn_sort;
			var fn_score;

			search  = this.prepareSearch(query, options);
			options = search.options;
			query   = search.query;

			// generate result scoring function
			fn_score = options.score || self.getScoreFunction(search);

			// perform search and sort
			if (query.length) {
				self.iterator(self.items, function(item, id) {
					score = fn_score(item);
					if (options.filter === false || score > 0) {
						search.items.push({'score': score, 'id': id});
					}
				});
			} else {
				self.iterator(self.items, function(item, id) {
					search.items.push({'score': 1, 'id': id});
				});
			}

			fn_sort = self.getSortFunction(search, options);
			if (fn_sort) search.items.sort(fn_sort);

			// apply limits
			search.total = search.items.length;
			if (typeof options.limit === 'number') {
				search.items = search.items.slice(0, options.limit);
			}

			return search;
		};

		// utilities
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		var cmp = function(a, b) {
			if (typeof a === 'number' && typeof b === 'number') {
				return a > b ? 1 : (a < b ? -1 : 0);
			}
			a = asciifold(String(a || ''));
			b = asciifold(String(b || ''));
			if (a > b) return 1;
			if (b > a) return -1;
			return 0;
		};

		var extend = function(a, b) {
			var i, n, k, object;
			for (i = 1, n = arguments.length; i < n; i++) {
				object = arguments[i];
				if (!object) continue;
				for (k in object) {
					if (object.hasOwnProperty(k)) {
						a[k] = object[k];
					}
				}
			}
			return a;
		};

		/**
		 * A property getter resolving dot-notation
		 * @param  {Object}  obj     The root object to fetch property on
		 * @param  {String}  name    The optionally dotted property name to fetch
		 * @param  {Boolean} nesting Handle nesting or not
		 * @return {Object}          The resolved property value
		 */
		var getattr = function(obj, name, nesting) {
		    if (!obj || !name) return;
		    if (!nesting) return obj[name];
		    var names = name.split(".");
		    while(names.length && (obj = obj[names.shift()]));
		    return obj;
		};

		var trim = function(str) {
			return (str + '').replace(/^\s+|\s+$|/g, '');
		};

		var escape_regex = function(str) {
			return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
		};

		var is_array = Array.isArray || (typeof $ !== 'undefined' && $.isArray) || function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};

		var DIACRITICS = {
			'a': '[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]',
			'b': '[b␢βΒB฿𐌁ᛒ]',
			'c': '[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]',
			'd': '[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]',
			'e': '[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]',
			'f': '[fƑƒḞḟ]',
			'g': '[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]',
			'h': '[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]',
			'i': '[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]',
			'j': '[jȷĴĵɈɉʝɟʲ]',
			'k': '[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]',
			'l': '[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]',
			'n': '[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]',
			'o': '[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]',
			'p': '[pṔṕṖṗⱣᵽƤƥᵱ]',
			'q': '[qꝖꝗʠɊɋꝘꝙq̃]',
			'r': '[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]',
			's': '[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]',
			't': '[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]',
			'u': '[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]',
			'v': '[vṼṽṾṿƲʋꝞꝟⱱʋ]',
			'w': '[wẂẃẀẁŴŵẄẅẆẇẈẉ]',
			'x': '[xẌẍẊẋχ]',
			'y': '[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]',
			'z': '[zŹźẐẑŽžŻżẒẓẔẕƵƶ]'
		};

		var asciifold = (function() {
			var i, n, k, chunk;
			var foreignletters = '';
			var lookup = {};
			for (k in DIACRITICS) {
				if (DIACRITICS.hasOwnProperty(k)) {
					chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
					foreignletters += chunk;
					for (i = 0, n = chunk.length; i < n; i++) {
						lookup[chunk.charAt(i)] = k;
					}
				}
			}
			var regexp = new RegExp('[' +  foreignletters + ']', 'g');
			return function(str) {
				return str.replace(regexp, function(foreignletter) {
					return lookup[foreignletter];
				}).toLowerCase();
			};
		})();


		// export
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		return Sifter;
	}));



	/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_1__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.MicroPlugin = factory();
		}
	}(this, function() {
		var MicroPlugin = {};

		MicroPlugin.mixin = function(Interface) {
			Interface.plugins = {};

			/**
			 * Initializes the listed plugins (with options).
			 * Acceptable formats:
			 *
			 * List (without options):
			 *   ['a', 'b', 'c']
			 *
			 * List (with options):
			 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
			 *
			 * Hash (with options):
			 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
			 *
			 * @param {mixed} plugins
			 */
			Interface.prototype.initializePlugins = function(plugins) {
				var i, n, key;
				var self  = this;
				var queue = [];

				self.plugins = {
					names     : [],
					settings  : {},
					requested : {},
					loaded    : {}
				};

				if (utils.isArray(plugins)) {
					for (i = 0, n = plugins.length; i < n; i++) {
						if (typeof plugins[i] === 'string') {
							queue.push(plugins[i]);
						} else {
							self.plugins.settings[plugins[i].name] = plugins[i].options;
							queue.push(plugins[i].name);
						}
					}
				} else if (plugins) {
					for (key in plugins) {
						if (plugins.hasOwnProperty(key)) {
							self.plugins.settings[key] = plugins[key];
							queue.push(key);
						}
					}
				}

				while (queue.length) {
					self.require(queue.shift());
				}
			};

			Interface.prototype.loadPlugin = function(name) {
				var self    = this;
				var plugins = self.plugins;
				var plugin  = Interface.plugins[name];

				if (!Interface.plugins.hasOwnProperty(name)) {
					throw new Error('Unable to find "' +  name + '" plugin');
				}

				plugins.requested[name] = true;
				plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
				plugins.names.push(name);
			};

			/**
			 * Initializes a plugin.
			 *
			 * @param {string} name
			 */
			Interface.prototype.require = function(name) {
				var self = this;
				var plugins = self.plugins;

				if (!self.plugins.loaded.hasOwnProperty(name)) {
					if (plugins.requested[name]) {
						throw new Error('Plugin has circular dependency ("' + name + '")');
					}
					self.loadPlugin(name);
				}

				return plugins.loaded[name];
			};

			/**
			 * Registers a plugin.
			 *
			 * @param {string} name
			 * @param {function} fn
			 */
			Interface.define = function(name, fn) {
				Interface.plugins[name] = {
					'name' : name,
					'fn'   : fn
				};
			};
		};

		var utils = {
			isArray: Array.isArray || function(vArg) {
				return Object.prototype.toString.call(vArg) === '[object Array]';
			}
		};

		return MicroPlugin;
	}));

	/**
	 * selectize.js (v0.12.4)
	 * Copyright (c) 2013–2015 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	/*jshint curly:false */
	/*jshint browser:true */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2),__WEBPACK_LOCAL_MODULE_0__,__WEBPACK_LOCAL_MODULE_1__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory(require('jquery'), require('sifter'), require('microplugin'));
		} else {
			root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
		}
	}(this, function($, Sifter, MicroPlugin) {
		'use strict';

		var highlight = function($element, pattern) {
			if (typeof pattern === 'string' && !pattern.length) return;
			var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
		
			var highlight = function(node) {
				var skip = 0;
				if (node.nodeType === 3) {
					var pos = node.data.search(regex);
					if (pos >= 0 && node.data.length > 0) {
						var match = node.data.match(regex);
						var spannode = document.createElement('span');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(match[0].length);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						skip = 1;
					}
				} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += highlight(node.childNodes[i]);
					}
				}
				return skip;
			};
		
			return $element.each(function() {
				highlight(this);
			});
		};
		
		/**
		 * removeHighlight fn copied from highlight v5 and
		 * edited to remove with() and pass js strict mode
		 */
		$.fn.removeHighlight = function() {
			return this.find("span.highlight").each(function() {
				this.parentNode.firstChild.nodeName;
				var parent = this.parentNode;
				parent.replaceChild(this.firstChild, this);
				parent.normalize();
			}).end();
		};
		
		
		var MicroEvent = function() {};
		MicroEvent.prototype = {
			on: function(event, fct){
				this._events = this._events || {};
				this._events[event] = this._events[event] || [];
				this._events[event].push(fct);
			},
			off: function(event, fct){
				var n = arguments.length;
				if (n === 0) return delete this._events;
				if (n === 1) return delete this._events[event];
		
				this._events = this._events || {};
				if (event in this._events === false) return;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
			},
			trigger: function(event /* , args... */){
				this._events = this._events || {};
				if (event in this._events === false) return;
				for (var i = 0; i < this._events[event].length; i++){
					this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		};
		
		/**
		 * Mixin will delegate all MicroEvent.js function in the destination object.
		 *
		 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
		 *
		 * @param {object} the object which will support MicroEvent
		 */
		MicroEvent.mixin = function(destObject){
			var props = ['on', 'off', 'trigger'];
			for (var i = 0; i < props.length; i++){
				destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
			}
		};
		
		var IS_MAC        = /Mac/.test(navigator.userAgent);
		
		var KEY_A         = 65;
		var KEY_COMMA     = 188;
		var KEY_RETURN    = 13;
		var KEY_ESC       = 27;
		var KEY_LEFT      = 37;
		var KEY_UP        = 38;
		var KEY_P         = 80;
		var KEY_RIGHT     = 39;
		var KEY_DOWN      = 40;
		var KEY_N         = 78;
		var KEY_BACKSPACE = 8;
		var KEY_DELETE    = 46;
		var KEY_SHIFT     = 16;
		var KEY_CMD       = IS_MAC ? 91 : 17;
		var KEY_CTRL      = IS_MAC ? 18 : 17;
		var KEY_TAB       = 9;
		
		var TAG_SELECT    = 1;
		var TAG_INPUT     = 2;
		
		// for now, android support in general is too spotty to support validity
		var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('input').validity;
		
		
		var isset = function(object) {
			return typeof object !== 'undefined';
		};
		
		/**
		 * Converts a scalar to its best string representation
		 * for hash keys and HTML attribute values.
		 *
		 * Transformations:
		 *   'str'     -> 'str'
		 *   null      -> ''
		 *   undefined -> ''
		 *   true      -> '1'
		 *   false     -> '0'
		 *   0         -> '0'
		 *   1         -> '1'
		 *
		 * @param {string} value
		 * @returns {string|null}
		 */
		var hash_key = function(value) {
			if (typeof value === 'undefined' || value === null) return null;
			if (typeof value === 'boolean') return value ? '1' : '0';
			return value + '';
		};
		
		/**
		 * Escapes a string for use within HTML.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_html = function(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		};
		
		/**
		 * Escapes "$" characters in replacement strings.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_replace = function(str) {
			return (str + '').replace(/\$/g, '$$$$');
		};
		
		var hook = {};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked before the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.before = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				fn.apply(self, arguments);
				return original.apply(self, arguments);
			};
		};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked after the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.after = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				var result = original.apply(self, arguments);
				fn.apply(self, arguments);
				return result;
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be invoked once.
		 *
		 * @param {function} fn
		 * @returns {function}
		 */
		var once = function(fn) {
			var called = false;
			return function() {
				if (called) return;
				called = true;
				fn.apply(this, arguments);
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be called once
		 * every `delay` milliseconds (invoked on the falling edge).
		 *
		 * @param {function} fn
		 * @param {int} delay
		 * @returns {function}
		 */
		var debounce = function(fn, delay) {
			var timeout;
			return function() {
				var self = this;
				var args = arguments;
				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					fn.apply(self, args);
				}, delay);
			};
		};
		
		/**
		 * Debounce all fired events types listed in `types`
		 * while executing the provided `fn`.
		 *
		 * @param {object} self
		 * @param {array} types
		 * @param {function} fn
		 */
		var debounce_events = function(self, types, fn) {
			var type;
			var trigger = self.trigger;
			var event_args = {};
		
			// override trigger method
			self.trigger = function() {
				var type = arguments[0];
				if (types.indexOf(type) !== -1) {
					event_args[type] = arguments;
				} else {
					return trigger.apply(self, arguments);
				}
			};
		
			// invoke provided function
			fn.apply(self, []);
			self.trigger = trigger;
		
			// trigger queued events
			for (type in event_args) {
				if (event_args.hasOwnProperty(type)) {
					trigger.apply(self, event_args[type]);
				}
			}
		};
		
		/**
		 * A workaround for http://bugs.jquery.com/ticket/6696
		 *
		 * @param {object} $parent - Parent element to listen on.
		 * @param {string} event - Event name.
		 * @param {string} selector - Descendant selector to filter by.
		 * @param {function} fn - Event handler.
		 */
		var watchChildEvent = function($parent, event, selector, fn) {
			$parent.on(event, selector, function(e) {
				var child = e.target;
				while (child && child.parentNode !== $parent[0]) {
					child = child.parentNode;
				}
				e.currentTarget = child;
				return fn.apply(this, [e]);
			});
		};
		
		/**
		 * Determines the current selection within a text input control.
		 * Returns an object containing:
		 *   - start
		 *   - length
		 *
		 * @param {object} input
		 * @returns {object}
		 */
		var getSelection = function(input) {
			var result = {};
			if ('selectionStart' in input) {
				result.start = input.selectionStart;
				result.length = input.selectionEnd - result.start;
			} else if (document.selection) {
				input.focus();
				var sel = document.selection.createRange();
				var selLen = document.selection.createRange().text.length;
				sel.moveStart('character', -input.value.length);
				result.start = sel.text.length - selLen;
				result.length = selLen;
			}
			return result;
		};
		
		/**
		 * Copies CSS properties from one element to another.
		 *
		 * @param {object} $from
		 * @param {object} $to
		 * @param {array} properties
		 */
		var transferStyles = function($from, $to, properties) {
			var i, n, styles = {};
			if (properties) {
				for (i = 0, n = properties.length; i < n; i++) {
					styles[properties[i]] = $from.css(properties[i]);
				}
			} else {
				styles = $from.css();
			}
			$to.css(styles);
		};
		
		/**
		 * Measures the width of a string within a
		 * parent element (in pixels).
		 *
		 * @param {string} str
		 * @param {object} $parent
		 * @returns {int}
		 */
		var measureString = function(str, $parent) {
			if (!str) {
				return 0;
			}
		
			var $test = $('<test>').css({
				position: 'absolute',
				top: -99999,
				left: -99999,
				width: 'auto',
				padding: 0,
				whiteSpace: 'pre'
			}).text(str).appendTo('body');
		
			transferStyles($parent, $test, [
				'letterSpacing',
				'fontSize',
				'fontFamily',
				'fontWeight',
				'textTransform'
			]);
		
			var width = $test.width();
			$test.remove();
		
			return width;
		};
		
		/**
		 * Sets up an input to grow horizontally as the user
		 * types. If the value is changed manually, you can
		 * trigger the "update" handler to resize:
		 *
		 * $input.trigger('update');
		 *
		 * @param {object} $input
		 */
		var autoGrow = function($input) {
			var currentWidth = null;
		
			var update = function(e, options) {
				var value, keyCode, printable, placeholder, width;
				var shift, character, selection;
				e = e || window.event || {};
				options = options || {};
		
				if (e.metaKey || e.altKey) return;
				if (!options.force && $input.data('grow') === false) return;
		
				value = $input.val();
				if (e.type && e.type.toLowerCase() === 'keydown') {
					keyCode = e.keyCode;
					printable = (
						(keyCode >= 97 && keyCode <= 122) || // a-z
						(keyCode >= 65 && keyCode <= 90)  || // A-Z
						(keyCode >= 48 && keyCode <= 57)  || // 0-9
						keyCode === 32 // space
					);
		
					if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
						selection = getSelection($input[0]);
						if (selection.length) {
							value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
						} else if (keyCode === KEY_BACKSPACE && selection.start) {
							value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
						} else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
							value = value.substring(0, selection.start) + value.substring(selection.start + 1);
						}
					} else if (printable) {
						shift = e.shiftKey;
						character = String.fromCharCode(e.keyCode);
						if (shift) character = character.toUpperCase();
						else character = character.toLowerCase();
						value += character;
					}
				}
		
				placeholder = $input.attr('placeholder');
				if (!value && placeholder) {
					value = placeholder;
				}
		
				width = measureString(value, $input) + 4;
				if (width !== currentWidth) {
					currentWidth = width;
					$input.width(width);
					$input.triggerHandler('resize');
				}
			};
		
			$input.on('keydown keyup update blur', update);
			update();
		};
		
		var domToString = function(d) {
			var tmp = document.createElement('div');
		
			tmp.appendChild(d.cloneNode(true));
		
			return tmp.innerHTML;
		};
		
		var logError = function(message, options){
			if(!options) options = {};
			var component = "Selectize";
		
			console.error(component + ": " + message)
		
			if(options.explanation){
				// console.group is undefined in <IE11
				if(console.group) console.group();
				console.error(options.explanation);
				if(console.group) console.groupEnd();
			}
		}
		
		
		var Selectize = function($input, settings) {
			var key, i, n, dir, input, self = this;
			input = $input[0];
			input.selectize = self;
		
			// detect rtl environment
			var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
			dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
			dir = dir || $input.parents('[dir]:first').attr('dir') || '';
		
			// setup default state
			$.extend(self, {
				order            : 0,
				settings         : settings,
				$input           : $input,
				tabIndex         : $input.attr('tabindex') || '',
				tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
				rtl              : /rtl/i.test(dir),
		
				eventNS          : '.selectize' + (++Selectize.count),
				highlightedValue : null,
				isOpen           : false,
				isDisabled       : false,
				isRequired       : false, //$input.is('[required]')
				isInvalid        : false,
				isLocked         : false,
				isFocused        : false,
				isInputHidden    : false,
				isSetup          : false,
				isShiftDown      : false,
				isCmdDown        : false,
				isCtrlDown       : false,
				ignoreFocus      : false,
				ignoreBlur       : false,
				ignoreHover      : false,
				hasOptions       : false,
				currentResults   : null,
				lastValue        : '',
				caretPos         : 0,
				loading          : 0,
				loadedSearches   : {},
		
				$activeOption    : null,
				$activeItems     : [],
		
				optgroups        : {},
				options          : {},
				userOptions      : {},
				items            : [],
				renderCache      : {},
				onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
			});
		
			// search system
			self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});
		
			// build options table
			if (self.settings.options) {
				for (i = 0, n = self.settings.options.length; i < n; i++) {
					self.registerOption(self.settings.options[i]);
				}
				delete self.settings.options;
			}
		
			// build optgroup table
			if (self.settings.optgroups) {
				for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
					self.registerOptionGroup(self.settings.optgroups[i]);
				}
				delete self.settings.optgroups;
			}
		
			// option-dependent defaults
			self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
			if (typeof self.settings.hideSelected !== 'boolean') {
				self.settings.hideSelected = self.settings.mode === 'multi';
			}
		
			self.initializePlugins(self.settings.plugins);
			self.setupCallbacks();
			self.setupTemplates();
			self.setup();
		};
		
		// mixins
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		MicroEvent.mixin(Selectize);
		
		if(typeof MicroPlugin !== "undefined"){
			MicroPlugin.mixin(Selectize);
		}else{
			logError("Dependency MicroPlugin is missing",
				{explanation:
					"Make sure you either: (1) are using the \"standalone\" "+
					"version of Selectize, or (2) require MicroPlugin before you "+
					"load Selectize."}
			);
		}
		
		
		// methods
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		$.extend(Selectize.prototype, {
		
			/**
			 * Creates all elements and sets up event bindings.
			 */
			setup: function() {
				var self      = this;
				var settings  = self.settings;
				var eventNS   = self.eventNS;
				var $window   = $(window);
				var $document = $(document);
				var $input    = self.$input;
		
				var $wrapper;
				var $control;
				var $control_input;
				var $dropdown;
				var $dropdown_content;
				var $dropdown_parent;
				var inputMode;
				var timeout_blur;
				var timeout_focus;
				var classes;
				var classes_plugins;
				var inputId;
		
				inputMode         = self.settings.mode;
				classes           = $input.attr('class') || '';
		
				$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
				$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
				$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
				$dropdown_parent  = $(settings.dropdownParent || $wrapper);
				$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
				$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);
		
				if(inputId = $input.attr('id')) {
					$control_input.attr('id', inputId + '-selectized');
					$("label[for='"+inputId+"']").attr('for', inputId + '-selectized');
				}
		
				if(self.settings.copyClassesToDropdown) {
					$dropdown.addClass(classes);
				}
		
				$wrapper.css({
					width: $input[0].style.width
				});
		
				if (self.plugins.names.length) {
					classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
					$wrapper.addClass(classes_plugins);
					$dropdown.addClass(classes_plugins);
				}
		
				if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
					$input.attr('multiple', 'multiple');
				}
		
				if (self.settings.placeholder) {
					$control_input.attr('placeholder', settings.placeholder);
				}
		
				// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
				if (!self.settings.splitOn && self.settings.delimiter) {
					var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
					self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
				}
		
				if ($input.attr('autocorrect')) {
					$control_input.attr('autocorrect', $input.attr('autocorrect'));
				}
		
				if ($input.attr('autocapitalize')) {
					$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
				}
		
				self.$wrapper          = $wrapper;
				self.$control          = $control;
				self.$control_input    = $control_input;
				self.$dropdown         = $dropdown;
				self.$dropdown_content = $dropdown_content;
		
				$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
				$dropdown.on('mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
				watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
				autoGrow($control_input);
		
				$control.on({
					mousedown : function() { return self.onMouseDown.apply(self, arguments); },
					click     : function() { return self.onClick.apply(self, arguments); }
				});
		
				$control_input.on({
					mousedown : function(e) { e.stopPropagation(); },
					keydown   : function() { return self.onKeyDown.apply(self, arguments); },
					keyup     : function() { return self.onKeyUp.apply(self, arguments); },
					keypress  : function() { return self.onKeyPress.apply(self, arguments); },
					resize    : function() { self.positionDropdown.apply(self, []); },
					blur      : function() { return self.onBlur.apply(self, arguments); },
					focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
					paste     : function() { return self.onPaste.apply(self, arguments); }
				});
		
				$document.on('keydown' + eventNS, function(e) {
					self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
					self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
					self.isShiftDown = e.shiftKey;
				});
		
				$document.on('keyup' + eventNS, function(e) {
					if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
					if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
					if (e.keyCode === KEY_CMD) self.isCmdDown = false;
				});
		
				$document.on('mousedown' + eventNS, function(e) {
					if (self.isFocused) {
						// prevent events on the dropdown scrollbar from causing the control to blur
						if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
							return false;
						}
						// blur on click outside
						if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
							self.blur(e.target);
						}
					}
				});
		
				$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
					if (self.isOpen) {
						self.positionDropdown.apply(self, arguments);
					}
				});
				$window.on('mousemove' + eventNS, function() {
					self.ignoreHover = false;
				});
		
				// store original children and tab index so that they can be
				// restored when the destroy() method is called.
				this.revertSettings = {
					$children : $input.children().detach(),
					tabindex  : $input.attr('tabindex')
				};
		
				$input.attr('tabindex', -1).hide().after(self.$wrapper);
		
				if ($.isArray(settings.items)) {
					self.setValue(settings.items);
					delete settings.items;
				}
		
				// feature detect for the validation API
				if (SUPPORTS_VALIDITY_API) {
					$input.on('invalid' + eventNS, function(e) {
						e.preventDefault();
						self.isInvalid = true;
						self.refreshState();
					});
				}
		
				self.updateOriginalInput();
				self.refreshItems();
				self.refreshState();
				self.updatePlaceholder();
				self.isSetup = true;
		
				if ($input.is(':disabled')) {
					self.disable();
				}
		
				self.on('change', this.onChange);
		
				$input.data('selectize', self);
				$input.addClass('selectized');
				self.trigger('initialize');
		
				// preload options
				if (settings.preload === true) {
					self.onSearchChange('');
				}
		
			},
		
			/**
			 * Sets up default rendering functions.
			 */
			setupTemplates: function() {
				var self = this;
				var field_label = self.settings.labelField;
				var field_optgroup = self.settings.optgroupLabelField;
		
				var templates = {
					'optgroup': function(data) {
						return '<div class="optgroup">' + data.html + '</div>';
					},
					'optgroup_header': function(data, escape) {
						return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
					},
					'option': function(data, escape) {
						return '<div class="option">' + escape(data[field_label]) + '</div>';
					},
					'item': function(data, escape) {
						return '<div class="item">' + escape(data[field_label]) + '</div>';
					},
					'option_create': function(data, escape) {
						return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
					}
				};
		
				self.settings.render = $.extend({}, templates, self.settings.render);
			},
		
			/**
			 * Maps fired events to callbacks provided
			 * in the settings used when creating the control.
			 */
			setupCallbacks: function() {
				var key, fn, callbacks = {
					'initialize'      : 'onInitialize',
					'change'          : 'onChange',
					'item_add'        : 'onItemAdd',
					'item_remove'     : 'onItemRemove',
					'clear'           : 'onClear',
					'option_add'      : 'onOptionAdd',
					'option_remove'   : 'onOptionRemove',
					'option_clear'    : 'onOptionClear',
					'optgroup_add'    : 'onOptionGroupAdd',
					'optgroup_remove' : 'onOptionGroupRemove',
					'optgroup_clear'  : 'onOptionGroupClear',
					'dropdown_open'   : 'onDropdownOpen',
					'dropdown_close'  : 'onDropdownClose',
					'type'            : 'onType',
					'load'            : 'onLoad',
					'focus'           : 'onFocus',
					'blur'            : 'onBlur'
				};
		
				for (key in callbacks) {
					if (callbacks.hasOwnProperty(key)) {
						fn = this.settings[callbacks[key]];
						if (fn) this.on(key, fn);
					}
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a click event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onClick: function(e) {
				var self = this;
		
				// necessary for mobile webkit devices (manual focus triggering
				// is ignored unless invoked within a click event)
				if (!self.isFocused) {
					self.focus();
					e.preventDefault();
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a mouse down event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onMouseDown: function(e) {
				var self = this;
				var defaultPrevented = e.isDefaultPrevented();
				var $target = $(e.target);
		
				if (self.isFocused) {
					// retain focus by preventing native handling. if the
					// event target is the input it should not be modified.
					// otherwise, text selection within the input won't work.
					if (e.target !== self.$control_input[0]) {
						if (self.settings.mode === 'single') {
							// toggle dropdown
							self.isOpen ? self.close() : self.open();
						} else if (!defaultPrevented) {
							self.setActiveItem(null);
						}
						return false;
					}
				} else {
					// give control focus
					if (!defaultPrevented) {
						window.setTimeout(function() {
							self.focus();
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered when the value of the control has been changed.
			 * This should propagate the event to the original DOM
			 * input / select element.
			 */
			onChange: function() {
				this.$input.trigger('change');
			},
		
			/**
			 * Triggered on <input> paste.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onPaste: function(e) {
				var self = this;
		
				if (self.isFull() || self.isInputHidden || self.isLocked) {
					e.preventDefault();
					return;
				}
		
				// If a regex or string is included, this will split the pasted
				// input and create Items for each separate value
				if (self.settings.splitOn) {
		
					// Wait for pasted text to be recognized in value
					setTimeout(function() {
						var pastedText = self.$control_input.val();
						if(!pastedText.match(self.settings.splitOn)){ return }
		
						var splitInput = $.trim(pastedText).split(self.settings.splitOn);
						for (var i = 0, n = splitInput.length; i < n; i++) {
							self.createItem(splitInput[i]);
						}
					}, 0);
				}
			},
		
			/**
			 * Triggered on <input> keypress.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyPress: function(e) {
				if (this.isLocked) return e && e.preventDefault();
				var character = String.fromCharCode(e.keyCode || e.which);
				if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
					this.createItem();
					e.preventDefault();
					return false;
				}
			},
		
			/**
			 * Triggered on <input> keydown.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyDown: function(e) {
				var isInput = e.target === this.$control_input[0];
				var self = this;
		
				if (self.isLocked) {
					if (e.keyCode !== KEY_TAB) {
						e.preventDefault();
					}
					return;
				}
		
				switch (e.keyCode) {
					case KEY_A:
						if (self.isCmdDown) {
							self.selectAll();
							return;
						}
						break;
					case KEY_ESC:
						if (self.isOpen) {
							e.preventDefault();
							e.stopPropagation();
							self.close();
						}
						return;
					case KEY_N:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_DOWN:
						if (!self.isOpen && self.hasOptions) {
							self.open();
						} else if (self.$activeOption) {
							self.ignoreHover = true;
							var $next = self.getAdjacentOption(self.$activeOption, 1);
							if ($next.length) self.setActiveOption($next, true, true);
						}
						e.preventDefault();
						return;
					case KEY_P:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_UP:
						if (self.$activeOption) {
							self.ignoreHover = true;
							var $prev = self.getAdjacentOption(self.$activeOption, -1);
							if ($prev.length) self.setActiveOption($prev, true, true);
						}
						e.preventDefault();
						return;
					case KEY_RETURN:
						if (self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
							e.preventDefault();
						}
						return;
					case KEY_LEFT:
						self.advanceSelection(-1, e);
						return;
					case KEY_RIGHT:
						self.advanceSelection(1, e);
						return;
					case KEY_TAB:
						if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
		
							// Default behaviour is to jump to the next field, we only want this
							// if the current field doesn't accept any more entries
							if (!self.isFull()) {
								e.preventDefault();
							}
						}
						if (self.settings.create && self.createItem()) {
							e.preventDefault();
						}
						return;
					case KEY_BACKSPACE:
					case KEY_DELETE:
						self.deleteSelection(e);
						return;
				}
		
				if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();
					return;
				}
			},
		
			/**
			 * Triggered on <input> keyup.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyUp: function(e) {
				var self = this;
		
				if (self.isLocked) return e && e.preventDefault();
				var value = self.$control_input.val() || '';
				if (self.lastValue !== value) {
					self.lastValue = value;
					self.onSearchChange(value);
					self.refreshOptions();
					self.trigger('type', value);
				}
			},
		
			/**
			 * Invokes the user-provide option provider / loader.
			 *
			 * Note: this function is debounced in the Selectize
			 * constructor (by `settings.loadThrottle` milliseconds)
			 *
			 * @param {string} value
			 */
			onSearchChange: function(value) {
				var self = this;
				var fn = self.settings.load;
				if (!fn) return;
				if (self.loadedSearches.hasOwnProperty(value)) return;
				self.loadedSearches[value] = true;
				self.load(function(callback) {
					fn.apply(self, [value, callback]);
				});
			},
		
			/**
			 * Triggered on <input> focus.
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			onFocus: function(e) {
				var self = this;
				var wasFocused = self.isFocused;
		
				if (self.isDisabled) {
					self.blur();
					e && e.preventDefault();
					return false;
				}
		
				if (self.ignoreFocus) return;
				self.isFocused = true;
				if (self.settings.preload === 'focus') self.onSearchChange('');
		
				if (!wasFocused) self.trigger('focus');
		
				if (!self.$activeItems.length) {
					self.showInput();
					self.setActiveItem(null);
					self.refreshOptions(!!self.settings.openOnFocus);
				}
		
				self.refreshState();
			},
		
			/**
			 * Triggered on <input> blur.
			 *
			 * @param {object} e
			 * @param {Element} dest
			 */
			onBlur: function(e, dest) {
				var self = this;
				if (!self.isFocused) return;
				self.isFocused = false;
		
				if (self.ignoreFocus) {
					return;
				} else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
					// necessary to prevent IE closing the dropdown when the scrollbar is clicked
					self.ignoreBlur = true;
					self.onFocus(e);
					return;
				}
		
				var deactivate = function() {
					self.close();
					self.setTextboxValue('');
					self.setActiveItem(null);
					self.setActiveOption(null);
					self.setCaret(self.items.length);
					self.refreshState();
		
					// IE11 bug: element still marked as active
					dest && dest.focus && dest.focus();
		
					self.ignoreFocus = false;
					self.trigger('blur');
				};
		
				self.ignoreFocus = true;
				if (self.settings.create && self.settings.createOnBlur) {
					self.createItem(null, false, deactivate);
				} else {
					deactivate();
				}
			},
		
			/**
			 * Triggered when the user rolls over
			 * an option in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionHover: function(e) {
				if (this.ignoreHover) return;
				this.setActiveOption(e.currentTarget, false);
			},
		
			/**
			 * Triggered when the user clicks on an option
			 * in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionSelect: function(e) {
				var value, $target, $option, self = this;
		
				if (e.preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
		
				$target = $(e.currentTarget);
				if ($target.hasClass('create')) {
					self.createItem(null, function() {
						if (self.settings.closeAfterSelect) {
							self.close();
						}
					});
				} else {
					value = $target.attr('data-value');
					if (typeof value !== 'undefined') {
						self.lastQuery = null;
						self.setTextboxValue('');
						self.addItem(value);
						if (self.settings.closeAfterSelect) {
							self.close();
						} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
							self.setActiveOption(self.getOption(value));
						}
					}
				}
			},
		
			/**
			 * Triggered when the user clicks on an item
			 * that has been selected.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onItemSelect: function(e) {
				var self = this;
		
				if (self.isLocked) return;
				if (self.settings.mode === 'multi') {
					e.preventDefault();
					self.setActiveItem(e.currentTarget, e);
				}
			},
		
			/**
			 * Invokes the provided method that provides
			 * results to a callback---which are then added
			 * as options to the control.
			 *
			 * @param {function} fn
			 */
			load: function(fn) {
				var self = this;
				var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
		
				self.loading++;
				fn.apply(self, [function(results) {
					self.loading = Math.max(self.loading - 1, 0);
					if (results && results.length) {
						self.addOption(results);
						self.refreshOptions(self.isFocused && !self.isInputHidden);
					}
					if (!self.loading) {
						$wrapper.removeClass(self.settings.loadingClass);
					}
					self.trigger('load', results);
				}]);
			},
		
			/**
			 * Sets the input field of the control to the specified value.
			 *
			 * @param {string} value
			 */
			setTextboxValue: function(value) {
				var $input = this.$control_input;
				var changed = $input.val() !== value;
				if (changed) {
					$input.val(value).triggerHandler('update');
					this.lastValue = value;
				}
			},
		
			/**
			 * Returns the value of the control. If multiple items
			 * can be selected (e.g. <select multiple>), this returns
			 * an array. If only one item can be selected, this
			 * returns a string.
			 *
			 * @returns {mixed}
			 */
			getValue: function() {
				if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
					return this.items;
				} else {
					return this.items.join(this.settings.delimiter);
				}
			},
		
			/**
			 * Resets the selected items to the given value.
			 *
			 * @param {mixed} value
			 */
			setValue: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					this.clear(silent);
					this.addItems(value, silent);
				});
			},
		
			/**
			 * Sets the selected item.
			 *
			 * @param {object} $item
			 * @param {object} e (optional)
			 */
			setActiveItem: function($item, e) {
				var self = this;
				var eventName;
				var i, idx, begin, end, item, swap;
				var $last;
		
				if (self.settings.mode === 'single') return;
				$item = $($item);
		
				// clear the active selection
				if (!$item.length) {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [];
					if (self.isFocused) {
						self.showInput();
					}
					return;
				}
		
				// modify selection
				eventName = e && e.type.toLowerCase();
		
				if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
					$last = self.$control.children('.active:last');
					begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
					end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
					if (begin > end) {
						swap  = begin;
						begin = end;
						end   = swap;
					}
					for (i = begin; i <= end; i++) {
						item = self.$control[0].childNodes[i];
						if (self.$activeItems.indexOf(item) === -1) {
							$(item).addClass('active');
							self.$activeItems.push(item);
						}
					}
					e.preventDefault();
				} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
						$item.removeClass('active');
					} else {
						self.$activeItems.push($item.addClass('active')[0]);
					}
				} else {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [$item.addClass('active')[0]];
				}
		
				// ensure control has focus
				self.hideInput();
				if (!this.isFocused) {
					self.focus();
				}
			},
		
			/**
			 * Sets the selected item in the dropdown menu
			 * of available options.
			 *
			 * @param {object} $object
			 * @param {boolean} scroll
			 * @param {boolean} animate
			 */
			setActiveOption: function($option, scroll, animate) {
				var height_menu, height_item, y;
				var scroll_top, scroll_bottom;
				var self = this;
		
				if (self.$activeOption) self.$activeOption.removeClass('active');
				self.$activeOption = null;
		
				$option = $($option);
				if (!$option.length) return;
		
				self.$activeOption = $option.addClass('active');
		
				if (scroll || !isset(scroll)) {
		
					height_menu   = self.$dropdown_content.height();
					height_item   = self.$activeOption.outerHeight(true);
					scroll        = self.$dropdown_content.scrollTop() || 0;
					y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
					scroll_top    = y;
					scroll_bottom = y - height_menu + height_item;
		
					if (y + height_item > height_menu + scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
					} else if (y < scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
					}
		
				}
			},
		
			/**
			 * Selects all items (CTRL + A).
			 */
			selectAll: function() {
				var self = this;
				if (self.settings.mode === 'single') return;
		
				self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
				if (self.$activeItems.length) {
					self.hideInput();
					self.close();
				}
				self.focus();
			},
		
			/**
			 * Hides the input element out of view, while
			 * retaining its focus.
			 */
			hideInput: function() {
				var self = this;
		
				self.setTextboxValue('');
				self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
				self.isInputHidden = true;
			},
		
			/**
			 * Restores input visibility.
			 */
			showInput: function() {
				this.$control_input.css({opacity: 1, position: 'relative', left: 0});
				this.isInputHidden = false;
			},
		
			/**
			 * Gives the control focus.
			 */
			focus: function() {
				var self = this;
				if (self.isDisabled) return;
		
				self.ignoreFocus = true;
				self.$control_input[0].focus();
				window.setTimeout(function() {
					self.ignoreFocus = false;
					self.onFocus();
				}, 0);
			},
		
			/**
			 * Forces the control out of focus.
			 *
			 * @param {Element} dest
			 */
			blur: function(dest) {
				this.$control_input[0].blur();
				this.onBlur(null, dest);
			},
		
			/**
			 * Returns a function that scores an object
			 * to show how good of a match it is to the
			 * provided query.
			 *
			 * @param {string} query
			 * @param {object} options
			 * @return {function}
			 */
			getScoreFunction: function(query) {
				return this.sifter.getScoreFunction(query, this.getSearchOptions());
			},
		
			/**
			 * Returns search options for sifter (the system
			 * for scoring and sorting results).
			 *
			 * @see https://github.com/brianreavis/sifter.js
			 * @return {object}
			 */
			getSearchOptions: function() {
				var settings = this.settings;
				var sort = settings.sortField;
				if (typeof sort === 'string') {
					sort = [{field: sort}];
				}
		
				return {
					fields      : settings.searchField,
					conjunction : settings.searchConjunction,
					sort        : sort
				};
			},
		
			/**
			 * Searches through available options and returns
			 * a sorted array of matches.
			 *
			 * Returns an object containing:
			 *
			 *   - query {string}
			 *   - tokens {array}
			 *   - total {int}
			 *   - items {array}
			 *
			 * @param {string} query
			 * @returns {object}
			 */
			search: function(query) {
				var i, value, score, result, calculateScore;
				var self     = this;
				var settings = self.settings;
				var options  = this.getSearchOptions();
		
				// validate user-provided result scoring function
				if (settings.score) {
					calculateScore = self.settings.score.apply(this, [query]);
					if (typeof calculateScore !== 'function') {
						throw new Error('Selectize "score" setting must be a function that returns a function');
					}
				}
		
				// perform search
				if (query !== self.lastQuery) {
					self.lastQuery = query;
					result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
					self.currentResults = result;
				} else {
					result = $.extend(true, {}, self.currentResults);
				}
		
				// filter out selected items
				if (settings.hideSelected) {
					for (i = result.items.length - 1; i >= 0; i--) {
						if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
							result.items.splice(i, 1);
						}
					}
				}
		
				return result;
			},
		
			/**
			 * Refreshes the list of available options shown
			 * in the autocomplete dropdown menu.
			 *
			 * @param {boolean} triggerDropdown
			 */
			refreshOptions: function(triggerDropdown) {
				var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
				var $active, $active_before, $create;
		
				if (typeof triggerDropdown === 'undefined') {
					triggerDropdown = true;
				}
		
				var self              = this;
				var query             = $.trim(self.$control_input.val());
				var results           = self.search(query);
				var $dropdown_content = self.$dropdown_content;
				var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));
		
				// build markup
				n = results.items.length;
				if (typeof self.settings.maxOptions === 'number') {
					n = Math.min(n, self.settings.maxOptions);
				}
		
				// render and group available options individually
				groups = {};
				groups_order = [];
		
				for (i = 0; i < n; i++) {
					option      = self.options[results.items[i].id];
					option_html = self.render('option', option);
					optgroup    = option[self.settings.optgroupField] || '';
					optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];
		
					for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
						optgroup = optgroups[j];
						if (!self.optgroups.hasOwnProperty(optgroup)) {
							optgroup = '';
						}
						if (!groups.hasOwnProperty(optgroup)) {
							groups[optgroup] = document.createDocumentFragment();
							groups_order.push(optgroup);
						}
						groups[optgroup].appendChild(option_html);
					}
				}
		
				// sort optgroups
				if (this.settings.lockOptgroupOrder) {
					groups_order.sort(function(a, b) {
						var a_order = self.optgroups[a].$order || 0;
						var b_order = self.optgroups[b].$order || 0;
						return a_order - b_order;
					});
				}
		
				// render optgroup headers & join groups
				html = document.createDocumentFragment();
				for (i = 0, n = groups_order.length; i < n; i++) {
					optgroup = groups_order[i];
					if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].childNodes.length) {
						// render the optgroup header and options within it,
						// then pass it to the wrapper template
						html_children = document.createDocumentFragment();
						html_children.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
						html_children.appendChild(groups[optgroup]);
		
						html.appendChild(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
							html: domToString(html_children),
							dom:  html_children
						})));
					} else {
						html.appendChild(groups[optgroup]);
					}
				}
		
				$dropdown_content.html(html);
		
				// highlight matching terms inline
				if (self.settings.highlight && results.query.length && results.tokens.length) {
					$dropdown_content.removeHighlight();
					for (i = 0, n = results.tokens.length; i < n; i++) {
						highlight($dropdown_content, results.tokens[i].regex);
					}
				}
		
				// add "selected" class to selected options
				if (!self.settings.hideSelected) {
					for (i = 0, n = self.items.length; i < n; i++) {
						self.getOption(self.items[i]).addClass('selected');
					}
				}
		
				// add create option
				has_create_option = self.canCreate(query);
				if (has_create_option) {
					$dropdown_content.prepend(self.render('option_create', {input: query}));
					$create = $($dropdown_content[0].childNodes[0]);
				}
		
				// activate
				self.hasOptions = results.items.length > 0 || has_create_option;
				if (self.hasOptions) {
					if (results.items.length > 0) {
						$active_before = active_before && self.getOption(active_before);
						if ($active_before && $active_before.length) {
							$active = $active_before;
						} else if (self.settings.mode === 'single' && self.items.length) {
							$active = self.getOption(self.items[0]);
						}
						if (!$active || !$active.length) {
							if ($create && !self.settings.addPrecedence) {
								$active = self.getAdjacentOption($create, 1);
							} else {
								$active = $dropdown_content.find('[data-selectable]:first');
							}
						}
					} else {
						$active = $create;
					}
					self.setActiveOption($active);
					if (triggerDropdown && !self.isOpen) { self.open(); }
				} else {
					self.setActiveOption(null);
					if (triggerDropdown && self.isOpen) { self.close(); }
				}
			},
		
			/**
			 * Adds an available option. If it already exists,
			 * nothing will happen. Note: this does not refresh
			 * the options list dropdown (use `refreshOptions`
			 * for that).
			 *
			 * Usage:
			 *
			 *   this.addOption(data)
			 *
			 * @param {object|array} data
			 */
			addOption: function(data) {
				var i, n, value, self = this;
		
				if ($.isArray(data)) {
					for (i = 0, n = data.length; i < n; i++) {
						self.addOption(data[i]);
					}
					return;
				}
		
				if (value = self.registerOption(data)) {
					self.userOptions[value] = true;
					self.lastQuery = null;
					self.trigger('option_add', value, data);
				}
			},
		
			/**
			 * Registers an option to the pool of options.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOption: function(data) {
				var key = hash_key(data[this.settings.valueField]);
				if (typeof key === 'undefined' || key === null || this.options.hasOwnProperty(key)) return false;
				data.$order = data.$order || ++this.order;
				this.options[key] = data;
				return key;
			},
		
			/**
			 * Registers an option group to the pool of option groups.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOptionGroup: function(data) {
				var key = hash_key(data[this.settings.optgroupValueField]);
				if (!key) return false;
		
				data.$order = data.$order || ++this.order;
				this.optgroups[key] = data;
				return key;
			},
		
			/**
			 * Registers a new optgroup for options
			 * to be bucketed into.
			 *
			 * @param {string} id
			 * @param {object} data
			 */
			addOptionGroup: function(id, data) {
				data[this.settings.optgroupValueField] = id;
				if (id = this.registerOptionGroup(data)) {
					this.trigger('optgroup_add', id, data);
				}
			},
		
			/**
			 * Removes an existing option group.
			 *
			 * @param {string} id
			 */
			removeOptionGroup: function(id) {
				if (this.optgroups.hasOwnProperty(id)) {
					delete this.optgroups[id];
					this.renderCache = {};
					this.trigger('optgroup_remove', id);
				}
			},
		
			/**
			 * Clears all existing option groups.
			 */
			clearOptionGroups: function() {
				this.optgroups = {};
				this.renderCache = {};
				this.trigger('optgroup_clear');
			},
		
			/**
			 * Updates an option available for selection. If
			 * it is visible in the selected items or options
			 * dropdown, it will be re-rendered automatically.
			 *
			 * @param {string} value
			 * @param {object} data
			 */
			updateOption: function(value, data) {
				var self = this;
				var $item, $item_new;
				var value_new, index_item, cache_items, cache_options, order_old;
		
				value     = hash_key(value);
				value_new = hash_key(data[self.settings.valueField]);
		
				// sanity checks
				if (value === null) return;
				if (!self.options.hasOwnProperty(value)) return;
				if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
		
				order_old = self.options[value].$order;
		
				// update references
				if (value_new !== value) {
					delete self.options[value];
					index_item = self.items.indexOf(value);
					if (index_item !== -1) {
						self.items.splice(index_item, 1, value_new);
					}
				}
				data.$order = data.$order || order_old;
				self.options[value_new] = data;
		
				// invalidate render cache
				cache_items = self.renderCache['item'];
				cache_options = self.renderCache['option'];
		
				if (cache_items) {
					delete cache_items[value];
					delete cache_items[value_new];
				}
				if (cache_options) {
					delete cache_options[value];
					delete cache_options[value_new];
				}
		
				// update the item if it's selected
				if (self.items.indexOf(value_new) !== -1) {
					$item = self.getItem(value);
					$item_new = $(self.render('item', data));
					if ($item.hasClass('active')) $item_new.addClass('active');
					$item.replaceWith($item_new);
				}
		
				// invalidate last query because we might have updated the sortField
				self.lastQuery = null;
		
				// update dropdown contents
				if (self.isOpen) {
					self.refreshOptions(false);
				}
			},
		
			/**
			 * Removes a single option.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			removeOption: function(value, silent) {
				var self = this;
				value = hash_key(value);
		
				var cache_items = self.renderCache['item'];
				var cache_options = self.renderCache['option'];
				if (cache_items) delete cache_items[value];
				if (cache_options) delete cache_options[value];
		
				delete self.userOptions[value];
				delete self.options[value];
				self.lastQuery = null;
				self.trigger('option_remove', value);
				self.removeItem(value, silent);
			},
		
			/**
			 * Clears all options.
			 */
			clearOptions: function() {
				var self = this;
		
				self.loadedSearches = {};
				self.userOptions = {};
				self.renderCache = {};
				self.options = self.sifter.items = {};
				self.lastQuery = null;
				self.trigger('option_clear');
				self.clear();
			},
		
			/**
			 * Returns the jQuery element of the option
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getOption: function(value) {
				return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
			},
		
			/**
			 * Returns the jQuery element of the next or
			 * previous selectable option.
			 *
			 * @param {object} $option
			 * @param {int} direction  can be 1 for next or -1 for previous
			 * @return {object}
			 */
			getAdjacentOption: function($option, direction) {
				var $options = this.$dropdown.find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			},
		
			/**
			 * Finds the first element with a "data-value" attribute
			 * that matches the given value.
			 *
			 * @param {mixed} value
			 * @param {object} $els
			 * @return {object}
			 */
			getElementWithValue: function(value, $els) {
				value = hash_key(value);
		
				if (typeof value !== 'undefined' && value !== null) {
					for (var i = 0, n = $els.length; i < n; i++) {
						if ($els[i].getAttribute('data-value') === value) {
							return $($els[i]);
						}
					}
				}
		
				return $();
			},
		
			/**
			 * Returns the jQuery element of the item
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getItem: function(value) {
				return this.getElementWithValue(value, this.$control.children());
			},
		
			/**
			 * "Selects" multiple items at once. Adds them to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItems: function(values, silent) {
				var items = $.isArray(values) ? values : [values];
				for (var i = 0, n = items.length; i < n; i++) {
					this.isPending = (i < n - 1);
					this.addItem(items[i], silent);
				}
			},
		
			/**
			 * "Selects" an item. Adds it to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItem: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					var $item, $option, $options;
					var self = this;
					var inputMode = self.settings.mode;
					var i, active, value_next, wasFull;
					value = hash_key(value);
		
					if (self.items.indexOf(value) !== -1) {
						if (inputMode === 'single') self.close();
						return;
					}
		
					if (!self.options.hasOwnProperty(value)) return;
					if (inputMode === 'single') self.clear(silent);
					if (inputMode === 'multi' && self.isFull()) return;
		
					$item = $(self.render('item', self.options[value]));
					wasFull = self.isFull();
					self.items.splice(self.caretPos, 0, value);
					self.insertAtCaret($item);
					if (!self.isPending || (!wasFull && self.isFull())) {
						self.refreshState();
					}
		
					if (self.isSetup) {
						$options = self.$dropdown_content.find('[data-selectable]');
		
						// update menu / remove the option (if this is not one item being added as part of series)
						if (!self.isPending) {
							$option = self.getOption(value);
							value_next = self.getAdjacentOption($option, 1).attr('data-value');
							self.refreshOptions(self.isFocused && inputMode !== 'single');
							if (value_next) {
								self.setActiveOption(self.getOption(value_next));
							}
						}
		
						// hide the menu if the maximum number of items have been selected or no options are left
						if (!$options.length || self.isFull()) {
							self.close();
						} else {
							self.positionDropdown();
						}
		
						self.updatePlaceholder();
						self.trigger('item_add', value, $item);
						self.updateOriginalInput({silent: silent});
					}
				});
			},
		
			/**
			 * Removes the selected item matching
			 * the provided value.
			 *
			 * @param {string} value
			 */
			removeItem: function(value, silent) {
				var self = this;
				var $item, i, idx;
		
				$item = (value instanceof $) ? value : self.getItem(value);
				value = hash_key($item.attr('data-value'));
				i = self.items.indexOf(value);
		
				if (i !== -1) {
					$item.remove();
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
					}
		
					self.items.splice(i, 1);
					self.lastQuery = null;
					if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
						self.removeOption(value, silent);
					}
		
					if (i < self.caretPos) {
						self.setCaret(self.caretPos - 1);
					}
		
					self.refreshState();
					self.updatePlaceholder();
					self.updateOriginalInput({silent: silent});
					self.positionDropdown();
					self.trigger('item_remove', value, $item);
				}
			},
		
			/**
			 * Invokes the `create` method provided in the
			 * selectize options that should provide the data
			 * for the new item, given the user input.
			 *
			 * Once this completes, it will be added
			 * to the item list.
			 *
			 * @param {string} value
			 * @param {boolean} [triggerDropdown]
			 * @param {function} [callback]
			 * @return {boolean}
			 */
			createItem: function(input, triggerDropdown) {
				var self  = this;
				var caret = self.caretPos;
				input = input || $.trim(self.$control_input.val() || '');
		
				var callback = arguments[arguments.length - 1];
				if (typeof callback !== 'function') callback = function() {};
		
				if (typeof triggerDropdown !== 'boolean') {
					triggerDropdown = true;
				}
		
				if (!self.canCreate(input)) {
					callback();
					return false;
				}
		
				self.lock();
		
				var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
					var data = {};
					data[self.settings.labelField] = input;
					data[self.settings.valueField] = input;
					return data;
				};
		
				var create = once(function(data) {
					self.unlock();
		
					if (!data || typeof data !== 'object') return callback();
					var value = hash_key(data[self.settings.valueField]);
					if (typeof value !== 'string') return callback();
		
					self.setTextboxValue('');
					self.addOption(data);
					self.setCaret(caret);
					self.addItem(value);
					self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
					callback(data);
				});
		
				var output = setup.apply(this, [input, create]);
				if (typeof output !== 'undefined') {
					create(output);
				}
		
				return true;
			},
		
			/**
			 * Re-renders the selected item lists.
			 */
			refreshItems: function() {
				this.lastQuery = null;
		
				if (this.isSetup) {
					this.addItem(this.items);
				}
		
				this.refreshState();
				this.updateOriginalInput();
			},
		
			/**
			 * Updates all state-dependent attributes
			 * and CSS classes.
			 */
			refreshState: function() {
				this.refreshValidityState();
				this.refreshClasses();
			},
		
			/**
			 * Update the `required` attribute of both input and control input.
			 *
			 * The `required` property needs to be activated on the control input
			 * for the error to be displayed at the right place. `required` also
			 * needs to be temporarily deactivated on the input since the input is
			 * hidden and can't show errors.
			 */
			refreshValidityState: function() {
				if (!this.isRequired) return false;
		
				var invalid = !this.items.length;
		
				this.isInvalid = invalid;
				this.$control_input.prop('required', invalid);
				this.$input.prop('required', !invalid);
			},
		
			/**
			 * Updates all state-dependent CSS classes.
			 */
			refreshClasses: function() {
				var self     = this;
				var isFull   = self.isFull();
				var isLocked = self.isLocked;
		
				self.$wrapper
					.toggleClass('rtl', self.rtl);
		
				self.$control
					.toggleClass('focus', self.isFocused)
					.toggleClass('disabled', self.isDisabled)
					.toggleClass('required', self.isRequired)
					.toggleClass('invalid', self.isInvalid)
					.toggleClass('locked', isLocked)
					.toggleClass('full', isFull).toggleClass('not-full', !isFull)
					.toggleClass('input-active', self.isFocused && !self.isInputHidden)
					.toggleClass('dropdown-active', self.isOpen)
					.toggleClass('has-options', !$.isEmptyObject(self.options))
					.toggleClass('has-items', self.items.length > 0);
		
				self.$control_input.data('grow', !isFull && !isLocked);
			},
		
			/**
			 * Determines whether or not more items can be added
			 * to the control without exceeding the user-defined maximum.
			 *
			 * @returns {boolean}
			 */
			isFull: function() {
				return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
			},
		
			/**
			 * Refreshes the original <select> or <input>
			 * element to reflect the current state.
			 */
			updateOriginalInput: function(opts) {
				var i, n, options, label, self = this;
				opts = opts || {};
		
				if (self.tagType === TAG_SELECT) {
					options = [];
					for (i = 0, n = self.items.length; i < n; i++) {
						label = self.options[self.items[i]][self.settings.labelField] || '';
						options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
					}
					if (!options.length && !this.$input.attr('multiple')) {
						options.push('<option value="" selected="selected"></option>');
					}
					self.$input.html(options.join(''));
				} else {
					self.$input.val(self.getValue());
					self.$input.attr('value',self.$input.val());
				}
		
				if (self.isSetup) {
					if (!opts.silent) {
						self.trigger('change', self.$input.val());
					}
				}
			},
		
			/**
			 * Shows/hide the input placeholder depending
			 * on if there items in the list already.
			 */
			updatePlaceholder: function() {
				if (!this.settings.placeholder) return;
				var $input = this.$control_input;
		
				if (this.items.length) {
					$input.removeAttr('placeholder');
				} else {
					$input.attr('placeholder', this.settings.placeholder);
				}
				$input.triggerHandler('update', {force: true});
			},
		
			/**
			 * Shows the autocomplete dropdown containing
			 * the available options.
			 */
			open: function() {
				var self = this;
		
				if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
				self.focus();
				self.isOpen = true;
				self.refreshState();
				self.$dropdown.css({visibility: 'hidden', display: 'block'});
				self.positionDropdown();
				self.$dropdown.css({visibility: 'visible'});
				self.trigger('dropdown_open', self.$dropdown);
			},
		
			/**
			 * Closes the autocomplete dropdown menu.
			 */
			close: function() {
				var self = this;
				var trigger = self.isOpen;
		
				if (self.settings.mode === 'single' && self.items.length) {
					self.hideInput();
					self.$control_input.blur(); // close keyboard on iOS
				}
		
				self.isOpen = false;
				self.$dropdown.hide();
				self.setActiveOption(null);
				self.refreshState();
		
				if (trigger) self.trigger('dropdown_close', self.$dropdown);
			},
		
			/**
			 * Calculates and applies the appropriate
			 * position of the dropdown.
			 */
			positionDropdown: function() {
				var $control = this.$control;
				var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
				offset.top += $control.outerHeight(true);
		
				this.$dropdown.css({
					width : $control.outerWidth(),
					top   : offset.top,
					left  : offset.left
				});
			},
		
			/**
			 * Resets / clears all selected items
			 * from the control.
			 *
			 * @param {boolean} silent
			 */
			clear: function(silent) {
				var self = this;
		
				if (!self.items.length) return;
				self.$control.children(':not(input)').remove();
				self.items = [];
				self.lastQuery = null;
				self.setCaret(0);
				self.setActiveItem(null);
				self.updatePlaceholder();
				self.updateOriginalInput({silent: silent});
				self.refreshState();
				self.showInput();
				self.trigger('clear');
			},
		
			/**
			 * A helper method for inserting an element
			 * at the current caret position.
			 *
			 * @param {object} $el
			 */
			insertAtCaret: function($el) {
				var caret = Math.min(this.caretPos, this.items.length);
				if (caret === 0) {
					this.$control.prepend($el);
				} else {
					$(this.$control[0].childNodes[caret]).before($el);
				}
				this.setCaret(caret + 1);
			},
		
			/**
			 * Removes the current selected item(s).
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			deleteSelection: function(e) {
				var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
				var self = this;
		
				direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
				selection = getSelection(self.$control_input[0]);
		
				if (self.$activeOption && !self.settings.hideSelected) {
					option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
				}
		
				// determine items that will be removed
				values = [];
		
				if (self.$activeItems.length) {
					$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
					caret = self.$control.children(':not(input)').index($tail);
					if (direction > 0) { caret++; }
		
					for (i = 0, n = self.$activeItems.length; i < n; i++) {
						values.push($(self.$activeItems[i]).attr('data-value'));
					}
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
				} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
					if (direction < 0 && selection.start === 0 && selection.length === 0) {
						values.push(self.items[self.caretPos - 1]);
					} else if (direction > 0 && selection.start === self.$control_input.val().length) {
						values.push(self.items[self.caretPos]);
					}
				}
		
				// allow the callback to abort
				if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
					return false;
				}
		
				// perform removal
				if (typeof caret !== 'undefined') {
					self.setCaret(caret);
				}
				while (values.length) {
					self.removeItem(values.pop());
				}
		
				self.showInput();
				self.positionDropdown();
				self.refreshOptions(true);
		
				// select previous option
				if (option_select) {
					$option_select = self.getOption(option_select);
					if ($option_select.length) {
						self.setActiveOption($option_select);
					}
				}
		
				return true;
			},
		
			/**
			 * Selects the previous / next item (depending
			 * on the `direction` argument).
			 *
			 * > 0 - right
			 * < 0 - left
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceSelection: function(direction, e) {
				var tail, selection, idx, valueLength, cursorAtEdge, $tail;
				var self = this;
		
				if (direction === 0) return;
				if (self.rtl) direction *= -1;
		
				tail = direction > 0 ? 'last' : 'first';
				selection = getSelection(self.$control_input[0]);
		
				if (self.isFocused && !self.isInputHidden) {
					valueLength = self.$control_input.val().length;
					cursorAtEdge = direction < 0
						? selection.start === 0 && selection.length === 0
						: selection.start === valueLength;
		
					if (cursorAtEdge && !valueLength) {
						self.advanceCaret(direction, e);
					}
				} else {
					$tail = self.$control.children('.active:' + tail);
					if ($tail.length) {
						idx = self.$control.children(':not(input)').index($tail);
						self.setActiveItem(null);
						self.setCaret(direction > 0 ? idx + 1 : idx);
					}
				}
			},
		
			/**
			 * Moves the caret left / right.
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceCaret: function(direction, e) {
				var self = this, fn, $adj;
		
				if (direction === 0) return;
		
				fn = direction > 0 ? 'next' : 'prev';
				if (self.isShiftDown) {
					$adj = self.$control_input[fn]();
					if ($adj.length) {
						self.hideInput();
						self.setActiveItem($adj);
						e && e.preventDefault();
					}
				} else {
					self.setCaret(self.caretPos + direction);
				}
			},
		
			/**
			 * Moves the caret to the specified index.
			 *
			 * @param {int} i
			 */
			setCaret: function(i) {
				var self = this;
		
				if (self.settings.mode === 'single') {
					i = self.items.length;
				} else {
					i = Math.max(0, Math.min(self.items.length, i));
				}
		
				if(!self.isPending) {
					// the input must be moved by leaving it in place and moving the
					// siblings, due to the fact that focus cannot be restored once lost
					// on mobile webkit devices
					var j, n, fn, $children, $child;
					$children = self.$control.children(':not(input)');
					for (j = 0, n = $children.length; j < n; j++) {
						$child = $($children[j]).detach();
						if (j <  i) {
							self.$control_input.before($child);
						} else {
							self.$control.append($child);
						}
					}
				}
		
				self.caretPos = i;
			},
		
			/**
			 * Disables user input on the control. Used while
			 * items are being asynchronously created.
			 */
			lock: function() {
				this.close();
				this.isLocked = true;
				this.refreshState();
			},
		
			/**
			 * Re-enables user input on the control.
			 */
			unlock: function() {
				this.isLocked = false;
				this.refreshState();
			},
		
			/**
			 * Disables user input on the control completely.
			 * While disabled, it cannot receive focus.
			 */
			disable: function() {
				var self = this;
				self.$input.prop('disabled', true);
				self.$control_input.prop('disabled', true).prop('tabindex', -1);
				self.isDisabled = true;
				self.lock();
			},
		
			/**
			 * Enables the control so that it can respond
			 * to focus and user input.
			 */
			enable: function() {
				var self = this;
				self.$input.prop('disabled', false);
				self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
				self.isDisabled = false;
				self.unlock();
			},
		
			/**
			 * Completely destroys the control and
			 * unbinds all event listeners so that it can
			 * be garbage collected.
			 */
			destroy: function() {
				var self = this;
				var eventNS = self.eventNS;
				var revertSettings = self.revertSettings;
		
				self.trigger('destroy');
				self.off();
				self.$wrapper.remove();
				self.$dropdown.remove();
		
				self.$input
					.html('')
					.append(revertSettings.$children)
					.removeAttr('tabindex')
					.removeClass('selectized')
					.attr({tabindex: revertSettings.tabindex})
					.show();
		
				self.$control_input.removeData('grow');
				self.$input.removeData('selectize');
		
				$(window).off(eventNS);
				$(document).off(eventNS);
				$(document.body).off(eventNS);
		
				delete self.$input[0].selectize;
			},
		
			/**
			 * A helper method for rendering "item" and
			 * "option" templates, given the data.
			 *
			 * @param {string} templateName
			 * @param {object} data
			 * @returns {string}
			 */
			render: function(templateName, data) {
				var value, id, label;
				var html = '';
				var cache = false;
				var self = this;
				var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
		
				if (templateName === 'option' || templateName === 'item') {
					value = hash_key(data[self.settings.valueField]);
					cache = !!value;
				}
		
				// pull markup from cache if it exists
				if (cache) {
					if (!isset(self.renderCache[templateName])) {
						self.renderCache[templateName] = {};
					}
					if (self.renderCache[templateName].hasOwnProperty(value)) {
						return self.renderCache[templateName][value];
					}
				}
		
				// render markup
				html = $(self.settings.render[templateName].apply(this, [data, escape_html]));
		
				// add mandatory attributes
				if (templateName === 'option' || templateName === 'option_create') {
					html.attr('data-selectable', '');
				}
				else if (templateName === 'optgroup') {
					id = data[self.settings.optgroupValueField] || '';
					html.attr('data-group', id);
				}
				if (templateName === 'option' || templateName === 'item') {
					html.attr('data-value', value || '');
				}
		
				// update cache
				if (cache) {
					self.renderCache[templateName][value] = html[0];
				}
		
				return html[0];
			},
		
			/**
			 * Clears the render cache for a template. If
			 * no template is given, clears all render
			 * caches.
			 *
			 * @param {string} templateName
			 */
			clearCache: function(templateName) {
				var self = this;
				if (typeof templateName === 'undefined') {
					self.renderCache = {};
				} else {
					delete self.renderCache[templateName];
				}
			},
		
			/**
			 * Determines whether or not to display the
			 * create item prompt, given a user input.
			 *
			 * @param {string} input
			 * @return {boolean}
			 */
			canCreate: function(input) {
				var self = this;
				if (!self.settings.create) return false;
				var filter = self.settings.createFilter;
				return input.length
					&& (typeof filter !== 'function' || filter.apply(self, [input]))
					&& (typeof filter !== 'string' || new RegExp(filter).test(input))
					&& (!(filter instanceof RegExp) || filter.test(input));
			}
		
		});
		
		
		Selectize.count = 0;
		Selectize.defaults = {
			options: [],
			optgroups: [],
		
			plugins: [],
			delimiter: ',',
			splitOn: null, // regexp or string for splitting up values from a paste command
			persist: true,
			diacritics: true,
			create: false,
			createOnBlur: false,
			createFilter: null,
			highlight: true,
			openOnFocus: true,
			maxOptions: 1000,
			maxItems: null,
			hideSelected: null,
			addPrecedence: false,
			selectOnTab: false,
			preload: false,
			allowEmptyOption: false,
			closeAfterSelect: false,
		
			scrollDuration: 60,
			loadThrottle: 300,
			loadingClass: 'loading',
		
			dataAttr: 'data-data',
			optgroupField: 'optgroup',
			valueField: 'value',
			labelField: 'text',
			optgroupLabelField: 'label',
			optgroupValueField: 'value',
			lockOptgroupOrder: false,
		
			sortField: '$order',
			searchField: ['text'],
			searchConjunction: 'and',
		
			mode: null,
			wrapperClass: 'selectize-control',
			inputClass: 'selectize-input',
			dropdownClass: 'selectize-dropdown',
			dropdownContentClass: 'selectize-dropdown-content',
		
			dropdownParent: null,
		
			copyClassesToDropdown: true,
		
			/*
			load                 : null, // function(query, callback) { ... }
			score                : null, // function(search) { ... }
			onInitialize         : null, // function() { ... }
			onChange             : null, // function(value) { ... }
			onItemAdd            : null, // function(value, $item) { ... }
			onItemRemove         : null, // function(value) { ... }
			onClear              : null, // function() { ... }
			onOptionAdd          : null, // function(value, data) { ... }
			onOptionRemove       : null, // function(value) { ... }
			onOptionClear        : null, // function() { ... }
			onOptionGroupAdd     : null, // function(id, data) { ... }
			onOptionGroupRemove  : null, // function(id) { ... }
			onOptionGroupClear   : null, // function() { ... }
			onDropdownOpen       : null, // function($dropdown) { ... }
			onDropdownClose      : null, // function($dropdown) { ... }
			onType               : null, // function(str) { ... }
			onDelete             : null, // function(values) { ... }
			*/
		
			render: {
				/*
				item: null,
				optgroup: null,
				optgroup_header: null,
				option: null,
				option_create: null
				*/
			}
		};
		
		
		$.fn.selectize = function(settings_user) {
			var defaults             = $.fn.selectize.defaults;
			var settings             = $.extend({}, defaults, settings_user);
			var attr_data            = settings.dataAttr;
			var field_label          = settings.labelField;
			var field_value          = settings.valueField;
			var field_optgroup       = settings.optgroupField;
			var field_optgroup_label = settings.optgroupLabelField;
			var field_optgroup_value = settings.optgroupValueField;
		
			/**
			 * Initializes selectize from a <input type="text"> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_textbox = function($input, settings_element) {
				var i, n, values, option;
		
				var data_raw = $input.attr(attr_data);
		
				if (!data_raw) {
					var value = $.trim($input.val() || '');
					if (!settings.allowEmptyOption && !value.length) return;
					values = value.split(settings.delimiter);
					for (i = 0, n = values.length; i < n; i++) {
						option = {};
						option[field_label] = values[i];
						option[field_value] = values[i];
						settings_element.options.push(option);
					}
					settings_element.items = values;
				} else {
					settings_element.options = JSON.parse(data_raw);
					for (i = 0, n = settings_element.options.length; i < n; i++) {
						settings_element.items.push(settings_element.options[i][field_value]);
					}
				}
			};
		
			/**
			 * Initializes selectize from a <select> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_select = function($input, settings_element) {
				var i, n, tagName, $children, order = 0;
				var options = settings_element.options;
				var optionsMap = {};
		
				var readData = function($el) {
					var data = attr_data && $el.attr(attr_data);
					if (typeof data === 'string' && data.length) {
						return JSON.parse(data);
					}
					return null;
				};
		
				var addOption = function($option, group) {
					$option = $($option);
		
					var value = hash_key($option.val());
					if (!value && !settings.allowEmptyOption) return;
		
					// if the option already exists, it's probably been
					// duplicated in another optgroup. in this case, push
					// the current group to the "optgroup" property on the
					// existing option so that it's rendered in both places.
					if (optionsMap.hasOwnProperty(value)) {
						if (group) {
							var arr = optionsMap[value][field_optgroup];
							if (!arr) {
								optionsMap[value][field_optgroup] = group;
							} else if (!$.isArray(arr)) {
								optionsMap[value][field_optgroup] = [arr, group];
							} else {
								arr.push(group);
							}
						}
						return;
					}
		
					var option             = readData($option) || {};
					option[field_label]    = option[field_label] || $option.text();
					option[field_value]    = option[field_value] || value;
					option[field_optgroup] = option[field_optgroup] || group;
		
					optionsMap[value] = option;
					options.push(option);
		
					if ($option.is(':selected')) {
						settings_element.items.push(value);
					}
				};
		
				var addGroup = function($optgroup) {
					var i, n, id, optgroup, $options;
		
					$optgroup = $($optgroup);
					id = $optgroup.attr('label');
		
					if (id) {
						optgroup = readData($optgroup) || {};
						optgroup[field_optgroup_label] = id;
						optgroup[field_optgroup_value] = id;
						settings_element.optgroups.push(optgroup);
					}
		
					$options = $('option', $optgroup);
					for (i = 0, n = $options.length; i < n; i++) {
						addOption($options[i], id);
					}
				};
		
				settings_element.maxItems = $input.attr('multiple') ? null : 1;
		
				$children = $input.children();
				for (i = 0, n = $children.length; i < n; i++) {
					tagName = $children[i].tagName.toLowerCase();
					if (tagName === 'optgroup') {
						addGroup($children[i]);
					} else if (tagName === 'option') {
						addOption($children[i]);
					}
				}
			};
		
			return this.each(function() {
				if (this.selectize) return;
		
				var instance;
				var $input = $(this);
				var tag_name = this.tagName.toLowerCase();
				var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
				if (!placeholder && !settings.allowEmptyOption) {
					placeholder = $input.children('option[value=""]').text();
				}
		
				var settings_element = {
					'placeholder' : placeholder,
					'options'     : [],
					'optgroups'   : [],
					'items'       : []
				};
		
				if (tag_name === 'select') {
					init_select($input, settings_element);
				} else {
					init_textbox($input, settings_element);
				}
		
				instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
			});
		};
		
		$.fn.selectize.defaults = Selectize.defaults;
		$.fn.selectize.support = {
			validity: SUPPORTS_VALIDITY_API
		};
		
		
		Selectize.define('drag_drop', function(options) {
			if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
			if (this.settings.mode !== 'multi') return;
			var self = this;
		
			self.lock = (function() {
				var original = self.lock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.disable();
					return original.apply(self, arguments);
				};
			})();
		
			self.unlock = (function() {
				var original = self.unlock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.enable();
					return original.apply(self, arguments);
				};
			})();
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(this, arguments);
		
					var $control = self.$control.sortable({
						items: '[data-value]',
						forcePlaceholderSize: true,
						disabled: self.isLocked,
						start: function(e, ui) {
							ui.placeholder.css('width', ui.helper.css('width'));
							$control.css({overflow: 'visible'});
						},
						stop: function() {
							$control.css({overflow: 'hidden'});
							var active = self.$activeItems ? self.$activeItems.slice() : null;
							var values = [];
							$control.children('[data-value]').each(function() {
								values.push($(this).attr('data-value'));
							});
							self.setValue(values);
							self.setActiveItem(active);
						}
					});
				};
			})();
		
		});
		
		Selectize.define('dropdown_header', function(options) {
			var self = this;
		
			options = $.extend({
				title         : 'Untitled',
				headerClass   : 'selectize-dropdown-header',
				titleRowClass : 'selectize-dropdown-header-title',
				labelClass    : 'selectize-dropdown-header-label',
				closeClass    : 'selectize-dropdown-header-close',
		
				html: function(data) {
					return (
						'<div class="' + data.headerClass + '">' +
							'<div class="' + data.titleRowClass + '">' +
								'<span class="' + data.labelClass + '">' + data.title + '</span>' +
								'<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' +
							'</div>' +
						'</div>'
					);
				}
			}, options);
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(self, arguments);
					self.$dropdown_header = $(options.html(options));
					self.$dropdown.prepend(self.$dropdown_header);
				};
			})();
		
		});
		
		Selectize.define('optgroup_columns', function(options) {
			var self = this;
		
			options = $.extend({
				equalizeWidth  : true,
				equalizeHeight : true
			}, options);
		
			this.getAdjacentOption = function($option, direction) {
				var $options = $option.closest('[data-group]').find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, $option, $options, $optgroup;
		
					if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
						self.ignoreHover = true;
						$optgroup = this.$activeOption.closest('[data-group]');
						index = $optgroup.find('[data-selectable]').index(this.$activeOption);
		
						if(e.keyCode === KEY_LEFT) {
							$optgroup = $optgroup.prev('[data-group]');
						} else {
							$optgroup = $optgroup.next('[data-group]');
						}
		
						$options = $optgroup.find('[data-selectable]');
						$option  = $options.eq(Math.min($options.length - 1, index));
						if ($option.length) {
							this.setActiveOption($option);
						}
						return;
					}
		
					return original.apply(this, arguments);
				};
			})();
		
			var getScrollbarWidth = function() {
				var div;
				var width = getScrollbarWidth.width;
				var doc = document;
		
				if (typeof width === 'undefined') {
					div = doc.createElement('div');
					div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
					div = div.firstChild;
					doc.body.appendChild(div);
					width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
					doc.body.removeChild(div);
				}
				return width;
			};
		
			var equalizeSizes = function() {
				var i, n, height_max, width, width_last, width_parent, $optgroups;
		
				$optgroups = $('[data-group]', self.$dropdown_content);
				n = $optgroups.length;
				if (!n || !self.$dropdown_content.width()) return;
		
				if (options.equalizeHeight) {
					height_max = 0;
					for (i = 0; i < n; i++) {
						height_max = Math.max(height_max, $optgroups.eq(i).height());
					}
					$optgroups.css({height: height_max});
				}
		
				if (options.equalizeWidth) {
					width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
					width = Math.round(width_parent / n);
					$optgroups.css({width: width});
					if (n > 1) {
						width_last = width_parent - width * (n - 1);
						$optgroups.eq(n - 1).css({width: width_last});
					}
				}
			};
		
			if (options.equalizeHeight || options.equalizeWidth) {
				hook.after(this, 'positionDropdown', equalizeSizes);
				hook.after(this, 'refreshOptions', equalizeSizes);
			}
		
		
		});
		
		Selectize.define('remove_button', function(options) {
			options = $.extend({
					label     : '&times;',
					title     : 'Remove',
					className : 'remove',
					append    : true
				}, options);
		
				var singleClose = function(thisRef, options) {
		
					options.className = 'remove-single';
		
					var self = thisRef;
					var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
		
					/**
					 * Appends an element as a child (with raw HTML).
					 *
					 * @param {string} html_container
					 * @param {string} html_element
					 * @return {string}
					 */
					var append = function(html_container, html_element) {
						return html_container + html_element;
					};
		
					thisRef.setup = (function() {
						var original = self.setup;
						return function() {
							// override the item rendering method to add the button to each
							if (options.append) {
								var id = $(self.$input.context).attr('id');
								var selectizer = $('#'+id);
		
								var render_item = self.settings.render.item;
								self.settings.render.item = function(data) {
									return append(render_item.apply(thisRef, arguments), html);
								};
							}
		
							original.apply(thisRef, arguments);
		
							// add event listener
							thisRef.$control.on('click', '.' + options.className, function(e) {
								e.preventDefault();
								if (self.isLocked) return;
		
								self.clear();
							});
		
						};
					})();
				};
		
				var multiClose = function(thisRef, options) {
		
					var self = thisRef;
					var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
		
					/**
					 * Appends an element as a child (with raw HTML).
					 *
					 * @param {string} html_container
					 * @param {string} html_element
					 * @return {string}
					 */
					var append = function(html_container, html_element) {
						var pos = html_container.search(/(<\/[^>]+>\s*)$/);
						return html_container.substring(0, pos) + html_element + html_container.substring(pos);
					};
		
					thisRef.setup = (function() {
						var original = self.setup;
						return function() {
							// override the item rendering method to add the button to each
							if (options.append) {
								var render_item = self.settings.render.item;
								self.settings.render.item = function(data) {
									return append(render_item.apply(thisRef, arguments), html);
								};
							}
		
							original.apply(thisRef, arguments);
		
							// add event listener
							thisRef.$control.on('click', '.' + options.className, function(e) {
								e.preventDefault();
								if (self.isLocked) return;
		
								var $item = $(e.currentTarget).parent();
								self.setActiveItem($item);
								if (self.deleteSelection()) {
									self.setCaret(self.items.length);
								}
							});
		
						};
					})();
				};
		
				if (this.settings.mode === 'single') {
					singleClose(this, options);
					return;
				} else {
					multiClose(this, options);
				}
		});
		
		
		Selectize.define('restore_on_backspace', function(options) {
			var self = this;
		
			options.text = options.text || function(option) {
				return option[this.settings.labelField];
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, option;
					if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
						index = this.caretPos - 1;
						if (index >= 0 && index < this.items.length) {
							option = this.options[this.items[index]];
							if (this.deleteSelection(e)) {
								this.setTextboxValue(options.text.apply(this, [option]));
								this.refreshOptions(true);
							}
							e.preventDefault();
							return;
						}
					}
					return original.apply(this, arguments);
				};
			})();
		});
		

		return Selectize;
	}));

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	(function($){

	$.zUI = $.zUI || {}
	$.zUI.emptyFn = function(){};
	$.zUI.asWidget = [];
	/*
	 * core代码，定义增加一个插件的骨架
	 */
	$.zUI.addWidget = function(sName,oSefDef){
		//设置规范中的常量sFlagName、sEventName、sOptsName
		$.zUI.asWidget.push(sName);
		var w = $.zUI[sName] = $.zUI[sName] || {};
		var sPrefix = "zUI" + sName
		w.sFlagName = sPrefix;
		w.sEventName = sPrefix + "Event";
		w.sOptsName = sPrefix + "Opts";
		w.__creator = $.zUI.emptyFn;
		w.__destroyer = $.zUI.emptyFn;
		$.extend(w,oSefDef);
		w.fn = function(ele,opts){
			var jqEle = $(ele);
			jqEle.data(w.sOptsName,$.extend({},w.defaults,opts));
			//如果该元素已经执行过了该插件，直接返回，仅相当于修改了配置参数
			if(jqEle.data(w.sFlagName)){
				return;
			}
			jqEle.data(w.sFlagName,true);
			w.__creator(ele);
			jqEle.on(jqEle.data(w.sEventName));
		};
		w.unfn = function(ele){
			w.__destroyer(ele);
			var jqEle = $(ele);//移除监听事件
			if(jqEle.data(w.sFlagName)){
				jqEle.off(jqEle.data(w.sEventName));
				jqEle.data(w.sFlagName,false);
			}
		}
		
	}
	/*
	 * draggable
	 * 参数：obj{
	 * bOffsetParentBoundary:是否以定位父亲元素为边界,
	 * oBoundary:指定元素left和top的边界值，形如{iMinLeft:...,iMaxLeft:...,iMinTop:...,iMaxTop:...},与上一个参数互斥
	 * fnComputePosition:扩展函数，返回形如{left:...,top:...}的对象
	 * }
	 * 支持的自定义事件:
	 * "draggable.start":drag起始，就是鼠标down后触发
	 * "draggable.move":drag过程中多次触发
	 * "draggable.stop":drag结束触发，就是鼠标up后触发
	 */
	//注册draggable组件
	$.zUI.addWidget("draggable",{
		defaults:{
			bOffsetParentBoundary:false,//是否以定位父亲元素为边界
			oBoundary:null,//边界
			fnComputePosition:null//计算位置的函数
		},
		__creator:function(ele){
			var jqEle = $(ele);
			jqEle.data($.zUI.draggable.sEventName,{
			mousedown:function(ev){
			var jqThis = $(this);
			var opts = jqThis.data($.zUI.draggable.sOptsName);
			
			jqThis.trigger("draggable.start");
			var iOffsetX = ev.pageX - this.offsetLeft;
			var iOffsetY = ev.pageY - this.offsetTop;
			
			function fnMouseMove (ev) {
				var oPos = {};
				if(opts.fnComputePosition){
					oPos = opts.fnComputePosition(ev,iOffsetX,iOffsetY);
				}else{
					oPos.iLeft = ev.pageX - iOffsetX;
					oPos.iTop = ev.pageY - iOffsetY;
				}
				
				var oBoundary = opts.oBoundary;
				if(opts.bOffsetParentBoundary){//如果以offsetParent作为边界
					var eParent = jqThis.offsetParent()[0];
					oBoundary = {};
					oBoundary.iMinLeft = 0;
					oBoundary.iMinTop = 0;
					oBoundary.iMaxLeft = eParent.clientWidth - jqThis.outerWidth();
					oBoundary.iMaxTop = eParent.clientHeight - jqThis.outerHeight();
				}
			
				if(oBoundary){//如果存在oBoundary，将oBoundary作为边界
					oPos.iLeft = oPos.iLeft < oBoundary.iMinLeft ? oBoundary.iMinLeft : oPos.iLeft;
					oPos.iLeft = oPos.iLeft > oBoundary.iMaxLeft ? oBoundary.iMaxLeft : oPos.iLeft;
					oPos.iTop = oPos.iTop < oBoundary.iMinTop ? oBoundary.iMinTop : oPos.iTop;
					oPos.iTop = oPos.iTop > oBoundary.iMaxTop ? oBoundary.iMaxTop : oPos.iTop;
				}
				
				jqThis.css({left:oPos.iLeft,top:oPos.iTop});
				ev.preventDefault();
				jqThis.trigger("draggable.move");
			}
			
			var oEvent = {
				mousemove:fnMouseMove,
				mouseup:function(){
					$(document).off(oEvent);
					jqThis.trigger("draggable.stop");
				}
			};
			
			$(document).on(oEvent);
		}});
		}
	});
	/*
	 * panel
	 * 参数：obj{
	 * 	iWheelStep:鼠标滑轮滚动时步进长度
	 *	sBoxClassName:滚动框的样式
	 * 	sBarClassName:滚动条的样式
	 * }
	 */
	$.zUI.addWidget("panel",{
		defaults : {
				iWheelStep:16,
				sBoxClassName:"zUIpanelScrollBox",
				sBarClassName:"zUIpanelScrollBar"
		},
		__creator:function(ele){
			var jqThis = $(ele);
			//如果是static定位，加上relative定位
			if(jqThis.css("position") === "static"){
				jqThis.css("position","relative");
			}
			jqThis.css("overflow","hidden");
			
			//必须有一个唯一的直接子元素,给直接子元素加上绝对定位
			var jqChild = jqThis.children(":first");
			if(jqChild.length){
				jqChild.css({top:0,position:"absolute"});
			}else{
				return;
			}
			
			var opts = jqThis.data($.zUI.panel.sOptsName);
			//创建滚动框
			var jqScrollBox = $("<div style='position:absolute;display:none;line-height:0;'></div>");
			jqScrollBox.addClass(opts.sBoxClassName);
			//创建滚动条
			var jqScrollBar= $("<div style='position:absolute;display:none;line-height:0;'></div>");
			jqScrollBar.addClass(opts.sBarClassName);
			jqScrollBox.appendTo(jqThis);
			jqScrollBar.appendTo(jqThis);
			
			opts.iTop = parseInt(jqScrollBox.css("top"));
			opts.iWidth = jqScrollBar.width();
			opts.iRight = parseInt(jqScrollBox.css("right"));
			

			//添加拖拽触发自定义函数
			jqScrollBar.on("draggable.move",function(){
				var opts = jqThis.data($.zUI.panel.sOptsName);
				fnScrollContent(jqScrollBox,jqScrollBar,jqThis,jqChild,opts.iTop,0);
			});
			
		  //事件对象
			var oEvent ={
				mouseenter:function(){
					fnFreshScroll();
					jqScrollBox.css("display","block");
					jqScrollBar.css("display","block");
				},
				mouseleave:function(){
					jqScrollBox.css("display","none");
					jqScrollBar.css("display","none");
				}
			};
			
			var sMouseWheel = "mousewheel";
			if(!("onmousewheel" in document)){
				sMouseWheel = "DOMMouseScroll";
			}
			oEvent[sMouseWheel] = function(ev){
				var opts = jqThis.data($.zUI.panel.sOptsName);
				var iWheelDelta = 1;
				ev.preventDefault();//阻止默认事件
				ev = ev.originalEvent;//获取原生的event
				if(ev.wheelDelta){
						iWheelDelta = ev.wheelDelta/120;
				}else{
						iWheelDelta = -ev.detail/3;
				}
				var iMinTop = jqThis.innerHeight() - jqChild.outerHeight();
				//外面比里面高，不需要响应滚动
				if(iMinTop>0){
					jqChild.css("top",0);
					return;
				}
				var iTop = parseInt(jqChild.css("top"));
				var iTop = iTop + opts.iWheelStep*iWheelDelta;
				iTop = iTop > 0 ? 0 : iTop;
				iTop = iTop < iMinTop ? iMinTop : iTop;
				jqChild.css("top",iTop);
				fnScrollContent(jqThis,jqChild,jqScrollBox,jqScrollBar,0,opts.iTop);
			}
			//记录添加事件
			jqThis.data($.zUI.panel.sEventName,oEvent);
			//跟随滚动函数
			function fnScrollContent(jqWrapper,jqContent,jqFollowWrapper,jqFlollowContent,iOffset1,iOffset2){
				var opts = jqThis.data($.zUI.panel.sOptsName);
				var rate = (parseInt(jqContent.css("top"))-iOffset1)/(jqContent.outerHeight()-jqWrapper.innerHeight())//卷起的比率
				var iTop = (jqFlollowContent.outerHeight()-jqFollowWrapper.innerHeight())*rate + iOffset2;
				jqFlollowContent.css("top",iTop);
			}
		
			//刷新滚动条
			function fnFreshScroll(){

				var opts = jqThis.data($.zUI.panel.sOptsName);
				var iScrollBoxHeight = jqThis.innerHeight()-2*opts.iTop;
				var iRate = jqThis.innerHeight()/jqChild.outerHeight();
				var iScrollBarHeight = iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
				//如果比率大于等于1，不需要滚动条,自然也不需要添加拖拽事件
				if(iRate >= 1){
					jqScrollBox.css("height",0);
					jqScrollBar.css("height",0);
					return;
				}
				jqScrollBox.css("height",iScrollBoxHeight);
				jqScrollBar.css("height",iScrollBarHeight);
				//计算拖拽边界，添加拖拽事件
				var oBoundary = {iMinTop:opts.iTop};
				oBoundary.iMaxTop = iScrollBoxHeight - Math.round(iRate*iScrollBoxHeight)+opts.iTop;
				oBoundary.iMinLeft = jqThis.innerWidth() - opts.iWidth - opts.iRight;
				oBoundary.iMaxLeft = oBoundary.iMinLeft;
				fnScrollContent(jqThis,jqChild,jqScrollBox,jqScrollBar,0,opts.iTop);
				jqScrollBar.draggable({oBoundary:oBoundary});
			}
		},
			__destroyer:function(ele){
				var jqEle = $(ele);
				if(jqEle.data($.zUI.panel.sFlagName)){
					var opts = jqEle.data($.zUI.panel.sOptsName);
					jqEle.children("."+opts.sBoxClassName).remove();
					jqEle.children("."+opts.sBarClassName).remove();
				}
		}
	});

	$.each($.zUI.asWidget,function(i,widget){
		unWidget = "un"+widget;
		var w = {};
		w[widget] = function(args){
				this.each(function(){
				$.zUI[widget].fn(this,args);
			});
			return this;
		};
		w[unWidget] = function(){
				this.each(function(){
				$.zUI[widget].unfn(this);
			});
			return this;
		}
		$.fn.extend(w);
	});
	})(jQuery);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var UI = __webpack_require__(1);
	var config = {
	        modules: {} //记录模块物理路径
	        ,
	        status: {} //记录模块加载状态
	        ,
	        timeout: 10 //符合规范的模块请求最长等待秒数
	    },
	    MOD_NAME = 'form',
	    ELEM = '.am-form',
	    DISABLED = 'am-disabled',
	    __form = null;

	//判断是否支持FormData
	if (typeof(FormData) != "function") {
	    $(function() {
	        var oScript = document.createElement("script");
	        oScript.type = "text/javascript";
	        oScript.src = "/js/jquery.form.min.js";
	        document.body.appendChild(oScript);
	    });
	}

	var Form = function(element, options) {
	    this.options = $.extend({}, Form.DEFAULTS, options);
	    this.$element = $(element);
	    this.init();
	};

	Form.DEFAULTS = {};

	Form.prototype.init = function() {
	    __form = this;
	    this.radio();
	    this.checkbox();
	    this.select();
	    this.slider();
	    this.widget();
	    $('.scroll').panel({ iWheelStep: 30 });
	};
	//遍历
	Form.prototype.each = function(obj, fn) {
	    var key, that = this;
	    if (typeof fn !== 'function') return that;
	    obj = obj || [];
	    if (obj.constructor === Object) {
	        for (key in obj) {
	            if (fn.call(obj[key], key, obj[key])) break;
	        }
	    } else {
	        for (key = 0; key < obj.length; key++) {
	            if (fn.call(obj[key], key, obj[key])) break;
	        }
	    }
	    return that;
	};
	Form.prototype.checkbox = function() {
	    var self = this;
	    var CLASS = {
	            checkbox: ['am-form-checkbox', 'am-form-checked', 'checkbox'],
	            _switch: ['am-form-switch', 'am-form-onswitch', 'switch']
	        },
	        checks = this.$element.find('input[type=checkbox]'),
	        setCheckBoxSkin = function() {
	            var check = $(this),
	                reElem = this.skinElement,
	                RE_CLASS = this.skinClass,
	                filter = check.attr('data-filter'),
	                text = (check.attr('data-text') || '').split('|');
	            reElem.hasClass(RE_CLASS[1]) ? (
	                reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
	            ) : (
	                reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
	            );
	        };

	    checks.each(function(index, check) {
	        var $this = $(this),
	            skin = $this.attr('data-skin'),
	            text = ($this.attr('data-text') || '').split('|'),
	            disabled = this.disabled;
	        if (skin === 'switch') skin = '_' + skin;
	        var RE_CLASS = CLASS[skin] || CLASS.checkbox;

	        if (typeof $this.attr('data-ignore') === 'string') return $this.show();

	        //替代元素
	        var hasRender = $this.next('.' + RE_CLASS[0]);
	        var reElem = $(['<div class="am-unselect ' + RE_CLASS[0] + (
	            check.checked ? (' ' + RE_CLASS[1]) : '') + (disabled ? ' am-checkbox-disbaled ' + DISABLED : '') + '" data-skin="' + (skin || '') + '">', {
	            _switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
	        }[skin] || ((check.title.replace(/\s/g, '') ? ('<span>' + check.title + '</span>') : '') + '<i class="icon">' + (skin ? '&#xe6a5;' : '&#xe61e;') + '</i>'), '</div>'].join(''));

	        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
	        $this.after(reElem);
	        this.skinElement = reElem;
	        this.skinClass = RE_CLASS;
	        if (this.disabled) return;
	        //勾选
	        reElem.on('click', function() {
	            //获取过滤器
	            setCheckBoxSkin.call($this[0]);
	            $this.trigger('click');
	        });
	    }).on('click', function() {
	        setCheckBoxSkin.call(this);
	    }).on('change', function() {
	        setCheckBoxSkin.call(this);
	    });
	};

	Form.prototype.radio = function() {
	    var self = this;
	    var CLASS = 'am-form-radio',
	        ICON = ['&#xe67f;', '&#xe697;'],
	        radios = this.$element.find('input[type=radio]'),
	        setRadioSkin = function() {
	            var radio = $(this),
	                reElem = this.skinElement,
	                ANIM = 'am-anim-scaleSpring',
	                name = radio[0].name,
	                forms = radio.parents(ELEM);
	            var filter = radio.attr('data-filter'); //获取过滤器
	            var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟
	            self.each(sameRadio, function() {
	                var next = $(this).next('.' + CLASS);
	                //this.checked = false;
	                next.removeClass(CLASS + 'ed');
	                next.find('.icon').removeClass(ANIM).html(ICON[1]);
	            });
	            reElem.addClass(CLASS + 'ed');
	            reElem.find('.icon').addClass(ANIM).html(ICON[0]);
	        };

	    radios.each(function(index, radio) {
	        var $this = $(this),
	            hasRender = $this.next('.' + CLASS),
	            disabled = this.disabled;
	        if (typeof $this.attr('data-ignore') === 'string') return $this.show();
	        //替代元素
	        var reElem = $(['<div class="am-unselect ' + CLASS + (radio.checked ? (' ' + CLASS + 'ed') : '') + (disabled ? ' am-radio-disbaled ' + DISABLED : '') + '">', '<i class="am-anim icon">' + ICON[radio.checked ? 0 : 1] + '</i>', '<span>' + (radio.title || '未命名') + '</span>', '</div>'].join(''));
	        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
	        $this.after(reElem);
	        this.skinElement = reElem;
	        if (this.disabled) return;
	        reElem.on('click', function() {
	            $this.trigger('click');
	            setRadioSkin.call($this[0]);
	            //radio[0].checked = true;
	        });
	    }).on('click', function() {
	        setRadioSkin.call(this);
	    }).on('change', function() {
	        setRadioSkin.call(this);
	    });
	};

	Form.prototype.select = function() {
	    var selects = this.$element.find('select');
	    selects.each(function(index, select) {
	        var $this = $(this);
	        if (typeof $this.attr('data-ignore') === 'string') return;
	        var $control = $this.selectize({
	            plugins: ['remove_button'],
	            delimiter: ',',
	            persist: false,
	            create: false,
	            sortField: 'text',
	            onInitialize: function() {
	                this.$control_input.attr('data-v-excluded', true);
	                if (this.$control.hasClass('required'))
	                    this.$input.prop('required', 'required');
	            },
	            onChange: function(value) {
	                this.$input.trigger('change');
	                this.$input.trigger('input');
	            }
	        });
	    });
	};

	Form.prototype.slider = function() {
	    $('.slider').each(function() {
	        var $this = $(this);
	        var configJson = $this.attr('data-config');
	        var config = null;
	        if (configJson)
	            config = JSON.parse(configJson);
	        config = config || {
	            dots: true,
	            infinite: true,
	            speed: 500,
	            slidesToShow: 1,
	            slidesToScroll: 1
	        };
	        $this.slick(config);
	    });
	};

	Form.prototype.widget = function() {
	    $('[data-widget]').each(function() {
	        var $this = $(this),
	            widget = $this.attr('data-widget');
	        switch (widget) {
	            case "collapse":
	                $this.on('click', function() {
	                    if (!$this.targetBox) {
	                        $this.targetBox = {
	                            target: $this.closest('.box').find('.box-body'),
	                            open: 0
	                        };
	                        $this.targetBox.height = $this.targetBox.target.height();
	                    }
	                    if (!$this.targetBox.open)
	                        $this.targetBox.target.animate({
	                            height: '0px'
	                        }, function() {
	                            $this.targetBox.open = 1;
	                            //$this.targetBox.target.hide();
	                        });
	                    else
	                        $this.targetBox.target.show().animate({
	                            height: $this.targetBox.height
	                        }, function() {
	                            $this.targetBox.open = 0;
	                            //$this.targetBox.target.css({height:'auto'});
	                        });
	                });
	                break;
	        }
	    });
	};

	UI.plugin('form', Form, {
	    after: function() {
	        if (UI.support.touch) {

	        }
	    }
	});

	UI.ready(function(context) {
	    $('.am-form', context).form();
	});

	// #region FormUtil

	(function($) {
	    $.fn.asyncSubmit = function(opts) {
	        if (typeof(opts) === 'function')
	            opts = {
	                success: opts
	            };
	        return this.each(function() {
	            var self = this;
	            var $this = $(this);
	            if (typeof $this.attr('data-questions') === 'string') {
	                $this.find('input.other').change(function() {
	                    var isChecked = $(this).val() != "";
	                    var $check = $(this).prev('input');
	                    if (!$check.length)
	                        $check = $(this).prev().prev();
	                    var value = $check.val().split(':')[0];
	                    $check[0].checked = isChecked;
	                    if (isChecked)
	                        value += ":" + $(this).val().replace(/:/gi, "：").replace(/,/gi, "，");
	                    $check.val(value);
	                });
	            }
	            this.goSubmit = function() {
	                if (self.vm)
	                    self.vm.submitting = true;
	                var $button = $(self).find("input[type='submit'],button[type='submit']").prop('disabled', true),
	                    buttonHtml = null;
	                if ($button.is('button')) {
	                    buttonHtml = $button.html();
	                    $button.html('<i class="am-icon-circle-o-notch am-icon-spin"></i>正在提交...');
	                }
	                if (typeof(FormData) === 'function') {
	                    var formData = new FormData(this);
	                    var url = $this.attr('action');
	                    try {
	                        $.ajax({
	                            url: url,
	                            type: "POST",
	                            dataType: 'json',
	                            data: formData,
	                            cache: false,
	                            processData: false,
	                            contentType: false
	                        }).done(function(result) {
	                            if (self.vm)
	                                self.vm.submitting = false;
	                            if (result.succ) {
	                                opts.success(result.data);
	                                setTimeout(function() {
	                                    $button.prop('disabled', false).html(buttonHtml);
	                                }, 1000);
	                            } else {
	                                $button.prop('disabled', false).html(buttonHtml);
	                                alert(result.data);
	                            }
	                        }).fail(function(data, textStatus, errorThrown) {
	                            $button.prop('disabled', false).html(buttonHtml);
	                            if (self.vm)
	                                self.vm.submitting = false;
	                            if (opts.error)
	                                opts.error(textStatus + " : " + data.statusText + " : " + data.responseText + "\r\n" + errorThrown);
	                        });
	                    } catch (e) {
	                        alert("err:" + e.message);
	                    }
	                    return false;
	                } else {
	                    $(this).ajaxSubmit({
	                        dataType: 'json',
	                        success: function(result) {
	                            $button.prop('disabled', false).html(buttonHtml);
	                            if (result.succ)
	                                opts.success(result.data);
	                            else
	                                alert(result.data);
	                        }
	                    });
	                }
	            }
	            var parsleyOptions = {
	                namespace: 'data-v-',
	                trigger: 'change',
	                successClass: 'am-form-success',
	                errorClass: 'am-form-error',
	                errorsWrapper: '<div class="am-error-list"></div>',
	                errorTemplate: '<div class="am-alert am-alert-danger"></div>',
	                classHandler: function(_el) {
	                    return _el.$element.closest('.am-form-group');
	                },
	                errorsContainer: function(field) {
	                    if (field.$element.hasClass('selectized')) {
	                        return field.$element.parent();
	                    }
	                    return field.$element[0];
	                }
	            };
	            if (opts.validate)
	                $.extend(parsleyOptions, opts.validate);
	            console.log("set parsley!");
	            $(this).parsley(parsleyOptions).on('form:validate', function(formInstance) {
	                //检查所有cui方法
	                if (self.controls && self.controls.length) {
	                    for (var i = 0; i < self.controls.length; i++) {
	                        if (!self.controls[i].isValid()) {
	                            formInstance.validationResult = false;
	                            return;
	                        }
	                    }
	                }
	                if (opts.before && !opts.before.call(this)) {
	                    formInstance.validationResult = false;
	                    return;
	                }
	                formInstance.validationResult = true;
	            }).on('form:submit', function() {
	                self.goSubmit();
	                return false;
	            }).on('form:validated', function() {
	                $.each(this.fields, function(key, field) {
	                    if (field.validationResult === true)
	                        field.$element.removeClass('am-field-error').addClass('am-field-valid');
	                    else
	                        field.$element.removeClass('am-field-success').addClass('am-field-error');
	                });
	            }).on('field:validated', function() {
	                if (this.validationResult === true)
	                    this.$element.removeClass('am-field-error').addClass('am-field-valid');
	                else
	                    this.$element.removeClass('am-field-success').addClass('am-field-error');
	            });
	        });
	    };
	    $.fn.fill = function(data) {
	        var fillData = function(data, self, isfirst, targetKey) {
	            for (var key in data) {
	                if (data[key] === null) continue;
	                if (typeof(data[key]) == "object" && !data[key].length) {
	                    fillData(data[key], self, isfirst, targetKey + key + ".");
	                    continue;
	                }
	                var inputs = document.getElementsByName(targetKey + key);
	                var isCheckbox = inputs.length && $(inputs[0]).prop('type') === 'checkbox';
	                var isRadio = inputs.length && $(inputs[0]).prop('type') === 'radio';
	                var items;
	                if (isCheckbox || isRadio) {
	                    if (data[key])
	                        items = data[key].toString().split(',');
	                    else
	                        items = [];
	                }
	                $(inputs).each(function() {
	                    var $this = $(this);
	                    if (typeof($this.attr('data-no-fill')) !== 'undefined') return;
	                    if (isfirst) {
	                        $this.attr('data-old', $this.val());
	                        self.inputs.push(this);
	                    }
	                    if (isCheckbox || isRadio) {
	                        if (items.indexOf($this.val()) >= 0) {
	                            if (isRadio)
	                                $this.trigger('click');
	                            else {
	                                if (this.checked)
	                                    this.fireEvent('click');
	                                else
	                                    $this.trigger('click');
	                            }
	                        }
	                        return;
	                    }
	                    var type = $this.attr('type');
	                    var dataType = $this.attr('data-type');
	                    if (type === 'file') {
	                        if (dataType === 'image' && $this.attr('data-src'))
	                            $('#' + $this.attr('data-src')).prop('src', data[key]);
	                        return;
	                    } else if (dataType === 'editor') {
	                        this.editor.setContent(data[key]);
	                    } else if (this.hasAttribute('data-tags') || dataType === 'tags') { //
	                        $this.tagsinput('add', data[key].join(','));
	                    } else if (this.hasAttribute('data-select-input')) {
	                        $this.val(data[key]);
	                        this.fireEvent('update');
	                    } else if (this.nodeName === 'SELECT' && this.selectize) {
	                        this.selectize.setValue(data[key]);
	                    } else {
	                        $this.val(data[key]);
	                        if ($this.hasClass('select2'))
	                            $this.trigger('change.select2');
	                    }
	                });
	            }
	        };
	        return this.each(function() {
	            var isfirst = this.inputs == undefined;
	            if (isfirst)
	                this.inputs = [];
	            var self = this;
	            fillData(data, self, isfirst, "");
	        });
	    }
	    $.fn.resetForm = function() {
	        return this.each(function() {
	            if (!this.inputs) {
	                this.inputs = [];
	                var self = this;
	                $(this).find('input,textarea,select').each(function() {
	                    $(this).attr('data-old', $(this).val());
	                    self.inputs.push(this);
	                });
	                return;
	            }
	            $(this.inputs).each(function() {
	                var type = $(this).attr('type');
	                if (type === 'file') {
	                    if ($(this).attr('data-type') === 'image' && $(this).attr('data-src'))
	                        $('#' + $(this).attr('data-src')).prop('src', data[key]);
	                    return;
	                } else if ($(this).attr('data-type') === 'editor') {
	                    this.editor.setContent($(this).attr('data-old'));
	                } else if (this.hasAttribute('data-tags') || $(this).attr('data-type') === 'tags') {
	                    $(this).tagsinput('removeAll');
	                    $(this).tagsinput('add', $(this).attr('data-old'));
	                } else {
	                    try {
	                        $(this).val($(this).attr('data-old'));
	                    } catch (e) {}
	                    if ($(this).hasClass('select2'))
	                        $(this).trigger('change.select2');
	                }
	            });
	        })
	    };
	})($);

	// #endregion

	module.exports = Form;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	* Parsley.js
	* Version 2.7.2 - built Tue, May 9th 2017, 11:21 am
	* http://parsleyjs.org
	* Guillaume Potier - <guillaume@wisembly.com>
	* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
	* MIT Licensed
	*/

	// The source code below is generated by babel as
	// Parsley is written in ECMAScript 6
	//
	var _slice = Array.prototype.slice;

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	(function (global, factory) {
	   true ? module.exports = factory(__webpack_require__(2)) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.parsley = factory(global.jQuery);
	})(this, function ($) {
	  'use strict';

	  var globalID = 1;
	  var pastWarnings = {};

	  var Utils = {
	    // Parsley DOM-API
	    // returns object from dom attributes and values
	    attr: function attr(element, namespace, obj) {
	      var i;
	      var attribute;
	      var attributes;
	      var regex = new RegExp('^' + namespace, 'i');

	      if ('undefined' === typeof obj) obj = {};else {
	        // Clear all own properties. This won't affect prototype's values
	        for (i in obj) {
	          if (obj.hasOwnProperty(i)) delete obj[i];
	        }
	      }

	      if (!element) return obj;

	      attributes = element.attributes;
	      for (i = attributes.length; i--;) {
	        attribute = attributes[i];

	        if (attribute && attribute.specified && regex.test(attribute.name)) {
	          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
	        }
	      }

	      return obj;
	    },

	    checkAttr: function checkAttr(element, namespace, _checkAttr) {
	      return element.hasAttribute(namespace + _checkAttr);
	    },

	    setAttr: function setAttr(element, namespace, attr, value) {
	      element.setAttribute(this.dasherize(namespace + attr), String(value));
	    },

	    generateID: function generateID() {
	      return '' + globalID++;
	    },

	    /** Third party functions **/
	    // Zepto deserialize function
	    deserializeValue: function deserializeValue(value) {
	      var num;

	      try {
	        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	      } catch (e) {
	        return value;
	      }
	    },

	    // Zepto camelize function
	    camelize: function camelize(str) {
	      return str.replace(/-+(.)?/g, function (match, chr) {
	        return chr ? chr.toUpperCase() : '';
	      });
	    },

	    // Zepto dasherize function
	    dasherize: function dasherize(str) {
	      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	    },

	    warn: function warn() {
	      var _window$console;

	      if (window.console && 'function' === typeof window.console.warn) (_window$console = window.console).warn.apply(_window$console, arguments);
	    },

	    warnOnce: function warnOnce(msg) {
	      if (!pastWarnings[msg]) {
	        pastWarnings[msg] = true;
	        this.warn.apply(this, arguments);
	      }
	    },

	    _resetWarnings: function _resetWarnings() {
	      pastWarnings = {};
	    },

	    trimString: function trimString(string) {
	      return string.replace(/^\s+|\s+$/g, '');
	    },

	    parse: {
	      date: function date(string) {
	        var parsed = string.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
	        if (!parsed) return null;

	        var _parsed$map = parsed.map(function (x) {
	          return parseInt(x, 10);
	        });

	        var _parsed$map2 = _slicedToArray(_parsed$map, 4);

	        var _ = _parsed$map2[0];
	        var year = _parsed$map2[1];
	        var month = _parsed$map2[2];
	        var day = _parsed$map2[3];

	        var date = new Date(year, month - 1, day);
	        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
	        return date;
	      },
	      string: function string(_string) {
	        return _string;
	      },
	      integer: function integer(string) {
	        if (isNaN(string)) return null;
	        return parseInt(string, 10);
	      },
	      number: function number(string) {
	        if (isNaN(string)) throw null;
	        return parseFloat(string);
	      },
	      'boolean': function _boolean(string) {
	        return !/^\s*false\s*$/i.test(string);
	      },
	      object: function object(string) {
	        return Utils.deserializeValue(string);
	      },
	      regexp: function regexp(_regexp) {
	        var flags = '';

	        // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
	        if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
	          // Replace the regexp literal string with the first match group: ([gimy]*)
	          // If no flag is present, this will be a blank string
	          flags = _regexp.replace(/.*\/([gimy]*)$/, '$1');
	          // Again, replace the regexp literal string with the first match group:
	          // everything excluding the opening and closing slashes and the flags
	          _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
	        } else {
	          // Anchor regexp:
	          _regexp = '^' + _regexp + '$';
	        }
	        return new RegExp(_regexp, flags);
	      }
	    },

	    parseRequirement: function parseRequirement(requirementType, string) {
	      var converter = this.parse[requirementType || 'string'];
	      if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
	      var converted = converter(string);
	      if (converted === null) throw 'Requirement is not a ' + requirementType + ': "' + string + '"';
	      return converted;
	    },

	    namespaceEvents: function namespaceEvents(events, namespace) {
	      events = this.trimString(events || '').split(/\s+/);
	      if (!events[0]) return '';
	      return $.map(events, function (evt) {
	        return evt + '.' + namespace;
	      }).join(' ');
	    },

	    difference: function difference(array, remove) {
	      // This is O(N^2), should be optimized
	      var result = [];
	      $.each(array, function (_, elem) {
	        if (remove.indexOf(elem) == -1) result.push(elem);
	      });
	      return result;
	    },

	    // Alter-ego to native Promise.all, but for jQuery
	    all: function all(promises) {
	      // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
	      return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
	    },

	    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
	    objectCreate: Object.create || (function () {
	      var Object = function Object() {};
	      return function (prototype) {
	        if (arguments.length > 1) {
	          throw Error('Second argument not supported');
	        }
	        if (typeof prototype != 'object') {
	          throw TypeError('Argument must be an object');
	        }
	        Object.prototype = prototype;
	        var result = new Object();
	        Object.prototype = null;
	        return result;
	      };
	    })(),

	    _SubmitSelector: 'input[type="submit"], button:submit'
	  };

	  // All these options could be overriden and specified directly in DOM using
	  // `data-parsley-` default DOM-API
	  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
	  // eg: `data-parsley-stop-on-first-failing-constraint="false"`

	  var Defaults = {
	    // ### General

	    // Default data-namespace for DOM API
	    namespace: 'data-parsley-',

	    // Supported inputs by default
	    inputs: 'input, textarea, select',

	    // Excluded inputs by default
	    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

	    // Stop validating field on highest priority failing constraint
	    priorityEnabled: true,

	    // ### Field only

	    // identifier used to group together inputs (e.g. radio buttons...)
	    multiple: null,

	    // identifier (or array of identifiers) used to validate only a select group of inputs
	    group: null,

	    // ### UI
	    // Enable\Disable error messages
	    uiEnabled: true,

	    // Key events threshold before validation
	    validationThreshold: 3,

	    // Focused field on form validation error. 'first'|'last'|'none'
	    focus: 'first',

	    // event(s) that will trigger validation before first failure. eg: `input`...
	    trigger: false,

	    // event(s) that will trigger validation after first failure.
	    triggerAfterFailure: 'input',

	    // Class that would be added on every failing validation Parsley field
	    errorClass: 'parsley-error',

	    // Same for success validation
	    successClass: 'parsley-success',

	    // Return the `$element` that will receive these above success or error classes
	    // Could also be (and given directly from DOM) a valid selector like `'#div'`
	    classHandler: function classHandler(Field) {},

	    // Return the `$element` where errors will be appended
	    // Could also be (and given directly from DOM) a valid selector like `'#div'`
	    errorsContainer: function errorsContainer(Field) {},

	    // ul elem that would receive errors' list
	    errorsWrapper: '<ul class="parsley-errors-list"></ul>',

	    // li elem that would receive error message
	    errorTemplate: '<li></li>'
	  };

	  var Base = function Base() {
	    this.__id__ = Utils.generateID();
	  };

	  Base.prototype = {
	    asyncSupport: true, // Deprecated

	    _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
	      var _this = this;

	      var pipe = function pipe() {
	        var r = $.Deferred();
	        if (true !== _this.validationResult) r.reject();
	        return r.resolve().promise();
	      };
	      return [pipe, pipe];
	    },

	    actualizeOptions: function actualizeOptions() {
	      Utils.attr(this.element, this.options.namespace, this.domOptions);
	      if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
	      return this;
	    },

	    _resetOptions: function _resetOptions(initOptions) {
	      this.domOptions = Utils.objectCreate(this.parent.options);
	      this.options = Utils.objectCreate(this.domOptions);
	      // Shallow copy of ownProperties of initOptions:
	      for (var i in initOptions) {
	        if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
	      }
	      this.actualizeOptions();
	    },

	    _listeners: null,

	    // Register a callback for the given event name
	    // Callback is called with context as the first argument and the `this`
	    // The context is the current parsley instance, or window.Parsley if global
	    // A return value of `false` will interrupt the calls
	    on: function on(name, fn) {
	      this._listeners = this._listeners || {};
	      var queue = this._listeners[name] = this._listeners[name] || [];
	      queue.push(fn);

	      return this;
	    },

	    // Deprecated. Use `on` instead
	    subscribe: function subscribe(name, fn) {
	      $.listenTo(this, name.toLowerCase(), fn);
	    },

	    // Unregister a callback (or all if none is given) for the given event name
	    off: function off(name, fn) {
	      var queue = this._listeners && this._listeners[name];
	      if (queue) {
	        if (!fn) {
	          delete this._listeners[name];
	        } else {
	          for (var i = queue.length; i--;) if (queue[i] === fn) queue.splice(i, 1);
	        }
	      }
	      return this;
	    },

	    // Deprecated. Use `off`
	    unsubscribe: function unsubscribe(name, fn) {
	      $.unsubscribeTo(this, name.toLowerCase());
	    },

	    // Trigger an event of the given name
	    // A return value of `false` interrupts the callback chain
	    // Returns false if execution was interrupted
	    trigger: function trigger(name, target, extraArg) {
	      target = target || this;
	      var queue = this._listeners && this._listeners[name];
	      var result;
	      var parentResult;
	      if (queue) {
	        for (var i = queue.length; i--;) {
	          result = queue[i].call(target, target, extraArg);
	          if (result === false) return result;
	        }
	      }
	      if (this.parent) {
	        return this.parent.trigger(name, target, extraArg);
	      }
	      return true;
	    },

	    asyncIsValid: function asyncIsValid(group, force) {
	      Utils.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
	      return this.whenValid({ group: group, force: force });
	    },

	    _findRelated: function _findRelated() {
	      return this.options.multiple ? $(this.parent.element.querySelectorAll('[' + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element;
	    }
	  };

	  var convertArrayRequirement = function convertArrayRequirement(string, length) {
	    var m = string.match(/^\s*\[(.*)\]\s*$/);
	    if (!m) throw 'Requirement is not an array: "' + string + '"';
	    var values = m[1].split(',').map(Utils.trimString);
	    if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
	    return values;
	  };

	  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
	    var main = null;
	    var extra = {};
	    for (var key in requirementSpec) {
	      if (key) {
	        var value = extraOptionReader(key);
	        if ('string' === typeof value) value = Utils.parseRequirement(requirementSpec[key], value);
	        extra[key] = value;
	      } else {
	        main = Utils.parseRequirement(requirementSpec[key], string);
	      }
	    }
	    return [main, extra];
	  };

	  // A Validator needs to implement the methods `validate` and `parseRequirements`

	  var Validator = function Validator(spec) {
	    $.extend(true, this, spec);
	  };

	  Validator.prototype = {
	    // Returns `true` iff the given `value` is valid according the given requirements.
	    validate: function validate(value, requirementFirstArg) {
	      if (this.fn) {
	        // Legacy style validator

	        if (arguments.length > 3) // If more args then value, requirement, instance...
	          requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest
	        return this.fn(value, requirementFirstArg);
	      }

	      if (Array.isArray(value)) {
	        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
	        return this.validateMultiple.apply(this, arguments);
	      } else {
	        var instance = arguments[arguments.length - 1];
	        if (this.validateDate && instance._isDateInput()) {
	          arguments[0] = Utils.parse.date(arguments[0]);
	          if (arguments[0] === null) return false;
	          return this.validateDate.apply(this, arguments);
	        }
	        if (this.validateNumber) {
	          if (isNaN(value)) return false;
	          arguments[0] = parseFloat(arguments[0]);
	          return this.validateNumber.apply(this, arguments);
	        }
	        if (this.validateString) {
	          return this.validateString.apply(this, arguments);
	        }
	        throw 'Validator `' + this.name + '` only handles multiple values';
	      }
	    },

	    // Parses `requirements` into an array of arguments,
	    // according to `this.requirementType`
	    parseRequirements: function parseRequirements(requirements, extraOptionReader) {
	      if ('string' !== typeof requirements) {
	        // Assume requirement already parsed
	        // but make sure we return an array
	        return Array.isArray(requirements) ? requirements : [requirements];
	      }
	      var type = this.requirementType;
	      if (Array.isArray(type)) {
	        var values = convertArrayRequirement(requirements, type.length);
	        for (var i = 0; i < values.length; i++) values[i] = Utils.parseRequirement(type[i], values[i]);
	        return values;
	      } else if ($.isPlainObject(type)) {
	        return convertExtraOptionRequirement(type, requirements, extraOptionReader);
	      } else {
	        return [Utils.parseRequirement(type, requirements)];
	      }
	    },
	    // Defaults:
	    requirementType: 'string',

	    priority: 2

	  };

	  var ValidatorRegistry = function ValidatorRegistry(validators, catalog) {
	    this.__class__ = 'ValidatorRegistry';

	    // Default Parsley locale is en
	    this.locale = 'en';

	    this.init(validators || {}, catalog || {});
	  };

	  var typeTesters = {
	    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

	    // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
	    number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,

	    integer: /^-?\d+$/,

	    digits: /^\d+$/,

	    alphanum: /^\w+$/i,

	    date: {
	      test: function test(value) {
	        return Utils.parse.date(value) !== null;
	      }
	    },

	    url: new RegExp("^" +
	    // protocol identifier
	    "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
	    // user:pass authentication
	    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
	    // IP address exclusion
	    // private & local networks
	    // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
	    // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
	    // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
	    // IP address dotted notation octets
	    // excludes loopback network 0.0.0.0
	    // excludes reserved space >= 224.0.0.0
	    // excludes network & broacast addresses
	    // (first & last IP address of each class)
	    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
	    // host name
	    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
	    // domain name
	    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
	    // TLD identifier
	    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' + ")" +
	    // port number
	    "(?::\\d{2,5})?" +
	    // resource path
	    "(?:/\\S*)?" + "$", 'i')
	  };
	  typeTesters.range = typeTesters.number;

	  // See http://stackoverflow.com/a/10454560/8279
	  var decimalPlaces = function decimalPlaces(num) {
	    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	    if (!match) {
	      return 0;
	    }
	    return Math.max(0,
	    // Number of digits right of decimal point.
	    (match[1] ? match[1].length : 0) - (
	    // Adjust for scientific notation.
	    match[2] ? +match[2] : 0));
	  };

	  // parseArguments('number', ['1', '2']) => [1, 2]
	  var ValidatorRegistry__parseArguments = function ValidatorRegistry__parseArguments(type, args) {
	    return args.map(Utils.parse[type]);
	  };
	  // operatorToValidator returns a validating function for an operator function, applied to the given type
	  var ValidatorRegistry__operatorToValidator = function ValidatorRegistry__operatorToValidator(type, operator) {
	    return function (value) {
	      for (var _len = arguments.length, requirementsAndInput = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        requirementsAndInput[_key - 1] = arguments[_key];
	      }

	      requirementsAndInput.pop(); // Get rid of `input` argument
	      return operator.apply(undefined, [value].concat(_toConsumableArray(ValidatorRegistry__parseArguments(type, requirementsAndInput))));
	    };
	  };

	  var ValidatorRegistry__comparisonOperator = function ValidatorRegistry__comparisonOperator(operator) {
	    return {
	      validateDate: ValidatorRegistry__operatorToValidator('date', operator),
	      validateNumber: ValidatorRegistry__operatorToValidator('number', operator),
	      requirementType: operator.length <= 2 ? 'string' : ['string', 'string'], // Support operators with a 1 or 2 requirement(s)
	      priority: 30
	    };
	  };

	  ValidatorRegistry.prototype = {
	    init: function init(validators, catalog) {
	      this.catalog = catalog;
	      // Copy prototype's validators:
	      this.validators = _extends({}, this.validators);

	      for (var name in validators) this.addValidator(name, validators[name].fn, validators[name].priority);

	      window.Parsley.trigger('parsley:validator:init');
	    },

	    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
	    setLocale: function setLocale(locale) {
	      if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');

	      this.locale = locale;

	      return this;
	    },

	    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
	    addCatalog: function addCatalog(locale, messages, set) {
	      if ('object' === typeof messages) this.catalog[locale] = messages;

	      if (true === set) return this.setLocale(locale);

	      return this;
	    },

	    // Add a specific message for a given constraint in a given locale
	    addMessage: function addMessage(locale, name, message) {
	      if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};

	      this.catalog[locale][name] = message;

	      return this;
	    },

	    // Add messages for a given locale
	    addMessages: function addMessages(locale, nameMessageObject) {
	      for (var name in nameMessageObject) this.addMessage(locale, name, nameMessageObject[name]);

	      return this;
	    },

	    // Add a new validator
	    //
	    //    addValidator('custom', {
	    //        requirementType: ['integer', 'integer'],
	    //        validateString: function(value, from, to) {},
	    //        priority: 22,
	    //        messages: {
	    //          en: "Hey, that's no good",
	    //          fr: "Aye aye, pas bon du tout",
	    //        }
	    //    })
	    //
	    // Old API was addValidator(name, function, priority)
	    //
	    addValidator: function addValidator(name, arg1, arg2) {
	      if (this.validators[name]) Utils.warn('Validator "' + name + '" is already defined.');else if (Defaults.hasOwnProperty(name)) {
	        Utils.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
	        return;
	      }
	      return this._setValidator.apply(this, arguments);
	    },

	    updateValidator: function updateValidator(name, arg1, arg2) {
	      if (!this.validators[name]) {
	        Utils.warn('Validator "' + name + '" is not already defined.');
	        return this.addValidator.apply(this, arguments);
	      }
	      return this._setValidator.apply(this, arguments);
	    },

	    removeValidator: function removeValidator(name) {
	      if (!this.validators[name]) Utils.warn('Validator "' + name + '" is not defined.');

	      delete this.validators[name];

	      return this;
	    },

	    _setValidator: function _setValidator(name, validator, priority) {
	      if ('object' !== typeof validator) {
	        // Old style validator, with `fn` and `priority`
	        validator = {
	          fn: validator,
	          priority: priority
	        };
	      }
	      if (!validator.validate) {
	        validator = new Validator(validator);
	      }
	      this.validators[name] = validator;

	      for (var locale in validator.messages || {}) this.addMessage(locale, name, validator.messages[locale]);

	      return this;
	    },

	    getErrorMessage: function getErrorMessage(constraint) {
	      var message;

	      // Type constraints are a bit different, we have to match their requirements too to find right error message
	      if ('type' === constraint.name) {
	        var typeMessages = this.catalog[this.locale][constraint.name] || {};
	        message = typeMessages[constraint.requirements];
	      } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

	      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
	    },

	    // Kind of light `sprintf()` implementation
	    formatMessage: function formatMessage(string, parameters) {
	      if ('object' === typeof parameters) {
	        for (var i in parameters) string = this.formatMessage(string, parameters[i]);

	        return string;
	      }

	      return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
	    },

	    // Here is the Parsley default validators list.
	    // A validator is an object with the following key values:
	    //  - priority: an integer
	    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
	    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
	    // Alternatively, a validator can be a function that returns such an object
	    //
	    validators: {
	      notblank: {
	        validateString: function validateString(value) {
	          return (/\S/.test(value)
	          );
	        },
	        priority: 2
	      },
	      required: {
	        validateMultiple: function validateMultiple(values) {
	          return values.length > 0;
	        },
	        validateString: function validateString(value) {
	          return (/\S/.test(value)
	          );
	        },
	        priority: 512
	      },
	      type: {
	        validateString: function validateString(value, type) {
	          var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	          var _ref$step = _ref.step;
	          var step = _ref$step === undefined ? 'any' : _ref$step;
	          var _ref$base = _ref.base;
	          var base = _ref$base === undefined ? 0 : _ref$base;

	          var tester = typeTesters[type];
	          if (!tester) {
	            throw new Error('validator type `' + type + '` is not supported');
	          }
	          if (!tester.test(value)) return false;
	          if ('number' === type) {
	            if (!/^any$/i.test(step || '')) {
	              var nb = Number(value);
	              var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
	              if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
	                return false;
	              // Be careful of rounding errors by using integers.
	              var toInt = function toInt(f) {
	                return Math.round(f * Math.pow(10, decimals));
	              };
	              if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
	            }
	          }
	          return true;
	        },
	        requirementType: {
	          '': 'string',
	          step: 'string',
	          base: 'number'
	        },
	        priority: 256
	      },
	      pattern: {
	        validateString: function validateString(value, regexp) {
	          return regexp.test(value);
	        },
	        requirementType: 'regexp',
	        priority: 64
	      },
	      minlength: {
	        validateString: function validateString(value, requirement) {
	          return value.length >= requirement;
	        },
	        requirementType: 'integer',
	        priority: 30
	      },
	      maxlength: {
	        validateString: function validateString(value, requirement) {
	          return value.length <= requirement;
	        },
	        requirementType: 'integer',
	        priority: 30
	      },
	      length: {
	        validateString: function validateString(value, min, max) {
	          return value.length >= min && value.length <= max;
	        },
	        requirementType: ['integer', 'integer'],
	        priority: 30
	      },
	      mincheck: {
	        validateMultiple: function validateMultiple(values, requirement) {
	          return values.length >= requirement;
	        },
	        requirementType: 'integer',
	        priority: 30
	      },
	      maxcheck: {
	        validateMultiple: function validateMultiple(values, requirement) {
	          return values.length <= requirement;
	        },
	        requirementType: 'integer',
	        priority: 30
	      },
	      check: {
	        validateMultiple: function validateMultiple(values, min, max) {
	          return values.length >= min && values.length <= max;
	        },
	        requirementType: ['integer', 'integer'],
	        priority: 30
	      },
	      min: ValidatorRegistry__comparisonOperator(function (value, requirement) {
	        return value >= requirement;
	      }),
	      max: ValidatorRegistry__comparisonOperator(function (value, requirement) {
	        return value <= requirement;
	      }),
	      range: ValidatorRegistry__comparisonOperator(function (value, min, max) {
	        return value >= min && value <= max;
	      }),
	      equalto: {
	        validateString: function validateString(value, refOrValue) {
	          var $reference = $(refOrValue);
	          if ($reference.length) return value === $reference.val();else return value === refOrValue;
	        },
	        priority: 256
	      }
	    }
	  };

	  var UI = {};

	  var diffResults = function diffResults(newResult, oldResult, deep) {
	    var added = [];
	    var kept = [];

	    for (var i = 0; i < newResult.length; i++) {
	      var found = false;

	      for (var j = 0; j < oldResult.length; j++) if (newResult[i].assert.name === oldResult[j].assert.name) {
	        found = true;
	        break;
	      }

	      if (found) kept.push(newResult[i]);else added.push(newResult[i]);
	    }

	    return {
	      kept: kept,
	      added: added,
	      removed: !deep ? diffResults(oldResult, newResult, true).added : []
	    };
	  };

	  UI.Form = {

	    _actualizeTriggers: function _actualizeTriggers() {
	      var _this2 = this;

	      this.$element.on('submit.Parsley', function (evt) {
	        _this2.onSubmitValidate(evt);
	      });
	      this.$element.on('click.Parsley', Utils._SubmitSelector, function (evt) {
	        _this2.onSubmitButton(evt);
	      });

	      // UI could be disabled
	      if (false === this.options.uiEnabled) return;

	      this.element.setAttribute('novalidate', '');
	    },

	    focus: function focus() {
	      this._focusedField = null;

	      if (true === this.validationResult || 'none' === this.options.focus) return null;

	      for (var i = 0; i < this.fields.length; i++) {
	        var field = this.fields[i];
	        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
	          this._focusedField = field.$element;
	          if ('first' === this.options.focus) break;
	        }
	      }

	      if (null === this._focusedField) return null;

	      return this._focusedField.focus();
	    },

	    _destroyUI: function _destroyUI() {
	      // Reset all event listeners
	      this.$element.off('.Parsley');
	    }

	  };

	  UI.Field = {

	    _reflowUI: function _reflowUI() {
	      this._buildUI();

	      // If this field doesn't have an active UI don't bother doing something
	      if (!this._ui) return;

	      // Diff between two validation results
	      var diff = diffResults(this.validationResult, this._ui.lastValidationResult);

	      // Then store current validation result for next reflow
	      this._ui.lastValidationResult = this.validationResult;

	      // Handle valid / invalid / none field class
	      this._manageStatusClass();

	      // Add, remove, updated errors messages
	      this._manageErrorsMessages(diff);

	      // Triggers impl
	      this._actualizeTriggers();

	      // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
	      if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
	        this._failedOnce = true;
	        this._actualizeTriggers();
	      }
	    },

	    // Returns an array of field's error message(s)
	    getErrorsMessages: function getErrorsMessages() {
	      // No error message, field is valid
	      if (true === this.validationResult) return [];

	      var messages = [];

	      for (var i = 0; i < this.validationResult.length; i++) messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));

	      return messages;
	    },

	    // It's a goal of Parsley that this method is no longer required [#1073]
	    addError: function addError(name) {
	      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var message = _ref2.message;
	      var assert = _ref2.assert;
	      var _ref2$updateClass = _ref2.updateClass;
	      var updateClass = _ref2$updateClass === undefined ? true : _ref2$updateClass;

	      this._buildUI();
	      this._addError(name, { message: message, assert: assert });

	      if (updateClass) this._errorClass();
	    },

	    // It's a goal of Parsley that this method is no longer required [#1073]
	    updateError: function updateError(name) {
	      var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var message = _ref3.message;
	      var assert = _ref3.assert;
	      var _ref3$updateClass = _ref3.updateClass;
	      var updateClass = _ref3$updateClass === undefined ? true : _ref3$updateClass;

	      this._buildUI();
	      this._updateError(name, { message: message, assert: assert });

	      if (updateClass) this._errorClass();
	    },

	    // It's a goal of Parsley that this method is no longer required [#1073]
	    removeError: function removeError(name) {
	      var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var _ref4$updateClass = _ref4.updateClass;
	      var updateClass = _ref4$updateClass === undefined ? true : _ref4$updateClass;

	      this._buildUI();
	      this._removeError(name);

	      // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
	      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
	      if (updateClass) this._manageStatusClass();
	    },

	    _manageStatusClass: function _manageStatusClass() {
	      if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();else if (this.validationResult.length > 0) this._errorClass();else this._resetClass();
	    },

	    _manageErrorsMessages: function _manageErrorsMessages(diff) {

	      if ('undefined' !== typeof this.options.errorsMessagesDisabled) return;

	      // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
	      if ('undefined' !== typeof this.options.errorMessage) {
	        if (diff.added.length || diff.kept.length) {
	          this._insertErrorWrapper();

	          if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));

	          return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
	        }

	        return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
	      }

	      // Show, hide, update failing constraints messages
	      for (var i = 0; i < diff.removed.length; i++) this._removeError(diff.removed[i].assert.name);

	      for (i = 0; i < diff.added.length; i++) this._addError(diff.added[i].assert.name, { message: diff.added[i].errorMessage, assert: diff.added[i].assert });

	      for (i = 0; i < diff.kept.length; i++) this._updateError(diff.kept[i].assert.name, { message: diff.kept[i].errorMessage, assert: diff.kept[i].assert });
	    },

	    _addError: function _addError(name, _ref5) {
	      var message = _ref5.message;
	      var assert = _ref5.assert;

	      this._insertErrorWrapper();
	      this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
	    },

	    _updateError: function _updateError(name, _ref6) {
	      var message = _ref6.message;
	      var assert = _ref6.assert;

	      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
	    },

	    _removeError: function _removeError(name) {
	      this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
	    },

	    _getErrorMessage: function _getErrorMessage(constraint) {
	      var customConstraintErrorMessage = constraint.name + 'Message';

	      if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);

	      return window.Parsley.getErrorMessage(constraint);
	    },

	    _buildUI: function _buildUI() {
	      // UI could be already built or disabled
	      if (this._ui || false === this.options.uiEnabled) return;

	      var _ui = {};

	      // Give field its Parsley id in DOM
	      this.element.setAttribute(this.options.namespace + 'id', this.__id__);

	      /** Generate important UI elements and store them in this **/
	      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
	      _ui.$errorClassHandler = this._manageClassHandler();

	      // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
	      _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
	      _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId);

	      // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
	      _ui.lastValidationResult = [];
	      _ui.validationInformationVisible = false;

	      // Store it in this for later
	      this._ui = _ui;
	    },

	    // Determine which element will have `parsley-error` and `parsley-success` classes
	    _manageClassHandler: function _manageClassHandler() {
	      // An element selector could be passed through DOM with `data-parsley-class-handler=#foo`
	      if ('string' === typeof this.options.classHandler) {
	        if ($(this.options.classHandler).length === 0) ParsleyUtils.warn('No elements found that match the selector `' + this.options.classHandler + '` set in options.classHandler or data-parsley-class-handler');

	        //return element or empty set
	        return $(this.options.classHandler);
	      }

	      // Class handled could also be determined by function given in Parsley options
	      if ('function' === typeof this.options.classHandler) var $handler = this.options.classHandler.call(this, this);

	      // If this function returned a valid existing DOM element, go for it
	      if ('undefined' !== typeof $handler && $handler.length) return $handler;

	      return this._inputHolder();
	    },

	    _inputHolder: function _inputHolder() {
	      // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
	      if (!this.options.multiple || this.element.nodeName === 'SELECT') return this.$element;

	      // But if multiple element (radio, checkbox), that would be their parent
	      return this.$element.parent();
	    },

	    _insertErrorWrapper: function _insertErrorWrapper() {
	      var $errorsContainer;

	      // Nothing to do if already inserted
	      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();

	      if ('string' === typeof this.options.errorsContainer) {
	        if ($(this.options.errorsContainer).length) return $(this.options.errorsContainer).append(this._ui.$errorsWrapper);else Utils.warn('The errors container `' + this.options.errorsContainer + '` does not exist in DOM');
	      } else if ('function' === typeof this.options.errorsContainer) $errorsContainer = this.options.errorsContainer.call(this, this);

	      if ('undefined' !== typeof $errorsContainer && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);

	      return this._inputHolder().after(this._ui.$errorsWrapper);
	    },

	    _actualizeTriggers: function _actualizeTriggers() {
	      var _this3 = this;

	      var $toBind = this._findRelated();
	      var trigger;

	      // Remove Parsley events already bound on this field
	      $toBind.off('.Parsley');
	      if (this._failedOnce) $toBind.on(Utils.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function () {
	        _this3._validateIfNeeded();
	      });else if (trigger = Utils.namespaceEvents(this.options.trigger, 'Parsley')) {
	        $toBind.on(trigger, function (event) {
	          _this3._validateIfNeeded(event);
	        });
	      }
	    },

	    _validateIfNeeded: function _validateIfNeeded(event) {
	      var _this4 = this;

	      // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
	      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
	      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
	      if (event && /key|input/.test(event.type)) if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;

	      if (this.options.debounce) {
	        window.clearTimeout(this._debounced);
	        this._debounced = window.setTimeout(function () {
	          return _this4.validate();
	        }, this.options.debounce);
	      } else this.validate();
	    },

	    _resetUI: function _resetUI() {
	      // Reset all event listeners
	      this._failedOnce = false;
	      this._actualizeTriggers();

	      // Nothing to do if UI never initialized for this field
	      if ('undefined' === typeof this._ui) return;

	      // Reset all errors' li
	      this._ui.$errorsWrapper.removeClass('filled').children().remove();

	      // Reset validation class
	      this._resetClass();

	      // Reset validation flags and last validation result
	      this._ui.lastValidationResult = [];
	      this._ui.validationInformationVisible = false;
	    },

	    _destroyUI: function _destroyUI() {
	      this._resetUI();

	      if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();

	      delete this._ui;
	    },

	    _successClass: function _successClass() {
	      this._ui.validationInformationVisible = true;
	      this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
	    },
	    _errorClass: function _errorClass() {
	      this._ui.validationInformationVisible = true;
	      this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
	    },
	    _resetClass: function _resetClass() {
	      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
	    }
	  };

	  var Form = function Form(element, domOptions, options) {
	    this.__class__ = 'Form';

	    this.element = element;
	    this.$element = $(element);
	    this.domOptions = domOptions;
	    this.options = options;
	    this.parent = window.Parsley;

	    this.fields = [];
	    this.validationResult = null;
	  };

	  var Form__statusMapping = { pending: null, resolved: true, rejected: false };

	  Form.prototype = {
	    onSubmitValidate: function onSubmitValidate(event) {
	      var _this5 = this;

	      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
	      if (true === event.parsley) return;

	      // If we didn't come here through a submit button, use the first one in the form
	      var submitSource = this._submitSource || this.$element.find(Utils._SubmitSelector)[0];
	      this._submitSource = null;
	      this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
	      if (submitSource && null !== submitSource.getAttribute('formnovalidate')) return;

	      window.Parsley._remoteCache = {};

	      var promise = this.whenValidate({ event: event });

	      if ('resolved' === promise.state() && false !== this._trigger('submit')) {
	        // All good, let event go through. We make this distinction because browsers
	        // differ in their handling of `submit` being called from inside a submit event [#1047]
	      } else {
	          // Rejected or pending: cancel this submit
	          event.stopImmediatePropagation();
	          event.preventDefault();
	          if ('pending' === promise.state()) promise.done(function () {
	            _this5._submit(submitSource);
	          });
	        }
	    },

	    onSubmitButton: function onSubmitButton(event) {
	      this._submitSource = event.currentTarget;
	    },
	    // internal
	    // _submit submits the form, this time without going through the validations.
	    // Care must be taken to "fake" the actual submit button being clicked.
	    _submit: function _submit(submitSource) {
	      if (false === this._trigger('submit')) return;
	      // Add submit button's data
	      if (submitSource) {
	        var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
	        if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
	        $synthetic.attr({
	          name: submitSource.getAttribute('name'),
	          value: submitSource.getAttribute('value')
	        });
	      }

	      this.$element.trigger(_extends($.Event('submit'), { parsley: true }));
	    },

	    // Performs validation on fields while triggering events.
	    // @returns `true` if all validations succeeds, `false`
	    // if a failure is immediately detected, or `null`
	    // if dependant on a promise.
	    // Consider using `whenValidate` instead.
	    validate: function validate(options) {
	      if (arguments.length >= 1 && !$.isPlainObject(options)) {
	        Utils.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');

	        var _arguments = _slice.call(arguments);

	        var group = _arguments[0];
	        var force = _arguments[1];
	        var event = _arguments[2];

	        options = { group: group, force: force, event: event };
	      }
	      return Form__statusMapping[this.whenValidate(options).state()];
	    },

	    whenValidate: function whenValidate() {
	      var _Utils$all$done$fail$always,
	          _this6 = this;

	      var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var group = _ref7.group;
	      var force = _ref7.force;
	      var event = _ref7.event;

	      this.submitEvent = event;
	      if (event) {
	        this.submitEvent = _extends({}, event, { preventDefault: function preventDefault() {
	            Utils.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
	            _this6.validationResult = false;
	          } });
	      }
	      this.validationResult = true;

	      // fire validate event to eventually modify things before every validation
	      this._trigger('validate');

	      // Refresh form DOM options and form's fields that could have changed
	      this._refreshFields();

	      var promises = this._withoutReactualizingFormOptions(function () {
	        return $.map(_this6.fields, function (field) {
	          return field.whenValidate({ force: force, group: group });
	        });
	      });

	      return (_Utils$all$done$fail$always = Utils.all(promises).done(function () {
	        _this6._trigger('success');
	      }).fail(function () {
	        _this6.validationResult = false;
	        _this6.focus();
	        _this6._trigger('error');
	      }).always(function () {
	        _this6._trigger('validated');
	      })).pipe.apply(_Utils$all$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
	    },

	    // Iterate over refreshed fields, and stop on first failure.
	    // Returns `true` if all fields are valid, `false` if a failure is detected
	    // or `null` if the result depends on an unresolved promise.
	    // Prefer using `whenValid` instead.
	    isValid: function isValid(options) {
	      if (arguments.length >= 1 && !$.isPlainObject(options)) {
	        Utils.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');

	        var _arguments2 = _slice.call(arguments);

	        var group = _arguments2[0];
	        var force = _arguments2[1];

	        options = { group: group, force: force };
	      }
	      return Form__statusMapping[this.whenValid(options).state()];
	    },

	    // Iterate over refreshed fields and validate them.
	    // Returns a promise.
	    // A validation that immediately fails will interrupt the validations.
	    whenValid: function whenValid() {
	      var _this7 = this;

	      var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var group = _ref8.group;
	      var force = _ref8.force;

	      this._refreshFields();

	      var promises = this._withoutReactualizingFormOptions(function () {
	        return $.map(_this7.fields, function (field) {
	          return field.whenValid({ group: group, force: force });
	        });
	      });
	      return Utils.all(promises);
	    },

	    // Reset UI
	    reset: function reset() {
	      // Form case: emit a reset event for each field
	      for (var i = 0; i < this.fields.length; i++) this.fields[i].reset();

	      this._trigger('reset');
	    },

	    // Destroy Parsley instance (+ UI)
	    destroy: function destroy() {
	      // Field case: emit destroy event to clean UI and then destroy stored instance
	      this._destroyUI();

	      // Form case: destroy all its fields and then destroy stored instance
	      for (var i = 0; i < this.fields.length; i++) this.fields[i].destroy();

	      this.$element.removeData('Parsley');
	      this._trigger('destroy');
	    },

	    _refreshFields: function _refreshFields() {
	      return this.actualizeOptions()._bindFields();
	    },

	    _bindFields: function _bindFields() {
	      var _this8 = this;

	      var oldFields = this.fields;

	      this.fields = [];
	      this.fieldsMappedById = {};

	      this._withoutReactualizingFormOptions(function () {
	        _this8.$element.find(_this8.options.inputs).not(_this8.options.excluded).each(function (_, element) {
	          var fieldInstance = new window.Parsley.Factory(element, {}, _this8);

	          // Only add valid and not excluded `Field` and `FieldMultiple` children
	          if (('Field' === fieldInstance.__class__ || 'FieldMultiple' === fieldInstance.__class__) && true !== fieldInstance.options.excluded) {
	            var uniqueId = fieldInstance.__class__ + '-' + fieldInstance.__id__;
	            if ('undefined' === typeof _this8.fieldsMappedById[uniqueId]) {
	              _this8.fieldsMappedById[uniqueId] = fieldInstance;
	              _this8.fields.push(fieldInstance);
	            }
	          }
	        });

	        $.each(Utils.difference(oldFields, _this8.fields), function (_, field) {
	          field.reset();
	        });
	      });
	      return this;
	    },

	    // Internal only.
	    // Looping on a form's fields to do validation or similar
	    // will trigger reactualizing options on all of them, which
	    // in turn will reactualize the form's options.
	    // To avoid calling actualizeOptions so many times on the form
	    // for nothing, _withoutReactualizingFormOptions temporarily disables
	    // the method actualizeOptions on this form while `fn` is called.
	    _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
	      var oldActualizeOptions = this.actualizeOptions;
	      this.actualizeOptions = function () {
	        return this;
	      };
	      var result = fn();
	      this.actualizeOptions = oldActualizeOptions;
	      return result;
	    },

	    // Internal only.
	    // Shortcut to trigger an event
	    // Returns true iff event is not interrupted and default not prevented.
	    _trigger: function _trigger(eventName) {
	      return this.trigger('form:' + eventName);
	    }

	  };

	  var Constraint = function Constraint(parsleyField, name, requirements, priority, isDomConstraint) {
	    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
	    var validator = new Validator(validatorSpec);
	    priority = priority || parsleyField.options[name + 'Priority'] || validator.priority;
	    isDomConstraint = true === isDomConstraint;

	    _extends(this, {
	      validator: validator,
	      name: name,
	      requirements: requirements,
	      priority: priority,
	      isDomConstraint: isDomConstraint
	    });
	    this._parseRequirements(parsleyField.options);
	  };

	  var capitalize = function capitalize(str) {
	    var cap = str[0].toUpperCase();
	    return cap + str.slice(1);
	  };

	  Constraint.prototype = {
	    validate: function validate(value, instance) {
	      var _validator;

	      return (_validator = this.validator).validate.apply(_validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
	    },

	    _parseRequirements: function _parseRequirements(options) {
	      var _this9 = this;

	      this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
	        return options[_this9.name + capitalize(key)];
	      });
	    }
	  };

	  var Field = function Field(field, domOptions, options, parsleyFormInstance) {
	    this.__class__ = 'Field';

	    this.element = field;
	    this.$element = $(field);

	    // Set parent if we have one
	    if ('undefined' !== typeof parsleyFormInstance) {
	      this.parent = parsleyFormInstance;
	    }

	    this.options = options;
	    this.domOptions = domOptions;

	    // Initialize some properties
	    this.constraints = [];
	    this.constraintsByName = {};
	    this.validationResult = true;

	    // Bind constraints
	    this._bindConstraints();
	  };

	  var parsley_field__statusMapping = { pending: null, resolved: true, rejected: false };

	  Field.prototype = {
	    // # Public API
	    // Validate field and trigger some events for mainly `UI`
	    // @returns `true`, an array of the validators that failed, or
	    // `null` if validation is not finished. Prefer using whenValidate
	    validate: function validate(options) {
	      if (arguments.length >= 1 && !$.isPlainObject(options)) {
	        Utils.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
	        options = { options: options };
	      }
	      var promise = this.whenValidate(options);
	      if (!promise) // If excluded with `group` option
	        return true;
	      switch (promise.state()) {
	        case 'pending':
	          return null;
	        case 'resolved':
	          return true;
	        case 'rejected':
	          return this.validationResult;
	      }
	    },

	    // Validate field and trigger some events for mainly `UI`
	    // @returns a promise that succeeds only when all validations do
	    // or `undefined` if field is not in the given `group`.
	    whenValidate: function whenValidate() {
	      var _whenValid$always$done$fail$always,
	          _this10 = this;

	      var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var force = _ref9.force;
	      var group = _ref9.group;

	      // do not validate a field if not the same as given validation group
	      this.refreshConstraints();
	      if (group && !this._isInGroup(group)) return;

	      this.value = this.getValue();

	      // Field Validate event. `this.value` could be altered for custom needs
	      this._trigger('validate');

	      return (_whenValid$always$done$fail$always = this.whenValid({ force: force, value: this.value, _refreshed: true }).always(function () {
	        _this10._reflowUI();
	      }).done(function () {
	        _this10._trigger('success');
	      }).fail(function () {
	        _this10._trigger('error');
	      }).always(function () {
	        _this10._trigger('validated');
	      })).pipe.apply(_whenValid$always$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
	    },

	    hasConstraints: function hasConstraints() {
	      return 0 !== this.constraints.length;
	    },

	    // An empty optional field does not need validation
	    needsValidation: function needsValidation(value) {
	      if ('undefined' === typeof value) value = this.getValue();

	      // If a field is empty and not required, it is valid
	      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
	      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;

	      return true;
	    },

	    _isInGroup: function _isInGroup(group) {
	      if (Array.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
	      return this.options.group === group;
	    },

	    // Just validate field. Do not trigger any event.
	    // Returns `true` iff all constraints pass, `false` if there are failures,
	    // or `null` if the result can not be determined yet (depends on a promise)
	    // See also `whenValid`.
	    isValid: function isValid(options) {
	      if (arguments.length >= 1 && !$.isPlainObject(options)) {
	        Utils.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');

	        var _arguments3 = _slice.call(arguments);

	        var force = _arguments3[0];
	        var value = _arguments3[1];

	        options = { force: force, value: value };
	      }
	      var promise = this.whenValid(options);
	      if (!promise) // Excluded via `group`
	        return true;
	      return parsley_field__statusMapping[promise.state()];
	    },

	    // Just validate field. Do not trigger any event.
	    // @returns a promise that succeeds only when all validations do
	    // or `undefined` if the field is not in the given `group`.
	    // The argument `force` will force validation of empty fields.
	    // If a `value` is given, it will be validated instead of the value of the input.
	    whenValid: function whenValid() {
	      var _this11 = this;

	      var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref10$force = _ref10.force;
	      var force = _ref10$force === undefined ? false : _ref10$force;
	      var value = _ref10.value;
	      var group = _ref10.group;
	      var _refreshed = _ref10._refreshed;

	      // Recompute options and rebind constraints to have latest changes
	      if (!_refreshed) this.refreshConstraints();
	      // do not validate a field if not the same as given validation group
	      if (group && !this._isInGroup(group)) return;

	      this.validationResult = true;

	      // A field without constraint is valid
	      if (!this.hasConstraints()) return $.when();

	      // Value could be passed as argument, needed to add more power to 'field:validate'
	      if ('undefined' === typeof value || null === value) value = this.getValue();

	      if (!this.needsValidation(value) && true !== force) return $.when();

	      var groupedConstraints = this._getGroupedConstraints();
	      var promises = [];
	      $.each(groupedConstraints, function (_, constraints) {
	        // Process one group of constraints at a time, we validate the constraints
	        // and combine the promises together.
	        var promise = Utils.all($.map(constraints, function (constraint) {
	          return _this11._validateConstraint(value, constraint);
	        }));
	        promises.push(promise);
	        if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
	      });
	      return Utils.all(promises);
	    },

	    // @returns a promise
	    _validateConstraint: function _validateConstraint(value, constraint) {
	      var _this12 = this;

	      var result = constraint.validate(value, this);
	      // Map false to a failed promise
	      if (false === result) result = $.Deferred().reject();
	      // Make sure we return a promise and that we record failures
	      return Utils.all([result]).fail(function (errorMessage) {
	        if (!(_this12.validationResult instanceof Array)) _this12.validationResult = [];
	        _this12.validationResult.push({
	          assert: constraint,
	          errorMessage: 'string' === typeof errorMessage && errorMessage
	        });
	      });
	    },

	    // @returns Parsley field computed value that could be overrided or configured in DOM
	    getValue: function getValue() {
	      var value;

	      // Value could be overriden in DOM or with explicit options
	      if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val();

	      // Handle wrong DOM or configurations
	      if ('undefined' === typeof value || null === value) return '';

	      return this._handleWhitespace(value);
	    },

	    // Reset UI
	    reset: function reset() {
	      this._resetUI();
	      return this._trigger('reset');
	    },

	    // Destroy Parsley instance (+ UI)
	    destroy: function destroy() {
	      // Field case: emit destroy event to clean UI and then destroy stored instance
	      this._destroyUI();
	      this.$element.removeData('Parsley');
	      this.$element.removeData('FieldMultiple');
	      this._trigger('destroy');
	    },

	    // Actualize options that could have change since previous validation
	    // Re-bind accordingly constraints (could be some new, removed or updated)
	    refreshConstraints: function refreshConstraints() {
	      return this.actualizeOptions()._bindConstraints();
	    },

	    /**
	    * Add a new constraint to a field
	    *
	    * @param {String}   name
	    * @param {Mixed}    requirements      optional
	    * @param {Number}   priority          optional
	    * @param {Boolean}  isDomConstraint   optional
	    */
	    addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {

	      if (window.Parsley._validatorRegistry.validators[name]) {
	        var constraint = new Constraint(this, name, requirements, priority, isDomConstraint);

	        // if constraint already exist, delete it and push new version
	        if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);

	        this.constraints.push(constraint);
	        this.constraintsByName[constraint.name] = constraint;
	      }

	      return this;
	    },

	    // Remove a constraint
	    removeConstraint: function removeConstraint(name) {
	      for (var i = 0; i < this.constraints.length; i++) if (name === this.constraints[i].name) {
	        this.constraints.splice(i, 1);
	        break;
	      }
	      delete this.constraintsByName[name];
	      return this;
	    },

	    // Update a constraint (Remove + re-add)
	    updateConstraint: function updateConstraint(name, parameters, priority) {
	      return this.removeConstraint(name).addConstraint(name, parameters, priority);
	    },

	    // # Internals

	    // Internal only.
	    // Bind constraints from config + options + DOM
	    _bindConstraints: function _bindConstraints() {
	      var constraints = [];
	      var constraintsByName = {};

	      // clean all existing DOM constraints to only keep javascript user constraints
	      for (var i = 0; i < this.constraints.length; i++) if (false === this.constraints[i].isDomConstraint) {
	        constraints.push(this.constraints[i]);
	        constraintsByName[this.constraints[i].name] = this.constraints[i];
	      }

	      this.constraints = constraints;
	      this.constraintsByName = constraintsByName;

	      // then re-add Parsley DOM-API constraints
	      for (var name in this.options) this.addConstraint(name, this.options[name], undefined, true);

	      // finally, bind special HTML5 constraints
	      return this._bindHtml5Constraints();
	    },

	    // Internal only.
	    // Bind specific HTML5 constraints to be HTML5 compliant
	    _bindHtml5Constraints: function _bindHtml5Constraints() {
	      // html5 required
	      if (null !== this.element.getAttribute('required')) this.addConstraint('required', true, undefined, true);

	      // html5 pattern
	      if (null !== this.element.getAttribute('pattern')) this.addConstraint('pattern', this.element.getAttribute('pattern'), undefined, true);

	      // range
	      var min = this.element.getAttribute('min');
	      var max = this.element.getAttribute('max');
	      if (null !== min && null !== max) this.addConstraint('range', [min, max], undefined, true);

	      // HTML5 min
	      else if (null !== min) this.addConstraint('min', min, undefined, true);

	        // HTML5 max
	        else if (null !== max) this.addConstraint('max', max, undefined, true);

	      // length
	      if (null !== this.element.getAttribute('minlength') && null !== this.element.getAttribute('maxlength')) this.addConstraint('length', [this.element.getAttribute('minlength'), this.element.getAttribute('maxlength')], undefined, true);

	      // HTML5 minlength
	      else if (null !== this.element.getAttribute('minlength')) this.addConstraint('minlength', this.element.getAttribute('minlength'), undefined, true);

	        // HTML5 maxlength
	        else if (null !== this.element.getAttribute('maxlength')) this.addConstraint('maxlength', this.element.getAttribute('maxlength'), undefined, true);

	      // html5 types
	      var type = this.element.type;

	      // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
	      if ('number' === type) {
	        return this.addConstraint('type', ['number', {
	          step: this.element.getAttribute('step') || '1',
	          base: min || this.element.getAttribute('value')
	        }], undefined, true);
	        // Regular other HTML5 supported types
	      } else if (/^(email|url|range|date)$/i.test(type)) {
	          return this.addConstraint('type', type, undefined, true);
	        }
	      return this;
	    },

	    // Internal only.
	    // Field is required if have required constraint without `false` value
	    _isRequired: function _isRequired() {
	      if ('undefined' === typeof this.constraintsByName.required) return false;

	      return false !== this.constraintsByName.required.requirements;
	    },

	    // Internal only.
	    // Shortcut to trigger an event
	    _trigger: function _trigger(eventName) {
	      return this.trigger('field:' + eventName);
	    },

	    // Internal only
	    // Handles whitespace in a value
	    // Use `data-parsley-whitespace="squish"` to auto squish input value
	    // Use `data-parsley-whitespace="trim"` to auto trim input value
	    _handleWhitespace: function _handleWhitespace(value) {
	      if (true === this.options.trimValue) Utils.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');

	      if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');

	      if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = Utils.trimString(value);

	      return value;
	    },

	    _isDateInput: function _isDateInput() {
	      var c = this.constraintsByName.type;
	      return c && c.requirements === 'date';
	    },

	    // Internal only.
	    // Returns the constraints, grouped by descending priority.
	    // The result is thus an array of arrays of constraints.
	    _getGroupedConstraints: function _getGroupedConstraints() {
	      if (false === this.options.priorityEnabled) return [this.constraints];

	      var groupedConstraints = [];
	      var index = {};

	      // Create array unique of priorities
	      for (var i = 0; i < this.constraints.length; i++) {
	        var p = this.constraints[i].priority;
	        if (!index[p]) groupedConstraints.push(index[p] = []);
	        index[p].push(this.constraints[i]);
	      }
	      // Sort them by priority DESC
	      groupedConstraints.sort(function (a, b) {
	        return b[0].priority - a[0].priority;
	      });

	      return groupedConstraints;
	    }

	  };

	  var parsley_field = Field;

	  var Multiple = function Multiple() {
	    this.__class__ = 'FieldMultiple';
	  };

	  Multiple.prototype = {
	    // Add new `$element` sibling for multiple field
	    addElement: function addElement($element) {
	      this.$elements.push($element);

	      return this;
	    },

	    // See `Field.refreshConstraints()`
	    refreshConstraints: function refreshConstraints() {
	      var fieldConstraints;

	      this.constraints = [];

	      // Select multiple special treatment
	      if (this.element.nodeName === 'SELECT') {
	        this.actualizeOptions()._bindConstraints();

	        return this;
	      }

	      // Gather all constraints for each input in the multiple group
	      for (var i = 0; i < this.$elements.length; i++) {

	        // Check if element have not been dynamically removed since last binding
	        if (!$('html').has(this.$elements[i]).length) {
	          this.$elements.splice(i, 1);
	          continue;
	        }

	        fieldConstraints = this.$elements[i].data('FieldMultiple').refreshConstraints().constraints;

	        for (var j = 0; j < fieldConstraints.length; j++) this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
	      }

	      return this;
	    },

	    // See `Field.getValue()`
	    getValue: function getValue() {
	      // Value could be overriden in DOM
	      if ('function' === typeof this.options.value) return this.options.value(this);else if ('undefined' !== typeof this.options.value) return this.options.value;

	      // Radio input case
	      if (this.element.nodeName === 'INPUT') {
	        if (this.element.type === 'radio') return this._findRelated().filter(':checked').val() || '';

	        // checkbox input case
	        if (this.element.type === 'checkbox') {
	          var values = [];

	          this._findRelated().filter(':checked').each(function () {
	            values.push($(this).val());
	          });

	          return values;
	        }
	      }

	      // Select multiple case
	      if (this.element.nodeName === 'SELECT' && null === this.$element.val()) return [];

	      // Default case that should never happen
	      return this.$element.val();
	    },

	    _init: function _init() {
	      this.$elements = [this.$element];

	      return this;
	    }
	  };

	  var Factory = function Factory(element, options, parsleyFormInstance) {
	    this.element = element;
	    this.$element = $(element);

	    // If the element has already been bound, returns its saved Parsley instance
	    var savedparsleyFormInstance = this.$element.data('Parsley');
	    if (savedparsleyFormInstance) {

	      // If the saved instance has been bound without a Form parent and there is one given in this call, add it
	      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
	        savedparsleyFormInstance.parent = parsleyFormInstance;
	        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
	      }

	      if ('object' === typeof options) {
	        _extends(savedparsleyFormInstance.options, options);
	      }

	      return savedparsleyFormInstance;
	    }

	    // Parsley must be instantiated with a DOM element or jQuery $element
	    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');

	    if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a Form instance');

	    this.parent = parsleyFormInstance || window.Parsley;
	    return this.init(options);
	  };

	  Factory.prototype = {
	    init: function init(options) {
	      this.__class__ = 'Parsley';
	      this.__version__ = '2.7.2';
	      this.__id__ = Utils.generateID();

	      // Pre-compute options
	      this._resetOptions(options);

	      // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
	      if (this.element.nodeName === 'FORM' || Utils.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm');

	      // Every other element is bound as a `Field` or `FieldMultiple`
	      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
	    },

	    isMultiple: function isMultiple() {
	      return this.element.type === 'radio' || this.element.type === 'checkbox' || this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple');
	    },

	    // Multiples fields are a real nightmare :(
	    // Maybe some refactoring would be appreciated here...
	    handleMultiple: function handleMultiple() {
	      var _this13 = this;

	      var name;
	      var multiple;
	      var parsleyMultipleInstance;

	      // Handle multiple name
	      this.options.multiple = this.options.multiple || (name = this.element.getAttribute('name')) || this.element.getAttribute('id');

	      // Special select multiple input
	      if (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')) {
	        this.options.multiple = this.options.multiple || this.__id__;
	        return this.bind('parsleyFieldMultiple');

	        // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
	      } else if (!this.options.multiple) {
	          Utils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
	          return this;
	        }

	      // Remove special chars
	      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');

	      // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
	      if (name) {
	        $('input[name="' + name + '"]').each(function (i, input) {
	          if (input.type === 'radio' || input.type === 'checkbox') input.setAttribute(_this13.options.namespace + 'multiple', _this13.options.multiple);
	        });
	      }

	      // Check here if we don't already have a related multiple instance saved
	      var $previouslyRelated = this._findRelated();
	      for (var i = 0; i < $previouslyRelated.length; i++) {
	        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
	        if ('undefined' !== typeof parsleyMultipleInstance) {

	          if (!this.$element.data('FieldMultiple')) {
	            parsleyMultipleInstance.addElement(this.$element);
	          }

	          break;
	        }
	      }

	      // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
	      // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance
	      this.bind('parsleyField', true);

	      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
	    },

	    // Return proper `Form`, `Field` or `FieldMultiple`
	    bind: function bind(type, doNotStore) {
	      var parsleyInstance;

	      switch (type) {
	        case 'parsleyForm':
	          parsleyInstance = $.extend(new Form(this.element, this.domOptions, this.options), new Base(), window.ParsleyExtend)._bindFields();
	          break;
	        case 'parsleyField':
	          parsleyInstance = $.extend(new parsley_field(this.element, this.domOptions, this.options, this.parent), new Base(), window.ParsleyExtend);
	          break;
	        case 'parsleyFieldMultiple':
	          parsleyInstance = $.extend(new parsley_field(this.element, this.domOptions, this.options, this.parent), new Multiple(), new Base(), window.ParsleyExtend)._init();
	          break;
	        default:
	          throw new Error(type + 'is not a supported Parsley type');
	      }

	      if (this.options.multiple) Utils.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple);

	      if ('undefined' !== typeof doNotStore) {
	        this.$element.data('FieldMultiple', parsleyInstance);

	        return parsleyInstance;
	      }

	      // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
	      this.$element.data('Parsley', parsleyInstance);

	      // Tell the world we have a new Form or Field instance!
	      parsleyInstance._actualizeTriggers();
	      parsleyInstance._trigger('init');

	      return parsleyInstance;
	    }
	  };

	  var vernums = $.fn.jquery.split('.');
	  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
	    throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
	  }
	  if (!vernums.forEach) {
	    Utils.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
	  }
	  // Inherit `on`, `off` & `trigger` to Parsley:
	  var Parsley = _extends(new Base(), {
	    element: document,
	    $element: $(document),
	    actualizeOptions: null,
	    _resetOptions: null,
	    Factory: Factory,
	    version: '2.7.2'
	  });

	  // Supplement Field and Form with Base
	  // This way, the constructors will have access to those methods
	  _extends(parsley_field.prototype, UI.Field, Base.prototype);
	  _extends(Form.prototype, UI.Form, Base.prototype);
	  // Inherit actualizeOptions and _resetOptions:
	  _extends(Factory.prototype, Base.prototype);

	  // ### jQuery API
	  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
	  $.fn.parsley = $.fn.psly = function (options) {
	    if (this.length > 1) {
	      var instances = [];

	      this.each(function () {
	        instances.push($(this).parsley(options));
	      });

	      return instances;
	    }

	    // Return undefined if applied to non existing DOM element
	    if (!$(this).length) {
	      Utils.warn('You must bind Parsley on an existing element.');

	      return;
	    }

	    return new Factory(this[0], options);
	  };

	  // ### Field and Form extension
	  // Ensure the extension is now defined if it wasn't previously
	  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {};

	  // ### Parsley config
	  // Inherit from ParsleyDefault, and copy over any existing values
	  Parsley.options = _extends(Utils.objectCreate(Defaults), window.ParsleyConfig);
	  window.ParsleyConfig = Parsley.options; // Old way of accessing global options

	  // ### Globals
	  window.Parsley = window.psly = Parsley;
	  Parsley.Utils = Utils;
	  window.ParsleyUtils = {};
	  $.each(Utils, function (key, value) {
	    if ('function' === typeof value) {
	      window.ParsleyUtils[key] = function () {
	        Utils.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.');
	        return Utils[key].apply(Utils, arguments);
	      };
	    }
	  });

	  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
	  var registry = window.Parsley._validatorRegistry = new ValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
	  window.ParsleyValidator = {};
	  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator'.split(' '), function (i, method) {
	    window.Parsley[method] = function () {
	      return registry[method].apply(registry, arguments);
	    };
	    window.ParsleyValidator[method] = function () {
	      var _window$Parsley;

	      Utils.warnOnce('Accessing the method \'' + method + '\' through Validator is deprecated. Simply call \'window.Parsley.' + method + '(...)\'');
	      return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
	    };
	  });

	  // ### UI
	  // Deprecated global object
	  window.Parsley.UI = UI;
	  window.ParsleyUI = {
	    removeError: function removeError(instance, name, doNotUpdateClass) {
	      var updateClass = true !== doNotUpdateClass;
	      Utils.warnOnce('Accessing UI is deprecated. Call \'removeError\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
	      return instance.removeError(name, { updateClass: updateClass });
	    },
	    getErrorsMessages: function getErrorsMessages(instance) {
	      Utils.warnOnce('Accessing UI is deprecated. Call \'getErrorsMessages\' on the instance directly.');
	      return instance.getErrorsMessages();
	    }
	  };
	  $.each('addError updateError'.split(' '), function (i, method) {
	    window.ParsleyUI[method] = function (instance, name, message, assert, doNotUpdateClass) {
	      var updateClass = true !== doNotUpdateClass;
	      Utils.warnOnce('Accessing UI is deprecated. Call \'' + method + '\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
	      return instance[method](name, { message: message, assert: assert, updateClass: updateClass });
	    };
	  });

	  // ### PARSLEY auto-binding
	  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
	  if (false !== window.ParsleyConfig.autoBind) {
	    $(function () {
	      // Works only on `data-parsley-validate`.
	      if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
	    });
	  }

	  var o = $({});
	  var deprecated = function deprecated() {
	    Utils.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
	  };

	  // Returns an event handler that calls `fn` with the arguments it expects
	  function adapt(fn, context) {
	    // Store to allow unbinding
	    if (!fn.parsleyAdaptedCallback) {
	      fn.parsleyAdaptedCallback = function () {
	        var args = Array.prototype.slice.call(arguments, 0);
	        args.unshift(this);
	        fn.apply(context || o, args);
	      };
	    }
	    return fn.parsleyAdaptedCallback;
	  }

	  var eventPrefix = 'parsley:';
	  // Converts 'parsley:form:validate' into 'form:validate'
	  function eventName(name) {
	    if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
	    return name;
	  }

	  // $.listen is deprecated. Use Parsley.on instead.
	  $.listen = function (name, callback) {
	    var context;
	    deprecated();
	    if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
	      context = arguments[1];
	      callback = arguments[2];
	    }

	    if ('function' !== typeof callback) throw new Error('Wrong parameters');

	    window.Parsley.on(eventName(name), adapt(callback, context));
	  };

	  $.listenTo = function (instance, name, fn) {
	    deprecated();
	    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');

	    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');

	    instance.on(eventName(name), adapt(fn));
	  };

	  $.unsubscribe = function (name, fn) {
	    deprecated();
	    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
	    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
	  };

	  $.unsubscribeTo = function (instance, name) {
	    deprecated();
	    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
	    instance.off(eventName(name));
	  };

	  $.unsubscribeAll = function (name) {
	    deprecated();
	    window.Parsley.off(eventName(name));
	    $('form,input,textarea,select').each(function () {
	      var instance = $(this).data('Parsley');
	      if (instance) {
	        instance.off(eventName(name));
	      }
	    });
	  };

	  // $.emit is deprecated. Use jQuery events instead.
	  $.emit = function (name, instance) {
	    var _instance;

	    deprecated();
	    var instanceGiven = instance instanceof parsley_field || instance instanceof Form;
	    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
	    args.unshift(eventName(name));
	    if (!instanceGiven) {
	      instance = window.Parsley;
	    }
	    (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
	  };

	  var pubsub = {};

	  $.extend(true, Parsley, {
	    asyncValidators: {
	      'default': {
	        fn: function fn(xhr) {
	          // By default, only status 2xx are deemed successful.
	          // Note: we use status instead of state() because responses with status 200
	          // but invalid messages (e.g. an empty body for content type set to JSON) will
	          // result in state() === 'rejected'.
	          return xhr.status >= 200 && xhr.status < 300;
	        },
	        url: false
	      },
	      reverse: {
	        fn: function fn(xhr) {
	          // If reverse option is set, a failing ajax request is considered successful
	          return xhr.status < 200 || xhr.status >= 300;
	        },
	        url: false
	      }
	    },

	    addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
	      Parsley.asyncValidators[name] = {
	        fn: fn,
	        url: url || false,
	        options: options || {}
	      };

	      return this;
	    }

	  });

	  Parsley.addValidator('remote', {
	    requirementType: {
	      '': 'string',
	      'validator': 'string',
	      'reverse': 'boolean',
	      'options': 'object'
	    },

	    validateString: function validateString(value, url, options, instance) {
	      var data = {};
	      var ajaxOptions;
	      var csr;
	      var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');

	      if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');

	      url = Parsley.asyncValidators[validator].url || url;

	      // Fill current value
	      if (url.indexOf('{value}') > -1) {
	        url = url.replace('{value}', encodeURIComponent(value));
	      } else {
	        data[instance.element.getAttribute('name') || instance.element.getAttribute('id')] = value;
	      }

	      // Merge options passed in from the function with the ones in the attribute
	      var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options);

	      // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`
	      ajaxOptions = $.extend(true, {}, {
	        url: url,
	        data: data,
	        type: 'GET'
	      }, remoteOptions);

	      // Generate store key based on ajax options
	      instance.trigger('field:ajaxoptions', instance, ajaxOptions);

	      csr = $.param(ajaxOptions);

	      // Initialise querry cache
	      if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {};

	      // Try to retrieve stored xhr
	      var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

	      var handleXhr = function handleXhr() {
	        var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
	        if (!result) // Map falsy results to rejected promise
	          result = $.Deferred().reject();
	        return $.when(result);
	      };

	      return xhr.then(handleXhr, handleXhr);
	    },

	    priority: -1
	  });

	  Parsley.on('form:submit', function () {
	    Parsley._remoteCache = {};
	  });

	  Base.prototype.addAsyncValidator = function () {
	    Utils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
	    return Parsley.addAsyncValidator.apply(Parsley, arguments);
	  };

	  // This is included with the Parsley library itself,
	  // thus there is no use in adding it to your project.
	  Parsley.addMessages('en', {
	    defaultMessage: "This value seems to be invalid.",
	    type: {
	      email: "This value should be a valid email.",
	      url: "This value should be a valid url.",
	      number: "This value should be a valid number.",
	      integer: "This value should be a valid integer.",
	      digits: "This value should be digits.",
	      alphanum: "This value should be alphanumeric."
	    },
	    notblank: "This value should not be blank.",
	    required: "This value is required.",
	    pattern: "This value seems to be invalid.",
	    min: "This value should be greater than or equal to %s.",
	    max: "This value should be lower than or equal to %s.",
	    range: "This value should be between %s and %s.",
	    minlength: "This value is too short. It should have %s characters or more.",
	    maxlength: "This value is too long. It should have %s characters or fewer.",
	    length: "This value length is invalid. It should be between %s and %s characters long.",
	    mincheck: "You must select at least %s choices.",
	    maxcheck: "You must select %s choices or fewer.",
	    check: "You must select between %s and %s choices.",
	    equalto: "This value should be the same."
	  });

	  Parsley.setLocale('en');

	  /**
	   * inputevent - Alleviate browser bugs for input events
	   * https://github.com/marcandre/inputevent
	   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
	   * @author Marc-Andre Lafortune <github@marc-andre.ca>
	   * @license MIT
	   */

	  function InputEvent() {
	    var _this14 = this;

	    var globals = window || global;

	    // Slightly odd way construct our object. This way methods are force bound.
	    // Used to test for duplicate library.
	    _extends(this, {

	      // For browsers that do not support isTrusted, assumes event is native.
	      isNativeEvent: function isNativeEvent(evt) {
	        return evt.originalEvent && evt.originalEvent.isTrusted !== false;
	      },

	      fakeInputEvent: function fakeInputEvent(evt) {
	        if (_this14.isNativeEvent(evt)) {
	          $(evt.target).trigger('input');
	        }
	      },

	      misbehaves: function misbehaves(evt) {
	        if (_this14.isNativeEvent(evt)) {
	          _this14.behavesOk(evt);
	          $(document).on('change.inputevent', evt.data.selector, _this14.fakeInputEvent);
	          _this14.fakeInputEvent(evt);
	        }
	      },

	      behavesOk: function behavesOk(evt) {
	        if (_this14.isNativeEvent(evt)) {
	          $(document) // Simply unbinds the testing handler
	          .off('input.inputevent', evt.data.selector, _this14.behavesOk).off('change.inputevent', evt.data.selector, _this14.misbehaves);
	        }
	      },

	      // Bind the testing handlers
	      install: function install() {
	        if (globals.inputEventPatched) {
	          return;
	        }
	        globals.inputEventPatched = '0.0.3';
	        var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];
	        for (var _i = 0; _i < _arr.length; _i++) {
	          var selector = _arr[_i];
	          $(document).on('input.inputevent', selector, { selector: selector }, _this14.behavesOk).on('change.inputevent', selector, { selector: selector }, _this14.misbehaves);
	        }
	      },

	      uninstall: function uninstall() {
	        delete globals.inputEventPatched;
	        $(document).off('.inputevent');
	      }

	    });
	  };

	  var inputevent = new InputEvent();

	  inputevent.install();

	  var parsley = Parsley;

	  return parsley;
	});
	//# sourceMappingURL=parsley.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	// Validation errors messages for Parsley
	// Load this after Parsley

	Parsley.addMessages('zh-cn', {
	  defaultMessage: "不正确的值",
	  type: {
	    email:        "请输入一个有效的电子邮箱地址",
	    url:          "请输入一个有效的链接",
	    number:       "请输入正确的数字",
	    integer:      "请输入正确的整数",
	    digits:       "请输入正确的号码",
	    alphanum:     "请输入字母或数字"
	  },
	  notblank:       "请输入值",
	  required:       "必填项",
	  pattern:        "格式不正确",
	  min:            "输入值请大于或等于 %s",
	  max:            "输入值请小于或等于 %s",
	  range:          "输入值应该在 %s 到 %s 之间",
	  minlength:      "请输入至少 %s 个字符",
	  maxlength:      "请输入至多 %s 个字符",
	  length:         "字符长度应该在 %s 到 %s 之间",
	  mincheck:       "请至少选择 %s 个选项",
	  maxcheck:       "请选择不超过 %s 个选项",
	  check:          "请选择 %s 到 %s 个选项",
	  equalto:        "输入值不同"
	});

	Parsley.setLocale('zh-cn');


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	// Validation errors messages for Parsley
	// Load this after Parsley

	Parsley.addMessages('zh-cn', {
	  dateiso: "请输入正确格式的日期 (YYYY-MM-DD)."
	});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/*! lazysizes - v4.0.0-rc3 */
	!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d,e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("CustomEvent");return e||(e={}),e.instance=c,h.initCustomEvent(d,!f,!g,e),a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?e({reevaluate:!0,elements:[b]}):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,d=125,e=666,g=e,h=function(){b=!1,c=f.now(),a()},i=m?function(){m(h,{timeout:g}),g!==e&&(g=e)}:A(function(){k(h)},!0);return function(a){var e;(a=a===!0)&&(g=44),b||(b=!0,e=d-(f.now()-c),0>e&&(e=0),a||9>e&&m?i():k(i,e))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;d>a?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}},D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K,L,M=/^img$/i,N=/^iframe$/i,O="onscroll"in a&&!/glebot/.test(navigator.userAgent),P=0,Q=0,R=0,S=-1,T=function(a){R--,a&&a.target&&u(a.target,T),(!a||0>R||!a.target)&&(R=0)},U=function(a,c){var d,f=a,g="hidden"==x(b.body,"visibility")||"hidden"!=x(a,"visibility");for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)g=(x(f,"opacity")||1)>0,g&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},V=function(){var a,f,h,j,k,m,n,p,q,r=c.elements;if((o=d.loadMode)&&8>R&&(a=r.length)){f=0,S++,null==K&&("expand"in d||(d.expand=e.clientHeight>500&&e.clientWidth>500?500:370),J=d.expand,K=J*d.expFactor),K>Q&&1>R&&S>2&&o>2&&!b.hidden?(Q=K,S=0):Q=o>1&&S>1&&6>R?J:P;for(;a>f;f++)if(r[f]&&!r[f]._lazyRace)if(O)if((p=r[f][i]("data-expand"))&&(m=1*p)||(m=Q),q!==m&&(y=innerWidth+m*L,D=innerHeight+m,n=-1*m,q=m),h=r[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*L&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||"hidden"!=x(r[f],"visibility"))&&(l&&3>R&&!p&&(3>o||4>S)||U(r[f],m))){if(ba(r[f]),k=!0,R>9)break}else!k&&l&&!j&&4>R&&4>S&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=r[f][i](d.sizesAttr)))&&(j=g[0]||r[f]);else ba(r[f]);j&&!k&&ba(j)}},W=B(V),X=function(a){s(a.target,d.loadedClass),t(a.target,d.loadingClass),u(a.target,Z),v(a.target,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},p&&(u(a,T,!0),clearTimeout(m),m=k(T,2500),s(a,d.loadingClass),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(N.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){(!p||a.complete&&a.naturalWidth>1)&&(p?T(o):R--,X(o))},!0)}),ba=function(a){var b,c=M.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,R++,aa(a,b,f,e,c))},ca=function(){if(!l){if(f.now()-p<999)return void k(ca,999);var a=C(function(){d.loadMode=3,W()});l=!0,d.loadMode=3,W(),j("scroll",function(){3==d.loadMode&&(d.loadMode=2),a()},!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),L=d.hFac,j("scroll",W,!0),j("resize",W,!0),a.MutationObserver?new MutationObserver(W).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",W,!0),e[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ca():(j("load",ca),b[h]("DOMContentLoaded",W),k(ca,2e4)),c.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;g>f;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width,d&&d!==a._lazysizesWidth&&c(a,f,e,d)))},f=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){F.i||(F.i=!0,E._(),D._())};return function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b]);a.lazySizesConfig=d,k(function(){d.init&&F()})}(),c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}}});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(i){"use strict"; true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s=this,n=0;return s.slideOffset=0,t=s.$slides.first().outerHeight(!0),!0===s.options.infinite?(s.slideCount>s.options.slidesToShow&&(s.slideOffset=s.slideWidth*s.options.slidesToShow*-1,n=t*s.options.slidesToShow*-1),s.slideCount%s.options.slidesToScroll!=0&&i+s.options.slidesToScroll>s.slideCount&&s.slideCount>s.options.slidesToShow&&(i>s.slideCount?(s.slideOffset=(s.options.slidesToShow-(i-s.slideCount))*s.slideWidth*-1,n=(s.options.slidesToShow-(i-s.slideCount))*t*-1):(s.slideOffset=s.slideCount%s.options.slidesToScroll*s.slideWidth*-1,n=s.slideCount%s.options.slidesToScroll*t*-1))):i+s.options.slidesToShow>s.slideCount&&(s.slideOffset=(i+s.options.slidesToShow-s.slideCount)*s.slideWidth,n=(i+s.options.slidesToShow-s.slideCount)*t),s.slideCount<=s.options.slidesToShow&&(s.slideOffset=0,n=0),!0===s.options.centerMode&&s.slideCount<=s.options.slidesToShow?s.slideOffset=s.slideWidth*Math.floor(s.options.slidesToShow)/2-s.slideWidth*s.slideCount/2:!0===s.options.centerMode&&!0===s.options.infinite?s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)-s.slideWidth:!0===s.options.centerMode&&(s.slideOffset=0,s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)),e=!1===s.options.vertical?i*s.slideWidth*-1+s.slideOffset:i*t*-1+n,!0===s.options.variableWidth&&(o=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(i):s.$slideTrack.children(".slick-slide").eq(i+s.options.slidesToShow),e=!0===s.options.rtl?o[0]?-1*(s.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===s.options.centerMode&&(o=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(i):s.$slideTrack.children(".slick-slide").eq(i+s.options.slidesToShow+1),e=!0===s.options.rtl?o[0]?-1*(s.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(s.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.autoplay||i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode?(e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")):i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});


/***/ })
/******/ ])
});
;