import React from 'react'
import {Col} from 'react-bootstrap'
import CalendarLayout from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Calendar = props =>{
    let dateToday = new Date(props.year, props.month, 1)

    const selectEvent = (date) =>{
        let event = props.events.find( e=> e.dia == date.getUTCDate())
        props.onClick(event)
    }

    return (
        <Col lg={4} md={6} xs={12}>
            <CalendarLayout
            value={dateToday}
            showNavigation={false}
            showNeighboringMonth={false}
            onChange={selectEvent}
            locale={'es'}
            tileClassName={({ date, view }) => {
                props.events.find( e => e.dia == date.getDate() )
                    let event = props.events.find( e => e.dia == date.getDate() )  
                    if ( event ){
                        switch (event.tipo) { //Set colors for differents types
                            case 'inamovible':
                                return 'customDate2'
                            default:
                                return 'customDate1'
                        }
                    } else {
                        return 'noHighlight'
                    }                   
                }}
            />
            <br/>
        </Col>
    )
}

export default Calendar