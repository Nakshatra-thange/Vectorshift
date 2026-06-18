import { Position } from 'reactflow';

export const conditionalConfig = {
  title: 'Conditional',
  width: 220,
  fields: [{ key: 'expression', label: 'If', kind: 'text', defaultValue: 'input === true' }],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'true', type: 'source', position: Position.Right, style: { top: '33%' } },
    { id: 'false', type: 'source', position: Position.Right, style: { top: '67%' } },
  ],
};