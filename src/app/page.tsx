import Hero from "@/components/sections/Hero";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { InstagramPromo } from "@/components/ui/instagram-promo";

export default function Home() {
  return (
    <main>
      <Hero />
      <section>
        <StaggerTestimonials />
      </section>
      <section>
        <InstagramPromo />
      </section>
      
    </main>
  );
}
