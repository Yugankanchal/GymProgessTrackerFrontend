import React, { useState } from 'react';
import { AtSign, Lock, Github, Apple } from 'lucide-react';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import Button from '../components/ui/Button';
import SocialButton from '../components/SocialButton';
import Checkbox from '../components/Checkbox';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      password: ''
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Login successful:', formData);
        // Handle successful login here (redirect, set auth state, etc.)
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Implement password recovery flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <FormContainer>
          <div className="text-center mb-8">
            <Logo className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              icon={<AtSign className="w-5 h-5 text-gray-500" />}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              className='LoginInput'
              required
            />
            {/* <input placeholder='testing purpose' type='text' className='LoginInput w-[10rem]' /> */}
            <InputField
              label="Password"
              name="password"
              type="password"
              icon={<Lock className="w-5 h-5 text-gray-500" />}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              togglePassword
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember-me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                label="Remember me"
              />

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              size="lg"
            >
              Sign in
            </Button>
          </form>

          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton provider="google" />
            <SocialButton provider="apple" icon={<Apple className="w-5 h-5" />} />
            <SocialButton provider="github" icon={<Github className="w-5 h-5" />} className="col-span-2" />
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline transition-colors"
            >
              Sign up now
            </a>
          </p>
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginPage;