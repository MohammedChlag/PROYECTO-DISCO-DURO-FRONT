import { StarIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button.jsx';
import { Boundary } from '../services/ErrorBoundary.jsx';

export const AssessmentsPage = () => {
    return (
        <>
            <Boundary>
                <div className="flex flex-col justify-center items-center text-center px-6 py-8 ">
                    <h2 className="text-2xl font-semibold mb-2 ">
                        Valorar plataforma
                    </h2>
                    <div className="w-16 h-1 bg-[#009EB5] mb-16 "></div>
                    <div>
                        <div className="flex justify-center items-center gap-4 cursor-pointer ">
                            <StarIcon className="h-5 w-5 text-yellow-500 " />
                            <StarIcon className="h-5 w-5 text-yellow-500 " />
                            <StarIcon className="h-5 w-5 text-yellow-500 " />
                            <StarIcon className="h-5 w-5 text-yellow-500 " />
                            <StarIcon className="h-5 w-5 text-yellow-500 " />
                        </div>
                        <p className=" text-md mt-3 py-5 font-medium ">
                            Deja un comentario
                        </p>
                        <form className="max-w-md">
                            <textarea
                                placeholder="Escribe un mensaje"
                                className="w-full px-3 rounded border bg-slate-200 py-7 outline-none  focus:border-[#00B4D8]"
                            />
                            <Button>Enviar</Button>
                        </form>
                    </div>
                </div>
            </Boundary>
        </>
    );
};
