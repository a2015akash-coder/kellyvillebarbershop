import AboutUs from "@/components/sections/home/about-us";
import BlogPreview from "@/components/sections/home/blog-preview";
import Hero from "@/components/sections/home/hero";
import InstagramSection from "@/components/sections/home/instagram-section";
import LocationHours from "@/components/sections/home/location-hours";
import OurWork from "@/components/sections/home/our-work";
import { ReviewsProvider } from "@/components/sections/home/reviews-context";
import Testimonials from "@/components/sections/home/testimonials";
import WhyChooseUs from "@/components/sections/home/why-choose-us";
import WhyLocalsChooseUs from "@/components/sections/home/why-locals-choose-us";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ReviewsProvider>
      <Hero />

      <OurWork />
      <WhyChooseUs />
      <WhyLocalsChooseUs />
      <Testimonials />

      <InstagramSection />
      <LocationHours />
      <BlogPreview />
      <AboutUs />
    </ReviewsProvider>
  );
}
