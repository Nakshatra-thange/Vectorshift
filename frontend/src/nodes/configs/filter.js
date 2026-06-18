

import { Position } from 'reactflow';

export const filterConfig = {
  title: 'Filter',
  width: 220,
  fields: [{ key: 'condition', label: 'Condition', kind: 'text', defaultValue: 'value > 0' }],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ],
};