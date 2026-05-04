import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const inputStyle = {
    width: '100%', padding: '5px 8px', borderRadius: 6,
    border: '1px solid #6ee7b7', fontSize: 12, outline: 'none',
    background: '#fff', boxSizing: 'border-box', marginTop: 3,
  };

  return (
    <BaseNode
      id={id}
      nodeType="customOutput"
      title="Output"
      inputs={[{ id: `${id}-value`, label: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Name
          <input
            style={inputStyle}
            type="text"
            value={currName}
            onChange={(e) => { setCurrName(e.target.value); updateNodeField(id, 'outputName', e.target.value); }}
          />
        </label>
        <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>
          Type
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={outputType}
            onChange={(e) => { setOutputType(e.target.value); updateNodeField(id, 'outputType', e.target.value); }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
