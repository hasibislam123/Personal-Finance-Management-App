import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';
import Banner from '../../Component/Banner/Banner';
import Overview from '../../Component/homesection/Overview';
import StaticSections from '../../Component/StaticSections/StaticSections ';

const Home = () => {
   return (
      <div>
         <Banner></Banner>

         <Overview></Overview>
         
         <StaticSections></StaticSections>

      </div>
   );
};

export default Home;