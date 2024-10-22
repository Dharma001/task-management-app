import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '../../hooks/useAuth';
import { useFormErrors } from '../../hooks/useFormErrors';

interface RegisterFormData {
  name: string;
  email: string;
  dob: Date;
  password: string;
  confirmPassword: string;
}

interface OtpFormData {
  otp: string;
}

interface AuthModelProps {
  onClose: () => void
}

const AuthModal: React.FC<AuthModelProps> = ({ onClose }) => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [email, setEmail] = useState('');
  // const navigate = useNavigate();

  const { authRegister, verifyOtpCode, loading, error } = useAuth();
  const isLoadingGlobal = useSelector((state: RootState) => state.loading.isLoading);
  const { isInitialLoading } = useLoading(1000);

  const { register: registerForm, handleSubmit: handleSubmitForm, formState: { errors: registerErrors } } = useForm<RegisterFormData>();
  const { register: registerOtp, handleSubmit: handleSubmitOtp, formState: { errors: otpErrors }, reset: resetOtp } = useForm<OtpFormData>();

  {/* Month, Day, Year Selectors */ }
  const [month, setMonth] = useState('');

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const { getErrorMessage: getRegisterErrorMessage } = useFormErrors<RegisterFormData>(registerErrors, error);
  const { getErrorMessage: getOtpErrorMessage } = useFormErrors<OtpFormData>(otpErrors, error);

  const onRegisterSubmit = async (data: RegisterFormData) => {
    const dob = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    const registrationSuccess = await authRegister(data.name, data.email, dob, data.password, data.confirmPassword);
    if (registrationSuccess && registrationSuccess.statusCode === 200) {
      setEmail(data.email);
      setIsOtpVisible(true);
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    await verifyOtpCode(data.otp, email);
    resetOtp()
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  if (isInitialLoading || isLoadingGlobal || loading) {
    return <Loading />;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white text-black px-2 lg:px-5 rounded-xl shadow-lg w-11/12 max-w-xl">
        <div className="relative ">
          <button
            onClick={onClose}
            className="absolute -top-3 -left-5 text-black p-2 rounded w-full hover:text-indigo-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2.4rem" height="2.4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg>
          </button>
          <div className="flex items-center justify-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-500"
              width="1em" height="1em" viewBox="0 0 16 16"><rect width="16" height="16" fill="none" /><path fill="currentColor" d="M6 5h6.75C13.44 5 14 4.44 14 3.75v-.5C14 2.56 13.44 2 12.75 2H6zM5 2H3.25C2.56 2 2 2.56 2 3.25v.5C2 4.44 2.56 5 3.25 5H5zm3 8h4.75c.69 0 1.25-.56 1.25-1.25v-1.5C14 6.56 13.44 6 12.75 6H8zM7 6H5.25C4.56 6 4 6.56 4 7.25v1.5C4 9.44 4.56 10 5.25 10H7zm5.75 8H8v-3h4.75c.69 0 1.25.56 1.25 1.25v.5c0 .69-.56 1.25-1.25 1.25m-7.5-3H7v3H5.25C4.56 14 4 13.44 4 12.75v-.5c0-.69.56-1.25 1.25-1.25" /></svg>
          </div>
          <div className="px-9 lg:px-14 py-5">
            {isOtpVisible ? (
              <>
                <div className="mb-5">
                  <h2 className="text-[25px] font-semibold">We sent you a code</h2>
                  <p className='text-gray-400 text-[11px]'>Enter it below to verify {email}.</p>
                </div>
                <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      maxLength={6}
                      pattern="\d{6}"
                      placeholder='verification code'
                      className="border placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                      {...registerOtp('otp', {
                        required: 'OTP is required',
                        maxLength: { value: 6, message: 'OTP must be 6 digits' },
                        pattern: { value: /^[0-9]{6}$/, message: 'OTP must be a 6-digit number' }
                      })}
                    />
                    {getOtpErrorMessage('otp') && <p className="text-red-500 text-xs mt-1">{getOtpErrorMessage('otp')}</p>}
                    <button className='text-custom-bg text-sm'>Didn't receive email?</button>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className={`mt-60 w-full py-[10px] rounded-full text-[14px] bg-gray-400 font-bold hover:bg-black text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Next'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-[25px] font-semibold mb-6">Create your account</h2>
                {error && <p className="text-red-500 text-sm text-center">{error.general?.[0]}</p>}
                <form className='space-y-6' onSubmit={handleSubmitForm(onRegisterSubmit)}>
                  <div>
                    <input
                      type="text"
                      placeholder='Name'
                      id="name"
                      {...registerForm('name', { required: 'Name is required' })}
                      className="border focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg placeholder:text-[14px] border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                    />
                    {getRegisterErrorMessage('name') && <p className="text-red-500 text-xs">{getRegisterErrorMessage('name')}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      placeholder='Email'
                      {...registerForm('email', { required: 'Email is required' })}
                      className="border placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                    />
                    {getRegisterErrorMessage('email') && <p className="text-red-500 text-xs">{getRegisterErrorMessage('email')}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="my-5">
                      <label className="block text-[13px] font-semibold">Date of Birth</label>
                      <p className='text-gray-400 text-[11px]'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                    </div>
                    <div className="grid grid-cols-9 gap-4">
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg col-span-4 placeholder:text-[13px] border-gray-700 rounded w-full px-2 py-[14px] bg-white text-gray-700 text-sm"
                        required
                      >
                        <option className='text-[15px]' value="" disabled>Month</option>
                        {months.map((month) => (
                          <option className='text-[15px]' key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="border col-span-2 placeholder:text-[13px] focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg border-gray-700 rounded w-full px-2 py-2 bg-white text-gray-700 text-sm"
                        required
                      >
                        <option className='text-[15px]' value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option className='text-[15px]' key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border text-[11px] col-span-3 focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg placeholder:text-[15px] border-gray-700 text-gray-700 rounded w-full px-2 py-2 text-sm bg-white"
                        required
                      >
                        <option className='text-[15px]' value="">Year</option>
                        {Array.from({ length: 100 }, (_, i) => {
                          const currentYear = new Date().getFullYear();
                          return (
                            <option className='text-[15px]' key={i} value={currentYear - i}>
                              {currentYear - i}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="space-y-4 mt-7">
                      <div className="my-5">
                        <label className="block text-[13px] font-semibold">Create Your Password</label>
                        <p className='text-gray-400 text-[11px]'>The password should be very secured eg: Password1234.</p>
                      </div>
                      <div className='relative'>
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder='Password'
                          className="border placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                          {...registerForm('password', {
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
                        {getRegisterErrorMessage('password') && <p className="text-red-500 mt-1 text-xs">{getRegisterErrorMessage('password')}</p>}
                      </div>
                      <div className='relative'>
                        <input
                          type={confirmPasswordVisible ? 'text' : 'password'}
                          placeholder=' ConfirmPassword'
                          className="border placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-custom-bg focus:border-custom-bg border-gray-700 rounded w-full px-2 py-[11px] bg-white text-black"
                          {...registerForm('confirmPassword', {
                            required: 'confirm password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' }
                          })}
                        />
                        <div
                          className="absolute right-3 top-3 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {confirmPasswordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path fill="currentColor" d="M245.48 125.57c-.34-.78-8.66-19.23-27.24-37.81C201 70.54 171.38 50 128 50S55 70.54 37.76 87.76c-18.58 18.58-26.9 37-27.24 37.81a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206s73-20.53 90.24-37.75c18.58-18.58 26.9-37 27.24-37.8a6 6 0 0 0 0-4.88M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.8 134.8 0 0 1 22.69 128a134.6 134.6 0 0 1 23.86-32.06C69.22 73.42 96.62 62 128 62s58.78 11.42 81.45 33.94A134.6 134.6 0 0 1 233.31 128C226.94 140.21 195 194 128 194m0-112a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34" /></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path fill="currentColor" d="M52.44 36a6 6 0 0 0-8.88 8l20.88 23c-37.28 21.9-53.23 57-53.92 58.57a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206a124.9 124.9 0 0 0 52.57-11.25l23 25.29a6 6 0 0 0 8.88-8.08Zm48.62 71.32l45 49.52a34 34 0 0 1-45-49.52M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.6 134.6 0 0 1 22.69 128c4.29-8.2 20.1-35.18 50-51.91l20.2 22.21a46 46 0 0 0 61.35 67.48l17.81 19.6A113.5 113.5 0 0 1 128 194m6.4-99.4a6 6 0 0 1 2.25-11.79a46.17 46.17 0 0 1 37.15 40.87a6 6 0 0 1-5.42 6.53h-.56a6 6 0 0 1-6-5.45A34.1 34.1 0 0 0 134.4 94.6m111.08 35.85c-.41.92-10.37 23-32.86 43.12a6 6 0 1 1-8-8.94A134.1 134.1 0 0 0 233.31 128a134.7 134.7 0 0 0-23.86-32.07C186.78 73.42 159.38 62 128 62a120 120 0 0 0-19.69 1.6a6 6 0 1 1-2-11.83A131 131 0 0 1 128 50c43.38 0 73 20.54 90.24 37.76c18.58 18.58 26.9 37 27.24 37.81a6 6 0 0 1 0 4.88" /></svg>
                          )}
                        </div>
                        {getRegisterErrorMessage('confirmPassword') && <p className="text-red-500 mt-1 text-xs">{getRegisterErrorMessage('password')}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className={`mt-20 w-full py-[10px] rounded-full text-[14px] font-bold bg-gray-400 hover:bg-indigo-500 text-black hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Next'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
