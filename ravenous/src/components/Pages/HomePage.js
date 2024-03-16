import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import React, { useState } from "react";

import { Yelp } from "../../util/Yelp";


const HomePage = () => {  
  const [state, setState] = useState({businesses: []});
  
  function searchYelp(term, location, sortBy) {
    // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
    Yelp.search(term,location,sortBy).then((businesses) => {
      setState({...state, businesses: businesses})
    })
  }

  return (
    <>
      <SearchBar searchYelp={searchYelp} />
      <BusinessList businesses={state.businesses} />
    </>
  );
};

export default HomePage;