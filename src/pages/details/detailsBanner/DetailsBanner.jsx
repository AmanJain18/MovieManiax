import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./detailsBanner.scss";
import dayjs from "dayjs";
import useFetch from "../../../hooks/useFetch";
import { ContentWrapper, Genres, LazyLoad, Rating } from "../../../components";
import { PlayBtn } from "../PlayBtn";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {

    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.homepage);

    const genres = data?.genres?.map((genre) => genre.id);
    const directorsList = crew?.filter((member) => member.job === "Director");
    const writerList = crew?.filter((member) => member.job === "Screenplay" || member.job === "Writer" || member.job === "Story");
    const officialTrailer = video?.filter((vid) => vid.name === "Final Trailer" || vid.name === "Official Trailer" || vid.name === "Official Trailer 1" || vid.name === "Official Trailer 2");

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <LazyLoad
                                    src={url.backdrop + data.backdrop_path}
                                    alt={data.title || data.name}
                                />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <LazyLoad className="posterImg" src={url.backdrop + data.poster_path} />
                                        ) : (
                                            <LazyLoad className="posterImg" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.title || data.name} (${dayjs(data.release_date || data.first_air_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {`${data.tagline || data.overview}`}
                                        </div>
                                        <Genres data={genres} />
                                        <div className="row">
                                            <Rating rating={data.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => {
                                                setShowVideo(true);
                                                setVideoId(officialTrailer[0]?.key);
                                            }}>
                                                <PlayBtn />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>
                                        <div className="info">
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Status:{""}
                                                </span>
                                                <span className="text">
                                                    {data.status}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Release Date:{""}
                                                </span>
                                                <span className="text">
                                                    {dayjs(data.release_date || data.first_air_date).format("MMM, DD YYYY")}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Runtime:{""}
                                                </span>
                                                <span className="text">
                                                    {toHoursAndMinutes(data.runtime || data.episode_run_time[0])}
                                                </span>
                                            </div>
                                        </div>
                                        {directorsList?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{""}
                                                </span>
                                                <span className="text">
                                                    {directorsList?.map((director, index) => (
                                                        <span key={index}>
                                                            {director.name}
                                                            {index !== directorsList.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writerList?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{""}
                                                </span>
                                                <span className="text">
                                                    {writerList?.map((writer, index) => (
                                                        <span key={index}>
                                                            {writer.name}
                                                            {index !== writerList.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{""}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((writer, index) => (
                                                        <span key={index}>
                                                            {writer.name}
                                                            {index !== data?.created_by.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={showVideo} setShow={setShowVideo} videoId={videoId} setVideoId={setVideoId} />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;