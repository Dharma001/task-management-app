import React, { useState } from 'react';
import Register from './Auth/AuthModal';
import Login from './Auth/Login';

const TwitterAuth: React.FC = () => {

  const welcomeValue: string | null = localStorage.getItem('welcome');

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenRegister = (): void => {
    setIsRegisterOpen(true);
    return
  };

  const handleCloseRegister = (): void => {
    setIsRegisterOpen(false);
    return
  };

  const handleOpenLogin = (): void => {
    setIsLoginOpen(true);
    return
  };

  const handleCloseLogin = (): void => {
    setIsLoginOpen(false);
    return
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      'http://localhost:5000/api/auth/google',
      'google-login',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    if (popup) {
      const popupChecker = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupChecker);
          console.log('Popup closed by user.');
        }
      }, 500);
    }

    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:5000') {
        const { user } = event.data;

        if (user) {
          console.log('User authenticated:', user);

          const token = user.token;
          localStorage.setItem('token', token);

          window.location.href = '/';
        }
      }
    });
  };

  const handleSetWelcome = (): void => {
    localStorage.setItem('welcome', 'true');
    window.location.reload();
  };
  return (
    <>
      <div className="bg-white w-full h-screen -z-10 flex flex-col lg:gap-12 lg:flex-row lg:p-0">
        <div className="flex w-full lg:gap-12 justify-center p-8 items-center flex-col lg:flex-row pt-14">
          <div className=" w-full px-2 py-8 lg:w-[45%] flex items-center justify-start lg:justify-center">
            <svg
              className="w-10 h-10 -mt-8 -mr-2 lg:h-[24rem] lg:w-[24rem] text-indigo-500"
              xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><rect width="16" height="16" fill="none" /><path fill="currentColor" d="M6 5h6.75C13.44 5 14 4.44 14 3.75v-.5C14 2.56 13.44 2 12.75 2H6zM5 2H3.25C2.56 2 2 2.56 2 3.25v.5C2 4.44 2.56 5 3.25 5H5zm3 8h4.75c.69 0 1.25-.56 1.25-1.25v-1.5C14 6.56 13.44 6 12.75 6H8zM7 6H5.25C4.56 6 4 6.56 4 7.25v1.5C4 9.44 4.56 10 5.25 10H7zm5.75 8H8v-3h4.75c.69 0 1.25.56 1.25 1.25v.5c0 .69-.56 1.25-1.25 1.25m-7.5-3H7v3H5.25C4.56 14 4 13.44 4 12.75v-.5c0-.69.56-1.25 1.25-1.25" />
            </svg>
          </div>
          <div className="w-auto lg:w-[45%] flex items-center justify-center lg:justify-start">
            <div className="flex justify-center flex-col items-start lg:h-1/2">
              <div className="grid gap-10 lg:gap-12 p-3 lg:p-0">
                <h1 className='text-indigo-500 font-bold text-[40px] lg:text-7xl'>MeroTask Manager..</h1>
                <h3 className='text-indigo-500 font-bold text-xl lg:text-4xl flex gap-2 items-center '> 
                <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 512 512"><rect width="512" height="512" fill="none"/><path fill="currentColor" d="M470.7 20L368.2 49.81l41.5-28.09c-26.2 5.92-59.3 17.5-100.9 36.19l-67.9 70.79L265 79.25c-23.3 12.96-48 29.95-71.8 49.85l-15.8 64.3l-3.4-47.6c-23.5 21.6-45.6 45.6-63.9 70.9c-19.23 26.5-34.26 54.5-41.79 82.4l-28.12-18.8c2.52 23.7 10.31 44.3 23.09 63.2l-33.62-10.3c7.64 23.5 20.13 38.7 41.25 51c-11.83 33.3-17.38 68.1-23.34 102.8l18.4 3.1C87.31 277.4 237.9 141.8 374 81.72l6.9 17.38c-121.7 54.5-216.3 146.5-265.8 279.1c18.1.1 35.8-2.1 52.2-6.3l4.9-60.9l13.1 55.5c10.9-4 20.9-8.8 29.8-14.4l-20.7-43.5l32.8 34.8c8-6.4 14.6-13.6 19.6-21.5c30.4-47.5 62.2-94.7 124.8-134.2l-45.7-16.2l70.1 2.1c11.4-5.8 23.4-12.9 32.5-19.6l-49.7-4l74.7-17.6c5.8-5.8 11.2-11.9 16.1-18c17.3-21.94 29-44.78 26.2-65.55c-1.3-10.39-7.5-20.16-17.6-25.63c-2.5-1.3-5.2-2.45-7.5-3.22"/></svg>
                  join today.</h3>
              </div>
              <div className=" w-[85%] lg:w-[48%]">
                <div className=" mt-2 lg:mt-7 space-y-2">
                  <button onClick={handleGoogleLogin} className='flex items-center gap-2 bg-white w-full py-2 justify-center text-black  border border-gray-600 text-md font-medium rounded-3xl'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6'
                        viewBox="0 0 48 48"><rect width="48" height="48" fill="none" /><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                    Sing up with Google
                  </button>
                </div>
                <div className="w-full flex items-center gap-[1px] justify-center my-[4.5px]">
                  <div className="w-1/2 border-b border-gray-800 h-1"></div>
                  <p className='text-gray-300 font-medium text-[14px]'>or</p>
                  <div className="w-1/2 border-b border-gray-800 h-1"></div>
                </div>
                <button onClick={handleOpenRegister} className='flex items-center text-white bg-custom-bg w-full py-3 justify-center text-md font-semibold rounded-full'>
                  Create account
                </button>
                {isRegisterOpen && <Register onClose={handleCloseRegister} />}
                <p className='text-gray-500 ml-1 my-1.5 text-xs'>By signing up, you agree to the <span className='text-custom-bg'>Terms of Service</span> and <span className='text-custom-bg'>Privacy Policy</span> , including <span className='text-custom-bg'>Cookie Use</span>.</p>
                <div className="space-y-4">
                  <p className='text-indigo-500 text-lg mt-14 font-semibold'>Already have an account?</p>
                  <button onClick={handleOpenLogin} className='flex items-center border border-gray-500 text-custom-bg hover:bg-indigo-600 hover:text-white w-full py-2 justify-center text-4 font-semibold rounded-3xl'>
                    Sign In
                  </button>
                  {isLoginOpen && <Login onClose={handleCloseLogin} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute bottom-0 flex items-center justify-center lg:-z-1 lg:py-4 w-full text-gray-500">
          <p className="flex flex-wrap gap-4 px-7 lg:px-0 hover:text-indigo-500 leading-[4px] text-[12.5px] lg:text-[11px] items-center justify-center">
            <span>© 2024 mero task</span>
          </p>
        </div>
        {!welcomeValue ? (
          <div className="absolute bottom-0 py-4 w-full border-t border-gray-600 bg-black text-gray-500 flex items-center justify-center z-50">
            <div className=" w-[98%] z-10000 lg:w-[50%] grid px-3 grid-cols-8 py-1 gap-2">
              <div className="flex col-span-8 lg:col-span-8 justify-between">
                <h4 className='font-semibold text-indigo-500 text-[20px] lg:text-[22px]'>Welcome to MeroTask.com!</h4>
                <button
                  onClick={handleSetWelcome}
                  className='border rounded-3xl border-gray-500 px-[15px] cursor-pointer text-indigo-500 py-[6px]'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" /><path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" /></g></svg>
                </button>
              </div>
              <p className='col-span-7 text-md font-medium text-gray-400'>Mero Task is a user-friendly task management app that helps individuals and teams organize, prioritize, and track their tasks efficiently for enhanced productivity.</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default TwitterAuth;