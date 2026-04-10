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
import { getGoogleReviews } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await getGoogleReviews().catch((error) => {
    console.error("Homepage reviews failed to load:", error);
    return null;
  });

  return (
    <ReviewsProvider initialData={reviews}>
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
