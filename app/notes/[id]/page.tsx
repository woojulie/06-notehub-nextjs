import NoteDetails from './NoteDetails.client';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <NoteDetails id={id} />;
}
