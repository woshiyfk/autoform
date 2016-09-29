


$(function () {
    $('.select2').select2({ placeholder: 'select a number', allowClear: true, minimumResultsForSearch: -1 });
    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $('.datetime').datetimepicker({
        locale: 'zh-cn',
        format: 'YYYY-MM-DD'
    });
    var jsonobj = { UserName: 'Messi', Club: 'lazio', BackNumber: '10', Postion: 'cf,st', Birthday: '2016-03-04' };

    $('#btnok').click(function () {
        //var autoform = autoFormFn();
        //autoform('form1', jsonobj);

        autoform.fillForm('form1', jsonobj);

        return false;
    });

    $('#btnok2').click(function () {
        //autoform.chuangCheckBoxFun(function (control, value, jsonvalue) {
        //    $(control).iCheck('check');
        //});
        //autoform.chuangRadioFun(function (control, value, jsonvalue) {
        //    $(control).iCheck('check');
        //});
        //autoform.chuangSelectFun(function (control, jsonvalue) {
        //    $(control).val(jsonvalue).trigger("change");
        //});
        autoform.fillForm('form2', jsonobj, {
            changeCheckBox: function (control, value, jsonvalue) {
                $(control).iCheck('check');
            },
            changeRadio: function (control, value, jsonvalue) {
                $(control).iCheck('check');
            },
            changeSelect: function (control, jsonvalue) {
                $(control).val(jsonvalue).trigger("change");
            },
            changeText: function (control, jsonvalue) {
                $(control).val('i\'m ' + jsonvalue);
            }
        });

    });
});

var autoFormFn = function () {

    var separateSign = ',';
    var autoFormOptions;
    this.fillForm = function (formId, json, options) {
        var $form = $('#' + formId);
        autoFormOptions = options;
        for (var key in json) {
            var $tagobjs = $("[name=" + key + "]", $form);
            if ($tagobjs && $tagobjs.length > 0) {
                var jsonvalue = json[key];
                fillControl($tagobjs, jsonvalue);
            }
        }
    };

    this.chuangRadioFun = function (fun) {
        defaultSetRadioValue = fun;
    };

    this.chuangCheckBoxFun = function (fun) {
        defaultSetCheckBoxValue = fun;
    };

    this.chuangSelectFun = function (fun) {
        defaultSetSelectValue = fun;
    };

    this.chuangTextFun = function (fun) {
        defaultSetTextValue = fun;
    };

    var defaultSetCheckBoxValue = function (control, value, jsonvalue) {
        control.checked = value;
    };

    var defaultSetRadioValue = function (control, value, jsonvalue) {
        control.checked = value;
    };

    var defaultSetSelectValue = function (control, value) {
        $(control).val('' + value);
    };

    var defaultSetTextValue = function (control, value) {

        $(control).val('' + value);
    };

    var fillCheckBox = function (control, jsonvalue) {
        var val = ('' + jsonvalue).split(separateSign);
        if (val.length > 0) {
            var controlVal = $(control).val();
            for (var i = 0; i < val.length; i++) {
                if (controlVal == val[i]) {
                    if (autoFormOptions) {
                        if (autoFormOptions.changeCheckBox) {
                            autoFormOptions.changeCheckBox(control, true, jsonvalue);
                            continue;
                        }
                    }
                    defaultSetCheckBoxValue(control, true, jsonvalue);
                    continue;
                }
            }
        }

    };

    var fillRadio = function (control, jsonvalue) {

        if (jsonvalue) {
            var val = '' + jsonvalue;
            if ($(control).val() === jsonvalue) {
                if (autoFormOptions) {
                    if (autoFormOptions.changeRadio) {
                        autoFormOptions.changeRadio(control, true, jsonvalue);
                        return;
                    }
                }
                defaultSetRadioValue(control, true, jsonvalue);
            }
        }
    };

    var fillSelect = function (control, jsonvalue) {
        if (jsonvalue) {
            if (autoFormOptions) {
                if (autoFormOptions.changeSelect) {
                    autoFormOptions.changeSelect(control, '' + jsonvalue);
                    return;
                }
            }
            defaultSetSelectValue(control, '' + jsonvalue);
        }
    };

    var fillText = function (control, jsonvalue) {
        if (jsonvalue) {
            if (autoFormOptions) {
                if (autoFormOptions.changeText) {
                    autoFormOptions.changeText(control, jsonvalue);
                    return;
                }
            }
            defaultSetTextValue(control, jsonvalue);
        }
    };

    var fillControl = function ($controls, jsonvalue) {
        $controls.each(function (key, control) {
            try {
                var ctype = $(control).attr('type');
                if (ctype) ctype = ctype.toLocaleLowerCase();
                if (ctype === 'checkbox') fillCheckBox(control, jsonvalue);
                else if (ctype === 'radio') fillRadio(control, jsonvalue);
                else if (control.tagName.toLocaleLowerCase() === 'select') fillSelect(control, jsonvalue);
                else {
                    fillText(control, jsonvalue);
                }
            }
            catch (ex) {
                console.log();
            }
        });
    };

};

var autoform = new autoFormFn();



