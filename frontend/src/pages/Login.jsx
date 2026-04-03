import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Sprout } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'Farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/worker-dashboard');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex text-stone-900 bg-white font-['Plus_Jakarta_Sans']">
      {/* Left side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
        {/* Subtle Background Blob */}
        <div className="absolute top-0 -left-12 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob text-white z-0"></div>

        <div className="w-full max-w-md relative z-10 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl">
          <Link to="/" className="flex items-center gap-2 mb-12 group w-max">
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Sprout className="text-white h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl text-stone-900 tracking-tight">AgriConnect<span className="text-emerald-600">.</span></span>
          </Link>
          
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">Welcome back</h2>
          <p className="text-stone-500 mb-10 font-medium tracking-wide">Please enter your details to sign in.</p>
          
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
                <input type="email" name="email" required onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
                <input type="password" name="password" required onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium" />
              </div>
            </div>
            
            <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all flex justify-center items-center gap-2 group mt-8 hover:-translate-y-0.5">
              Sign In <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <p className="mt-8 text-center text-stone-500 font-medium">
            Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline ml-1">Sign up</Link>
          </p>
        </div>
      </div>
      
      {/* Right side Image / Illustration */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-stone-900 z-0">
          <img src="https://images.unsplash.com/photo-1592982537447-6f29df2b3a9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Farm Field" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-lg text-center p-12">
          <div className="bg-white/10 p-8 rounded-[2rem] shadow-2xl backdrop-blur-md border border-white/20">
            <h3 className="text-3xl font-extrabold text-white mb-6">Empowering Farm Growth</h3>
            <p className="text-stone-200 leading-relaxed text-lg font-medium">
              "AgriConnect made it incredibly easy to find skilled labor right when the harvest season peaked. A true game changer for our daily operations!"
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white">JD</div>
              <div className="text-left">
                <p className="text-white font-bold">John Doe</p>
                <p className="text-emerald-400 text-sm font-semibold">Farm Owner, California</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
