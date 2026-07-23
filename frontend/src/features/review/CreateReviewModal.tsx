import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { createSessionApi } from './api';
import { ReviewSession } from './types';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: ReviewSession) => void;
}

export default function CreateReviewModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateReviewModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [files, setFiles] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Session name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const documentsList = files
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
      
      const session = await createSessionApi({
        name: name.trim(),
        description: description.trim(),
        repoUrl: repoUrl.trim() || undefined,
        documentsCount: documentsList.length || 1, // Default to 1 document if empty
        owner: 'developer@codethread.io', // Mock active owner email
      });

      // Clear state
      setName('');
      setDescription('');
      setRepoUrl('');
      setFiles('');
      setErrors({});
      
      onSuccess(session);
      onClose();
    } catch (err: any) {
      setErrors({ api: err.message || 'Failed to create review session.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Review Session">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.api && (
          <div className="p-3 text-xs bg-red-950/20 border border-red-900/30 rounded-lg text-red-400 font-medium">
            {errors.api}
          </div>
        )}

        <Input
          label="Session Name"
          placeholder="e.g. Refactor API endpoints"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-zinc-400 select-none tracking-wide">
            Description
          </label>
          <textarea
            placeholder="Provide context about what needs to be reviewed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`w-full bg-zinc-950/60 border ${
              errors.description ? 'border-red-900/60 focus:border-red-500' : 'border-zinc-800 focus:border-blue-500'
            } rounded-lg text-sm text-zinc-200 placeholder-zinc-500 p-3 transition-all duration-200 outline-none focus:ring-2 ${
              errors.description ? 'focus:ring-red-950/40' : 'focus:ring-blue-950/40'
            }`}
          />
          {errors.description && (
            <span className="text-[11px] text-red-400 font-medium tracking-wide">
              {errors.description}
            </span>
          )}
        </div>

        <Input
          label="Repository URL (Optional)"
          placeholder="e.g. https://github.com/org/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <Input
          label="Files to Review (Optional, comma-separated)"
          placeholder="e.g. src/App.tsx, src/index.css"
          value={files}
          onChange={(e) => setFiles(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900/60 mt-6">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Create Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}
