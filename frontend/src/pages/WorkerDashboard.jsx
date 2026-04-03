import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, DollarSign, MapPin, CheckCircle, XCircle, Star } from 'lucide-react';

const WorkerDashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('requests');
  const [profileForm, setProfileForm] = useState({ skills: '', dailyWage: '', location: '', experience: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    if (userData) {
      fetchProfile();
      fetchBookings(userData._id);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/workers/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data) {
        setProfile(data);
        setProfileForm({
          skills: data.skills.join(', '),
          dailyWage: data.dailyWage,
          location: data.location,
          experience: data.experience || ''
        });
      }
    } catch (err) {
      console.log('Profile not found, need to create one.');
    }
  };

  const fetchBookings = async (workerId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/bookings/worker/${workerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        skills: profileForm.skills.split(',').map(s => s.trim()),
        dailyWage: Number(profileForm.dailyWage),
        location: profileForm.location,
        experience: profileForm.experience
      };

      if (profile) {
        await axios.put('http://localhost:5000/api/workers/update', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/workers/profile', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings(user._id);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-['Plus_Jakarta_Sans']">
      <header className="bg-stone-900 text-white shadow-xl py-5 border-b-4 border-emerald-600 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Briefcase className="text-emerald-400 h-6 w-6" /> AgriConnect Worker
          </h1>
          <div className="flex gap-4 items-center">
            <span className="font-medium hidden sm:block">Welcome, {user?.name}</span>
            <button onClick={() => { localStorage.clear(); window.location.href='/login'; }} className="text-sm font-bold bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-xl transition-all shadow-md">Logout</button>
          </div>
        </div>
      </header>
      
      <div className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex">
          <button className={`flex-1 py-5 text-center font-bold tracking-wide transition-colors ${activeTab === 'requests' ? 'text-emerald-700 border-b-4 border-emerald-600' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`} onClick={() => setActiveTab('requests')}>Job Requests</button>
          <button className={`flex-1 py-5 text-center font-bold tracking-wide transition-colors ${activeTab === 'profile' ? 'text-emerald-700 border-b-4 border-emerald-600' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`} onClick={() => setActiveTab('profile')}>My Profile</button>
        </div>
      </div>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {activeTab === 'profile' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-stone-100 animate-fade-in-up relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
            <h2 className="text-3xl font-extrabold mb-8 text-stone-900 border-b border-stone-100 pb-4">Manage Profile</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="group">
                <label className="text-sm font-bold text-stone-700 mb-2 flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors"><Briefcase className="h-4 w-4" /> Skills (comma separated)</label>
                <input type="text" required placeholder="e.g. Harvesting, Tractor Driving" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" 
                  value={profileForm.skills} onChange={e => setProfileForm({...profileForm, skills: e.target.value})} />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Daily Wage ($)</label>
                <input type="number" min="1" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                  value={profileForm.dailyWage} onChange={e => setProfileForm({...profileForm, dailyWage: e.target.value})} />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Preferred Location</label>
                <input type="text" required placeholder="City or Region" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                  value={profileForm.location} onChange={e => setProfileForm({...profileForm, location: e.target.value})} />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">Experience</label>
                <textarea rows="3" placeholder="Describe your farming experience..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" 
                  value={profileForm.experience} onChange={e => setProfileForm({...profileForm, experience: e.target.value})}></textarea>
              </div>
              
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center text-yellow-500 font-bold bg-yellow-50 px-4 py-2 rounded-xl">
                  <Star className="h-5 w-5 fill-current mr-2" />
                  Your Rating: {profile?.rating ? profile.rating.toFixed(1) : 'No ratings yet'}
                </div>
                <button type="submit" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:-translate-y-0.5 transition-all">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in-up">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-stone-100 max-w-2xl mx-auto mt-12">
                <div className="bg-stone-50 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-12 w-12 text-stone-300" />
                </div>
                <h3 className="text-2xl font-extrabold text-stone-900">No Job Requests</h3>
                <p className="text-stone-500 mt-3 font-medium text-lg">You don't have any pending or active job requests at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings.map(book => (
                  <div key={book._id} className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 flex flex-col justify-between hover:-translate-y-1 transition-transform group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-extrabold text-stone-900">{book.farmerId?.name}</h3>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${book.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : book.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : book.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                          {book.status}
                        </span>
                      </div>
                      <div className="space-y-3 mb-8">
                        <p className="text-stone-600 flex justify-between border-b border-stone-50 pb-2"><span className="font-bold text-stone-800">Date:</span> {new Date(book.date).toLocaleDateString()}</p>
                        <p className="text-stone-600 flex justify-between border-b border-stone-50 pb-2"><span className="font-bold text-stone-800">Job:</span> {book.workType}</p>
                        <p className="text-stone-600 flex justify-between border-b border-stone-50 pb-2"><span className="font-bold text-stone-800">Workers Needed:</span> {book.numberOfWorkers}</p>
                        <p className="text-stone-600 flex justify-between pt-2"><span className="font-bold text-stone-800">Total Wage:</span> <span className="text-emerald-600 font-extrabold text-lg">${book.totalWage}</span></p>
                      </div>
                    </div>
                    
                    {book.status === 'Pending' && (
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <button onClick={() => updateBookingStatus(book._id, 'Accepted')} className="flex-1 flex items-center justify-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white py-2 rounded-lg font-bold transition-colors">
                          <CheckCircle className="h-4 w-4" /> Accept
                        </button>
                        <button onClick={() => updateBookingStatus(book._id, 'Rejected')} className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white py-2 rounded-lg font-bold transition-colors">
                          <XCircle className="h-4 w-4" /> Reject
                        </button>
                      </div>
                    )}
                    {book.status === 'Accepted' && (
                      <div className="mt-4 pt-4 border-t">
                        <button onClick={() => updateBookingStatus(book._id, 'Completed')} className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-bold transition-colors">
                          <CheckCircle className="h-4 w-4" /> Mark Completed
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkerDashboard;
