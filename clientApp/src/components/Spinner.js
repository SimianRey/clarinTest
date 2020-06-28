import React from 'react'
import SpinnerB from 'react-bootstrap/Spinner'

const Spinner = props =>{
    if (!props.loading) return null
    return (
        <div className="loading">
            <SpinnerB size={150} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </SpinnerB>
        </div>
    )
}

export default Spinner