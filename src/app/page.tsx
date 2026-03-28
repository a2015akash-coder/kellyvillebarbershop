import Hero from "@/components/sections/home/hero";
import AboutUs from "@/components/sections/home/about-us";
import OurWork from "@/components/sections/home/our-work";
import WhyChooseUs from "@/components/sections/home/why-choose-us";
import WhyLocalsChooseUs from "@/components/sections/home/why-locals-choose-us";
import Testimonials from "@/components/sections/home/testimonials";
import BlogPreview from "@/components/sections/home/blog-preview";
import InstagramSection from "@/components/sections/home/instagram-section";
import LocationHours from "@/components/sections/home/location-hours";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurWork />
      <WhyLocalsChooseUs />
      <WhyChooseUs />
      <Testimonials />
     
      <InstagramSection />
      <LocationHours />
       <BlogPreview />
    </>
  );
}
