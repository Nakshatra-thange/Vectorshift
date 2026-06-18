

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode title="Text" width={220} handles={[{ id: `${id}-output`, type: 'source', position: Position.Right }]}>
      <label className="base-node__field">
        Text
        <input type="text" value={currText} onChange={(e) => setCurrText(e.target.value)} />
      </label>
    </BaseNode>
  );
};