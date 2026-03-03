'use client';

import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>

          <p>{note.tag}</p>

          <button onClick={() => mutation.mutate(note.id)} disabled={mutation.isPending}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
