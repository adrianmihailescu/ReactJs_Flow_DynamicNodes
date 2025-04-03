import React from 'react';
import { Handle, Position } from 'reactflow';
import { GroupNodeProps } from '../interfaces/GroupNodeProps';
import './GroupNode.css';

const GroupNode: React.FC<GroupNodeProps> = ({ id, data }) => {
  return (
    <div className="group-node">
      <div className="group-node-header">{data.label}</div>
      <div className="group-node-body">
        <Handle type="target" position={Position.Top} id={`top-${id}`} />
        <Handle type="source" position={Position.Bottom} id={`bottom-${id}`} />
      </div>
    </div>
  );
};

export default GroupNode;