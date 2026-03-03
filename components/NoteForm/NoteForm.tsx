'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').max(50, 'Max 50 characters'),

  content: Yup.string().max(500, 'Max 500 characters').nullable(),

  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting']).required('Tag is required'),
});

export default function NoteForm({ onClose }: Props) {
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
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo',
      }}
      validationSchema={validationSchema}
      onSubmit={values => mutation.mutate(values)}
    >
      <Form>
        <div>
          <label>Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label>Content</label>
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" />
        </div>

        <div>
          <label>Tag</label>
          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
          </Field>
          <ErrorMessage name="tag" component="div" />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          Create
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}
