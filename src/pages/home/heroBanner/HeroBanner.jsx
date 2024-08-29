import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading, error } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = data?.results?.length
            ? url.backdrop + data.results[Math.floor(Math.random() * data.results.length)].backdrop_path
            : "";
        setBackground(bg);
    }, [data, url.backdrop]);

    const searchQueryHandler = () => {
        if (query.length > 2) {
            navigate(`/search/${query}`);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && query.length > 2) {
            searchQueryHandler();
        }
    };

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="heroBanner">
            {!loading && background && (
                <div className="backdrop-img">
                    <Img src={background} alt="Hero Banner Background" />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or TV show..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown} // Trigger search on Enter key
                        />
                        <button onClick={searchQueryHandler}>Search</button> {/* Search only when button is clicked */}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
