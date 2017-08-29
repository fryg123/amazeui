'use strict';

var $ = require('jquery');
var UI = require('./core');
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
    this.slider();
    this.widget();
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
Form.prototype.checkbox = function () {
    var self = this;
    var CLASS = {
            checkbox: ['am-form-checkbox', 'am-form-checked', 'checkbox'],
            _switch: ['am-form-switch', 'am-form-onswitch', 'switch']
        },
        checks = this.$element.find('input[type=checkbox]'),
        setCheckBoxSkin = function () {
            var check = $(this)
            ,reElem = this.skinElement
            ,RE_CLASS = this.skinClass
            ,filter = check.attr('data-filter')
            ,text = (check.attr('data-text') || '').split('|');
            reElem.hasClass(RE_CLASS[1]) ? (
              reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
            ) : (
                reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
            );
        };

    checks.each(function (index, check) {
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
        reElem.on('click', function () {
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

Form.prototype.radio = function () {
    var self = this;
    var CLASS = 'am-form-radio',
        ICON = ['&#xe67f;', '&#xe697;'],
        radios = this.$element.find('input[type=radio]'),
        setRadioSkin = function () {
            var radio = $(this),
                reElem = this.skinElement,
                ANIM = 'am-anim-scaleSpring',
                name = radio[0].name,
                forms = radio.parents(ELEM);
            var filter = radio.attr('data-filter'); //获取过滤器
            var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟
            self.each(sameRadio, function () {
                var next = $(this).next('.' + CLASS);
                //this.checked = false;
                next.removeClass(CLASS + 'ed');
                next.find('.icon').removeClass(ANIM).html(ICON[1]);
            });
            reElem.addClass(CLASS + 'ed');
            reElem.find('.icon').addClass(ANIM).html(ICON[0]);
        };

    radios.each(function (index, radio) {
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
        reElem.on('click', function () {
            $this.trigger('click');
            setRadioSkin.call($this[0]);
            //radio[0].checked = true;
        });
    }).on('click', function () {
        setRadioSkin.call(this);
    }).on('change', function () {
        setRadioSkin.call(this);
    });
};

Form.prototype.select = function () {
    var selects = this.$element.find('select');
    selects.each(function (index, select) {
        var $this = $(this);
        if (typeof $this.attr('data-ignore') === 'string') return;
        var $control = $this.selectize({
            plugins: ['remove_button'],
            delimiter: ',',
            persist: false,
            create: false,
            sortField: 'text',
            onInitialize: function () {
                this.$control_input.attr('data-v-excluded',true);
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

Form.prototype.widget =function() {
    $('[data-widget]').each(function () {
        var $this = $(this),
            widget = $this.attr('data-widget');
        switch (widget) {
            case "collapse":
                $this.on('click', function () {
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
                        }, function () {
                            $this.targetBox.open = 1;
                            //$this.targetBox.target.hide();
                        });
                    else
                        $this.targetBox.target.show().animate({
                            height: $this.targetBox.height
                        }, function () {
                            $this.targetBox.open = 0;
                            //$this.targetBox.target.css({height:'auto'});
                        });
                });
                break;
        }
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

// #region FormUtil

(function ($) {
    $.fn.asyncSubmit = function (opts) {
        if (typeof (opts) === 'function')
            opts = {
                success: opts
            };
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
                        value += ":" + $(this).val().replace(/:/gi, "：").replace(/,/gi, "，");
                    $check.val(value);
                });
            }
            this.goSubmit = function () {
                if (self.vm)
                    self.vm.submitting = true;
                var $button = $(self).find("input[type='submit'],button[type='submit']").prop('disabled', true),
                    buttonHtml = null;
                if ($button.is('button')) {
                    buttonHtml = $button.html();
                    $button.html('<i class="am-icon-circle-o-notch am-icon-spin"></i>正在提交...');
                }
                if (typeof (FormData) === 'function') {
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
                        }).done(function (result) {
                            if (self.vm)
                                self.vm.submitting = false;
                            if (result.succ) {
                                opts.success(result.data);
                                setTimeout(function () {
                                    $button.prop('disabled', false).html(buttonHtml);
                                }, 1000);
                            } else {
                                $button.prop('disabled', false).html(buttonHtml);
                                alert(result.data);
                            }
                        }).fail(function (data, textStatus, errorThrown) {
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
                        success: function (result) {
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
                classHandler: function (_el) {
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
            }).on('form:validated', function () {
                $.each(this.fields, function (key, field) {
                    if (field.validationResult === true)
                        field.$element.removeClass('am-field-error').addClass('am-field-valid');
                    else
                        field.$element.removeClass('am-field-success').addClass('am-field-error');
                });
            }).on('field:validated', function () {
                if (this.validationResult === true)
                    this.$element.removeClass('am-field-error').addClass('am-field-valid');
                else
                    this.$element.removeClass('am-field-success').addClass('am-field-error');
            });
        });
    };
    $.fn.fill = function (data) {
        var fillData = function (data, self, isfirst, targetKey) {
            for (var key in data) {
                if (data[key] === null) continue;
                if (typeof (data[key]) == "object" && !data[key].length) {
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
                $(inputs).each(function () {
                    var $this = $(this);
                    if (typeof ($this.attr('data-no-fill')) !== 'undefined') return;
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
                    }else if (this.nodeName === 'SELECT') {
                        this.selectize.setValue(data[key]);
                    } else {
                        $this.val(data[key]);
                        if ($this.hasClass('select2'))
                            $this.trigger('change.select2');
                    }
                });
            }
        };
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
