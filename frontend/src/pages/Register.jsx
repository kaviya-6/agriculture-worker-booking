import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, MapPin, Briefcase, Sprout, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Farmer', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      
      {/* Animated Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 transform transition-all border border-white relative z-10">
        
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Sprout className="text-white h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl text-stone-900 tracking-tight">AgriConnect<span className="text-emerald-600">.</span></span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Create Account</h2>
          <p className="text-stone-500 font-medium mt-2">Join the future of agricultural labor</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-center border border-red-100">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium placeholder-stone-400" />
          </div>
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium placeholder-stone-400" />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
            <input type="password" name="password" placeholder="Create Password" required onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium placeholder-stone-400" />
          </div>
          
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
            <input type="text" name="location" placeholder="City or State Location" required onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium placeholder-stone-400" />
          </div>
          
          <div className="relative group mt-2">
            <label className="block text-xs font-bold text-stone-500 mb-2 ml-2 uppercase tracking-wider">Select Account Type</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 h-5 w-5" />
              <select name="role" value={formData.role} onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer font-bold shadow-sm">
                <option value="Farmer">I am a Farm Owner (Hiring)</option>
                <option value="Worker">I am a Skilled Worker (Looking for jobs)</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-stone-900/20 hover:shadow-stone-900/30 transition-all transform hover:-translate-y-0.5 mt-8 flex justify-center items-center gap-2 group">
            Create Account <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <p className="mt-8 text-center font-medium text-stone-500">
          Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline ml-1">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
