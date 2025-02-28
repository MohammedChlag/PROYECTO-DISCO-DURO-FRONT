import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchFilters } from './SearchFilters';

// Hook personalizado para debounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minSize: '',
        maxSize: '',
        orderBy: 'name',
        orderDirection: 'asc',
    });

    // Solo aplicar debounce al término de búsqueda
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Efecto para realizar la búsqueda solo cuando cambia el término
    useEffect(() => {
        console.log(
            'SearchBar: Término de búsqueda cambió:',
            debouncedSearchTerm
        );

        // Siempre enviar la búsqueda, incluso si está vacía
        onSearch({
            query: debouncedSearchTerm?.trim() || '',
            ...filters,
        });
    }, [debouncedSearchTerm]); // Solo depender del término de búsqueda

    const handleChange = (e) => {
        const value = e.target.value;
        console.log('SearchBar: Input changed to:', value);
        setSearchTerm(value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log('SearchBar: Filter changed:', { name, value });

        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        // Aplicar filtros inmediatamente con el término actual
        onSearch({
            query: searchTerm?.trim() || '',
            ...newFilters,
        });
    };

    return (
        <section className="w-full max-w-3xl mt-2 px-4 py-2">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Buscar archivos..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <SearchFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    visible={showFilters}
                    onToggle={() => setShowFilters(!showFilters)}
                />
            </div>
        </section>
    );
};
