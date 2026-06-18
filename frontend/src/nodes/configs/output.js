

import { Position } from 'reactflow';

export const outputConfig = {
  title: 'Output',
  width: 220,
  fields: [
    {
      key: 'outputName',
      label: 'Name',
      kind: 'text',
      defaultValue: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      key: 'outputType',
      label: 'Type',
      kind: 'select',
      // NOTE: original code had value="File" but displayed "Image" - fixed
      // here so the stored value matches the visible label.
      options: ['Text', 'Image'],
      defaultValue: 'Text',
    },
  ],
  handles: [{ id: 'value', type: 'target', position: Position.Left }],
};