// submit.js - Part 4: Backend integration

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      const dagEmoji = data.is_dag ? '✅' : '⚠️';
      const dagMsg   = data.is_dag
        ? 'Valid DAG — pipeline can be executed!'
        : 'Not a DAG — pipeline contains a cycle.';

      alert(
        `📊 Pipeline Analysis\n` +
        `──────────────────\n` +
        `🔷 Nodes:  ${data.num_nodes}\n` +
        `🔗 Edges:  ${data.num_edges}\n` +
        `${dagEmoji} ${dagMsg}`
      );
    } catch (err) {
      alert(`❌ Error connecting to backend:\n${err.message}\n\nMake sure the backend is running:\ncd backend && uvicorn main:app --reload`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? '#4338ca' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 28px',
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: "'Inter','Segoe UI',sans-serif",
          boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
          transition: 'all 0.15s ease',
          letterSpacing: 0.3,
          opacity: loading ? 0.8 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {loading ? '⏳ Analysing...' : '⚡ Submit Pipeline'}
      </button>
    </div>
  );
};
