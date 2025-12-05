import '@testing-library/jest-dom';

// Mock IntersectionObserver for scroll animation tests
class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        // Store callback for potential use in tests
    }

    observe(target: Element): void {
        // Immediately trigger the callback to simulate element being visible
        // This makes scroll animations work in tests
    }

    unobserve(target: Element): void { }
    disconnect(): void { }
    takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = MockIntersectionObserver;
