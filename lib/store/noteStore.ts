import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);

export { initialDraft };


/*import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { CreateNoteParams } from '../api';


type NoteDraft = {
    draft: CreateNoteParams;
    setDraft: (draft: CreateNoteParams) => void;
    clearDraft: () => void;
}
const initialDraft: CreateNoteParams = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraft>()(persist(
    (set) => ({
        draft: initialDraft,
        setDraft: (draft) => set({ draft }),
        clearDraft: () => set({ draft: initialDraft }),
    }),
    {
        name: 'note-draft',
        partialize: (state) => ({ draft: state.draft }),
    }
));*/
 
 