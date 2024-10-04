

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry2 {
    //% block=" Initialize   Sentry2   port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        Generator.addInclude("ArduinoInclude", "#include <Arduino.h>");
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");

        Generator.addObject(`sentry.Object`, "Sentry2", `sentry(${addr});`);

        if (mode == 'Wire') {
            Generator.addInclude("WireInclude", "#include <Wire.h>");
            Generator.addSetupMainTop("Wire.begin", `Wire.begin();`);
        }

        Generator.addCode(`while (SENTRY_OK != sentry.begin(&${mode})) {yield();}`);
    }

    //% block=" Set   Sentry2   white balance mode [AWB]" blockType="command"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry.CameraSetAwb(${awb});`);
    }

    //% block=" Set   Sentry2   [VISION_STA]   algo [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sentry.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sentry.VisionEnd(${vision_type});`);
        }

    }

    //% block=" Set   Sentry2   algo[VISION_TYPE]    [NUM] sets of params" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM" VISION_TYPE.defl="Sentry2::kVisionColor"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},(int)${num});`);
    }

    //% block=" Set   Sentry2   algo Color   x-coord[XVALUE] y-coord [YVALUE] width[WIDTH] height[HIGHT] paramset[NUM]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=150
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    export function SetColorParam(parameter: any) {

        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.x_value = ${x};`);
        Generator.addCode(`param.y_value = ${y};`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`sentry.SetParam(Sentry2::kVisionColor,&param,(int)${num});`);
    }
    //% block=" Set   Sentry2   algo Blob   min-width[WIDTH] min-height[HIGHT] color [COLOR_LABLE] paramset[NUM]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let num = parameter.NUM.code;
        let l = parameter.COLOR_LABLE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(Sentry2::kVisionBlob,&param,(int)${num});`);
    }

    
    //% block=" Set   Sentry2   algo [VISION_TYPE]   param1 [XVALUE] param2 [YVALUE] param3 [WIDTH] param4 [HIGHT] param5 [COLOR_LABLE] paramset[NUM]"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=0
    //% YVALUE.shadow="number"   YVALUE.defl=0
    //% WIDTH.shadow="number"   WIDTH.defl=0
    //% HIGHT.shadow="number"   HIGHT.defl=0
    //% COLOR_LABLE.shadow="number"   COLOR_LABLE.defl=0
    export function SetVisionParam(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.x_value = ${x};`);
        Generator.addCode(`param.y_value = ${y};`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(${vision_type},&param,(int)${num});`);
    }

    //% block="  Sentry2   algo[VISION_TYPE]   num of results" blockType="reporter" 
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    
    //% block="  Sentry2   algo Color   [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }
    
    //% block="  Sentry2   algo[VISION_TYPE]    [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sentry2   algo Line    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE"    
    export function GetLineValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionLine,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sentry2   algo QrCode    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR"    
    export function GetQrCodeValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionQrCode,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sentry2   algo QrCode   string   of decoding result" blockType="reporter"
    export function GetQrCodeValueStr(parameter: any) {

        Generator.addCode([`String(sentry.GetQrCodeValueStr())`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sentry2   algo [VISION_TYPE]    [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_CUSTOM"
    //% NUM.shadow="number"  NUM.defl=0
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_CUSTOM"    
    export function GetCustomValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }
        
    //% block=" Sentry2   algo Color   recognized [COLOR_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sentry2   algo Blob   detected [COLOR_LABLE] blob result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionBlob,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sentry2   algo Card   recognized [CARD_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionCard,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
    
    //% block=" Sentry2   algo 20Class   recognized [Class20_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVision20Classes,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
