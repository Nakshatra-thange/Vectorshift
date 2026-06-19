

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <span className="toolbar__label">[ nodes ]</span>
      <div className="toolbar__nodes">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="apiRequest" label="API Request" />
        <DraggableNode type="conditional" label="Conditional" />
      </div>
    </div>
  );
};
