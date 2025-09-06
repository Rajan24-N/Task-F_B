export const clients = [
  { id: 'collabera', name: 'Collabera - Collabera Inc' },
  { id: 'acme', name: 'ACME Corporation' },
  { id: 'globex', name: 'Globex Ltd.' }
].map(c => ({ label: c.name, value: c.id, raw: c }));
