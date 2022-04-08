/*!
 * dzCityPicker 1.0.1
 * a citypicker plugin base on jQuery and bootstrap
 * @author : venice
 * @Date : 2022-04-01
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {
    "use strict";
    $.dzCityPicker = $.dzCityPicker || {};
    $.extend($.dzCityPicker, {
        // 构造方法
        init: function (settings) {
            var defaultSettings = {
                defaultVal: '',
                separator: '-',
                currProv: {},
                currCity: {},
                currDist: {},
                setVal: function (value) {
                },
                disabled: function (disabled) {
                }
            };

            var me = $(this[0]);

            if (me == undefined || me[0] == undefined) {
                return false;
            }
            var meId = me.attr("id");
            // console.log(meId);

            // 用传进来的参数覆盖默认，没传则保留
            me[0].conf = $.extend({}, defaultSettings, settings || {});

            if (me[0].conf.id == undefined || me[0].conf.id == '') {
                me[0].conf.id = meId;
            }

            var conf = me[0].conf;

            var w = me.parent().width() >= 300 ? me.parent().width() : 300;

            me.prop("readonly", true);
            me.addClass("dzCityPicker");
            me.wrap('<div class="dzCityPicker input-group">');
            me.after('<span id="dzCityPickerBtn_' + meId + '" class="input-group-addon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="height: ' + me.css('height') + '">' +
                '<span class="glyphicon glyphicon-chevron-down"></span>' +
                '</span>' +
                '<ul class="dzCityPicker dropdown-menu" id="dzCityPickerUl_' + meId + '" style="width: ' + w + 'px;">' +
                '</ul>');

            var container = $("#dzCityPickerUl_" + meId);
            // 点击不关闭
            container.on("click", "[data-stopPropagation]", function (e) {
                e.stopPropagation();
            });
            container.html('<div class="nav-tabs-custom" data-stopPropagation="true">' +
                '            <ul class="nav nav-tabs" id="dzCityPickerTab_' + meId + '">' +
                '              <li class="active"><a href="#dzCityPicker_' + meId + '_tab_prov" data-toggle="tab">省份</a></li>' +
                '              <li><a href="#dzCityPicker_' + meId + '_tab_city" data-toggle="tab">城市</a></li>' +
                '              <li><a href="#dzCityPicker_' + meId + '_tab_dist" data-toggle="tab">县区</a></li>' +
                '            </ul>' +
                '            <div class="tab-content">' +
                '              <div class="tab-pane dzCityPicker_city province active" id="dzCityPicker_' + meId + '_tab_prov"></div>' +
                '              <div class="tab-pane dzCityPicker_city" id="dzCityPicker_' + meId + '_tab_city">' +
                '              </div>' +
                '              <div class="tab-pane dzCityPicker_city" id="dzCityPicker_' + meId + '_tab_dist">' +
                '              </div>' +
                '            </div>' +
                '          </div>');

            $("#dzCityPickerTab_" + meId + " a").on("click", function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            if (ChineseDistricts != undefined) {
                var provStr = '<dl class="dl-horizontal">';
                var provList = ChineseDistricts['86'];
                var indexStr = 'A-G';
                provStr += '<dt>' + indexStr + '</dt><dd>';
                for (var i = 0; i < provList[indexStr].length; i++) {
                    provStr += '<a code="' + provList[indexStr][i].code + '">' + provList[indexStr][i].address + '</a>';
                }
                provStr += '</dd>';
                indexStr = 'H-K';
                provStr += '<dt>' + indexStr + '</dt><dd>';
                for (var i = 0; i < provList[indexStr].length; i++) {
                    provStr += '<a code="' + provList[indexStr][i].code + '">' + provList[indexStr][i].address + '</a>';
                }
                provStr += '</dd>';
                indexStr = 'L-S';
                provStr += '<dt>' + indexStr + '</dt><dd>';
                for (var i = 0; i < provList[indexStr].length; i++) {
                    provStr += '<a code="' + provList[indexStr][i].code + '">' + provList[indexStr][i].address + '</a>';
                }
                provStr += '</dd>';
                indexStr = 'T-Z';
                provStr += '<dt>' + indexStr + '</dt><dd>';
                for (var i = 0; i < provList[indexStr].length; i++) {
                    provStr += '<a code="' + provList[indexStr][i].code + '">' + provList[indexStr][i].address + '</a>';
                }
                provStr += '</dd>';
                provStr += '</dl>';
                $("#dzCityPicker_" + meId + "_tab_prov").html(provStr);
            }
            $("#dzCityPicker_" + meId + "_tab_prov a").on("click", function () {
                // console.log($(this).attr("code"));
                $(this).addClass("active");
                me.dzCityPicker('provChange', $(this).attr("code"), $(this).html());
            });

            me.dzCityPicker('setVal', conf.defaultVal);

            $("#dzCityPickerBtn_" + meId).on('click', function () {
                me.dzCityPicker('setVal', me.val());
            })
        },
        provChange: function (provCode, provName) {
            // console.log(provCode + "===" + provName);
            var me = $(this[0]);
            var conf = me[0].conf;
            conf.currProv = {code: provCode, name: provName};
            conf.currCity = {};
            conf.currDist = {};
            me.val(provName);
            if (ChineseDistricts != undefined) {
                var str = '<dl class="dl-horizontal"><dd>';
                var cityObj = ChineseDistricts[provCode];
                for (var code in cityObj) {
                    str += '<a code="' + code + '">' + cityObj[code] + '</a>';
                }
                str += '</dd></dl>';
                $("#dzCityPicker_" + conf.id + "_tab_city").html(str);
            }
            $("#dzCityPickerTab_" + conf.id + " li:eq(1) a").tab('show');
            $("#dzCityPicker_" + conf.id + "_tab_city a").on("click", function () {
                // console.log($(this).attr("code"));
                $(this).addClass("active");
                me.dzCityPicker('cityChange', $(this).attr("code"), $(this).html());
            });
            me.trigger("change");
        },
        cityChange: function (cityCode, cityName) {
            // console.log(cityCode + "===" + cityName);
            var me = $(this[0]);
            var conf = me[0].conf;
            conf.currCity = {code: cityCode, name: cityName};
            conf.currDist = {};
            me.val(conf.currProv.name + conf.separator + cityName);
            if (ChineseDistricts != undefined) {
                var str = '<dl class="dl-horizontal"><dd>';
                var cityObj = ChineseDistricts[cityCode];
                for (var code in cityObj) {
                    str += '<a code="' + code + '">' + cityObj[code] + '</a>';
                }
                str += '</dd></dl>';
                $("#dzCityPicker_" + conf.id + "_tab_dist").html(str);
            }
            $("#dzCityPickerTab_" + conf.id + " li:eq(2) a").tab('show');
            $("#dzCityPicker_" + conf.id + "_tab_dist a").on("click", function () {
                // console.log($(this).attr("code"));
                $(this).addClass("active");
                me.dzCityPicker('distChange', $(this).attr("code"), $(this).html());
            });
            me.trigger("change");
        },
        distChange: function (distCode, distName) {
            // console.log(distCode + "===" + distName);
            var me = $(this[0]);
            var conf = me[0].conf;
            conf.currDist = {code: distCode, name: distName};
            me.val(conf.currProv.name + conf.separator + conf.currCity.name + conf.separator + distName);
            $(this).addClass("active");
            $("#dzCityPickerUl_" + conf.id).trigger("click");
            me.trigger("change");
        },
        setVal: function (value) {
            // console.log('dzCityPicker.setVal.value=' + value);
            var me = $(this[0]);
            if (me == undefined || me[0] == undefined) {
                console.log('element not bind dzCityPicker');
                return false;
            }
            var conf = me[0].conf;
            if (conf == undefined) {
                console.log('element not bind dzCityPicker');
                return false;
            }
            if (value == undefined) {
                return false;
            }
            var arr = value.split(conf.separator);
            // console.log(arr.length);
            if (arr.length > 0) {
                if (arr[0] == "") {
                    $("#dzCityPickerTab_" + conf.id + " li:eq(0) a").tab('show');
                    $("#dzCityPicker_" + conf.id + "_tab_city").html('');
                    $("#dzCityPicker_" + conf.id + "_tab_dist").html('');
                    me.val('');
                }
                $("#dzCityPicker_" + conf.id + "_tab_prov a").each(function () {
                    // console.log($(this).html() + "===" + arr[0]);
                    if ($(this).html() == arr[0]) {
                        $(this).addClass("active");
                        me.dzCityPicker('provChange', $(this).attr("code"), $(this).html());
                    } else {
                        $(this).removeClass("active");
                    }
                });
            }
            if (arr.length > 1) {
                $("#dzCityPicker_" + conf.id + "_tab_city a").each(function () {
                    // console.log($(this).html() + "===" + arr[1]);
                    if ($(this).html() == arr[1]) {
                        $(this).addClass("active");
                        me.dzCityPicker('cityChange', $(this).attr("code"), $(this).html());
                    } else {
                        $(this).removeClass("active");
                    }
                });
            }
            if (arr.length > 2) {
                $("#dzCityPicker_" + conf.id + "_tab_dist a").each(function () {
                    if ($(this).html() == arr[2]) {
                        $(this).addClass("active");
                        me.dzCityPicker('distChange', $(this).attr("code"), $(this).html());
                    } else {
                        $(this).removeClass("active");
                    }
                });
            }
        },
        disabled: function (disabled) {
            var me = $(this[0]);
            if (me == undefined || me[0] == undefined) {
                console.log('element not bind dzCityPicker');
                return false;
            }
            var conf = me[0].conf;
            if (conf == undefined) {
                console.log('element not bind dzCityPicker');
                return false;
            }
            me.prop("disabled", disabled);
            $("#dzCityPickerBtn_" + conf.id).prop("disabled", disabled);
        }
    });
    $.fn.dzCityPicker = function (args) {
        if ($.dzCityPicker[args]) {
            return $.dzCityPicker[args].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof args === 'object' || !args) {
            return $.dzCityPicker.init.apply(this, arguments);
        } else {
            $.error('Method' + args + 'does not exist on dzCityPicker');
        }
    };
})(jQuery, window, document);
