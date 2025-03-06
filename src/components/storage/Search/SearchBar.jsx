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
        <form role="search" className="w-full flex justify-center items-center">
            <div className="w-[80vw] md:w-[60vw] lg:w-[50vw] relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Busca tus archivos..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 
                    bg-cyan-50 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400
                    transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                        text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        ✖
                    </button>
                )}
            </div>
        </form>
    );
};
