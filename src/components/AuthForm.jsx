import { useState } from 'react';

     function AuthForm({ onSubmit, isLogin }) {
       const [formData, setFormData] = useState({ name: '', email: '', password: '' });
       const [error, setError] = useState('');

       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
         // Debug: Log form data on every input change
         console.log('Form input changed:', {
           name: e.target.name,
           value: e.target.value,
           currentFormData: { ...formData, [e.target.name]: e.target.value },
         });
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         // Debug: Log form data on submit
         console.log('Form submitted:', formData);
         try {
           await onSubmit(formData);
         } catch (err) {
           setError(err.message);
           // Debug: Log error if submission fails
           console.log('Submission error:', err.message);
         }
       };

       return (
         <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
           {error && <p className="text-red-500 text-center">{error}</p>}
           {!isLogin && (
             <div>
               <label className="block text-gray-600 dark:text-gray-300">Name</label>
               <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
                 required={!isLogin}
               />
             </div>
           )}
           <div>
             <label className="block text-gray-600 dark:text-gray-300">Email</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
               required
             />
           </div>
           <div>
             <label className="block text-gray-600 dark:text-gray-300">Password</label>
             <input
               type="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
               required
             />
           </div>
           <button
             type="submit"
             className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
           >
             {isLogin ? 'Login' : 'Register'}
           </button>
         </form>
       );
     }

     export default AuthForm;
