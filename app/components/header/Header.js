import React from 'react'
import {Button,Row, Col} from 'react-bootstrap'
import StartGameButton from './StartGameButton'

export default () => {
    return (
        <Row style={{borderBottom: '1px solid #ccc'}}>
            <Col xs={3} md={2} style={{padding: "10px"}}>
               <div></div>
            </Col>
            <Col xs={12} md={8} style={{textAlign: "center"}}><h1>Snake</h1></Col>
            <Col xs={3} md={2} style={{padding: "10px"}}>
                <StartGameButton />
            </Col>
        </Row>
    )
}