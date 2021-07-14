const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000/api' : 'https://next-note-app-one.vercel.app/api';