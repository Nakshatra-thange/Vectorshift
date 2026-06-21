
import { Handle } from 'reactflow';
import './baseNode.css';

export const BaseNode = ({
  title,
  handles = [],
  children,
  width = 220,
  minHeight,
  className = '',
}) => {
  return (
    <div className={`base-node ${className}`} style={{ width, minHeight }}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__led" />
        <span>{title}</span>
      </div>

      <div className="base-node__body">{children}</div>
    </div>
  );
};
