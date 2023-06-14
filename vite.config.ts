/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
    server: {
        port: 3000
    },
    build: {
        target: 'esnext'
    },
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            all: true,
            include: ["src/**/*.ts"],
            provider: 'istanbul',
            reporter: ['text', 'json', 'html']
    }
}
})
