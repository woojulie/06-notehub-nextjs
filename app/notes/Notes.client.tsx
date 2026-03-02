'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { FetchNotesResponse } from '@/types/note';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debounced = useDebouncedCallback((value: string) => {
    setPage(1);
    setDebouncedSearch(value);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: previousData => previousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <>
      <header>
        <SearchBox value={search} onChange={handleSearchChange} />
      </header>

      {data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
      )}
    </>
  );
}
