/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import Error from "./Pages/Error";
import MovieForm from "./Pages/MovieForm";
const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Trending />} exact /> */}
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="*" element={<Error />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default App;
