'use client';

import React, { useState } from 'react';
import { UIComponent, StyleProps } from '@/types/index';
import {
  ChevronDown,
  ChevronRight,
  Palette,
  Layout,
  Type,
  Maximize2,
  Zap,
} from 'lucide-react';

interface StyleEditorProps {
  component: UIComponent | null;
  onStyleChange: (styleUpdates: Partial<StyleProps>) => void;
  allComponents: UIComponent[];
}

const COLORS = [
  '#ffffff',
  '#f8f9fa',
  '#e5e7eb',
  '#1a1a1a',
  '#666666',
  '#4f46e5',
  '#ef4444',
  '#10b981',
  '#f59e0b',
];

const FONT_FAMILIES = [
  'Inter',
  'System UI',
  'Helvetica',
  'Georgia',
  'Courier New',
  'Arial',
];

const FONT_SIZES = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px',
];

const FONT_WEIGHTS = [
  '400',
  '500',
  '600',
  '700',
  '800',
];

const BORDER_RADIUS = [
  '0px',
  '4px',
  '8px',
  '12px',
  '16px',
  '20px',
  '50%',
];

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors"
      >
        {expanded ? (
          <ChevronDown size={16} className="text-gray-600" />
        ) : (
          <ChevronRight size={16} className="text-gray-600" />
        )}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          {icon}
          {title}
        </div>
      </button>
      {expanded && <div className="p-3 bg-gray-50 space-y-3">{children}</div>}
    </div>
  );
};

