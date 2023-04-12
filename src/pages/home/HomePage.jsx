import React from 'react'
import "./homePage.scss"
import './heroBanner/heroBanner.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'

const HomePage = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending/>
        </div>
    )
}

export default HomePage