import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `Post #${id} – SehaTalk`,
    description: `Read community health question #${id} with verified doctor replies on SehaTalk.`,
  };
}

export default async function PostDetails({ params }) {
  const { id } = params;
  // TODO: Replace with real fetch for SEO SSR
  const exists = Boolean(id);
  if (!exists) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="mb-4">Post #{id}</h1>
      <p className="text-muted-foreground">This is a placeholder page for post details. Integrate your data fetching here to fully SSR this page for SEO.</p>
    </div>
  );
}
