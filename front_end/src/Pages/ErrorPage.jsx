import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
    const goBack = () =>{
        navigate('/')
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <img className='w-2/5 ' src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-1024x499-muqmchqg.png" alt="" />
            <button onClick={goBack} className='btn mt-8 bg-sky-500  text-4xl font-bold text-white'>Home</button>
        </div>
    );
};

export default ErrorPage;