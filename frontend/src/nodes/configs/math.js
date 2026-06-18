

import { Position } from 'reactflow';

export const mathConfig = {
  title: 'Math',
  width: 220,
  fields: [
    {
      key: 'operation',
      label: 'Operation',
      kind: 'select',
      options: ['Add', 'Subtract', 'Multiply', 'Divide'],
      defaultValue: 'Add',
    },
  ],
  handles: [
    { id: 'a', type: 'target', position: Position.Left, style: { top: '33%' } },
    { id: 'b', type: 'target', position: Position.Left, style: { top: '67%' } },
    { id: 'result', type: 'source', position: Position.Right },
  ],
};