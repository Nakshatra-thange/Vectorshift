

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      width={220}
      handles={[
        { id: `${id}-system`, type: 'target', position: Position.Left, style: { top: '33%' } },
        { id: `${id}-prompt`, type: 'target', position: Position.Left, style: { top: '67%' } },
        { id: `${id}-response`, type: 'source', position: Position.Right },
      ]}
    >
      <span className="base-node__description">This is an LLM.</span>
    </BaseNode>
  );
};