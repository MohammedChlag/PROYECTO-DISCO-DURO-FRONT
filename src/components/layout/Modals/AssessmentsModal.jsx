import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { createAssessmentService } from '../../../services/fetchApi';
import { toast } from 'react-toastify';

export const AssessmentsModal = ({
    isOpen,
    onClose,
    currentUser,
    token,
    onAssessmentCreated,
}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Por favor, selecciona una valoración');
            return;
        }

        // Verificar si tenemos token
        if (!token) {
            toast.error(
                'No hay token de autenticación. Por favor, inicia sesión nuevamente.'
            );
            return;
        }

        try {
            setSubmitting(true);
            console.log('Enviando valoración:', { vote: rating, comment });
            console.log('Token utilizado:', token.substring(0, 10) + '...');

            // Enviar los datos con los nombres de campo que espera el backend
            const result = await createAssessmentService(
                {
                    vote: rating,
                    comment: comment.trim(), // Enviamos el comentario sin espacios extra
                },
                token
            );

            console.log('Respuesta del servidor:', result);
            toast.success('¡Gracias por tu valoración!');
            setRating(0);
            setComment('');

            // Notificar al componente padre que se ha creado una valoración
            if (onAssessmentCreated) {
                onAssessmentCreated();
            }

            onClose();
        } catch (error) {
            console.error('Error completo:', error);
            toast.error(error.message || 'Error al enviar la valoración');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => {
            const isActive = (hoverRating || rating) >= star;
            const StarComponent = isActive ? StarSolid : StarOutline;

            return (
                <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                >
                    <StarComponent
                        className={`h-8 w-8 ${
                            isActive ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                    />
                </button>
            );
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

                {/* Modal */}
                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b">
                        <h3 className="text-lg font-medium text-gray-900">
                            {currentUser
                                ? 'Valorar Hackloud'
                                : 'Únete para valorar'}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                        {currentUser ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6 text-center">
                                    <p className="mb-3 text-gray-600">
                                        ¿Cómo valorarías tu experiencia con
                                        Hackloud?
                                    </p>
                                    <div className="flex justify-center space-x-2">
                                        {renderStars()}
                                    </div>
                                    {rating > 0 && (
                                        <p className="mt-2 text-sm font-medium text-[#009EB5]">
                                            {rating === 1 && 'Muy insatisfecho'}
                                            {rating === 2 && 'Insatisfecho'}
                                            {rating === 3 && 'Neutral'}
                                            {rating === 4 && 'Satisfecho'}
                                            {rating === 5 && '¡Excelente!'}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="comment"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Comentario *
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows="4"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#009EB5] focus:border-[#009EB5]"
                                        placeholder="Comparte tu experiencia con nosotros..."
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        loading={submitting}
                                        className="w-full py-2 px-4 text-white bg-[#009EB5] hover:bg-[#009ec3] rounded-md shadow-sm"
                                    >
                                        Enviar valoración
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="p-4 mb-4 bg-[#e6f7f9] rounded-lg">
                                    <p className="text-[#00798a] mb-3">
                                        Para valorar nuestra aplicación,
                                        necesitas iniciar sesión o registrarte.
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Tus valoraciones nos ayudan a mejorar y
                                        ofrecer un mejor servicio a todos
                                        nuestros usuarios.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <Link
                                        to="/users/login"
                                        className="flex-1 py-2 px-4 text-center text-white bg-[#009EB5] hover:bg-[#009ec3] rounded-md shadow-sm"
                                        onClick={onClose}
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        to="/users/register"
                                        className="flex-1 py-2 px-4 text-center border border-[#009EB5] text-[#009EB5] hover:bg-[#e6f7f9] rounded-md"
                                        onClick={onClose}
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
