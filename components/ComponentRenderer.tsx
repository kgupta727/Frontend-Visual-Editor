'use client';

import React from 'react';
import { UIComponent } from '@/types/index';
import { getComponentStyle } from '@/lib/utils';

interface ComponentRendererProps {
  component: UIComponent;
  selectedId?: string | null;
  onSelectComponent?: (id: string) => void;
  editable?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  selectedId,
  onSelectComponent,
  editable = true,
}) => {
  const isSelected = selectedId === component.id;
  const baseStyle = getComponentStyle(component.styles);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editable && onSelectComponent) {
      onSelectComponent(component.id);
    }
  };

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    ...(isSelected &&
      editable && {
        outline: '2px dashed #4f46e5',
        outlineOffset: '4px',
      }),
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'container':
        return (
          <div style={containerStyle} onClick={handleClick}>
            {component.children && component.children.length > 0 ? (
              component.children.map((child) => (
                <ComponentRenderer
                  key={child.id}
                  component={child}
                  selectedId={selectedId}
                  onSelectComponent={onSelectComponent}
                  editable={editable}
                />
              ))
            ) : (
              <div style={{ padding: '20px', color: '#999' }}>Empty Container</div>
            )}
          </div>
        );

      case 'heading':
        return (
          <h1 style={containerStyle} onClick={handleClick}>
            {component.content || 'Heading'}
          </h1>
        );

      case 'text':
        return (
          <p style={containerStyle} onClick={handleClick}>
            {component.content || 'Text content'}
          </p>
        );

      case 'button':
        return (
          <button style={containerStyle} onClick={handleClick}>
            {component.content || 'Button'}
          </button>
        );

      case 'card':
        return (
          <div style={containerStyle} onClick={handleClick}>
            {component.children && component.children.length > 0 ? (
              component.children.map((child) => (
                <ComponentRenderer
                  key={child.id}
                  component={child}
                  selectedId={selectedId}
                  onSelectComponent={onSelectComponent}
                  editable={editable}
                />
              ))
            ) : (
              <div style={{ padding: '20px', color: '#999' }}>Card Content</div>
            )}
          </div>
        );

      case 'input':
        return (
          <input
            type="text"
            placeholder={component.content || 'Input field'}
            style={containerStyle}
            onClick={handleClick}
          />
        );

      case 'image':
        return (
          <img
            src={component.content || 'https://via.placeholder.com/400x300'}
            alt="Component"
            style={{
              ...containerStyle,
              objectFit: 'cover',
              display: 'block'
            }}
            onClick={handleClick}
          />
        );

      default:
        return (
          <div style={containerStyle} onClick={handleClick}>
            {component.content || 'Unknown component'}
          </div>
        );
    }
  };

  return renderComponent();
};

export default ComponentRenderer;
