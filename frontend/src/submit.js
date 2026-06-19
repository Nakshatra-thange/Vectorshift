

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const BACKEND_URL = 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map((node) => ({ id: node.id, type: node.type })),
          edges: edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`);
      }

      const data = await response.json();
      alert(
        `Pipeline analysis\n\n` +
          `Nodes: ${data.num_nodes}\n` +
          `Edges: ${data.num_edges}\n` +
          `Forms a DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert(`Could not reach the backend: ${err.message}`);
    }
  };

  return (
    <div className="submit-bar">
      <button type="button" className="btn" onClick={handleSubmit}>
        [ submit ]
      </button>
    </div>
  );
};