

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry {
    //% block="Sentry init port [MODE] addr [ADDR]" blockType="command"
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

    //% block="Sentry [VISION_STA] vision [VISION_TYPE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
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

    //% block="Sentry set [VISION_TYPE] Param [NUM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},(int)${num});`);
    }
    //% block="Sentry set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=160
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
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
    //% block="Sentry set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [COLOR_LABLE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
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

    //% block="Sentry get vision [VISION_TYPE] status" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number"  VISION_ID.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get Qr value" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"  
    export function GetQrCodeValue(parameter: any) {

        Generator.addCode([`sentry.GetQrCodeValue()`, Generator.ORDER_UNARY_POSTFIX]);
    }


    //% block="Sentry get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionColor,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Blob detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionBlob,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry get 20 Class detected [NUM] [Class20_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVision20Classes,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry Card detected [NUM] [CARD_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(Sentry2::kVisionCard,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry image height" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function rows(parameter: any) {


        Generator.addCode([`sentry.rows()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry image width" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function cols(parameter: any) {


        Generator.addCode([`sentry.cols()`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
