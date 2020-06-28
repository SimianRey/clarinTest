import React, {useState, useEffect} from 'react'
import SelectYear from '../components/SelectYear'
import Calendar from '../components/Calendar'
import axios from 'axios'
import {Row, Container, Alert} from 'react-bootstrap'
import EventDetails from './EventDetails'
import Spinner from '../components/Spinner'

let refresh = false;

const Main = () =>{
    const [year, setYear] = useState(2020)    
    const [holidays, setHolidays] = useState([])
    const [holiday, setHoliday] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect (()=>{ 
        setLoading(true)
        setError(null)
        let host = 'http://'+window.location.href.split('//')[1].split('/')[0] +'/'; 
        if ( process.env.NODE_ENV == 'development') {host = '/' } //On Develop Only       
        
        axios( `${host}feriados/anio/${year}`)
        .then(result => {
            if (result.data.statusCode == 200){
                setHolidays(result.data.body.payload) 
            } else {
                setError('Ups.... Nos se pudieron cargar los feriados, intente mas tarde !!!')
                console.log(`Get Data Failed. Error: ${result.data.body.err}`);
            }
            setLoading(false)

        })
        .catch( err => {
            setError('Ups.... Nos se pudieron cargar los feriados, intente mas tarde !!!')
            console.log('Get Data Failed. Error: ', err ) 
            setLoading(false)
        })
        return () => {
            setHolidays( [] )
           }
    },[year, refresh ])

    const showDetails  = (item) =>{
        // if (!item) return;  //Remove to Ignore 'Fecha Sin Feriado' Modal
        setHoliday( item || {} )
    }

    const saveSuccess = () =>{
        refresh = refresh ? false : true //To Force Refresh
        setHoliday(null)
    }
    
    return (
        <>
            <Spinner loading={loading}/>
            <SelectYear year={year} onChange={setYear}/> 
            {error ?  <Alert variant='danger'> {error} </Alert> : null }
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
                    <EventDetails holiday={holiday} onSave={saveSuccess} handleClose={()=>setHoliday(null)}
                        filter={['_id', 'dia', 'mes', 'anio']} />
                }
            </Container>
        </>
    )
}

export default Main