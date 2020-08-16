import {Frame, InstrumentName} from "./interface.js";

export class Instrument {

    name: InstrumentName;


    constructor(name:InstrumentName) {
        this.name = name
    }

    instrumentFrame(frame:Frame){
        return `${this.name}-${frame}`
    }

    static getInstruments(){
        let res = []
        for (let i in InstrumentName){
            res.push(i as InstrumentName)
        }
        return res
    }

}