interface ColorInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value || '#ffffff'}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 cursor-pointer"
      />
      <input
        type="text"
        value={value || '#ffffff'}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs font-mono"
        placeholder="#ffffff"
      />
    </div>
    <div className="flex flex-wrap gap-1">
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={`w-5 h-5 rounded border ${
            value === color ? 'border-gray-800 border-2' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  </div>
);

interface SliderInputProps {
  label: string;
  value?: string;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}) => {
  const numValue = parseInt(value || '0') || 0;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={numValue}
          onChange={(e) => onChange(`${e.target.value}px`)}
          className="flex-1"
        />
        <input
          type="text"
          value={value || '0px'}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-xs font-mono"
        />
      </div>
    </div>
  );
};

interface TextInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
    />
  </div>
);

interface SelectInputProps {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, options, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const StyleEditor: React.FC<StyleEditorProps> = ({ component, onStyleChange }) => {
  if (!component) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        <p>Select a component to edit styles</p>
      </div>
    );
  }

  const handleStyleChange = (key: keyof StyleProps, value: string) => {
    onStyleChange({ [key]: value });
  };

  const styles = component.styles;

  return (
    <div className="overflow-y-auto h-full">
      {/* Component Info */}
      <div className="p-3 bg-blue-50 border-b border-blue-200">
        <div className="text-xs font-medium text-blue-900">
          {component.label || component.type}
        </div>
        <div className="text-xs text-blue-700 mt-1">{component.id}</div>
      </div>

      {/* Colors */}
      <Section title="Colors" icon={<Palette size={16} />}>
        <ColorInput
          label="Text Color"
          value={styles.color}
          onChange={(v) => handleStyleChange('color', v)}
        />
        <ColorInput
          label="Background Color"
          value={styles.backgroundColor}
          onChange={(v) => handleStyleChange('backgroundColor', v)}
        />
      </Section>

      {/* Typography */}
      <Section title="Typography" icon={<Type size={16} />}>
        <SelectInput
          label="Font Family"
          value={styles.fontFamily}
          options={FONT_FAMILIES}
          onChange={(v) => handleStyleChange('fontFamily', v)}
        />
        <SelectInput
          label="Font Size"
          value={styles.fontSize}
          options={FONT_SIZES}
          onChange={(v) => handleStyleChange('fontSize', v)}
        />
        <SelectInput
          label="Font Weight"
          value={styles.fontWeight}
          options={FONT_WEIGHTS}
          onChange={(v) => handleStyleChange('fontWeight', v)}
        />
        <SelectInput
          label="Font Style"
          value={styles.fontStyle}
          options={['normal', 'italic', 'oblique']}
          onChange={(v) => handleStyleChange('fontStyle', v)}
        />
        <TextInput
          label="Line Height"
          value={styles.lineHeight}
          onChange={(v) => handleStyleChange('lineHeight', v)}
          placeholder="1.5"
        />
        <TextInput
          label="Letter Spacing"
          value={styles.letterSpacing}
          onChange={(v) => handleStyleChange('letterSpacing', v)}
          placeholder="0px"
        />
        <SelectInput
          label="Text Align"
          value={styles.textAlign}
          options={['left', 'center', 'right', 'justify']}
          onChange={(v) => handleStyleChange('textAlign', v)}
        />
      </Section>

      {/* Spacing */}
      <Section title="Spacing" icon={<Layout size={16} />}>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-2 block">Padding</label>
          <SliderInput
            label="All Sides"
            value={styles.padding}
            max={50}
            onChange={(v) => handleStyleChange('padding', v)}
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <TextInput
              label="Top"
              value={styles.paddingTop}
              onChange={(v) => handleStyleChange('paddingTop', v)}
            />
            <TextInput
              label="Right"
              value={styles.paddingRight}
              onChange={(v) => handleStyleChange('paddingRight', v)}
            />
            <TextInput
              label="Bottom"
              value={styles.paddingBottom}
              onChange={(v) => handleStyleChange('paddingBottom', v)}
            />
            <TextInput
              label="Left"
              value={styles.paddingLeft}
              onChange={(v) => handleStyleChange('paddingLeft', v)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-medium text-gray-700 mb-2 block">Margin</label>
          <SliderInput
            label="All Sides"
            value={styles.margin}
            max={50}
            onChange={(v) => handleStyleChange('margin', v)}
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <TextInput
              label="Top"
              value={styles.marginTop}
              onChange={(v) => handleStyleChange('marginTop', v)}
            />
            <TextInput
              label="Right"
              value={styles.marginRight}
              onChange={(v) => handleStyleChange('marginRight', v)}
            />
            <TextInput
              label="Bottom"
              value={styles.marginBottom}
              onChange={(v) => handleStyleChange('marginBottom', v)}
            />
            <TextInput
              label="Left"
              value={styles.marginLeft}
              onChange={(v) => handleStyleChange('marginLeft', v)}
            />
          </div>
        </div>

        <div className="mt-4">
          <TextInput
            label="Gap"
            value={styles.gap}
            onChange={(v) => handleStyleChange('gap', v)}
            placeholder="16px"
          />
        </div>
      </Section>

      {/* Layout */}
      <Section title="Layout" icon={<Layout size={16} />}>
        <SelectInput
          label="Display"
          value={styles.display}
          options={['block', 'flex', 'grid', 'inline-block', 'inline']}
          onChange={(v) => handleStyleChange('display', v)}
        />
        {styles.display === 'flex' && (
          <>
            <SelectInput
              label="Flex Direction"
              value={styles.flexDirection}
              options={['row', 'column', 'row-reverse', 'column-reverse']}
              onChange={(v) => handleStyleChange('flexDirection', v)}
            />
            <SelectInput
              label="Justify Content"
              value={styles.justifyContent}
              options={[
                'flex-start',
                'center',
                'flex-end',
                'space-between',
                'space-around',
                'space-evenly',
              ]}
              onChange={(v) => handleStyleChange('justifyContent', v)}
            />
            <SelectInput
              label="Align Items"
              value={styles.alignItems}
              options={['flex-start', 'center', 'flex-end', 'stretch', 'baseline']}
              onChange={(v) => handleStyleChange('alignItems', v)}
            />
          </>
        )}
      </Section>

      {/* Sizing */}
      <Section title="Sizing" icon={<Maximize2 size={16} />}>
        <TextInput
          label="Width"
          value={styles.width}
          onChange={(v) => handleStyleChange('width', v)}
          placeholder="auto"
        />
        <TextInput
          label="Height"
          value={styles.height}
          onChange={(v) => handleStyleChange('height', v)}
          placeholder="auto"
        />
        <TextInput
          label="Min Width"
          value={styles.minWidth}
          onChange={(v) => handleStyleChange('minWidth', v)}
        />
        <TextInput
          label="Max Width"
          value={styles.maxWidth}
          onChange={(v) => handleStyleChange('maxWidth', v)}
        />
        <TextInput
          label="Min Height"
          value={styles.minHeight}
          onChange={(v) => handleStyleChange('minHeight', v)}
        />
        <TextInput
          label="Max Height"
          value={styles.maxHeight}
          onChange={(v) => handleStyleChange('maxHeight', v)}
        />
      </Section>

      {/* Border & Effects */}
      <Section title="Border & Effects" icon={<Zap size={16} />}>
        <TextInput
          label="Border Radius"
          value={styles.borderRadius}
          onChange={(v) => handleStyleChange('borderRadius', v)}
          placeholder="0px"
        />
        <div className="flex flex-wrap gap-1 mt-2">
          {BORDER_RADIUS.map((radius) => (
            <button
              key={radius}
              onClick={() => handleStyleChange('borderRadius', radius)}
              className={`px-2 py-1 text-xs border rounded ${
                styles.borderRadius === radius
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              {radius}
            </button>
          ))}
        </div>

        <TextInput
          label="Box Shadow"
          value={styles.boxShadow}
          onChange={(v) => handleStyleChange('boxShadow', v)}
          placeholder="0 1px 3px rgba(0,0,0,0.1)"
        />

        <SliderInput
          label="Opacity"
          value={styles.opacity}
          min={0}
          max={100}
          onChange={(v) => handleStyleChange('opacity', `${parseInt(v) / 100}`)}
        />
      </Section>
    </div>
  );
};

export default StyleEditor;
