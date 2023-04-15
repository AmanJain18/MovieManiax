import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import "./details.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './casts/Cast'
// import Videos from './videos/Videos'


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
    </div>
  )
}

export default Details