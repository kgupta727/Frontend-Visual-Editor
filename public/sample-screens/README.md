# 🎨 Sample Screens for Frontend Visual Editor

This folder contains 3 diverse sample JSON files ready to import and test in the Frontend Visual Editor.

## 📋 Available Samples

### 1. **E-Commerce Product Page** (`ecommerce-product.json`)
- **Layout**: 2-column (product image + details)
- **Features**: 
  - Navigation bar
  - Product image display
  - Pricing & rating
  - Specifications container
  - Add to Cart & Wishlist buttons
- **Best for testing**: 
  - Image sizing
  - Color variations (green accent)
  - Button styling
  - Nested containers

### 2. **Analytics Dashboard** (`analytics-dashboard.json`)
- **Layout**: Multi-card grid dashboard
- **Features**:
  - Header with date range
  - 4 KPI metric cards
  - 2 chart sections
  - Color-coded metrics (green for gains, red for losses)
- **Best for testing**:
  - Grid layouts
  - Card styling
  - Multiple color schemes
  - Typography variations
  - Flex alignment

### 3. **Blog Post Article** (`blog-article.json`)
- **Layout**: Hero section + 2-column content
- **Features**:
  - Gradient hero section
  - Main article content
  - Sidebar with author card
  - Related posts links
  - Highlight quote box
  - Lists & nested layouts
- **Best for testing**:
  - Typography hierarchy
  - Complex color combinations
  - Responsive layouts
  - Multiple component types
  - Nested content organization

## 🚀 How to Test

### Option 1: Import via UI
1. Start the Frontend Visual Editor (`npm run dev`)
2. Click the **"Upload JSON File"** button
3. Select any `.json` file from this folder
4. The design loads in the editor
5. Start editing styles!

### Option 2: Copy & Paste
1. Open a `.json` file with a text editor
2. Copy the entire JSON content
3. In the playground, click **"Import JSON"**
4. Select the file

## 🎯 Testing Checklist

Try these interactions with each sample:

- [ ] **Select components** by clicking on them in the preview
- [ ] **Change colors** using the color picker in the style panel
- [ ] **Adjust spacing** with the padding/margin sliders
- [ ] **Modify typography** (font size, weight, family)
- [ ] **Test layout** changes (flex direction, alignment)
- [ ] **Update border radius** using the preset buttons
- [ ] **Export the modified design** as JSON
- [ ] **Re-import** the exported JSON to verify round-trip

## 💡 Tips

1. **Start Simple**: Begin with the Product Page (most straightforward structure)
2. **Test Systematically**: Try one style property at a time to see effects clearly
3. **Use Presets**: Click color swatches and border radius buttons for quick styling
4. **Nested Editing**: Select deeply nested components from the tree panel on the left
5. **Compare Exports**: Export a sample, then compare to original to see what changed

## 📊 Component Types Used

Across all samples:
- ✅ `container` - Layout wrappers
- ✅ `heading` - Titles & headings
- ✅ `text` - Paragraphs & labels
- ✅ `button` - Interactive buttons
- ✅ `card` - Styled containers
- ✅ `image` - Image placeholders

## 🎨 Color Palettes in Samples

- **E-Commerce**: Green (#059669) + Gray
- **Dashboard**: Blue/Purple + Green/Red indicators
- **Blog**: Purple gradient (#667eea) + Gray + Blue links

Feel free to remix these colors to test the full spectrum!

## 🔄 Next Steps

After testing these, try:
1. Creating your own JSON structure
2. Mixing elements from different samples
3. Building your own custom layout
4. Sharing modified versions with the team

Happy designing! 🚀
