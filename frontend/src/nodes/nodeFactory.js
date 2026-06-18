
// createNode(config) turns a config object - "what a node contains" - into
// a working React Flow component - "what gets rendered". This is the layer
// that lets new nodes be pure data: a title, some handles, and a list of
// fields, each pointing at a `kind` that fieldRenderers knows how to draw.


import { useState, useCallback } from 'react';
import { BaseNode } from './BaseNode';
import { fieldRenderers, TextField } from './fieldRenderers';

const resolveDefault = (defaultValue, id, data, key) => {
  if (data && data[key] !== undefined) return data[key];
  return typeof defaultValue === 'function' ? defaultValue(id) : defaultValue;
};

export function createNode(config) {
  const { title, fields = [], handles = [], width, minHeight } = config;

  return function GeneratedNode({ id, data }) {
    const [values, setValues] = useState(() => {
      const initial = {};
      fields.forEach((field) => {
        initial[field.key] = resolveDefault(field.defaultValue, id, data, field.key);
      });
      return initial;
    });

    const updateField = useCallback((key, value) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    }, []);

    const resolvedHandles = handles.map((h) => ({ ...h, id: `${id}-${h.id}` }));

    return (
      <BaseNode title={title} handles={resolvedHandles} width={width} minHeight={minHeight}>
        {fields.map((field) => {
          const Field = fieldRenderers[field.kind] || TextField;
          return (
            <label className="base-node__field" key={field.key}>
              {field.label}
              <Field field={field} value={values[field.key]} onChange={(v) => updateField(field.key, v)} />
            </label>
          );
        })}
      </BaseNode>
    );
  };
}