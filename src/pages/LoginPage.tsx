import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleResendConfirmation = async () => {
    try {
      setIsResendingEmail(true);
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (resendError) throw resendError;
      
      setResendSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to resend confirmation email. Please try again.');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setResendSuccess(false);
      setLoading(true);
      
      console.log('Attempting to sign in with:', { email });
      
      const result = await signIn(email, password);
      
      if (!result.session) {
        console.error('No session returned from sign in:', result);
        throw new Error('No session returned from sign in');
      }

      console.log('Successfully signed in:', result.user?.email);
      navigate('/profile');
    } catch (err: any) {
      console.error('Login error details:', {
        message: err.message,
        status: err.status,
        name: err.name,
        stack: err.stack
      });
      
      if (err.message.includes('Email not confirmed')) {
        setError('Please confirm your email address before signing in. Check your inbox (and spam folder) for the confirmation email.');
      } else if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again. If you just registered, make sure to confirm your email first.');
      } else if (err.message.includes('rate limit')) {
        setError('Too many login attempts. Please try again later.');
      } else if (err.message.includes('network')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
            {error.includes('confirm your email') && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={isResendingEmail}
                  className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-600"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {isResendingEmail ? 'Sending...' : 'Resend confirmation email'}
                </button>
              </div>
            )}
          </div>
        )}

        {resendSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">
              Confirmation email sent! Please check your inbox (and spam folder).
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}