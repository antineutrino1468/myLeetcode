import React, { useState, useRef, useEffect } from 'react';
import FlexLayout from 'flexlayout-react';
import 'flexlayout-react/style/light.css'; // The styling for dragging/docking
import { Send, ShieldCheck, Plus, Settings, AlertTriangle } from 'lucide-react';

// --- 1. DEFAULT LAYOUT CONFIGURATION ---
// This defines the initial look: A sidebar for settings, and two chat windows side-by-side
const jsonConfig = {
  global: { tabEnableClose: true, tabSetEnableMaximize: true },
  borders: [
    {
      type: "border", location: "left", size: 250, children: [
        { type: "tab", name: "Settings", component: "settings", enableClose: false }
      ]
    }
  ],
  layout: {
    type: "row",
    children: [
      {
        type: "tabset", weight: 50, children: [
          { type: "tab", name: "Chat: GPT-4", component: "chat", id: "chat_1", config: { provider: "GPT-4" } }
        ]
      },
      {
        type: "tabset", weight: 50, children: [
          { type: "tab", name: "Chat: Custom", component: "chat", id: "chat_2", config: { provider: "Custom" } }
        ]
      }
    ]
  }
};

// --- 2. HELPER LOGIC (Validation & Mock API) ---

const validateConfig = (url, key) => {
  // Regex to ensure URL starts with http/https and looks like a domain/IP
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  // Basic alpha-numeric check for keys to prevent shell injection
  const keyPattern = /^[a-zA-Z0-9\-\._]+$/;

  if (!urlPattern.test(url)) return "Invalid URL format.";
  if (key.length > 0 && !keyPattern.test(key)) return "API Key contains unsafe characters.";
  return null;
};

const mockLLMResponse = async (provider, message, customUrl) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (provider === 'Custom') {
        resolve(`[${customUrl || 'LocalHost'}] Processed: "${message}" via Custom API.`);
      } else {
        resolve(`[${provider}] Analysis: You said "${message}". Here is the comparison data.`);
      }
    }, 1000);
  });
};

// --- 3. SUB-COMPONENTS ---

// The Chat Window Component
const ChatWindow = ({ nodeId, config }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Local state for this specific chat tab's settings
  const [provider, setProvider] = useState(config.provider || "GPT-4");
  const [customUrl, setCustomUrl] = useState("http://localhost:11434/v1/chat"); // Example: Ollama
  const [apiKey, setApiKey] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Security Check
    const validationError = provider === 'Custom' ? validateConfig(customUrl, apiKey) : null;
    if (validationError) {
      setHistory(prev => [...prev, { role: 'system', text: `Security Alert: ${validationError}` }]);
      return;
    }

    const userMsg = input;
    setInput("");
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await mockLLMResponse(provider, userMsg, customUrl);
    
    setHistory(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px', background: '#fff' }}>
      {/* Mini Toolbar for this Chat */}
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select 
          value={provider} 
          onChange={(e) => setProvider(e.target.value)}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc'}}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="Claude-3">Claude-3</option>
          <option value="Grok">Grok</option>
          <option value="Custom">Custom (DeepSeek/Local)</option>
        </select>
        
        {provider === 'Custom' && (
          <input 
            type="text" 
            value={customUrl} 
            onChange={(e) => setCustomUrl(e.target.value)} 
            placeholder="API Endpoint URL"
            style={{ fontSize: '0.8em', padding: '5px', flex: 1, border: '1px solid #ddd' }}
          />
        )}
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {history.length === 0 && <div style={{color: '#aaa', textAlign: 'center', marginTop: '20px'}}>Start chatting to compare models...</div>}
        {history.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#007bff' : (msg.role === 'system' ? '#ffcccc' : '#f1f1f1'),
            color: msg.role === 'user' ? '#fff' : '#333',
            padding: '8px 12px',
            borderRadius: '8px',
            maxWidth: '80%',
            fontSize: '0.9rem'
          }}>
            {msg.role === 'system' && <AlertTriangle size={14} style={{marginRight:5, verticalAlign:'middle'}}/>}
            {msg.text}
          </div>
        ))}
        {loading && <div style={{color: '#888', fontStyle: 'italic'}}>Generating response...</div>}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', marginTop: '10px', gap: '5px' }}>
        <input 
          type="text" 
          value={input}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button onClick={handleSend} style={{ padding: '0 15px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

// The Settings Panel (Sidebar)
const SettingsPanel = ({ onAddChat }) => {
  return (
    <div style={{ padding: '15px', background: '#f8f9fa', height: '100%' }}>
      <h3><Settings size={20} style={{verticalAlign: 'middle'}}/> Control Center</h3>
      <p style={{fontSize: '0.8rem', color: '#666'}}>Manage your unified LLM workspace.</p>
      
      <hr style={{border: '0', borderTop: '1px solid #ddd', margin: '15px 0'}}/>
      
      <button 
        onClick={onAddChat}
        style={{ 
          width: '100%', padding: '10px', background: '#28a745', color: 'white', 
          border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
        }}
      >
        <Plus size={16} /> New Chat Window
      </button>

      <div style={{ marginTop: '20px', padding: '10px', background: '#e9ecef', borderRadius: '5px' }}>
        <h4 style={{margin: '0 0 10px 0', fontSize: '0.9rem'}}>Global Security <ShieldCheck size={14}/></h4>
        <div style={{fontSize: '0.75rem', color: '#555'}}>
          Status: <b>Active</b><br/>
          Input Validation: <b>Enabled</b><br/>
          XSS Protection: <b>Enabled</b>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN APP COMPONENT ---

export default function App() {
  const [model, setModel] = useState(FlexLayout.Model.fromJson(jsonConfig));

  // Factory function: FlexLayout calls this to render content based on the node "component" string
  const factory = (node) => {
    var component = node.getComponent();
    if (component === "chat") {
      return <ChatWindow nodeId={node.getId()} config={node.getConfig() || {}} />;
    }
    if (component === "settings") {
      return <SettingsPanel onAddChat={onAddChat} />;
    }
  };

  const onAddChat = () => {
    // Programmatically add a new tab to the layout
    model.doAction(FlexLayout.Actions.addNode(
      { type: "tab", component: "chat", name: "New Chat", config: { provider: "GPT-4" } },
      "chat_1", // Add adjacent to the first chat window (or any valid node ID)
      FlexLayout.DockLocation.CENTER,
      -1
    ));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <FlexLayout.Layout model={model} factory={factory} />
    </div>
  );
}