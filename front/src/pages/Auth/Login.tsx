import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '../../hooks/useAuth';
import { useFormErrors } from '../../hooks/useFormErrors';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onClose: () => void
}
const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isCreatePasswordVisible, setIsCreatePasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { authLogin, verifyUserEmailExists, loading, error } = useAuth();
  const isLoadingGlobal = useSelector((state: RootState) => state.loading.isLoading);
  const { isInitialLoading } = useLoading(1000);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { getErrorMessage } = useFormErrors<LoginFormData>(errors, error);

  const onVerifyEmailExistsSubmit = async (data: LoginFormData) => {
    const registrationSuccess = await verifyUserEmailExists(data.email);
    if (registrationSuccess?.statusCode === 200) {
      setEmail(data.email);
      setIsCreatePasswordVisible(true);
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    const loginSuccess = await authLogin(data.email, data.password);
    if (loginSuccess?.statusCode === 200) {
      const token = loginSuccess?.data.token;
      localStorage.setItem('token', token);
  
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 1200000);
  
      navigate('/');
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
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
          const token = user.token;
          localStorage.setItem('token', token);

          window.location.href = '/';
        }
      }
    });
  };

  if (isInitialLoading || isLoadingGlobal || loading) {
    return <Loading />;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center -top-7">
      <div className="bg-white text-black px-2 lg:px-5 rounded-xl shadow-lg w-11/12 max-w-lg">
        <div className="relative ">
          <button
            onClick={onClose}
            className="absolute -top-3 -left-4 text-black p-2 rounded w-full hover:text-indigo-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2.4rem" height="2.4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg>
          </button>
          <div className="flex items-center justify-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-500"
              width="1em" height="1em" viewBox="0 0 16 16"><rect width="16" height="16" fill="none" /><path fill="currentColor" d="M6 5h6.75C13.44 5 14 4.44 14 3.75v-.5C14 2.56 13.44 2 12.75 2H6zM5 2H3.25C2.56 2 2 2.56 2 3.25v.5C2 4.44 2.56 5 3.25 5H5zm3 8h4.75c.69 0 1.25-.56 1.25-1.25v-1.5C14 6.56 13.44 6 12.75 6H8zM7 6H5.25C4.56 6 4 6.56 4 7.25v1.5C4 9.44 4.56 10 5.25 10H7zm5.75 8H8v-3h4.75c.69 0 1.25.56 1.25 1.25v.5c0 .69-.56 1.25-1.25 1.25m-7.5-3H7v3H5.25C4.56 14 4 13.44 4 12.75v-.5c0-.69.56-1.25 1.25-1.25" /></svg>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center my-4">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-white">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
              </g>
            </svg>
          </div>

          <div className="px-10 lg:px-2 py-5">
            {isCreatePasswordVisible ? (
              <>
                <div className="mb-5">
                  <h2 className="text-[25px] font-semibold">You'll need a password</h2>
                  <p className='text-gray-400 text-[11px]'>Make sure it's 8 characters or more.</p>
                </div>
                <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className='space-y-5'>
                    <input
                      value={email}
                      className="placeholder:text-[14px] focus:outline-none focus:ring-none border-gray-700 rounded w-full px-2 text-sm py-[15px] bg-gray-200 bg-opacity-5 cursor-not-allowed text-gray-700"
                      readOnly
                    />
                    <div className='relative'>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        className="border focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg placeholder:text-[14px] border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: { value: 8, message: 'Password must be at least 8 characters' }
                        })}
                      />
                      <div
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path fill="currentColor" d="M245.48 125.57c-.34-.78-8.66-19.23-27.24-37.81C201 70.54 171.38 50 128 50S55 70.54 37.76 87.76c-18.58 18.58-26.9 37-27.24 37.81a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206s73-20.53 90.24-37.75c18.58-18.58 26.9-37 27.24-37.8a6 6 0 0 0 0-4.88M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.8 134.8 0 0 1 22.69 128a134.6 134.6 0 0 1 23.86-32.06C69.22 73.42 96.62 62 128 62s58.78 11.42 81.45 33.94A134.6 134.6 0 0 1 233.31 128C226.94 140.21 195 194 128 194m0-112a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path fill="currentColor" d="M52.44 36a6 6 0 0 0-8.88 8l20.88 23c-37.28 21.9-53.23 57-53.92 58.57a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206a124.9 124.9 0 0 0 52.57-11.25l23 25.29a6 6 0 0 0 8.88-8.08Zm48.62 71.32l45 49.52a34 34 0 0 1-45-49.52M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.6 134.6 0 0 1 22.69 128c4.29-8.2 20.1-35.18 50-51.91l20.2 22.21a46 46 0 0 0 61.35 67.48l17.81 19.6A113.5 113.5 0 0 1 128 194m6.4-99.4a6 6 0 0 1 2.25-11.79a46.17 46.17 0 0 1 37.15 40.87a6 6 0 0 1-5.42 6.53h-.56a6 6 0 0 1-6-5.45A34.1 34.1 0 0 0 134.4 94.6m111.08 35.85c-.41.92-10.37 23-32.86 43.12a6 6 0 1 1-8-8.94A134.1 134.1 0 0 0 233.31 128a134.7 134.7 0 0 0-23.86-32.07C186.78 73.42 159.38 62 128 62a120 120 0 0 0-19.69 1.6a6 6 0 1 1-2-11.83A131 131 0 0 1 128 50c43.38 0 73 20.54 90.24 37.76c18.58 18.58 26.9 37 27.24 37.81a6 6 0 0 1 0 4.88" /></svg>
                        )}
                      </div>
                      <p className="text-red-600 text-xs">{getErrorMessage('password')}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <button
                      type="submit"
                      className={`mt-32 w-full py-[10px] rounded-full text-[14px] font-bold bg-gray-400 hover:bg-white text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Log in'}
                    </button>
                    <p className='text-gray-400 text-[12px]'>Don't have an account? <span className='text-custom-bg'>Sign up</span></p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="lg:px-20">
                  <h2 className="text-[25px] font-semibold mb-6">Sign in to MeroTask</h2>
                  <div className=" mt-2 lg:mt-7 space-y-4">
                    <button onClick={handleGoogleLogin} className='flex items-center gap-2 bg-white w-full py-2 justify-center text-black border border-gray-600 text-md font-medium rounded-3xl'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6'
                        viewBox="0 0 48 48"><rect width="48" height="48" fill="none" /><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" /><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" /><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" /><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" /></svg>
                      Sing up with Google
                    </button>
                  </div>
                  <div className="w-full my-2 flex items-center gap-[1px] justify-center">
                    <div className="w-1/2 border-b border-gray-800 h-1"></div>
                    <p className='text-gray-300 font-medium text-[14px]'>or</p>
                    <div className="w-1/2 border-b border-gray-800 h-1"></div>
                  </div>
                  <form onSubmit={handleSubmit(onVerifyEmailExistsSubmit)} className="space-y-4">
                    <div className='relative'>
                      <input
                        type="email"
                        placeholder='Phone , email or username'
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className="border focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg placeholder:text-[14px] border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                      />
                    </div>
                    <div className="space-y-5">
                      <button
                        type="submit"
                        className={`mt-3 w-full py-[6px] rounded-full text-md font-bold bg-gray-400 hover:bg-indigo-500 text-black hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                      >
                        {loading ? 'Registering...' : 'Next'}
                      </button>
                      <button className='flex items-center font-semibold border text-[13px] hover:bg-gray-100 hover:bg-opacity-5 border-gray-500 text-black w-full py-[5px] justify-center rounded-full'>
                        Forgot Password?
                      </button>
                    </div>
                    <div className="">
                      <p className='pb-20 pt-6 text-gray-400 text-[12px]'>Welcome to <span className='text-custom-bg'>mero task</span></p>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            {getErrorMessage('email') && (
              <p className="absolute -bottom-10 px-4 py-2 rounded-sm bg-custom-bg text-white text-xs">{getErrorMessage('email')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
