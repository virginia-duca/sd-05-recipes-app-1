import React, { Component } from 'react'
import Header from '../../Header/Header'

export default class MainFood extends Component {
    render() {
        const comidas = "Comidas"
        return (
            <Header titulo={comidas} />
        )
    }
}
