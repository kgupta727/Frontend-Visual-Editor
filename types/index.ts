export interface StyleProps {
  // Colors
  color?: string;
  backgroundColor?: string;
  textColor?: string;

  // Spacing
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  fontStyle?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;

  // Layout
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;

  // Border & Radius
  borderRadius?: string;

  // Effects
  opacity?: string;
  boxShadow?: string;
  filter?: string;
}

export interface UIComponent {
  id: string;
  type: 'container' | 'button' | 'text' | 'card' | 'input' | 'image' | 'heading';
  label?: string;
  content?: string;
  children?: UIComponent[];
  styles: StyleProps;
}

export interface EditorScreen {
  id: string;
  name: string;
  components: UIComponent[];
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    description?: string;
  };
}

export interface EditorState {
  screen: EditorScreen;
  selectedComponentId: string | null;
  isDirty: boolean;
}
