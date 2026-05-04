import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    nodeType="llm"
    title="LLM"
    inputs={[
      { id: `${id}-system`, label: 'system' },
      { id: `${id}-prompt`, label: 'prompt' },
    ]}
    outputs={[{ id: `${id}-response`, label: 'response' }]}
  >
    <div style={{ fontSize: 12, color: '#92400e', padding: '4px 0' }}>
      Large Language Model node. Connect a system prompt and user prompt to generate a response.
    </div>
  </BaseNode>
);
