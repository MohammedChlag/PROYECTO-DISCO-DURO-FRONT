import { useEffect, useRef } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export const SearchFilters = ({
    filters,
    onFilterChange,
    visible,
    onToggle,
}) => {
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                onToggle();
            }
        };

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onToggle]);

    return (
        <div className="relative" ref={filterRef}>
            <button
                onClick={onToggle}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                title="Opciones de ordenamiento"
            >
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
            </button>

            {visible && (
                <div className="absolute right-0 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border z-10 md:absolute md:right-0 md:top-full md:w-64 md:p-3 lg:w-72 lg:p-4">
                    <div className="space-y-3 md:space-y-4 lg:space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ordenar por
                            </label>
                            <select
                                name="orderBy"
                                value={filters.orderBy}
                                onChange={onFilterChange}
                                className="w-full px-2 py-1.5 text-sm border rounded-md bg-white md:px-3 md:py-2 lg:px-3 lg:py-2"
                            >
                                <option value="name">Nombre</option>
                                <option value="size">Tamaño</option>
                                <option value="createdAt">
                                    Fecha de subida
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dirección
                            </label>
                            <select
                                name="orderDirection"
                                value={filters.orderDirection}
                                onChange={onFilterChange}
                                className="w-full px-2 py-1.5 text-sm border rounded-md bg-white md:px-3 md:py-2 lg:px-3 lg:py-2"
                            >
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
