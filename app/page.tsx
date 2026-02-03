'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ComponentRenderer from '@/components/ComponentRenderer';
import StyleEditor from '@/components/StyleEditor';
import ComponentTree from '@/components/ComponentTree';
import { EditorScreen, StyleProps } from '@/types/index';
import { updateComponentStyle, exportToJSON, importFromJSON } from '@/lib/utils';
import { Download, Upload, Save, RotateCcw, FileJson } from 'lucide-react';

export default function Home() {
  const [screen, setScreen] = useState<EditorScreen | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('editor-screen');
    if (saved) {
      try {
        const parsed = importFromJSON(saved);
        setScreen(parsed);
        setShowLanding(false);
      } catch (e) {
        console.error('Failed to load saved screen:', e);
      }
    }
  }, []);

  // Save to sessionStorage when screen changes
  useEffect(() => {
    if (isDirty && screen) {
      sessionStorage.setItem('editor-screen', exportToJSON(screen));
      setIsDirty(false);
    }
  }, [isDirty, screen]);

  const handleStyleChange = useCallback((styleUpdates: Partial<StyleProps>) => {
    if (!selectedComponentId || !screen) return;

    setScreen((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        components: updateComponentStyle(
          prev.components,
          selectedComponentId,
          styleUpdates
        ),
      };
    });
    setIsDirty(true);
  }, [selectedComponentId]);

  const handleReset = () => {
    if (confirm('Are you sure you want to clear the current screen?')) {
      sessionStorage.removeItem('editor-screen');
      window.location.reload();
    }
  };

  const handleExportJSON = () => {
    const json = exportToJSON(screen);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frontend-design-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const imported = importFromJSON(json);
        setScreen(imported);
        setSelectedComponentId(null);
        setIsDirty(true);
        setShowLanding(false);
        alert('Screen imported successfully!');
      } catch (error) {
        alert('Failed to import JSON: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const selectedComponent = selectedComponentId
    ? (() => {
        if (!screen) return null;
        const find = (comps: typeof screen.components): any => {
          for (const comp of comps) {
            if (comp.id === selectedComponentId) return comp;
            if (comp.children) {
              const found = find(comp.children);
              if (found) return found;
            }
          }
          return null;
        };
        return find(screen.components);
      })()
    : null;

  // Landing Page
  if (showLanding && !screen) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🎨 Frontend Visual Editor
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Visual editing concept for frontend interfaces
            </p>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Edit Frontend Designs Visually
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                A concept tool for editing website and mobile app interfaces with a live visual editor. 
                <span className="block mt-2 text-indigo-600 font-semibold">JSON-based workflow. Backend stays untouched.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-4xl mb-4">📤</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Upload Interface</h3>
                <p className="text-gray-600 text-sm">
                  Import JSON representation of your website or mobile app
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Edit Visually</h3>
                <p className="text-gray-600 text-sm">
                  Change styles, colors, spacing with Photoshop-like controls
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Export Changes</h3>
                <p className="text-gray-600 text-sm">
                  Download updated JSON to apply changes to your code
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Proof of Concept
                </p>
              </div>
              <p className="text-gray-600 text-center mb-8">
                This is a <strong>concept demonstration</strong> of a visual frontend editor. 
                The complete end-to-end application is not yet built. You can explore the live editor 
                functionality by importing sample JSON files.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowLanding(false)}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  Try the Editor →
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Supports websites and mobile app interfaces • JSON-based • Backend-safe
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!screen) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎨 Frontend Visual Editor
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Live visual editor for component styling
              </p>
            </div>
            <button
              onClick={() => setShowLanding(true)}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              ← Back to Home
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg text-center">
            <div className="text-6xl mb-6">📤</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Started
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Import a JSON file to begin editing. Choose from our sample screens or upload your own.
            </p>

            <div className="space-y-4">
              <label className="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer font-medium text-lg shadow-md hover:shadow-lg">
                <Upload size={24} />
                Upload JSON File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or try a sample</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href="/sample-screens/website-landing.json"
                  download
                  className="px-6 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium border border-green-200"
                >
                  🌐 Website Landing Page
                </a>
                <a
                  href="/sample-screens/mobile-shop.json"
                  download
                  className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium border border-indigo-200"
                >
                  🛍️ Mobile Shopping App
                </a>
                <a
                  href="/sample-screens/mobile-dashboard.json"
                  download
                  className="px-6 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium border border-blue-200"
                >
                  📊 Mobile Dashboard
                </a>
                <a
                  href="/sample-screens/mobile-profile.json"
                  download
                  className="px-6 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium border border-purple-200"
                >
                  👤 Mobile Profile Screen
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                💡 Tip: Download a sample JSON above, then import it using the upload button
              </p>
              
              <button
                onClick={() => {
                  sessionStorage.removeItem('editor-screen');
                  window.location.reload();
                }}
                className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Clear cached data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Frontend Visual Editor
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Live visual editor for frontend styling
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={previewMode}
              onChange={(e) => setPreviewMode(e.target.value as 'mobile' | 'tablet' | 'desktop')}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <option value="mobile">📱 Mobile</option>
              <option value="tablet">💻 Tablet</option>
              <option value="desktop">🖥️ Desktop</option>
            </select>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              title="Export current screen as JSON"
            >
              <Download size={16} />
              Export JSON
            </button>

            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
              <Upload size={16} />
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              title="Clear current screen and start fresh"
            >
              <RotateCcw size={16} />
              Clear
            </button>

            {isDirty && (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-800 rounded-lg text-xs font-medium">
                <Save size={14} />
                Saving...
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Tree */}
        <div className="w-96 overflow-hidden bg-white border-r border-gray-200">
          <ComponentTree
            components={screen.components}
            selectedId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
          />
        </div>

        {/* Center - Canvas with Preview */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
          <div className="relative">
            {previewMode === 'mobile' && (
              <>
                {/* iPhone Frame */}
                <div className="relative bg-black rounded-[50px] p-3 shadow-2xl" style={{ width: '350px', height: '717px' }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-40 h-7 rounded-b-3xl z-10"></div>
                  
                  {/* Screen */}
                  <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                      {screen.components.map((component) => (
                        <ComponentRenderer
                          key={component.id}
                          component={component}
                          selectedId={selectedComponentId}
                          onSelectComponent={setSelectedComponentId}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-50"></div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4 text-white text-sm font-medium opacity-75">
                  iPhone 14 Pro Preview
                </div>
              </>
            )}

            {previewMode === 'tablet' && (
              <>
                {/* Tablet Frame */}
                <div className="relative bg-gray-900 rounded-[40px] p-4 shadow-2xl" style={{ width: '768px', height: '1024px' }}>
                  {/* Screen */}
                  <div className="relative w-full h-full bg-white rounded-[30px] overflow-hidden">
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                      {screen.components.map((component) => (
                        <ComponentRenderer
                          key={component.id}
                          component={component}
                          selectedId={selectedComponentId}
                          onSelectComponent={setSelectedComponentId}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Home Button */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 border-2 border-gray-700 rounded-full"></div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4 text-white text-sm font-medium opacity-75">
                  iPad Preview
                </div>
              </>
            )}

            {previewMode === 'desktop' && (
              <>
                {/* Desktop Browser Frame */}
                <div className="relative bg-gray-800 rounded-lg shadow-2xl" style={{ width: '1200px', height: '800px' }}>
                  {/* Browser Chrome */}
                  <div className="bg-gray-700 rounded-t-lg px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-4 bg-gray-600 rounded px-3 py-1 text-xs text-gray-300">
                      localhost:3000
                    </div>
                  </div>
                  
                  {/* Screen */}
                  <div className="relative w-full bg-white overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                      {screen.components.map((component) => (
                        <ComponentRenderer
                          key={component.id}
                          component={component}
                          selectedId={selectedComponentId}
                          onSelectComponent={setSelectedComponentId}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4 text-white text-sm font-medium opacity-75">
                  Desktop Browser Preview
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar - Style Editor */}
        <div className="w-[400px] overflow-hidden bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileJson size={16} className="text-indigo-600" />
              Style Panel
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <StyleEditor
              component={selectedComponent}
              onStyleChange={handleStyleChange}
              allComponents={screen.components}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between text-xs text-gray-600">
        <div>
          {selectedComponent ? (
            <span>
              Selected: <strong>{selectedComponent.label || selectedComponent.type}</strong> ({selectedComponent.id})
            </span>
          ) : (
            <span>Click on a component to edit styles</span>
          )}
        </div>
        <div>
          <span>
            {screen.components.length} component{screen.components.length !== 1 ? 's' : ''} • Auto-saved for this session
          </span>
        </div>
      </footer>
    </div>
  );
}
