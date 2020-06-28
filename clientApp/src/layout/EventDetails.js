import React, {useState, useEffect, useCallback} from 'react'
import {Modal, Button, Alert} from 'react-bootstrap'
import FieldData from '../components/FieldData'
import Spinner from '../components/Spinner'
import axios from 'axios'

const EventDetails = props =>{
    const [item, setItem] = useState( props.holiday )
    const [isSending, setIsSending] = useState( false )    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

   
    useEffect( ()=>{
        setItem(props.holiday)
    },[props.holiday])

    const handleChange = (name, value) => {
        item[name] = value
        setItem(item)
    } 
    
    const handleSave = useCallback( (item) => { //Save Holiday and dissmis
        if (isSending) return
        setLoading(true)
        setIsSending(true)
        setError(null)
        let host = 'http://'+window.location.href.split('//')[1].split('/')[0] +'/'; 
        if ( process.env.NODE_ENV == 'development') {host = '/' } //On Develop Only

        axios.patch( `${host}feriados/update`, {feriado:item} )
        .then(result => {
            setLoading(false)
            setIsSending(false)
            if (result.data.statusCode == 200){
                props.onSave(item) 
            } else {
                setError('Ups.... Nos se pudo actualizar, intente mas tarde !!!')
                console.log(`Req Failed. Error: ${result.data.body.err}`);
            }
        })
        .catch( err => {
            setLoading(false)
            setIsSending(false)
            setError('Ups.... Nos se pudo actualizar, intente mas tarde !!!')
            console.log(`Req Failed. Error: ${err}`);
        })
    }, []);
    

    if (!props.holiday) return null
    
    return(
        <Modal show={props.holiday != null} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {   !props.holiday._id ? 
                        'Fecha Sin Feriado'
                    :
                        `${props.holiday.anio}/${props.holiday.mes}/${props.holiday.dia}`
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {error ? <Alert variant='danger'> {error} </Alert> : null}                    
                    <Spinner loading={loading}/>
                    {item && Object.keys(item).map( i =>{
                        if ( props.filter.find( f => f == i) ) return null
                        return <FieldData key={'field'+i} name={i} value={item[i]} handleChange={handleChange}/>
                    })
                    }
                    
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"  onClick={props.handleClose} >
                    CERRAR
                </Button>
                {!props.holiday._id ? 
                    null 
                : 
                    <Button variant="primary" onClick={()=>handleSave(item)} hide={(!props.holiday._id).toString()}>
                        SAVE
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default EventDetails
