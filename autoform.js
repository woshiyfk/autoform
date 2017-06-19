




var autoFormFn = function () {

    var separateSign = ',';
    var autoFormOptions;
    var ignoreKeys;
    this.fillForm = function (formId, json, options) {
        var $form = $('#' + formId);
        autoFormOptions = options;
        if (autoFormOptions && autoFormOptions.ignore) {
        	if(typeof autoFormOptions.ignore === 'string'){ 
        		ignoreKeys = autoFormOptions.ignore.split(",");
        	}
    		else if(typeof autoFormOptions.ignore === 'object'){ 
    			ignoreKeys = autoFormOptions.ignore;
    		}
    		else console.log('ignore type is :' + typeof autoFormOptions.ignore);
    	};
        for (var key in json) {
        	if ( ignoreKeys && $.inArray(key,ignoreKeys)>-1) continue;

            var $tagobjs = $("[name=" + key + "]", $form);
            if ($tagobjs && $tagobjs.length > 0) {
                var jsonvalue = json[key];
                fillControl($tagobjs, jsonvalue);
            }
        }
    };
	
	this.clearForm = function(formId,otherfun){
		if(otherfun) otherfun(formId);
		document.getElementById(formId).reset();
		
		return false;
	}
	
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



