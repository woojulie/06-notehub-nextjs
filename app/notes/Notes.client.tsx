'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { FetchNotesResponse } from '@/types/api';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: prev => prev,
  });

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading notes</p>;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create note</button>

      <NoteList notes={data.notes} />

      {/* ✅ Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {page} of {data.totalPages}
        </span>

        <button onClick={handleNextPage} disabled={page === data.totalPages}>
          Next
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
