// textNode.js - Part 3: auto-resize + dynamic {{variable}} handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const VAR_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VAR_REGEX)];
  return [...new Set(matches.map((m) => m[1]))];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });

  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollH + 'px';
      // Compute width based on longest line (min 200, max 480)
      const lines = currText.split('\n');
      const longest = Math.max(...lines.map((l) => l.length));
      const newWidth = Math.min(Math.max(longest * 8 + 60, 220), 480);
      setDimensions({ width: newWidth });
    }
  }, [currText]);

  const varHandleSpacing = variables.length > 0 ? 100 / (variables.length + 1) : 50;

  return (
    <div style={{ position: 'relative', width: dimensions.width }}>
      <BaseNode
        id={id}
        nodeType="text"
        title="Text"
        outputs={[{ id: `${id}-output`, label: 'output' }]}
        minWidth={dimensions.width}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
            style={{
              width: '100%',
              resize: 'none',
              overflow: 'hidden',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #93c5fd',
              fontSize: 12,
              fontFamily: 'monospace',
              outline: 'none',
              background: '#fff',
              boxSizing: 'border-box',
              lineHeight: 1.5,
            }}
          />
          {variables.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
              {variables.map((v) => (
                <span
                  key={v}
                  style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: 4,
                    padding: '1px 6px',
                    fontSize: 10,
                    fontFamily: 'monospace',
                  }}
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          )}
        </div>
      </BaseNode>

      {/* Dynamic variable handles on the left */}
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              top: `${(i + 1) * varHandleSpacing}%`,
              background: '#3b82f6',
              width: 10,
              height: 10,
              border: '2px solid white',
              boxShadow: '0 0 0 1px #93c5fd',
              left: -5,
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 10,
              top: `calc(${(i + 1) * varHandleSpacing}% - 7px)`,
              fontSize: 9,
              color: '#2563eb',
              fontFamily: 'monospace',
              pointerEvents: 'none',
              background: 'rgba(219,234,254,0.85)',
              borderRadius: 3,
              padding: '1px 3px',
              whiteSpace: 'nowrap',
            }}
          >
            {varName}
          </span>
        </div>
      ))}
    </div>
  );
};
