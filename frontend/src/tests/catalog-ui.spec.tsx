import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import CategoriesPage from '../app/(shop)/categories/page';
import * as hooks from '../hooks/useCatalog';

vi.mock('../hooks/useCatalog', () => ({
    useCategories: vi.fn(),
    useProducts: vi.fn(),
    useCategory: vi.fn(),
    useCollections: vi.fn(),
    useCollection: vi.fn(),
    useProduct: vi.fn()
}));

const mockData = [
    { id: '1', slug: 'electronics', name: 'Electronics', description: 'Tech stuff' }
];

describe('Catalog UI', () => {
    it('renders categories list loading state', () => {
        vi.mocked(hooks.useCategories).mockReturnValue({ data: null, isLoading: true, error: null } as any);
        const { container } = render(<CategoriesPage />);
        expect(container.textContent).toContain('Loading Categories...');
    });

    it('renders categories list data state', () => {
        vi.mocked(hooks.useCategories).mockReturnValue({ data: mockData, isLoading: false, error: null } as any);
        const { container } = render(<CategoriesPage />);
        expect(container.textContent).toContain('Electronics');
    });
});
