'use strict';

var $ = require('jquery');
var UI = require('./core');
var config = {
    modules: {} //记录模块物理路径
    ,
    status: {} //记录模块加载状态
    ,
    timeout: 10 //符合规范的模块请求最长等待秒数
      ,
    event: {} //记录模块自定义事件
  },
  MOD_NAME = 'form',
  ELEM = '.am-form',
  DISABLED = 'am-disabled',
  __form = null;

//判断是否支持FormData
if (typeof (FormData) != "function") {
    $(function () {
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = "/js/jquery.form.min.js";
        document.body.appendChild(oScript);
    });
}

var Form = function (element, options) {
  this.options = $.extend({}, Form.DEFAULTS, options);
  this.$element = $(element);
  this.init();
};

Form.DEFAULTS = {};

Form.prototype.init = function () {
  __form = this;
  this.radio();
  this.checkbox();
  this.select();
};
//遍历
Form.prototype.each = function (obj, fn) {
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
Form.prototype.event = function (modName, events, params) {
  var that = this,
    result = null,
    filter = events.match(/\(.*\)$/) || [] //提取事件过滤器
    ,
    set = (events = modName + '.' + events).replace(filter, '') //获取事件本体名
    ,
    callback = function (_, item) {
      var res = item && item.call(that, params);
      res === false && result === null && (result = false);
    };
  __form.each(config.event[set], callback);
  filter[0] && __form.each(config.event[events], callback); //执行过滤器中的事件
  return result;
};
Form.prototype.checkbox = function () {
  var self = this;
  var CLASS = {
      checkbox: ['am-form-checkbox', 'am-form-checked', 'checkbox'],
      _switch: ['am-form-switch', 'am-form-onswitch', 'switch']
    },
    checks = this.$element.find('input[type=checkbox]'),
    events = function (reElem, RE_CLASS) {
      var check = $(this);

      //勾选
      reElem.on('click', function () {
        var filter = check.attr('data-filter') //获取过滤器
          ,
          text = (check.attr('data-text') || '').split('|');

        if (check[0].disabled) return;

        check[0].checked ? (
          check[0].checked = false, reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
        ) : (
          check[0].checked = true, reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
        );

        self.event.call(check[0], MOD_NAME, RE_CLASS[2] + '(' + filter + ')', {
          elem: check[0],
          value: check[0].value,
          othis: reElem
        });
      });
    };

  checks.each(function (index, check) {
    var othis = $(this),
      skin = othis.attr('data-skin'),
      text = (othis.attr('data-text') || '').split('|'),
      disabled = this.disabled;
    if (skin === 'switch') skin = '_' + skin;
    var RE_CLASS = CLASS[skin] || CLASS.checkbox;

    if (typeof othis.attr('data-ignore') === 'string') return othis.show();

    //替代元素
    var hasRender = othis.next('.' + RE_CLASS[0]);
    var reElem = $(['<div class="am-unselect ' + RE_CLASS[0] + (
      check.checked ? (' ' + RE_CLASS[1]) : '') + (disabled ? ' am-checkbox-disbaled ' + DISABLED : '') + '" data-skin="' + (skin || '') + '">', {
      _switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
    }[skin] || ((check.title.replace(/\s/g, '') ? ('<span>' + check.title + '</span>') : '') + '<i class="icon">' + (skin ? '&#xe6a5;' : '&#xe61e;') + '</i>'), '</div>'].join(''));

    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
    othis.after(reElem);
    events.call(this, reElem, RE_CLASS);
  });
};

Form.prototype.radio = function () {
  var self = this;
  var CLASS = 'am-form-radio',
    ICON = ['&#xe67f;', '&#xe697;'],
    radios = this.$element.find('input[type=radio]'),
    events = function (reElem) {
      var radio = $(this),
        ANIM = 'am-anim-scaleSpring';

      reElem.on('click', function () {
        var name = radio[0].name,
          forms = radio.parents(ELEM);
        var filter = radio.attr('data-filter'); //获取过滤器
        var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟

        if (radio[0].disabled) return;

        self.each(sameRadio, function () {
          var next = $(this).next('.' + CLASS);
          this.checked = false;
          next.removeClass(CLASS + 'ed');
          next.find('.icon').removeClass(ANIM).html(ICON[1]);
        });

        radio[0].checked = true;
        reElem.addClass(CLASS + 'ed');
        reElem.find('.icon').addClass(ANIM).html(ICON[0]);

        self.event.call(radio[0], MOD_NAME, 'radio(' + filter + ')', {
          elem: radio[0],
          value: radio[0].value,
          othis: reElem
        });
      });
    };

  radios.each(function (index, radio) {
    var othis = $(this),
      hasRender = othis.next('.' + CLASS),
      disabled = this.disabled;

    if (typeof othis.attr('data-ignore') === 'string') return othis.show();

    //替代元素
    var reElem = $(['<div class="am-unselect ' + CLASS + (radio.checked ? (' ' + CLASS + 'ed') : '') + (disabled ? ' am-radio-disbaled ' + DISABLED : '') + '">', '<i class="am-anim icon">' + ICON[radio.checked ? 0 : 1] + '</i>', '<span>' + (radio.title || '未命名') + '</span>', '</div>'].join(''));

    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
    othis.after(reElem);
    events.call(this, reElem);
  });
};

Form.prototype.select = function () {
  var selects = this.$element.find('select');
  selects.each(function (index, select) {
    var $this = $(this);
    if (typeof $this.attr('data-ignore') === 'string') return;
    $this.selectize({
          plugins: ['remove_button'],
          delimiter: ',',
          persist: false,
          create: false,
          sortField: 'text'
    });
  });
};

UI.plugin('form', Form, {
  after: function () {
    if (UI.support.touch) {

    }
  }
});

UI.ready(function (context) {
  $('.am-form', context).form();
});

(function ($) {
    $.fn.asyncSubmit = function (opts) {
        if (typeof (opts) == "function")
            opts = { success: opts };
        return this.each(function () {
            var self = this;
            var $this = $(this);
            if (typeof $this.attr('data-questions') === 'string') {
                $this.find('input.other').change(function () {
                    var isChecked = $(this).val() != "";
                    var $check = $(this).prev('input');
                    if (!$check.length)
                        $check = $(this).prev().prev();
                    var value = $check.val().split(':')[0];
                    $check[0].checked = isChecked;
                    if (isChecked)
                        value += ":" + $(this).val().replace(/:/gi, "：").replace(/,/gi,"，");
                    $check.val(value);
                });
            }
            this.goSubmit = function () {
                if (self.vm)
                    self.vm.submitting = true;
                var $button = $(self).find("input[type='submit'],button[type='submit']").attr('disabled', true), buttonHtml = null;
                if ($button.is('button')) {
                    buttonHtml = $button.html();
                    $button.html('<i class="am-icon-circle-o-notch am-icon-spin"></i>正在提交...');
                }
                if (typeof (FormData) == "function") {
                    var formData = new FormData(this);
                    var url = $(this).attr('action');
                    try {
                        $.ajax({
                            url: url,
                            type: "POST",
                            dataType: 'json',
                            data: formData,
                            cache: false,
                            processData: false,
                            contentType: false
                        }).done(function (result) {
                            if (self.vm) 
                                self.vm.submitting = false;
                            if (result.succ) {
                                opts.success(result.data);
                                setTimeout(function () {
                                    $button.attr('disabled', false).html(buttonHtml);
                                }, 1000);
                            }
                            else {
                                $button.attr('disabled', false).html(buttonHtml);
                                alert(result.data);
                            }
                        }).fail(function (data, textStatus, errorThrown) {
                            $button.attr('disabled', false).html(buttonHtml);
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
                        dataType: 'json', success: function (result) {
                            $button.attr('disabled', false).html(buttonHtml);
                            if (result.succ)
                                opts.success(result.data);
                            else
                                alert(result.data);
                        }
                    });
                }
            }
            if ($.AMUI && $.AMUI.validator) {
                if (opts.showTooltip) {
                    var $tooltip = $('#vld-tooltip');
                    if ($tooltip.length == 0) {
                        var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
                        $tooltip.appendTo(document.body);
                    }
                    $tooltip.click(function () {
                        $(this).hide();
                    });
                }
                if (!opts.opts) opts.opts = {};
                opts.opts.alwaysRevalidate = true;
                if (!opts.opts.submit) {
                    opts.opts.submit = function () {
                        if (opts.before && !opts.before.call(this))
                            return false;
                        var formValidity = this.isFormValid();
                        if (formValidity)
                            self.goSubmit();
                        return false;
                    }
                }
                $(this).validator(opts.opts);
                if (opts.showTooltip) {
                    var validator = $(this).data('amui.validator');
                    $(this).on('focusin focusout', 'input,textarea', function (e) {
                        var $this = $(this);
                        if (e.type == "focusin" && $this.hasClass('am-field-error')) {
                            var offset = $this.offset();
                            var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));
                            $tooltip.text(msg).show().css({
                                left: offset.left + 10,
                                top: offset.top + $(this).outerHeight() + 10
                            });
                        } else {
                            $tooltip.hide();
                        }
                    });
                }
                //var parsleyOptions = {
                //    namespace: 'data-',
                //    successClass: 'am-form-success',
                //    errorClass: 'am-form-error',
                //    classHandler: function (_el) {
                //        return _el.$element.closest('.am-form-group');
                //    }
                //};
                //$(this).parsley(parsleyOptions).on('form:validate', function (formInstance) {
                //    if (opts.before && !opts.before.call(this)) {
                //        formInstance.validationResult = false;
                //        return;
                //    }
                //    formInstance.validationResult = true;
                //}).on('form:submit', function () {
                //    self.goSubmit();
                //    return false;
                //});
            } else {
                var parsleyOptions = {
                    namespace: 'data-v-',
                    successClass: 'has-success',
                    errorClass: 'has-error',
                    classHandler: function (_el) {
                        return _el.$element.closest('.form-group');
                    }
                };
                if (opts.validate)
                    $.extend(parsleyOptions, opts.validate);
                console.log("set parsley!");
                $(this).parsley(parsleyOptions).on('form:validate', function (formInstance) {
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
                }).on('form:submit', function () {
                    self.goSubmit();
                    return false;
                });
            }
        });
    }
    $.fn.fill = function (data) {
        var fillData = function (data, self, isfirst, targetKey) {
            for (var key in data) {
                if (data[key] == null) continue;
                if (typeof (data[key]) == "object" && !data[key].length) {
                    fillData(data[key], self, isfirst, targetKey + key + ".");
                    continue;
                }
                var inputs = document.getElementsByName(targetKey + key);
                var isCheck = inputs.length && ($(inputs[0]).attr('type') == "checkbox" || $(inputs[0]).attr('type') == "radio");
                var items;
                if (isCheck) {
                    if (data[key])
                        items = data[key].toString().split(',');
                    else
                        items = [];
                }
                $(inputs).each(function () {
                    if (typeof ($(this).attr('data-no-fill')) != "undefined") return;
                    if (isfirst) {
                        $(this).attr('data-old', $(this).val());
                        self.inputs.push(this);
                    }
                    if (isCheck) {
                        if (items.indexOf($(this).val()) >= 0)
                            $(this).attr('checked', true);
                        return;
                    }
                    var type = $(this).attr('type');
                    if (type == "file") {
                        if ($(this).attr('data-type') == "image" && $(this).attr('data-src'))
                            $('#' + $(this).attr('data-src')).attr('src', data[key]);
                        return;
                    } else if ($(this).attr('data-type') == "editor") {
                        this.editor.setContent(data[key]);
                    } else if (this.hasAttribute('data-tags') || $(this).attr('data-type') == "tags") { //
                        $(this).tagsinput('add', data[key].join(','));
                    } else if (this.hasAttribute('data-select-input')) {
                        $(this).val(data[key]);
                        this.fireEvent('update');
                    } else {
                        $(this).val(data[key]);
                        if ($(this).hasClass('select2'))
                            $(this).trigger('change.select2');
                    }
                });
            }
        }
        return this.each(function () {
            var isfirst = this.inputs == undefined;
            if (isfirst)
                this.inputs = [];
            var self = this;
            fillData(data, self, isfirst, "");
        });
    }
    $.fn.resetForm = function () {
        return this.each(function () {
            if (!this.inputs) {
                this.inputs = [];
                var self = this;
                $(this).find('input,textarea,select').each(function () {
                    $(this).attr('data-old', $(this).val());
                    self.inputs.push(this);
                });
                return;
            }
            $(this.inputs).each(function () {
                var type = $(this).attr('type');
                if (type == "file") {
                    if ($(this).attr('data-type') == "image" && $(this).attr('data-src'))
                        $('#' + $(this).attr('data-src')).attr('src', data[key]);
                    return;
                }else if ($(this).attr('data-type') == "editor") {
                    this.editor.setContent($(this).attr('data-old'));
                }
                else if (this.hasAttribute('data-tags') || $(this).attr('data-type') == "tags") {
                    $(this).tagsinput('removeAll');
                    $(this).tagsinput('add', $(this).attr('data-old'));
                } else {
                    try {
                        $(this).val($(this).attr('data-old'));
                    } catch (e) { }
                    if ($(this).hasClass('select2'))
                        $(this).trigger('change.select2');
                }
            });
        })
    }
    $.fn.fixHead = function () {
        return this.each(function () {
            var $this = $(this),
                $t_head = $this.find('thead th'),
                $t_fixed;
            function init() {
                //$this.wrap('<div class="container" />');
                $t_fixed = $this.clone();
                $t_fixed.removeAttr('id');
                $t_fixed.find("tbody,tfoot").remove().end().addClass("tabel-fixed").insertBefore($this);
                resizeFixed();
            }
            function resizeFixed() {
                $t_fixed.find("th").each(function (index) {
                    $(this).css("width", $t_head.eq(index).outerWidth() + "px");
                });
            }
            function scrollFixed() {
                var offset = $(this).scrollTop(),
                    tableOffsetTop = $this.offset().top,
                    tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                if (offset < tableOffsetTop || offset > tableOffsetBottom)
                    $t_fixed.hide();
                else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
                    $t_fixed.show();
            }
            $(window).resize(resizeFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };
})($);

module.exports = Form;
