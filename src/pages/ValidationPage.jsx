import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LayoutPublic } from '../components/LayoutPublic/LayoutPublic.jsx';

export const ValidationPage = () => {
    const { registrationCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    useEffect(() => {
        toast.info('En proceso de validar tú cuenta');
        const userActivation = async () => {
            try {
                const response = await fetch(
                    `${apiPath}/users/activate/${registrationCode}`,
                    { method: 'PUT' }
                );
                if (response.ok) {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: 'success',
                        message: result.message,
                    });
                    navigate(`/users/login?${params.toString()}`);
                    return;
                } else {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: 'error',
                        message: result.message,
                    });
                    navigate(`/users/login?${params.toString()}`);
                    return;
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        const timer = setTimeout(() => {
            userActivation();
            setLoading(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, [registrationCode]);
    return (
        <LayoutPublic>
            <section>
                {loading && <p>Cargando...</p>}
                {!loading && <p>Usuario acivado correctamente</p>}
            </section>
        </LayoutPublic>
    );
};
