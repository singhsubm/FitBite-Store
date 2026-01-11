// src/pages/Home/Home.jsx
import Hero from "./pages/Home/Hero";
import Product from "./pages/SecondPage/Product";
import ShopCategories from "./pages/ThirdPage/ShopCategories";
import MarqueeSection from "./pages/FourthPage/MarqueeSection";
import BlogStack from "./pages/FifthPage/BlogStack";
import FlavorPalette from "./components/FlavorPalette";
import HighlightText from "./components/HighlightText";
import SEO from "./components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Welcome to FitBite. Discover the finest selection of premium dry fruits and daily health packs."
      />
      <div className="bg-[rgb(255, 219, 165)]">
        <section id="home"><Hero /></section>
        <section id="product"><Product /></section>
        <section id="category"><ShopCategories /></section>
        <section id="marquee"><MarqueeSection /></section>
        <section id="text"><HighlightText /></section>
        <section id="flavour"><FlavorPalette /></section>
        <section id="blog"><BlogStack /></section>
      </div>
    </>
  );
};

export default Home;
