// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filters: {
        category: '',
        categories: [],
        priceRange: [0, 1000],
        minPrice: 0,
        maxPrice: 1000,
        searchQuery: '',
        rating: 0
    },
    filteredProducts: [],
    activeFiltersCount: 0
};

const countActiveFilters = (filters) => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceRange[0] !== filters.minPrice || filters.priceRange[1] !== filters.maxPrice) count++;
    if (filters.searchQuery) count++;
    if (filters.rating) count++;
    return count;
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
            state.filteredProducts = action.payload;

            // Calcular el precio mínimo y máximo
            const prices = action.payload.map(product => product.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            state.filters.minPrice = minPrice;
            state.filters.maxPrice = maxPrice;

            // Actualizar el rango de precios en los filtros
            state.filters.priceRange = [minPrice, maxPrice];
        },
        setCategories(state, action) {
            state.filters.categories = action.payload;
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
            state.activeFiltersCount = countActiveFilters(state.filters);
        },
        filterProducts(state) {
            let filtered = state.products;

            if (state.filters.category) {
                filtered = filtered.filter(product => product.category === state.filters.category);
            }

            if (state.filters.priceRange) {
                filtered = filtered.filter(product => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1]);
            }

            if (state.filters.searchQuery) {
                filtered = filtered.filter(product => product.name.toLowerCase().includes(state.filters.searchQuery.toLowerCase()));
            }

            if (state.filters.rating) {
                filtered = filtered.filter(product => Math.round(product.rating.rate) >= state.filters.rating);
            }

            state.filteredProducts = filtered;
        },
        resetFilters(state) {
            state.filters = {
                category: '',
                categories: state.filters.categories,
                priceRange: [state.filters.minPrice, state.filters.maxPrice],
                minPrice: state.filters.minPrice,
                maxPrice: state.filters.maxPrice,
                searchQuery: '',
                rating: 0
            };
            state.activeFiltersCount = countActiveFilters(state.filters);
        },

    }
});

export const { setProducts, setCategories, setFilters, filterProducts, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;