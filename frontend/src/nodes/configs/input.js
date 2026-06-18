

import { Position } from 'reactflow';

export const inputConfig = {
  title: 'Input',
  width: 220,
  fields: [
    {
      key: 'inputName',
      label: 'Name',
      kind: 'text',
      defaultValue: (id) => id.replace('customInput-', 'input_'),
    },
    {
      key: 'inputType',
      label: 'Type',
      kind: 'select',
      options: ['Text', 'File'],
      defaultValue: 'Text',
    },
  ],
  handles: [{ id: 'value', type: 'source', position: Position.Right }],
};