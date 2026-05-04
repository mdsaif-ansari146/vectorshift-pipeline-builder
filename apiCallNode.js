import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const inputStyle = {
    width: '100%', padding: '5px 8px', borderRadius: 6,
    border: '1px solid #a5b4fc', fontSize: 12, outline: 'none',
    background: '#fff', boxSizing: 'border-box', marginTop: 3,
  };

  return (
    <BaseNode
      id={id}
      nodeType="customInput"
      title="Input"
      outputs={[{ id: `${id}-value`, label: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Name
          <input
            style={inputStyle}
            type="text"
            value={currName}
            onChange={(e) => { setCurrName(e.target.value); updateNodeField(id, 'inputName', e.target.value); }}
          />
        </label>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Type
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={inputType}
            onChange={(e) => { setInputType(e.target.value); updateNodeField(id, 'inputType', e.target.value); }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
