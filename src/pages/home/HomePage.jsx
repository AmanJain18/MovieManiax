import React from 'react'
import "./homePage.scss"
import './heroBanner/heroBanner.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'

const HomePage = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending/>
            <Popular/>
        </div>
    )
}

export default HomePage