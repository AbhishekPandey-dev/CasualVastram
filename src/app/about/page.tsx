import { InstagramPromo } from "@/components/ui/instagram-promo";

export default function AboutPage() {
  return (
    <main>
      <div className="p-8">
        <h1 className="font-syne text-4xl font-extrabold uppercase">About</h1>
      </div>
      <section>
        <InstagramPromo />
      </section>
    </main>
  );
}
