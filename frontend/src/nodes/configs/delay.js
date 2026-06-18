
import { Position } from 'reactflow';

export const delayConfig = {
  title: 'Delay',
  width: 200,
  fields: [{ key: 'seconds', label: 'Seconds', kind: 'number', defaultValue: '1' }],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ],
};