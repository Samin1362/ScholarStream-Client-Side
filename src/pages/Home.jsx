import React from "react";
import Banner from "../components/Banner";
import Statistics from "../components/Statistics";
import FewScholarships from "../components/FewScholarships";
import HowItWorks from "../components/HowItWorks";
import TopCategories from "../components/TopCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import TopUniversities from "../components/TopUniversities";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Statistics></Statistics>
      <FewScholarships></FewScholarships>
      <HowItWorks></HowItWorks>
      <TopCategories></TopCategories>
      <WhyChooseUs></WhyChooseUs>
      <TopUniversities></TopUniversities>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
      <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
    </div>
  );
};

export default Home;
