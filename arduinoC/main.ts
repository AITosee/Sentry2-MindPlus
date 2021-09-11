
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace Sentry {

    //% block="Sentry init addr [ADDR] mode [MODE]" blockType="command"
    //% ADDR.shadow="dropdown" ADDR.options="ADDR"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    export function SentryBegin(parameter: any){
        let addr=parameter.ADDR.code;
        let mode=parameter.MODE.code;

        Generator.addInclude("ArduinoInclude","#include <Arduino.h>");
        Generator.addInclude("SentryInclude","#include <Sentry.h>");
        if (mode == 'i2c') {
            Generator.addInclude("WireInclude","#include <Wire.h>");        
            Generator.addObject("SentryObject","Sentry",`sentry;`);
            Generator.addSetupMainTop("Wire.begin",`Wire.begin();`)
            Generator.addSetup("sentry.begin",`sentry.begin(${addr},&Wire);`);            
        } else {
            Generator.addSetupMainTop("Serial3.begin",`${mode}.begin(9600);`)
            Generator.addSetup("sentry.begin",`sentry.begin(${addr},&uart);`);             
        }   
    }

    //% block="Sentry Clear" blockType="command"
    export function SentryVisionBegin(parameter:any){
        
        Generator.addCode(`sentry.VisionBegin(VISION_MASK);`);
    }
}
