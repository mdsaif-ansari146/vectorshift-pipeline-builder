// toolbar.js - Part 2: Styled toolbar with all nodes

import { DraggableNode } from './draggableNode';

const nodeItems = [
  { type: 'customInput',  label: 'Input',     emoji: '📥', color: '#6366f1' },
  { type: 'customOutput', label: 'Output',    emoji: '📤', color: '#10b981' },
  { type: 'llm',          label: 'LLM',       emoji: '🤖', color: '#f59e0b' },
  { type: 'text',         label: 'Text',      emoji: '📝', color: '#3b82f6' },
  { type: 'apiCall',      label: 'API Call',  emoji: '🌐', color: '#8b5cf6' },
  { type: 'filter',       label: 'Filter',    emoji: '🔍', color: '#ef4444' },
  { type: 'condition',    label: 'Condition', emoji: '🔀', color: '#f97316' },
  { type: 'math',         label: 'Math',      emoji: '🔢', color: '#06b6d4' },
  { type: 'note',         label: 'Note',      emoji: '📌', color: '#64748b' },
];

export const PipelineToolbar = () => (
  <div
    style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    {/* Logo */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 12 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'linear-gradient(135deg, #818cf8, #6366f1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, boxShadow: '0 2px 8px rgba(99,102,241,0.5)',
      }}>⚡</div>
      <span style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: 0.3, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        VectorShift
      </span>
    </div>

    <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.15)', marginRight: 4 }} />

    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 500, marginRight: 4, fontFamily: "'Inter','Segoe UI',sans-serif", textTransform: 'uppercase', letterSpacing: 1 }}>
      Nodes
    </span>

    {/* Node chips */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {nodeItems.map((n) => (
        <DraggableNode key={n.type} type={n.type} label={n.label} emoji={n.emoji} color={n.color} />
      ))}
    </div>
  </div>
);
