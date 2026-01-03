import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
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
}

