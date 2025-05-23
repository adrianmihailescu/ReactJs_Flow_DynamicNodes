this code triggers an error
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

const init
triggers a error
