import css from "./notesPage.module.css";
import NoteListClient from "./Notes.client";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";


type Props = {
 params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const rawTag = slug?.[0];

 // Если тег "All" или отсутствует — показываем "all" в мета-тегах
 const displayTag = rawTag === "All" || !rawTag ? "all" : rawTag;

 const title = `Notes filtered by: ${displayTag}`;
 const description = `Review of notes filtered by "${displayTag}".`;

 return {
 title,
 description,
 openGraph: {
 title,
 description,
 url: `https://08-zustand-one-plum.vercel.app//notes/filter/${rawTag || "all"}`,
 siteName: "NoteHub",
 images: [
 {
 url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
 width: 1200,
 height: 630,
 alt: "Title",
 },
 ],
 locale: "en_US",
 type: "website",
 },
 };
}

export default async function App({ params }: Props) {
 const queryClient = new QueryClient();
 const { slug } = await params;

 
 const tag = slug?.[0] === "All" ? undefined : slug?.[0];


 await queryClient.prefetchQuery({
 queryKey: ["notes", { query: "", page: 1, tag: tag ?? null }],
 queryFn: () => fetchNotes(1, "", tag), 
 });

 return (
 <div className={css.app}>
 <HydrationBoundary state={dehydrate(queryClient)}>
 <NoteListClient tag={tag} />
 </HydrationBoundary>
 </div>
 );
}
