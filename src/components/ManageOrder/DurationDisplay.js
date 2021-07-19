import React, {useState,useEffect} from 'react'
import moment from 'moment'


const DurationDisplay = ({orderEndTime}) => {
    const [time, setTime] = useState(moment().valueOf())

    useEffect(() => {
        setTimeout(() => setTime(moment().valueOf()), 60000)
    }, [time])

    let duration = moment(orderEndTime).diff(moment())
    let durationPlusTen = moment(orderEndTime).subtract(10,'minutes').diff(moment())
    if(duration < 0){
        if(moment.utc(duration*-1).format('DD')==='01'){
            return <span style={{color: "red"}}>{moment.utc(duration*-1).format('HH ')}h&nbsp;&nbsp;{moment.utc(duration*-1).format('mm ')}min</span>
        }else{
            return <span style={{color: "red"}}>
                        {moment.utc(duration*-1).format('DD ')}d&nbsp;&nbsp;
                        {moment.utc(duration*-1).format('HH ')}h&nbsp;&nbsp;
                        {moment.utc(duration*-1).format('mm ')}min
                    </span>
        }
        //console.log(moment.utc(duration*-1).format('DD'))
    }else if(durationPlusTen < 0){
        return <span style={{color: "orange"}}>{moment.utc(duration).format('mm ') }min</span>
    }else{
        if(moment.utc(duration).format('HH')==='00'){
            return <span >{moment.utc(duration).format('mm ')}min</span>
        }else{
            return <span >{moment.utc(duration).format('HH ')}h&nbsp;&nbsp;{moment.utc(duration).format('mm ')}min</span>
        }
        
    }
    

} 

export default DurationDisplay