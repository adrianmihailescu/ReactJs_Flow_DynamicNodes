import { useState, useMemo } from 'react';
import { addEdge, applyNodeChanges, Node } from 'reactflow';
import GroupNode from '../components/GroupNode.tsx';
import { FlowStateProps } from '../interfaces/FlowStateProps';

export const useFlowState = (initialNodes: Node[], initialEdges: any[]): FlowStateProps => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newNodeName, setNewNodeName] = useState('');
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null); // Track the node being edited

  // Memoize nodeTypes to ensure they aren't re-created on every render
  const nodeTypes = useMemo(() => ({ groupNode: GroupNode }), []);

  // Handle connection of nodes
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  // Handle node click (for name change)
  const onNodeClick = (event: React.MouseEvent, node: any) => {
    setNewNodeName(node.data.label); // Set the current node's label as the default
    setEditingNodeId(node.id); // Store the ID of the node being edited
  };

  // Add a new node with a random position
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: 'New Node' },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      draggable: true,
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  // Add a new Group Node
  const addGroupNode = () => {
    const newGroupNode = {
      id: `group-${nodes.length + 1}`,
      type: 'groupNode',
      data: { label: `Group ${nodes.length + 1}` },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nodes) => [...nodes, newGroupNode]);
  };

  // Handle name change and update the node's label
  const handleNameChange = () => {
    if (editingNodeId) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === editingNodeId
            ? { ...node, data: { ...node.data, label: newNodeName } } // Update the specific node's label
            : node
        )
      );
      setEditingNodeId(null); // Reset editing state
    }
  };

  // Handle node position changes during drag
  const onNodesChange = (changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds)); // applyNodeChanges automatically handles the position updates
  };

  return {
    nodes,
    edges,
    newNodeName,
    nodeTypes,
    onConnect,
    onNodeClick,
    addNode,
    addGroupNode,
    handleNameChange,
    setNewNodeName,
    setNodes,
    onNodesChange,
    setEditingNodeId
  };
};
