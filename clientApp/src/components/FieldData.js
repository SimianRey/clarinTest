import React, {useState} from 'react'
import {Form, Col, Row} from 'react-bootstrap'

const FieldData = props => {
    const [value, setValue] = useState(props.value)
    
    const handleChange = event => {
        let value =  event.target.value;
        setValue(value)
        props.handleChange(props.name, value)
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={3}>
                { props.name.toUpperCase() }
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text"
                    onChange={handleChange}
                    name={props.name}
                    value={value}
                />
            </Col>
        </Form.Group>
    )

}

export default FieldData