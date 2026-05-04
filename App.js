// Part 1: New node #4 - Math Operation Node
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || 'add');

  const opLabels = { add: 'A + B', subtract: 'A − B', multiply: 'A × B', divide: 'A ÷ B' };

  return (
    <BaseNode
      id={id}
      nodeType="math"
      title="Math"
      inputs={[{ id: `${id}-a`, label: 'A' }, { id: `${id}-b`, label: 'B' }]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Operation
          <select
            value={op}
            onChange={(e) => setOp(e.target.value)}
            style={{ width: '100%', padding: '5px 8px', borderRadius: 6, border: '1px solid #67e8f9', fontSize: 12, outline: 'none', background: '#fff', boxSizing: 'border-box', marginTop: 3, cursor: 'pointer' }}
          >
            <option value="add">Add (A + B)</option>
            <option value="subtract">Subtract (A − B)</option>
            <option value="multiply">Multiply (A × B)</option>
            <option value="divide">Divide (A ÷ B)</option>
          </select>
        </label>
        <div style={{ textAlign: 'center', fontSize: 20, color: '#0891b2', fontWeight: 700, padding: '2px 0' }}>
          {opLabels[op]}
        </div>
      </div>
    </BaseNode>
  );
};
