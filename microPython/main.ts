

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry2 {
    //% block="Sentry2 init port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        if (Generator.board === 'esp32') {
            Generator.addImport("from mpython import *");
        }
        else if (Generator.board === 'microbit') {
            Generator.addImport("from microbit import *");
        }

        Generator.addImport("from Sentry import *");
        Generator.addDeclaration(`sentryObject`, `sentry = Sentry2(${addr})`, true);
        Generator.addCode(`sentry.begin(${mode})`);
    }

    //% block="Sentry2 Set camera [AWB]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry.CameraSetAwb(${awb})`);
    }

    //% block="Sentry2 [VISION_STA] vision [VISION_TYPE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;

        if (vision_sta == "ON") {
            Generator.addCode(`sentry.VisionBegin(${vision_type})`);
        } else {
            Generator.addCode(`sentry.VisionEnd(${vision_type})`);
        }
    }

    //% block="Sentry2 set [VISION_TYPE] Param [NUM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},${num})`);
    }

    //% block="Sentry2 set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
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

        Generator.addCode(`sentry.SetParam(sentry2_vision_e.kVisionColor,[${x}, ${y}, ${w}, ${h}, 0],${num})`);
    }

    //% block="Sentry2 set [VISION_TYPE] param index [NUM] param1 [XVALUE] param2 [YVALUE] param3 [WIDTH] param4 [HIGHT] param5 [COLOR_LABLE]"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
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

        Generator.addCode(`sentry.SetParam(${vision_type},[${x}, ${y}, ${w}, ${h}, 0],${num})`);
    }

    //% block="Sentry2 set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [COLOR_LABLE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let num = parameter.NUM.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addCode(`sentry.SetParam(sentry2_vision_e.kVisionBlob,[0, 0, ${w}, ${h}, ${l}],${num})`);
    }

    //% block="Sentry2 get vision [VISION_TYPE] status" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type}, sentry_obj_info_e.kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number" VISION_ID.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get [VISION_TYPE] [VISION_ID] [OBJ_GEN_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number" VISION_ID.defl=1
    //% OBJ_GEN_INFO.shadow="dropdown" OBJ_GEN_INFO.options="OBJ_GEN_INFO"    
    export function GetGenValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_GEN_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get Qr value" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"  
    export function GetQrCodeValue(parameter: any) {

        Generator.addCode([`sentry.GetQrCodeValue()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get Line [NUM] [OBJ_LINE_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_LINE_INFO.shadow="dropdown" OBJ_LINE_INFO.options="OBJ_LINE_INFO"    
    export function GetLineValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_LINE_INFO.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVisionLine,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVisionColor,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 Blob detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVisionBlob,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 get 20 Class detected [NUM] [Class20_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVision20Classes,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry2 Card detected [NUM] [CARD_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(sentry2_vision_e.kVisionCard,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
