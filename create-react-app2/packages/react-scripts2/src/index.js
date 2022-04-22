import React from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript

root.render(<h1>hello</h1>);