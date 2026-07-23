import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { joinSessionApi } from './api';
import { ReviewSession } from './types';

interface JoinReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: ReviewSession) => void;
}

export default function JoinReviewModal({
  isOpen,
  onClose,
  onSuccess,
}: JoinReviewModalProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formattedCode = code.trim();
    if (!formattedCode) {
      setError('Please enter a session code');
      return;
    }

    setIsLoading(true);
    try {
      const session = await joinSessionApi(formattedCode);
      setCode('');
      onSuccess(session);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Could not find a session with that code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Review Session">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-zinc-400 leading-relaxed">
          Enter the 6-character collaboration code (e.g., <span className="font-mono text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">CT-1092</span>) to join an active code review session.
        </p>

        <Input
          label="Collaboration Code"
          placeholder="CT-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={error}
          autoFocus
          className="uppercase font-mono tracking-wider text-center text-sm"
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900/60 mt-6">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Join Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}
