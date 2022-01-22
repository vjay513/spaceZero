import React, { useRef } from "react";
import { gql, useQuery } from "@apollo/client";

import Loader from "./../Loader";
import Error from "./../Error";
import TopMenu from "./../TopMenu";
import SideMenu from "./../SideMenu";

import useNavigation from "../../hooks/useNavigation";

import './style.scss';


const GET_ROCKET_NAMES = gql`
  {
    rockets {
      id
      name
    }
  }
`;

const NavBar = () => {
  const navRef = useRef(null);
  const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation(navRef);
  const {  data, loading, error } = useQuery(GET_ROCKET_NAMES);

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <div className="container-fluid" ref={navRef}>
      <div className="row">
        <TopMenu
          isMenuOpen={isMenuOpen}
          isMobileView={isMobileView}
          toggleMenu={setIsMenuOpen}
          rockets={data.rockets}
        />
        <SideMenu
          isMenuOpen={isMenuOpen}
          isMobileView={isMobileView}
          toggleMenu={setIsMenuOpen}
          rockets={data.rockets}
        />
      </div>
    </div>
  );
};

export default NavBar;
