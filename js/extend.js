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