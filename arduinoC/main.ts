

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry {

    //% block="Sentry init addr [ADDR] mode [MODE]" blockType="command"
    //% ADDR.shadow="dropdown" ADDR.options="ADDR"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    export function Begin(parameter: any) {
        let addr = parameter.ADDR.code;
        let mode = parameter.MODE.code;

        Generator.addInclude("ArduinoInclude", "#include <Arduino.h>");
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");
        if (mode == 'i2c') {
            Generator.addInclude("WireInclude", "#include <Wire.h>");
            Generator.addObject("SentryObject", "Sentry", `sentry;`);
            Generator.addSetupMainTop("Wire.begin", `Wire.begin();`)
            Generator.addSetup("sentry.begin", `sentry.begin(${addr},&Wire);`);
        } else {
            Generator.addSetupMainTop("Serial3.begin", `${mode}.begin(9600);`)
            Generator.addSetup("sentry.begin", `sentry.begin(${addr},&uart);`);
        }
    }

    //% block="[VISION_STA] vision [VISION_TYPE]" blockType="command"
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
    //% block="get vision [VISION_TYPE] status" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry.GetValue(${vision_type})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number"
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% NUM.shadow="number"
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry.GetValue(kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% NUM.shadow="number"
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {
        let num = parameter.NUM.code;
        let obj = parameter.COdLOR_LABLE.code;
        Generator.addCode([`sentry.GetValue(kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="get 20 Class detected [NUM] [Class20_LABLE]" blockType="boolean"
    //% NUM.shadow="number"
    //% Class20_LABLE.shadow="dropdown" Class20_LABLE.options="Class20_LABLE"    
    export function GetClass20Lable(parameter: any) {
        let num = parameter.NUM.code;
        let obj = parameter.Class20_LABLE.code;
        Generator.addCode([`sentry.GetValue(kVision20Classes,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Card detected [NUM] [CARD_LABLE]" blockType="boolean"
    //% NUM.shadow="number"
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {
        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry.GetValue(kVisionCard,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Set [VISION_TYPE] Param [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry.SetParamNum(${vision_type},${num});`);
    }
    //% block="Set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% XVALUE.shadow="number" 
    //% YVALUE.shadow="number" 
    //% WIDTH.shadow="number" 
    //% HIGHT.shadow="number" 
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
        Generator.addCode(`sentry.SetParam(kVisionFace,&param,${num});`);
    }
    //% block="Set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [AIM_COLOR]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% WIDTH.shadow="number" 
    //% HIGHT.shadow="number" 
    //% AIM_COLOR.shadow="dropdown" AIM_COLOR.options="AIM_COLOR"
    export function SetBlobParam(parameter: any) {
        let num = parameter.NUM.code;
        let l = parameter.AIM_COLOR.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(kVisionFace,&param,${num});`);
    }
    //% block="Set face recognition [NUM] label [CARD_LABLE]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=0    NUM.params.max=25    NUM.defl=0
    //% CARD_LABLE.shadow="number"   CARD_LABLE.defl=0    
    export function SetFaceParam(parameter: any) {
        let num = parameter.NUM.code;
        let l = parameter.CARD_LABLE.code;
        Generator.addObject("param_obj", "sentry_object_t", `param;`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sentry.SetParam(kVisionFace,&param,${num});`);
    }
    //% block="Sentry restart" blockType="command"
    export function SensorSetRestart(parameter: any) {

        Generator.addCode(`sentry.SensorSetRestart();`);
    }

    //% block="Set the [LED] algorithm to detect a color of [LED_COLOR1] and not to detect a color of [LED_COLOR2]" blockType="command"
    //% LED.shadow="dropdown" LED.options="LED" 
    //% LED_COLOR1.shadow="dropdown" LED_COLOR1.options="LED_COLOR"
    //% LED_COLOR2.shadow="dropdown" LED_COLOR2.options="LED_COLOR"     
    export function LedSetColor(parameter: any) {
        let led = parameter.LED.code;
        let color1 = parameter.LED_COLOR1.code;
        let color2 = parameter.LED_COLOR2.code;

        Generator.addCode(`sentry.LedSetColor(${led},${color1},${color2});`);
    }

    //% block="Set camera [ZOOM]" blockType="command"
    //% ZOOM.shadow="dropdown" ZOOM.options="ZOOM" 
    export function CameraSetZoom(parameter: any) {
        let zoom = parameter.ZOOM.code;
        Generator.addCode(`sentry.CameraSetZoom(${zoom});`);
    }
    //% block="Set camera [ROTATE]" blockType="command"
    //% ROTATE.shadow="dropdown" ROTATE.options="ROTATE" 
    export function CameraSetRotate(parameter: any) {
        let rotate = parameter.ROTATE.code;
        Generator.addCode(`sentry.CameraSetRotate(${rotate});`);
    }

    //% block="Set camera [FPS]" blockType="command"
    //% FPS.shadow="dropdown" FPS.options="FPS" 
    export function CameraSetFPS(parameter: any) {
        let fps = parameter.FPS.code;
        Generator.addCode(`sentry.CameraSetFPS(${fps});`);
    }
    //% block="Set camera [AWB]" blockType="command"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry.CameraSetAwb(${awb});`);
    }

    //% block="Get camera Awb" blockType="reporter"
    export function CameraGetAwb(parameter: any) {

        Generator.addCode(["sentry.CameraGetAwb()", Generator.ORDER_UNARY_POSTFIX]);
    }
    //% block="Get camera rotate" blockType="reporter"
    export function CameraGetRotate(parameter: any) {

        Generator.addCode(["sentry.CameraGetRotate()", Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Get camera zoom" blockType="reporter"
    export function CameraGetZoom(parameter: any) {

        Generator.addCode(["sentry.CameraGetZoom()", Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Get camera FPS" blockType="boolean"
    export function CameraGetFPS(parameter: any) {
        Generator.addCode(["sentry.CameraGetFPS()", Generator.ORDER_UNARY_POSTFIX]);
    }
    //% block="Set uart baudrate [BUAD]" blockType="command"
    //% BUAD.shadow="dropdown" BUAD.options="BUAD" 
    export function UartSetBaudrate(parameter: any) {
        let buad = parameter.BUAD.code;
        Generator.addCode(`sentry.UartSetBaudrate(${buad});`);
    }

    //% block="set [VISION_TYPE] default" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"   
    export function VisionSetDefault(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry.VisionSetDefault(${vision_type});`);
    }

    //% block="Get [VISION_TYPE] Status" blockType="boolean"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    export function VisionGetStatus(parameter: any) {
        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode(`sentry.VisionGetStatus(${vision_type});`);
    }
    //% block="image height" blockType="reporter"
    export function rows(parameter: any) {

        Generator.addCode(["sentry.rows()", Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="image width" blockType="reporter"
    export function cols(parameter: any) {

        Generator.addCode(["sentry.cols()", Generator.ORDER_UNARY_POSTFIX]);
    }
}
