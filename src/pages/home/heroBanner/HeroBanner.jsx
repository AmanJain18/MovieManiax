import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./heroBanner.scss"
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { LazyLoad, ContentWrapper } from '../../../components';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.homepage);
    const { data, loading } = useFetch("/movie/upcoming");
    useEffect(() => {
        const bgImage = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bgImage);
    }, [data])
    // Methods
    const searchQuery = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        } else {

        }
    }
    return (
        <div className="heroBanner">
            {!loading && <div className='backdrop-img'>
                <LazyLoad src={`${background}`} />
            </div>}
            <div className="opacityLayer"></div>
            <ContentWrapper>
                <div className="content">
                    <span className='title'>Welcome</span>
                    <span className='subTitle'>Millions of Movies, TV Shows to discover.
                        Explore now.
                    </span>
                    <div className='searchContent'>
                        <input type="text" name="" id="" placeholder='Search for Movies or Tv Shows...' onKeyUp={searchQuery} onChange={(e) => setQuery(e.target.value)} />
                        <button>
                            Search
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner