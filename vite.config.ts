import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dependencies } from './package.json';

function renderChunks(dependencies: Record<string, string>) {
    const chunks: Record<string, string[]> = {};

    Object.keys(dependencies).forEach((key) => {
        if (['react', 'react-dom'].indexOf(key) !== -1) return;
        chunks[key] = [key];
    });

    return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ...renderChunks(dependencies),
                },
            },
        },
    },
});
