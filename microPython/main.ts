
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace Sentry {

    //% block="Sentry init CLK [CLKPIN] DIO [DIOPIN]" blockType="command"
    //% CLKPIN.shadow="dropdown" CLKPIN.options="CLKPIN"
    //% DIOPIN.shadow="dropdown" DIOPIN.options="DIOPIN"
    export function SentryInit(parameter: any){
        let clk=parameter.CLKPIN.code;
        let dio=parameter.DIOPIN.code;

        Generator.addInclude("SentryInclude","#include <SevenSegmentSentry.h>");
        Generator.addInclude("SentryIncludeExtended","#include <SevenSegmentExtended.h>");
        Generator.addObject("SentryObject","SevenSegmentExtended",`Sentry(${clk},${dio});`);
        Generator.addSetup("SentryInit",`Sentry.begin();`);
        
    }

    //% block="Sentry Display [STR]" blockType="command"
    //% STR.shadow="string" STR.defl="1234"
    export function SentryDisplayPOS(parameter:any){
        
        let str=parameter.STR.code;
        Generator.addCode(`Sentry.print(${str});`);
    }

    //% block="Sentry Clear" blockType="command"
    export function SentryClear(parameter:any){
        
        Generator.addCode(`Sentry.clear();`);
    }

    //% block="Sentry Display Time [TIME]:[MIN] COLON [COLON]"
    //% TIME.shadow="range" TIME.params.min="0" TIME.params.max="23" TIME.defl="12" 
    //% MIN.shadow="range" MIN.params.min="0" MIN.params.max="59" MIN.defl="30" 
    //% COLON.shadow="dropdownRound" COLON.options="COLON"
    export function SentryDisplayTime(parameter:any){
        let tm=parameter.TIME.code;
        let min=parameter.MIN.code;
        let col=parameter.COLON.code;
       
        Generator.addCode(`Sentry.printTime(${tm},${min},${col});`)
    }

   
}
