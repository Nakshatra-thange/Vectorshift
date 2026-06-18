import { Position } from 'reactflow';

export const apiConfig = {
  title: 'API Request',
  width: 240,
  fields: [
    { key: 'url', label: 'URL', kind: 'text', defaultValue: 'https://api.example.com' },
    {
      key: 'method',
      label: 'Method',
      kind: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      defaultValue: 'GET',
    },
  ],
  handles: [
    { id: 'trigger', type: 'target', position: Position.Left },
    { id: 'response', type: 'source', position: Position.Right },
  ],
};