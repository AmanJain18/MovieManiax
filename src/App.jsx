import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getApiConfig, getGenres } from './store/homePageSlice'
import { fetchData } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Footer } from './components'
import { HomePage, Details, PageNotFound, Explore, SearchResult } from './pages'

function App () {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.homepage);

  useEffect(() => {
    fetchApiConfig();
    genres();
  }, []);

  const fetchApiConfig = async () => {
    fetchData('/configuration').then((res) => {
      const urls = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(urls))
    });
  };

  const genres = async () => {
    let promises = [];
    let endpoints = ['movie', 'tv'];
    let allGenres = {};
    endpoints.forEach((endpoint) => {
      promises.push(fetchData(`/genre/${endpoint}/list`));
    });
    const resData = await Promise.all(promises);
    resData.map(({ genres }) => {
      return genres.map((genre) => {
        allGenres[genre.id] = genre.name;
      });
    }
    );
    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
