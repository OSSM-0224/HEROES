import { useState } from 'react';
import { useAuth } from '../../../services/auth.service.jsx';

export const useLeadDetail = () => {
  const { user: currentUser } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const handleNoteSubmit = async (e, leadId, onAddNote) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSubmittingNote(true);
    await onAddNote(leadId, newNote);
    setNewNote('');
    setSubmittingNote(false);
  };

  const isAdmin = currentUser?.role === 'ADMIN';

  return { currentUser, newNote, setNewNote, submittingNote, handleNoteSubmit, isAdmin };
};
