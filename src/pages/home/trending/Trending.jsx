import React, { useState } from 'react'
import { ContentWrapper, SwitchTabs } from '../../../components'
import useFetch from '../../../hooks/useFetch'

const Trending = () => {
    const [endpoint, setEndpoint] = useState('day');

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
    
    const onTabchange = (tab) => {
        setEndpoint(tab === 'Day' ? 'day' : 'week')
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselSection__Title'>Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabchange={onTabchange} />
            </ContentWrapper>
        </div>
    )
}

export default Trending