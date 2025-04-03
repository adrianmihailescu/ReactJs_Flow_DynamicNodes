import { renderHook, act } from '@testing-library/react-hooks';
import { useFlowState } from './useFlowState'; // Adjust this import path as needed
import { Node, Edge } from 'reactflow';
import { waitFor } from '@testing-library/react'; // Import waitFor for asynchronous checks

describe('useFlowState Hook', () => {
    it('should add a new node correctly', async () => {
        let initialNodes: Node[] = [];
        let initialEdges: Edge[] = [];
    
        const { result } = renderHook(() => useFlowState(initialNodes, initialEdges));
    
        // Initial state
        expect(result.current.nodes).toHaveLength(0);
    
        // Add node
        act(() => {
          result.current.addNode();
        });
    
        // Use waitFor to wait for the state to update if necessary
        await waitFor(() => {
          expect(result.current.nodes).toHaveLength(1);
          expect(result.current.nodes[0].data.label).toBe('New Node');
        });
      });

  it('should add a new group node correctly', async () => {
    let initialNodes: Node[] = [];
    let initialEdges: Edge[] = []; // Ensure Edge type is used

    const { result } = renderHook(() => useFlowState(initialNodes, initialEdges));

    // Add group node
    act(() => {
      result.current.addGroupNode();
    });

    // Wait for the state to update
    await waitFor(() => {
      expect(result.current.nodes).toHaveLength(1);
      expect(result.current.nodes[0].type).toBe('groupNode');
      expect(result.current.nodes[0].data.label).toBe('Group 1');
    });
  });

  it('should update the node name correctly', async () => {
    let initialNodes: Node[] = [];
    let initialEdges: Edge[] = []; // Ensure Edge type is used

    const { result } = renderHook(() => useFlowState(initialNodes, initialEdges));

    // Add a new node first
    act(() => {
      result.current.addNode();
    });

    // Set node name
    act(() => {
      result.current.setNewNodeName('Updated Node');
    });

    // Update node name
    act(() => {
      result.current.handleNameChange();
    });

    // Verify the name update
    await waitFor(() => {
      expect(result.current.nodes[0].data.label).toBe('Updated Node');
    });
  });

  it('should handle node position changes correctly', async () => {
    let initialNodes: Node[] = [];
    let initialEdges: Edge[] = []; // Ensure Edge type is used

    const { result } = renderHook(() => useFlowState(initialNodes, initialEdges));

    // Add a node with a random position
    act(() => {
      result.current.addNode();
    });

    const initialPosition = result.current.nodes[0].position;

    // Update node position (simulate a drag)
    const newPosition = { x: 100, y: 200 };
    act(() => {
      result.current.onNodesChange([{ id: result.current.nodes[0].id, type: 'position', position: newPosition }]);
    });

    // Verify the position has been updated
    await waitFor(() => {
      expect(result.current.nodes[0].position).toEqual(newPosition);
      expect(result.current.nodes[0].position).not.toEqual(initialPosition);
    });
  });

  it('should connect nodes correctly using onConnect', async () => {
    let initialNodes: Node[] = [];
    let initialEdges: Edge[] = []; // Ensure Edge type is used

    const { result } = renderHook(() => useFlowState(initialNodes, initialEdges));

    // Add two nodes
    act(() => {
      result.current.addNode();
      result.current.addNode();
    });

    // Simulate a connection between nodes
    const edgeParams = { source: result.current.nodes[0].id, target: result.current.nodes[1].id };
    act(() => {
      result.current.onConnect(edgeParams);
    });

    // Check that edges array is updated
    await waitFor(() => {
      expect(result.current.edges).toHaveLength(1);
      expect(result.current.edges[0].source).toBe(result.current.nodes[0].id);
      expect(result.current.edges[0].target).toBe(result.current.nodes[1].id);
    });
  });
});