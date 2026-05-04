// ui.js - Part 2: Styled canvas with all node types registered

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }     from './nodes/inputNode';
import { LLMNode }       from './nodes/llmNode';
import { OutputNode }    from './nodes/outputNode';
import { TextNode }      from './nodes/textNode';
import { APICallNode }   from './nodes/apiCallNode';
import { FilterNode }    from './nodes/filterNode';
import { ConditionNode } from './nodes/conditionNode';
import { MathNode }      from './nodes/mathNode';
import { NoteNode }      from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  apiCall:      APICallNode,
  filter:       FilterNode,
  condition:    ConditionNode,
  math:         MathNode,
  note:         NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const nodeID = getNodeID(type);
      addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
    }
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: 'calc(100vh - 130px)', background: '#f8fafc' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#cbd5e1" gap={gridSize} size={1} />
        <Controls
          style={{
            background: '#1e1b4b',
            border: 'none',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        />
        <MiniMap
          style={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          nodeColor={(n) => {
            const colors = {
              customInput: '#6366f1', customOutput: '#10b981', llm: '#f59e0b',
              text: '#3b82f6', apiCall: '#8b5cf6', filter: '#ef4444',
              condition: '#f97316', math: '#06b6d4', note: '#64748b',
            };
            return colors[n.type] || '#94a3b8';
          }}
        />
      </ReactFlow>
    </div>
  );
};
