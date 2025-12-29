'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.text}>Loading, please wait...</p>;
  }

  if (isError || !data) {
    return (
      <p className={css.text}>
        Something went wrong. Could not load note details.
      </p>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>

        <p className={css.content}>{data.content}</p>

        <p className={css.date}>
          Created date:{' '}
          {new Date(data.createdAt).toLocaleDateString()}
        </p>

        <p className={css.tag}>{data.tag}</p>
      </div>
    </div>
  );
}
