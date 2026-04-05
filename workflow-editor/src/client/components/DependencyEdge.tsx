/**
 * Custom React Flow edge for depends_on relationships.
 * Uses a smooth step path with an arrow marker.
 */
import { memo } from 'react';
import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react';

function DependencyEdgeComponent(props: EdgeProps) {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerEnd,
    selected,
  } = props;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        ...style,
        stroke: selected ? '#3b82f6' : '#475569',
        strokeWidth: selected ? 2 : 1.5,
      }}
    />
  );
}

export const DependencyEdge = memo(DependencyEdgeComponent);
