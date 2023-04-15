import React from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel } from "../../../components";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <>
            {data?.results?.length > 0 && (
                <Carousel
                    title={title}
                    data={data?.results}
                    loading={loading}
                    endpoint={mediaType}
                />
            )}
        </>
    );
};

export default Similar;