import { defineConfig } from 'vitest/config'

export default defineConfig({
    base: "./",
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
