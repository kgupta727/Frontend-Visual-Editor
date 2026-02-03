import { UIComponent, StyleProps } from '@/types/index';

export const getComponentStyle = (styles: StyleProps): React.CSSProperties => {
  return {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    padding: styles.padding || `${styles.paddingTop || 0} ${styles.paddingRight || 0} ${styles.paddingBottom || 0} ${styles.paddingLeft || 0}`,
    margin: styles.margin || `${styles.marginTop || 0} ${styles.marginRight || 0} ${styles.marginBottom || 0} ${styles.marginLeft || 0}`,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight as any,
    fontFamily: styles.fontFamily,
    fontStyle: styles.fontStyle as any,
    lineHeight: styles.lineHeight,
    letterSpacing: styles.letterSpacing,
    textAlign: styles.textAlign as any,
    display: styles.display,
    flexDirection: styles.flexDirection as any,
    justifyContent: styles.justifyContent,
    alignItems: styles.alignItems,
    gap: styles.gap,
    width: styles.width,
    height: styles.height,
    minWidth: styles.minWidth,
    maxWidth: styles.maxWidth,
    minHeight: styles.minHeight,
    maxHeight: styles.maxHeight,
    borderRadius: styles.borderRadius,
    opacity: styles.opacity ? parseFloat(styles.opacity) : undefined,
    boxShadow: styles.boxShadow,
    filter: styles.filter,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };
};

export const findComponentById = (
  components: UIComponent[],
  id: string
): UIComponent | null => {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const updateComponentStyle = (
  components: UIComponent[],
  componentId: string,
  styleUpdates: Partial<StyleProps>
): UIComponent[] => {
  return components.map((component) => {
    if (component.id === componentId) {
      return {
        ...component,
        styles: {
          ...component.styles,
          ...styleUpdates,
        },
      };
    }
    if (component.children) {
      return {
        ...component,
        children: updateComponentStyle(component.children, componentId, styleUpdates),
      };
    }
    return component;
  });
};

export const exportToJSON = (data: any): string => {
  return JSON.stringify(data, null, 2);
};

export const importFromJSON = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};
