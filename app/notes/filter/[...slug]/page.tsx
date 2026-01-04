import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client"; // или правильный путь
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
 params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const slug = params.slug ?? [];
 const tag = slug[0] === "all" ? undefined : slug[0];

 const isAll = !tag;

 const title = isAll ? "All notes" : `${tag} notes`;
 const description = isAll
 ? "All notes selected"
 : `Filtered by tag "${tag}" notes`;

 return {
 title,
 description,
 openGraph: {
 title,
 description,
 url: "https://your-domain.com", // замени на реальный, если нужно
 images: [
 {
 url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
 width: 1200,
 height: 630,
 alt: isAll ? "Unfiltered notes" : "Filtered notes",
 },
 ],
 },
 };
}

export default async function NotesByTags({ params }: Props) {
 const queryClient = new QueryClient();

 const slug = params.slug ?? [];
 const tag = slug[0] === "all" ? undefined : slug[0];

 await queryClient.prefetchQuery({
 queryKey: ["notes", tag],
 queryFn: () => fetchNotes(1, "", tag),
 });

 return (
 <>
 <HydrationBoundary state={dehydrate(queryClient)}>
 <NotesClient tag={tag} />
 </HydrationBoundary>
 </>
 );
}





/*import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = slug ?? [];
  const filter = resolvedSlug.length > 0 ? resolvedSlug.join("/") : "all";
  const title = filter === "all" ? "All Notes | NoteHub" : `Notes filtered by ${filter} | NoteHub`;
  const description = filter === "all" ? "All notes in NoteHub" : `Notes filtered by ${filter} in NoteHub`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/notehub-og-meta.jpg", 
          width: 1200,
          height: 630,
          alt: "NoteHub Logo",
        },
      ],
      url: `https://project-notehub.vercel.app/notes/filter/${filter}`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = slug ?? [];
  const tag = resolvedSlug.length > 0 && resolvedSlug[0] !== "All" ? resolvedSlug[0] : "all"; // Фикс: "all" для All или отсутствующего slug

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag }],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

/*import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client"; 
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
 params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
 const { slug } = await params;
 const resolvedSlug = slug ?? [];

 const filter = resolvedSlug.length > 0 ? resolvedSlug.join("/") : "all";

 const title = `Notes filter: ${filter} | NoteHub`;
 const description = `Notes filtered by ${filter} in NoteHub`;

 return {
 title,
 description,
 openGraph: {
 title,
 description,
 
 },
 };
}


export default async function Page({ params }: Props) {

 const { slug } = await params;
 const resolvedSlug = slug ?? [];

 const queryClient = new QueryClient();


 const tag = resolvedSlug[0] === "All" ? undefined : resolvedSlug[0];

 await queryClient.prefetchQuery({
 queryKey: ["notes", { query: "", page: 1, tag: tag ?? null }],
 queryFn: () => fetchNotes(1, "", tag ?? undefined),
 });

 return (
 <HydrationBoundary state={dehydrate(queryClient)}>
 <NotesClient tag={tag} />
 </HydrationBoundary>
 );
}*/

