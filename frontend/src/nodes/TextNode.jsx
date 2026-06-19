

import { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import './textNode.css';

const MIN_WIDTH = 220;
const MAX_WIDTH = 420;

const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_PATTERN.lastIndex = 0;
  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      found.push(match[1]);
    }
  }
  return found;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const [width, setWidth] = useState(MIN_WIDTH);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(currText), [currText]);

  useLayoutEffect(() => {
    if (mirrorRef.current) {
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, mirrorRef.current.scrollWidth + 36));
      setWidth(next);
    }
  }, [currText]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [currText, width]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables.length, width, updateNodeInternals]);

  const variableHandles = variables.map((name, index) => ({
    id: `${id}-${name}`,
    type: 'target',
    position: Position.Left,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
  }));

  return (
    <BaseNode
      title="Text"
      width={width}
      handles={[...variableHandles, { id: `${id}-output`, type: 'source', position: Position.Right }]}
    >
      <label className="base-node__field">
        Text
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
        />
      </label>
      {/* Invisible mirror used only to measure the longest line's pixel
          width - same font/padding as the real textarea, white-space: pre
          so it never wraps, which is what makes scrollWidth meaningful. */}
      <span ref={mirrorRef} className="text-node__mirror" aria-hidden="true">
        {currText || ' '}
      </span>
    </BaseNode>
  );
};