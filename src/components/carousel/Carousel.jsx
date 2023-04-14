import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ContentWrapper, LazyLoad, Rating, Genres } from '../../components'
import PosterFallback from "../../assets/no-poster.png";
import './carousel.scss'


const Carousel = ({ data, loading }) => {

  const carouselRef = useRef(null);
  const { url } = useSelector(state => state.homepage)
  const navigate = useNavigate();

  const navigateTo = (dir) => {
    const container = carouselRef.current;
    const scrollValue = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollValue,
      behavior: "smooth"
    })
  }

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }


  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigateTo("left")} />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigateTo("right")} />
        {!loading ? (
          <div className="carouselItems" ref={carouselRef}>
            {data?.map((item) => {
              const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
              return (
                <div className="carouselItem" key={item.id} onClick={() => navigate(`/${item.media_type}/${item.id}`)}>
                  <div className="posterBlock">
                    <LazyLoad src={posterUrl}></LazyLoad>
                    <Rating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })
            }
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel