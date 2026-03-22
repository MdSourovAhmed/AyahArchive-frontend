// import { useState } from 'react';

//      function AuthForm({ onSubmit, isLogin }) {
//        const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//        const [error, setError] = useState('');

//        const handleChange = (e) => {
//          setFormData({ ...formData, [e.target.name]: e.target.value });
//          // Debug: Log form data on every input change
//          console.log('Form input changed:', {
//            name: e.target.name,
//            value: e.target.value,
//            currentFormData: { ...formData, [e.target.name]: e.target.value },
//          });
//        };

//        const handleSubmit = async (e) => {
//          e.preventDefault();
//          // Debug: Log form data on submit
//          console.log('Form submitted:', formData);
//          try {
//            await onSubmit(formData);
//          } catch (err) {
//            setError(err.message);
//            // Debug: Log error if submission fails
//            console.log('Submission error:', err.message);
//          }
//        };

//        return (
//          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
//            {error && <p className="text-red-500 text-center">{error}</p>}
//            {!isLogin && (
//              <div>
//                <label className="block text-gray-600 dark:text-gray-300">Name</label>
//                <input
//                  type="text"
//                  name="name"
//                  value={formData.name}
//                  onChange={handleChange}
//                  className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//                  required={!isLogin}
//                />
//              </div>
//            )}
//            <div>
//              <label className="block text-gray-600 dark:text-gray-300">Email</label>
//              <input
//                type="email"
//                name="email"
//                value={formData.email}
//                onChange={handleChange}
//                className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//                required
//              />
//            </div>
//            <div>
//              <label className="block text-gray-600 dark:text-gray-300">Password</label>
//              <input
//                type="password"
//                name="password"
//                value={formData.password}
//                onChange={handleChange}
//                className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//                required
//              />
//            </div>
//            <button
//              type="submit"
//              className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
//            >
//              {isLogin ? 'Login' : 'Register'}
//            </button>
//          </form>
//        );
//      }

//      export default AuthForm;




import { useState } from 'react';

function AuthForm({ onSubmit, isLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">☪️</span>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Join AyahArchive'}
          </h1>
          <p className="text-white/45 text-sm">
            {isLogin
              ? 'Sign in to continue your memorization journey.'
              : 'Start memorizing the Qur\'an today.'}
          </p>
        </div>

        {/* Glass card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-8 space-y-5 shadow-2xl shadow-black/30"
        >
          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-3">
              <span className="text-red-300 text-sm">⚠</span>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Name — register only */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required={!isLogin}
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors text-sm select-none"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/8" />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-teal-900/40 hover:shadow-teal-900/60 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {isLogin ? 'Signing in…' : 'Creating account…'}
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-white/35 mt-5">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a
            href={isLogin ? '/register' : '/login'}
            className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
          >
            {isLogin ? 'Register' : 'Sign in'}
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;