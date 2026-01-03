import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client"; 
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
 params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const slug = params.slug ?? [];
 const filter = slug.length > 0 ? slug.join("/") : "all";

 const title = `Notes filter: ${filter} | NoteHub`;
 const description = `Notes filtered by ${filter} in NoteHub`;

 return {
 title,
 description,
 openGraph: {
 title,
 description,
 url: `https://08-zustand-one-plum.vercel.app//notes/filter/${filter}`,
 siteName: "NoteHub",
 images: [
 {
 url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
 width: 1200,
 height: 630,
 alt: "NoteHub",
 },
 ],
 locale: "en_US",
 type: "website",
 },
 };
}

export default async function Page({ params }: Props) {
 const queryClient = new QueryClient();
 const slug = params.slug ?? [];

 const tag = slug[0] === "All" ? undefined : slug[0];


 await queryClient.prefetchQuery({
 queryKey: ["notes", { query: "", page: 1, tag: tag ?? null }],
 queryFn: () => fetchNotes(1, "", tag), 
 });

 return (
 <HydrationBoundary state={dehydrate(queryClient)}>
 <NotesClient tag={tag} />
 </HydrationBoundary>
 );
}
