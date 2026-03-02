'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onClose: () => void;
}

const NoteSchema = Yup.object({
  title: Yup.string().min(3).required(),
  content: Yup.string().min(5).required(),
  tag: Yup.string().required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={NoteSchema}
      onSubmit={values => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <Field name="content" placeholder="Content" />
        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <button type="submit">Create</button>
      </Form>
    </Formik>
  );
}
