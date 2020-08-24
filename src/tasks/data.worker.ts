import {OANDA_ENDPOINT, OANDA_TOKEN} from "../constants.js";
import {parentPort} from "worker_threads";
import https from "https";

parentPort?.on("message", ({start,end,data,year}:{start:number,end:number,data:any[],year:number})  => {
    // from "year" to "now" in months
    let months = (new Date().getFullYear()-year)*12
    months += new Date().getMonth()
    let monthsI = 1, yearI = 0;

    function main(){
        // set dates
        let fromDate: string, toDate : string;
        if (monthsI%12 == 0) {
            fromDate = `${year+yearI}-12-1`
            yearI++
            toDate = `${year+yearI}-${(monthsI%12)+1}-1`
        } else {
            fromDate = `${year+yearI}-${monthsI%12}-1`
            toDate = `${year+yearI}-${(monthsI%12)+1}-1`
        }

        // set urls
        const instruments = data.filter((f,i) => i >= start && i < end)
        const urls = instruments.map(f => {
            if (months == monthsI) {
                return `${OANDA_ENDPOINT}/v3/instruments/${f}/candles?granularity=H4&alignmentTimezone=UTC&count=1000&smooth=false&price=BAM`
            } else {
                return `${OANDA_ENDPOINT}/v3/instruments/${f}/candles?granularity=H4&alignmentTimezone=UTC&from=${fromDate}&to=${toDate}&smooth=false&price=BAM`
            }
        })

        const options = {
            headers: {Authorization: `Bearer ${OANDA_TOKEN}`, "content-type":"application/json"},
        }

        Promise.all(
            urls.map((f,i) => {
                return new Promise((rs, rj) => {
                    // setTimeout to stop too many requests per second api error
                    setTimeout(() => {
                        https.get(f,options,resp => {
                            if (resp.statusCode !== 200) { rj(new Error(`status code ${resp.statusCode}`)) }
                            else {
                                let chunks : any = "";
                                resp.on("data", chunk => chunks+=chunk)
                                resp.on("end", () => {
                                    rs(JSON.parse(chunks))
                                })
                            }
                        }).on("error", er => rj(er)).end()
                    }, i*50)
                }).catch(err => { throw err })
            })
        ).then(f => {
            parentPort?.postMessage({data:f, done:false})
            monthsI++
            if (monthsI < months) {
                main()
            } else {
                parentPort?.postMessage({data:{}, done:true})
            }
        }).catch(err => {
            throw err
        })
    }
    main()
})
