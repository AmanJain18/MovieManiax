import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getApiConfig } from './store/homePageSlice'
import { fetchData } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Footer } from './components'
import { HomePage, Details, PageNotFound, Explore, SearchResult } from './pages'

function App () {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.homepage);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = async () => {
    fetchData('/configuration').then((res) => {
      console.log(res);
      const urls = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfig(urls))
    });
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
