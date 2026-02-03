# Frontend Visual Editor

A **visual editor concept** for websites and mobile app interfaces. Edit frontend designs with live preview and comprehensive style controls without changing backend code.

## Overview

This is a proof-of-concept tool that demonstrates a workflow for editing frontend designs visually while keeping backend logic completely separate and untouched.

### The Workflow

1. **Upload Website/App** - Import your website or mobile app interface
2. **Generate JSON** - System creates a JSON representation of the frontend (backend remains unchanged)
3. **Open Live Editor** - Edit styles, colors, layouts, and spacing visually with real-time preview
4. **Save JSON Changes** - Export your modified design as JSON
5. **Apply to Code** - Upload the JSON changes back to your codebase

## Features

🎨 **Comprehensive Style Controls**
- Colors: text, background, borders with color picker + presets
- Typography: fonts, sizes, weights, line height, letter spacing
- Spacing: padding & margin with individual side controls
- Layout: flex properties, alignment, justification
- Sizing: width, height, min/max constraints
- Effects: shadows, opacity, border radius, filters

📦 **Component Management**
- Interactive component tree with hierarchy visualization
- Live preview with instant style updates
- Click-to-select components directly on canvas
- Support for containers, buttons, cards, text, headings, inputs, images

💾 **Save & Export**
- Auto-save to browser sessionStorage
- Export design as clean JSON
- Import JSON files to continue editing
- Safe for backend - only frontend changes

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to start editing!

## How to Use

1. **Import** a JSON file (try one of our samples)
2. **Select** a component by clicking on it in the preview or in the component tree
3. **Edit** its styles using the right-side panel with Photoshop-like controls
4. **Preview** changes instantly in the center canvas
5. **Export** your design as JSON when ready

## Project Structure

```
app/
├── page.tsx          # Main editor interface
├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ComponentRenderer.tsx  # Renders JSON to React components
│   ├── StyleEditor.tsx        # Photoshop-like style panel
│   └── ComponentTree.tsx      # Hierarchy tree view
├── types/
│   └── index.ts          # TypeScript type definitions
├── lib/
│   ├── utils.ts          # Helper functions
│   └── sample-data.ts    # Sample screen with example components
└── tailwind.config.ts    # Tailwind CSS configuration
```

## JSON Format

Components follow this structure:

```json
{
  "id": "unique-id",
  "type": "container|button|text|card|input|image|heading",
  "label": "Display name",
  "content": "Text content or image URL",
  "styles": {
    "display": "flex",
    "flexDirection": "column",
    "padding": "24px",
    "backgroundColor": "#ffffff",
    ...
  },
  "children": [...]
}
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - UI styling
- **Lucide React** - Icons
- **Browser sessionStorage** - Data persistence

## Key Benefits

✅ **Backend Safe** - Only frontend/visual changes, backend logic untouched  
✅ **Visual Workflow** - No code editing required for design changes  
✅ **Multi-Platform** - Works for websites and mobile app interfaces  
✅ **Real-time Preview** - See changes instantly  
✅ **Export/Import** - Easy JSON-based workflow

## Use Cases

- Rapid prototyping of UI designs
- A/B testing different visual styles
- Design handoff between designers and developers
- Frontend iteration without backend deployments
- Visual customization for clients

Built as a proof-of-concept for visual frontend editing workflows. 🚀
