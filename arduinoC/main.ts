

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry {

    //% block="[SENTRY] init port [MODE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    export function Begin(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let mode = parameter.MODE.code;

        Generator.addInclude("ArduinoInclude", "#include <Arduino.h>");
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");

        if (mode == 'Wire') {
            Generator.addInclude("WireInclude", "#include <Wire.h>");   
            Generator.addObject(`sentry${sentry}.Object`, "Sentry2", `sentry${sentry}(0x6${sentry});`);
            Generator.addSetupMainTop("Wire.begin", `Wire.begin();`);      
        }else{
            Generator.addObject(`sentry${sentry}.Object`, "Sentry2", `sentry${sentry}(0x6${sentry});`);
        }

        Generator.addCode(`while (SENTRY_OK != sentry${sentry}.begin(&${mode})) {yield();}`);
    }

    //% block="[SENTRY] [VISION_STA] vision [VISION_TYPE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sentry${sentry}.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sentry${sentry}.VisionEnd(${vision_type});`);
        }

    }

    //% block="[SENTRY] Set [VISION_TYPE] Param [NUM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry${sentry}.SetParamNum(${vision_type},(int)${num});`);
    }
    //% block="[SENTRY] Set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% XVALUE.shadow="number"   XVALUE.defl=160
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    export function SetColorParam(parameter: any) {
        let sentry = parameter.SENTRY.code;
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
        Generator.addCode(`sentry${sentry}.SetParam(Sentry2::kVisionColor,&param,(int)${num});`);
    }
    //% block="[SENTRY] Set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [COLOR_LABLE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let l = parameter.COLOR_LABLE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry${sentry}.SetParam(Sentry2::kVisionBlob,&param,(int)${num});`);
    }
    //% block="[SENTRY] Set face recognition [NUM] label [CARD_LABLE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% CARD_LABLE.shadow="number"   CARD_LABLE.defl=0    
    export function SetFaceParam(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let l = parameter.CARD_LABLE.code;
        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry${sentry}.SetParam(Sentry2::kVisionFace,&param,(int)${num});`);
    }
    //% block="[SENTRY] set default" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function SensorSetDefault(parameter: any) {
        let sentry = parameter.SENTRY.code;

        Generator.addCode(`sentry${sentry}.SensorSetDefault();`);
    }

    //% block="[SENTRY] Set the LED algorithm to detect a color of [LED_COLOR1] and not to detect a color of [LED_COLOR2]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% LED_COLOR1.shadow="dropdown" LED_COLOR1.options="LED_COLOR"
    //% LED_COLOR2.shadow="dropdown" LED_COLOR2.options="LED_COLOR"     
    export function LedSetColor(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let color1 = parameter.LED_COLOR1.code;
        let color2 = parameter.LED_COLOR2.code;

        Generator.addCode(`sentry${sentry}.LedSetColor(${color1},${color2});`);
    }

    //% block="[SENTRY] Set camera [ZOOM]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% ZOOM.shadow="dropdown" ZOOM.options="ZOOM" 
    export function CameraSetZoom(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let zoom = parameter.ZOOM.code;
        Generator.addCode(`sentry${sentry}.CameraSetZoom(${zoom});`);
    }
    //% block="[SENTRY] Set camera [ROTATE]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% ROTATE.shadow="dropdown" ROTATE.options="ROTATE" 
    export function CameraSetRotate(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let rotate = parameter.ROTATE.code;
        Generator.addCode(`sentry${sentry}.CameraSetRotate(${rotate});`);
    }

    //% block="[SENTRY] Set camera [FPS]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% FPS.shadow="dropdown" FPS.options="FPS" 
    export function CameraSetFPS(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let fps = parameter.FPS.code;
        Generator.addCode(`sentry${sentry}.CameraSetFPS(${fps});`);
    }
    //% block="[SENTRY] Set camera [AWB]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry${sentry}.CameraSetAwb(${awb});`);
    }

    //% block="[SENTRY] Set uart baudrate [BUAD]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% BUAD.shadow="dropdown" BUAD.options="BUAD" 
    export function UartSetBaudrate(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let buad = parameter.BUAD.code;
        Generator.addCode(`sentry${sentry}.UartSetBaudrate(${buad});`);
    }

    //% block="[SENTRY] set [VISION_TYPE] default" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"   
    export function VisionSetDefault(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry${sentry}.VisionSetDefault(${vision_type});`);
    }

    //% block="[SENTRY] get vision [VISION_TYPE] status" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry${sentry}.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry${sentry}.GetValue(${vision_type},${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] get Qr value" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"  
    export function GetQrCodeValue(parameter: any) {
        let sentry = parameter.SENTRY.code;
        Generator.addCode([`sentry${sentry}.GetQrCodeValue()`, Generator.ORDER_UNARY_POSTFIX]);
    }


    //% block="[SENTRY] get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry${sentry}.GetValue(Sentry2::kVisionColor,${obj},(int)${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry${sentry}.GetValue(Sentry2::kVisionColor,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

        //% block="[SENTRY] Blob detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry${sentry}.GetValue(Sentry2::kVisionBlob,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] get 20 Class detected [NUM] [Class20_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry${sentry}.GetValue(Sentry2::kVision20Classes,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] Card detected [NUM] [CARD_LABLE]" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% NUM.shadow="number"
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry${sentry}.GetValue(Sentry2::kVisionCard,kLabel,(int)${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] Get [VISION_TYPE] Status" blockType="boolean"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    export function VisionGetStatus(parameter: any) {
        let sentry = parameter.SENTRY.code;
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry${sentry}.VisionGetStatus(${vision_type});`);
    }
    //% block="[SENTRY] image height" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function rows(parameter: any) {
        let sentry = parameter.SENTRY.code;

        Generator.addCode([`sentry${sentry}.rows()`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[SENTRY] image width" blockType="reporter"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    export function cols(parameter: any) {
        let sentry = parameter.SENTRY.code;

        Generator.addCode([`sentry${sentry}.cols()`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
