import { createRoot } from 'react-dom/client';
import App from './App';

try {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Failed to render React app:', error);
}
