import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Conteiner from "./components/conteiner/Conteiner";
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import InitMap from "./pages/initMap/InitMap";
import Geocoding from "./pages/geocoding/Geocoding";
import Marker from "./pages/marker/Marker";
import SetMarkerAfterSearch from "./pages/setMarkerAfterSearch/SetMarkerAfterSearch";
import Polygon from "./pages/polygon/Polygon";
import Review from "./pages/review/Review";

import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAPS_API),
    libraries: ["drawing"],
  });

  return (
    <>
      <Router>
        <Conteiner>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<InitMap />} />
            <Route path="/geocoding" element={<Geocoding />} />
            <Route path="/marker" element={<Marker />} />
            <Route
              path="/search-and-set-marker"
              element={<SetMarkerAfterSearch />}
            />
            <Route path="/polygon" element={<Polygon />} />
            <Route path="/conclusion" element={<Review />} />
          </Routes>
        </Conteiner>
      </Router>
    </>
  );
}

export default App;
