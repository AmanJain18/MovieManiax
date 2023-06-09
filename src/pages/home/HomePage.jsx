import React from 'react'
import "./homePage.scss"
import './heroBanner/heroBanner.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'

const HomePage = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    )
}

export default HomePage