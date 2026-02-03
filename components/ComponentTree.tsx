'use client';

import React, { useState } from 'react';
import { UIComponent } from '@/types/index';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ComponentTreeProps {
  components: UIComponent[];
  selectedId?: string | null;
  onSelectComponent: (id: string) => void;
}

interface TreeNodeProps {
  component: UIComponent;
  selectedId?: string | null;
  onSelectComponent: (id: string) => void;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  component,
  selectedId,
  onSelectComponent,
  level,
}) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = component.children && component.children.length > 0;
  const isSelected = selectedId === component.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 text-sm cursor-pointer rounded transition-colors ${
          isSelected
            ? 'bg-blue-100 text-blue-900 font-medium'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelectComponent(component.id)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-0"
          >
            {expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        ) : (
          <div className="w-3" />
        )}
        <span className="text-xs font-mono bg-gray-200 px-1 rounded">
          {component.type}
        </span>
        <span className="ml-1 flex-1 truncate">
          {component.label || component.content || '(no label)'}
        </span>
      </div>

      {expanded && hasChildren && (
        <div>
          {component.children?.map((child) => (
            <TreeNode
              key={child.id}
              component={child}
              selectedId={selectedId}
              onSelectComponent={onSelectComponent}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedId,
  onSelectComponent,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-semibold text-gray-900">Components</h3>
      </div>
      <div className="p-2">
        {components.map((component) => (
          <TreeNode
            key={component.id}
            component={component}
            selectedId={selectedId}
            onSelectComponent={onSelectComponent}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentTree;
