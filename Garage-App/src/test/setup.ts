import '@testing-library/jest-dom';

// Mock IntersectionObserver for scroll animation tests
class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
        // Store callback for potential use in tests
    }

    observe(_target: Element): void {
        // Immediately trigger the callback to simulate element being visible
        // This makes scroll animations work in tests
    }

    unobserve(_target: Element): void { }
    disconnect(): void { }
    takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = MockIntersectionObserver;
