import {FileType, FileId, Frame, InstrumentName, Candle} from "../interface.js";
import {Instrument} from "../class.js";
import fs from "fs"
import readline from "readline"

interface WorkerFileExist {
    fileType: FileType,
    frame: Frame,
}
interface WorkerFile {
    fileType: FileType,
    fileId: FileId
}
interface GetFileId {
    instrument:Instrument,
    frame: Frame,
}
export function workerFileExist({frame,fileType}:WorkerFileExist) : Promise<boolean> {
    return new Promise((res,rej) => {
        readWorkerFile({frame,fileType}).then(() => res(true)).catch(() => res(false))
    })
}

export function writeWorkerFile(fileType:FileType, frame:Frame, data:any) {
    return new Promise((rs,rj) => {
        Object.keys(data).map((f:string,i,a) => {
            const fileId = getFileId({instrument:new Instrument(f as InstrumentName), frame})
            const {data:dataFile} = getWorkerFile({fileType, fileId})

            const stream = fs.createWriteStream(dataFile)
            stream.on("error", rj)
            stream.on("close", () => {
                if (i == a.length -1 ){
                    rs(true)
                }
            })

            data[f].map((d:Candle) => {
                const b = Buffer.from(JSON.stringify(d),"utf8")
                stream.write(b+"\n")
            })

            stream.end()
        })
    })
}

export async function readWorkerFile({frame, fileType}:WorkerFileExist) {
    return new Promise((res,rej) => {
        const instruments = Instrument.getInstruments()

        const files = instruments.map(f => {
            const fileId = getFileId({
                instrument:new Instrument(f),
                frame
            })
            return getWorkerFile({
                fileType,
                fileId
            })
        })

        Promise.all(
            files.flatMap((f,i) => {
                return [
                    fileExist(f.data)
                ]
            })
        ).then(promise => {
            res(promise)
        }).catch(e => {
            rej(e)
        })
    })
}


function getWorkerFile(args:WorkerFile) : {data:string} {
    const {fileId, fileType} = args
    let workerDir;

    switch (process.platform) {
        case "win32": {
            workerDir = "C:\\myData\\nodejs\\"
            break
        }
        case "linux": {
            workerDir = "myData\\nodejs\\"
            break
        }
        default: {
            throw Error("unknown platform "+process.platform)
        }
    }


    const dataFile = `${workerDir}${fileType}-${fileId}.data`

    return {
        data:dataFile,
    }
}

export function dataDir(){
    switch (process.platform) {
        case "win32": {
            return "C:\\myData\\nodejs\\"
        }
        case "linux": {
            return "myData\\nodejs\\"
        }
        default: {
            throw Error("unknown platform "+process.platform)
        }
    }
}

async function fileExist(filename:string) : Promise<any> {
    return new Promise((res,rej) => {

        let data:string[] = []
        const stream = fs.createReadStream(filename)
        stream.on("error", err => {
            rej(err)
        })
        const rl = readline.createInterface({
            input: stream
        })

        rl.on("line", (line) => data.push(line))
        rl.on("close", () => {

            res(data)
        })
        rl.on("error", (err) => {
            rej(err)
        })
    })
}


function getFileId(args:GetFileId) : FileId{
    return `${args.instrument.name}-${args.frame}`
}