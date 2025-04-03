// Defines the return type of the useFlowState hook
import { Node as ReactFlowNode } from '@reactflow/core';

export interface FlowStateProps {
  nodes: ReactFlowNode[];
  edges: any[];
  newNodeName: string;
  nodeTypes: any;
  onConnect: (params: any) => void;
  onNodeClick: (event: React.MouseEvent, node: any) => void;
  addNode: () => void;
  addGroupNode: () => void;
  handleNameChange: () => void;
  setNewNodeName: React.Dispatch<React.SetStateAction<string>>;
  setNodes: React.Dispatch<React.SetStateAction<ReactFlowNode[]>>;
  onNodesChange: (changes: any) => void;
  setEditingNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}