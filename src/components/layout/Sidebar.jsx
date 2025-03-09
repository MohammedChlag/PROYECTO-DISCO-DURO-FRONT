import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    HomeIcon,
    DocumentTextIcon,
    UsersIcon,
    InformationCircleIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { ActionSidebarButton } from './ActionSidebarButton.jsx';
import { SidebarButton } from './SidebarButton.jsx';

export const Sidebar = ({
    onCreateFolder,
    onUpload,
    activeTab,
    setActiveTab,
}) => {
    const location = useLocation();

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white p-4 border-r border-gray-200 h-screen sticky top-0 dark:bg-[#2c2c2c] rounded-lg dark:border-none">
            {/* Botones de acción */}
            <div className="flex flex-col space-y-2 mb-6">
                <ActionSidebarButton
                    icon={FolderPlusIcon}
                    label="Crear carpeta"
                    onClick={onCreateFolder}
                />
                <ActionSidebarButton
                    icon={ArrowUpTrayIcon}
                    label="Subir archivo"
                    onClick={onUpload}
                />
            </div>

            {/* Navegación principal */}
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navegación
            </h3>
            <nav className="flex flex-col space-y-1 mb-8">
                <SidebarButton
                    icon={HomeIcon}
                    label="Página principal"
                    isActive={activeTab === 'principal'}
                    onClick={() => setActiveTab('principal')}
                />
                <SidebarButton
                    icon={DocumentTextIcon}
                    label="Mis documentos"
                    isActive={activeTab === 'documentos'}
                    onClick={() => setActiveTab('documentos')}
                />
                <SidebarButton
                    icon={UsersIcon}
                    label="Compartidos"
                    isActive={activeTab === 'compartidos'}
                    onClick={() => setActiveTab('compartidos')}
                />
            </nav>

            {/* Enlaces adicionales */}
            <div className="mt-auto">
                <SidebarButton
                    icon={InformationCircleIcon}
                    label="About us"
                    to="/aboutUs"
                    isActive={location.pathname === '/aboutUs'}
                />
            </div>
        </aside>
    );
};
