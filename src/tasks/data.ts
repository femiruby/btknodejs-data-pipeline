import {Cmd, FileType, ForexData, Frame} from "../interface.js";
import {workerFileExist, writeWorkerFile} from "./file.js";
import {Instrument} from "../class.js";
import {Worker} from "worker_threads";
import {iteration} from "../iteration.js";

export async function dataFrom(year:number, frame:Frame, fileType:FileType, cmd:Cmd) {

    console.time("data task done")

    const exist = await workerFileExist({
        frame:Frame.H4,
        fileType: FileType.Data
    })

    if (!exist || cmd == Cmd.Force) {

        const workers = [
            1,2,3,4,5,6,7,8
        ].map(() => new Worker("./../tasks/data.worker.js" ))

        const instruments = (Instrument.getInstruments())


        workers.map((f,fi) => {
            const {
                start,
                end
            } = iteration(instruments, workers, fi)

            setTimeout(() => {
                f.postMessage({start,end, data:instruments, year})
            },100)
        })

        let res:any = {}
        instruments.map(f => res[f] = [])
        let fin = 0

        workers.map(f => {
            f.on("message",({data,done}:{data:ForexData[], done:boolean}) => {
                if (!done) {
                    data.map(d => {
                        res[d.instrument] = [...res[d.instrument], ...d.candles]
                    })
                } else {
                    fin++
                }

                if (fin === workers.length) {
                    writeWorkerFile(FileType.Data, Frame.H4, res).then(() => {
                        workers.map(f => f.terminate())
                        console.timeEnd("data task done")
                    })
                }
            })
            f.on("error", err => {throw err})
        })
    }
}

