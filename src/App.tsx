import React, { useRef } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Node } from 'reactflow';
import 'reactflow/dist/style.css'; // React Flow's styles
import { useFlowState } from './hooks/useFlowState.ts';
import './App.css';

const initialNodes = [
  { id: '1', type: 'groupNode', data: { label: 'Group 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Start Node' }, position: { x: 100, y: 150 } },
  { id: '3', data: { label: 'End Node' }, position: { x: 400, y: 150 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
];

const App: React.FC = () => {
  const {
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
    onNodesChange
  } = useFlowState(initialNodes, initialEdges);

  const isDraggingRef = useRef(false); // To track dragging state and avoid unnecessary updates

  const handleNodeDrag = (event: React.MouseEvent, node: Node) => {
    if (isDraggingRef.current) return; // Ignore if already dragging
    isDraggingRef.current = true;

    requestAnimationFrame(() => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
      );
    });
  };

  const handleNodeDragStop = (event: React.MouseEvent, node: Node) => {
    isDraggingRef.current = false; // Reset the dragging state

    requestAnimationFrame(() => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
      );
    });
  };

  const flowStyles = {
    width: '100%',
    height: '100vh',
  };

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <button onClick={addNode} className="node-button">Add Node</button>
        <br /><br />
        <button onClick={addGroupNode} className="node-button">Add Group</button>
        <br /><br />
        <input
          type="text"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="Enter new name"
          className="node-name"
        />
        <button onClick={handleNameChange} className="node-button">Change Name</button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          onNodeDrag={handleNodeDrag}  // Track node position while dragging
          onNodeDragStop={handleNodeDragStop}  // Finalize position after drag
          onNodesChange={onNodesChange}
          style={flowStyles}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default App;
