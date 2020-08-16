export function iteration(data:any[], workers:any[], id:number) : {start:number, end:number} {
    const per = Math.round(data.length/workers.length)
    const start = per * id
    const end = id+1 === workers.length ? data.length : per*(id+1)
    return {start, end}
}