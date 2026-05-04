// Part 1: New node #3 - Condition (If/Else) Node
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      nodeType="condition"
      title="Condition"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[{ id: `${id}-true`, label: 'true' }, { id: `${id}-false`, label: 'false' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Condition
          <input
            style={{ width: '100%', padding: '5px 8px', borderRadius: 6, border: '1px solid #fdba74', fontSize: 12, outline: 'none', background: '#fff', boxSizing: 'border-box', marginTop: 3 }}
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="e.g. value > 10"
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9a3412', marginTop: 2 }}>
          <span style={{ background: '#fed7aa', padding: '1px 6px', borderRadius: 4 }}>True →</span>
          <span style={{ background: '#fed7aa', padding: '1px 6px', borderRadius: 4 }}>False →</span>
        </div>
      </div>
    </BaseNode>
  );
};
