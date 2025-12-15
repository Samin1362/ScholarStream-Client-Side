import React from "react";
import Banner from "../components/Banner";
import FewScholarships from "../components/FewScholarships";
import Testimonials from "../components/Testimonials";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FewScholarships></FewScholarships>
      <Testimonials></Testimonials>
      <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
    </div>
  );
};

export default Home;
