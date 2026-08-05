const fs = require('fs');

const shopPage = (title) => `import React from 'react';\n\nexport default function Page() {\n  return (<div className="p-8"><h1 className="text-3xl font-bold">${title}</h1><p>Welcome to ${title}!</p></div>);\n}`;

fs.writeFileSync('src/app/(shop)/categories/page.tsx', shopPage('Categories'));
fs.writeFileSync('src/app/(shop)/collections/page.tsx', shopPage('Collections'));
fs.writeFileSync('src/app/(shop)/products/page.tsx', shopPage('Products'));
fs.writeFileSync('src/app/(shop)/products/[slug]/page.tsx', shopPage('Product Details'));

const adminPage = (title) => `import React from 'react';\n\nexport default function AdminPage() {\n  return (<div className="p-8"><h1 className="text-2xl font-bold">Manage ${title}</h1><p>Admin CRUD goes here.</p></div>);\n}`;

fs.writeFileSync('src/app/(admin)/admin/categories/page.tsx', adminPage('Categories'));
fs.writeFileSync('src/app/(admin)/admin/collections/page.tsx', adminPage('Collections'));
fs.writeFileSync('src/app/(admin)/admin/products/page.tsx', adminPage('Products'));
