import React from 'react'
import State from './components/State'
import { injectReducer } from '../../store'
import addressReducer from './store'
import { Card } from '../../components/ui'
import District from './components/District'
import Block from './components/Block'
import Village from './components/Village'


injectReducer('address', addressReducer)

const Address = () => {

    return (
        <>
            <div className='md:grid grid-cols-4 gap-4'>
                <State />
                <District />
                <Block />
                <Village />
            </div>
        </>
    )
}

export default Address