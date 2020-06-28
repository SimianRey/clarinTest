import React, {useState, useEffect} from 'react'
import SelectYear from '../components/SelectYear'
import Calendar from '../components/Calendar'
import axios from 'axios'
import {Row, Container} from 'react-bootstrap'
import EventDetails from './EventDetails'


const Main = () =>{
    const [year, setYear] = useState(2020)
    const [holidays, setHolidays] = useState([])
    const [holiday, setHoliday] = useState(null)

    useEffect (()=>{
        let host = 'http://'+window.location.href.split('//')[1].split('/')[0] +'/'; 
        if ( process.env.NODE_ENV == 'development') {host = '/' } //On Develop Only
        
        
        axios( `${host}feriados/anio/${year}`)
        .then(result => setHolidays(result.data.body.payload) )
        .catch( err => console.log('Req Error', err ) )
    },[year])

    useEffect( ()=> {
    }, [holidays]) 

    const showDetails  = (item) =>{
        setHoliday(item || {})
    }
    
    const hideDetails  = (item) =>{
        setHoliday(null)
    }
    
    const saveDetails  = (item) =>{ //TODO
        console.log('item ', item);
        setHoliday(null)
    }


    return (
        <>
        <SelectYear year={year} onChange={setYear}/> 
        <Container>
            <Row className="justify-content-md-center">
            {
                Object.keys(holidays).map(m => {
                    return (
                        <Calendar  key={'key'+m}
                            month={m} year={year} events={holidays[m]}
                            onClick={showDetails}
                            />
                    )
                } )
            }
            </Row>
            {
                <EventDetails holiday={holiday} onSave={saveDetails} handleClose={hideDetails}
                    filter={['_id', 'dia', 'mes', 'anio']} />
            }
        </Container>
        </>
    )
}

export default Main