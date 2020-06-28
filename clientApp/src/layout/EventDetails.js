import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FieldData from '../components/FieldData'
//import Spinner from '../components/Spinner'

//<Spinner loading={loading}/>

const EventDetails = props =>{
    const [item, setItem] = useState( null )
    //const [loading, setLoading] = useState(false)
    
    useEffect( ()=>{
        setItem(props.holiday)
    },[props.holiday])

    const handleChange = (name, value) => {
        item[name] = value
        setItem(item)
    } 

    const onSave = () =>{
        props.onSave(item)
    }

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
                    <Button variant="primary" onClick={onSave} hide={!props.holiday._id}>
                        SAVE
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default EventDetails
