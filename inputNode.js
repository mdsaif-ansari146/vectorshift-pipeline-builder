// Part 1: New node #2 - Filter Node
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const inputStyle = {
    width: '100%', padding: '5px 8px', borderRadius: 6,
    border: '1px solid #fca5a5', fontSize: 12, outline: 'none',
    background: '#fff', boxSizing: 'border-box', marginTop: 3,
  };

  return (
    <BaseNode
      id={id}
      nodeType="filter"
      title="Filter"
      inputs={[{ id: `${id}-data`, label: 'data' }]}
      outputs={[{ id: `${id}-pass`, label: 'pass' }, { id: `${id}-fail`, label: 'fail' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Field
          <input style={inputStyle} type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder="field name" />
        </label>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Operator
          <select style={{ ...inputStyle, cursor: 'pointer' }} value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="gt">Greater than</option>
            <option value="lt">Less than</option>
          </select>
        </label>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Value
          <input style={inputStyle} type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="compare value" />
        </label>
      </div>
    </BaseNode>
  );
};
