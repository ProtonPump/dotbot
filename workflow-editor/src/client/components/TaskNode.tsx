/**
 * Custom React Flow node representing a workflow task.
 * Displays task name, type badge, and indicators for optional/condition.
 */
import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TaskNodeData } from '../model/transform';
import { TASK_TYPE_STYLES } from '../model/transform';

function TaskNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TaskNodeData;
  const style = TASK_TYPE_STYLES[nodeData.taskType] || TASK_TYPE_STYLES.prompt;

  return (
    <div
      style={{
        background: '#1e293b',
        border: `2px solid ${selected ? '#3b82f6' : '#334155'}`,
        borderRadius: 8,
        padding: '10px 14px',
        minWidth: 200,
        borderStyle: nodeData.isOptional ? 'dashed' : 'solid',
        boxShadow: selected ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.2)',
        cursor: 'grab',
      }}
    >
      <Handle type="target" position={Position.Top} style={handleStyle} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span
          style={{
            display: 'inline-block',
            padding: '1px 6px',
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600,
            background: style.color,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {style.label}
        </span>
        {nodeData.hasCondition && (
          <span style={{ fontSize: 10, color: '#f97316' }} title="Has condition">
            ?
          </span>
        )}
        {nodeData.isOptional && (
          <span style={{ fontSize: 10, color: '#94a3b8', fontStyle: 'italic' }}>opt</span>
        )}
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#f1f5f9',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 200,
        }}
      >
        {nodeData.label}
      </div>

      <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
        Priority: {nodeData.task.priority}
      </div>

      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </div>
  );
}

const handleStyle = {
  width: 10,
  height: 10,
  background: '#3b82f6',
  border: '2px solid #1e293b',
};

export const TaskNode = memo(TaskNodeComponent);
