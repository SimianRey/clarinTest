import React from 'react'
import {Row, Col, Button, Container} from 'react-bootstrap'

const SelectYear = props => {
    return (
        <Container>
            <Row className="selectYear">
                <Col md={2} xs={2}>
                    <Button variant="success" size="lg" block onClick={()=>props.onChange(props.year -1 )} > 
                        {'<<'} 
                    </Button>
                </Col>
                <Col md={8} xs={8}>
                    <h1> {props.year} </h1>
                </Col>
                <Col md={2} xs={2}>
                <Button variant="success" size="lg" block onClick={()=>props.onChange(props.year +1 )}> 
                        {'>>'} 
                    </Button>
                </Col>        
            </Row>
        </Container>
    )

}


export default SelectYear
