// Part 1: New node #5 - Note / Comment Node
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a comment...');

  return (
    <BaseNode id={id} nodeType="note" title="Note" inputs={[]} outputs={[]}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{
          width: '100%', resize: 'vertical', padding: '6px 8px', borderRadius: 6,
          border: '1px solid #cbd5e1', fontSize: 12, outline: 'none',
          background: '#fefce8', boxSizing: 'border-box', fontFamily: 'inherit',
          color: '#374151', lineHeight: 1.5,
        }}
      />
    </BaseNode>
  );
};
