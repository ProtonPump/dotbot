/**
 * React Flow canvas wrapper with custom node/edge types and controls.
 */
import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeTypes,
  type EdgeTypes,
  MarkerType,
} from '@xyflow/react';
import type { TaskType } from '../model/workflow';
import '@xyflow/react/dist/style.css';
import { TaskNode } from './TaskNode';
import { DependencyEdge } from './DependencyEdge';
import type { TaskNodeData } from '../model/transform';

const nodeTypes: NodeTypes = {
  taskNode: TaskNode,
};

const edgeTypes: EdgeTypes = {
  dependencyEdge: DependencyEdge,
};

const defaultEdgeOptions = {
  type: 'dependencyEdge',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' },
};

interface CanvasProps {
  nodes: Node<TaskNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (nodeId: string) => void;
  onDropTask?: (type: TaskType, position: { x: number; y: number }) => void;
}

export function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDropTask,
}: CanvasProps) {
  const { screenToFlowPosition } = useReactFlow();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('application/dotbot-task-type')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    const type = e.dataTransfer.getData('application/dotbot-task-type') as TaskType;
    if (!type || !onDropTask) return;
    e.preventDefault();
    const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
    onDropTask(type, position);
  }, [onDropTask, screenToFlowPosition]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={(_event, node) => onNodeClick(node.id)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      fitViewOptions={{ padding: 0.3 }}
      deleteKeyCode={['Backspace', 'Delete']}
      minZoom={0.2}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b" />
      <Controls position="bottom-left" />
      <MiniMap
        position="bottom-right"
        nodeColor={(node) => {
          const data = node.data as TaskNodeData;
          const typeColors: Record<string, string> = {
            prompt: '#3b82f6',
            script: '#22c55e',
            mcp: '#a855f7',
            task_gen: '#f97316',
            prompt_template: '#06b6d4',
            barrier: '#6b7280',
          };
          return typeColors[data?.taskType] || '#3b82f6';
        }}
        nodeStrokeWidth={3}
        nodeBorderRadius={4}
        maskColor="rgba(15, 23, 42, 0.6)"
        style={{ background: '#0f172a' }}
      />
    </ReactFlow>
  );
}
