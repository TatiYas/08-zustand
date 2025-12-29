import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type NoteDetailsPageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: NoteDetailsPageProps
): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 150),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 150),
      type: "article",
    },
  };
}


export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}





//import { fetchNoteById } from "@/lib/api";
//import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
//import NoteDetailsClient from "./NoteDetails.client";

//type NoteDetailsPageProps = {
 // params: Promise<{ id: string }>; }

//export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {

  //const { id } = await params;

 // const queryClient = new QueryClient();

    // await queryClient.prefetchQuery({
    //queryKey: ["note", id],  
    //queryFn: () => fetchNoteById(id),
  //});

 // return (
    //<div>
     // <HydrationBoundary state={dehydrate(queryClient)}>
      // <NoteDetailsClient />
     // </HydrationBoundary>
    //</div>
 // );
//}//
