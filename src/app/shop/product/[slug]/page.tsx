interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="p-8">
      <h1 className="font-syne text-4xl font-extrabold uppercase">Product Details: {slug}</h1>
    </div>
  );
}
