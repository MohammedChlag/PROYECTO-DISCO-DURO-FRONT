import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Hook de debounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

export const SearchBar = ({ onSearch, onClearSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Efecto para búsqueda
    useEffect(() => {
        // Solo ejecutar la búsqueda si hay un término de búsqueda
        if (debouncedSearchTerm?.trim()) {
            onSearch({ query: debouncedSearchTerm.trim() });
        }
    }, [debouncedSearchTerm]); // Solo depender del término de búsqueda

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            onClearSearch(); // Limpiar cuando el input está vacío
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        onClearSearch();
    };

    return (
        <form
            role="search"
            className="w-full max-w-4xl mt-3 px-4 py-2 relative flex-1"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Busca tus archivos..."
                className="bg-cyan-100 w-full pl-10 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2"
            />
            <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    ✖
                </button>
            )}
        </form>
    );
};
