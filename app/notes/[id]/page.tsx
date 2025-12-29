import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://your-domain.vercel.app/notes/${params.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Note details',
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
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
