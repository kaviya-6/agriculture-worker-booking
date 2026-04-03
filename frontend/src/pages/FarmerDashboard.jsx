import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Star, Calendar, CheckCircle } from 'lucide-react';

const FarmerDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState({ skill: '', location: '' });
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('find');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: '', workType: '', numberOfWorkers: 1 });
  const [ratingModal, setRatingModal] = useState(null);
  const [ratingForm, setRatingForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchWorkers();
    if (userData) fetchBookings(userData._id);
  }, []);

  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/workers', { params: search });
      setWorkers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async (farmerId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/bookings/farmer/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers();
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/bookings', {
        workerId: selectedWorker.userId._id,
        workType: bookingForm.workType,
        date: bookingForm.date,
        numberOfWorkers: bookingForm.numberOfWorkers,
        totalWage: bookingForm.numberOfWorkers * selectedWorker.dailyWage
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      alert('Booking request sent successfully!');
      setSelectedWorker(null);
      fetchBookings(user._id);
      setActiveTab('bookings');
    } catch (err) {
      alert('Booking failed');
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/ratings', {
        workerId: ratingModal.workerId._id || ratingModal.workerId,
        bookingId: ratingModal._id,
        rating: Number(ratingForm.rating),
        comment: ratingForm.comment
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      alert('Rating submitted successfully! It is now visible on their profile.');
      setRatingModal(null);
      setRatingForm({ rating: 5, comment: '' });
      fetchBookings(user._id); // Refresh bookings so it shows "Rated"
      // also optionally re-fetch workers if we needed
    } catch (err) {
      alert('Failed to submit rating');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-['Plus_Jakarta_Sans']">
      <header className="bg-stone-900 text-white shadow-xl py-5 px-6 md:px-12 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
           AgriConnect <span className="text-emerald-400">Farmer</span>
        </h1>
        <div className="flex gap-4 items-center">
          <span className="font-medium">Welcome, {user?.name}</span>
          <button onClick={() => { localStorage.clear(); window.location.href='/login'; }} className="text-sm font-bold bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-xl transition-all shadow-md">Logout</button>
        </div>
      </header>
      
      <div className="flex bg-white shadow-sm border-b border-stone-200">
        <button className={`flex-1 py-5 text-center font-bold tracking-wide transition-colors ${activeTab === 'find' ? 'text-emerald-700 border-b-4 border-emerald-600' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`} onClick={() => setActiveTab('find')}>Find Workers</button>
        <button className={`flex-1 py-5 text-center font-bold tracking-wide transition-colors ${activeTab === 'bookings' ? 'text-emerald-700 border-b-4 border-emerald-600' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'}`} onClick={() => setActiveTab('bookings')}>My Bookings</button>
      </div>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {activeTab === 'find' ? (
          <div className="space-y-10 animate-fade-in-up">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white p-8 rounded-[2rem] shadow-2xl border border-stone-100 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
                <input type="text" placeholder="Search by skill (e.g. Harvesting)" className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl focus:ring-2 outline-none focus:ring-emerald-500 border border-stone-200 font-medium transition-all focus:bg-white" value={search.skill} onChange={(e) => setSearch({...search, skill: e.target.value})} />
              </div>
              <div className="flex-1 relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
                <input type="text" placeholder="Location" className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl focus:ring-2 outline-none focus:ring-emerald-500 border border-stone-200 font-medium transition-all focus:bg-white" value={search.location} onChange={(e) => setSearch({...search, location: e.target.value})} />
              </div>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-10 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">Search Workers</button>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workers.map(worker => (
                <div key={worker._id} className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 flex flex-col justify-between hover:-translate-y-1 transition-transform group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">{worker.userId?.name || 'Unknown'}</h3>
                      <div className="flex items-center text-yellow-500 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
                        <Star className="h-5 w-5 fill-current mr-1.5" />
                        <span className="font-bold text-sm">{worker.rating ? worker.rating.toFixed(1) : 'New'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-stone-500 text-sm font-semibold mb-6">
                      <MapPin className="h-4 w-4 mr-1 text-emerald-500" /> {worker.location}
                    </div>
                    
                    <div className="mb-6 flex flex-wrap gap-2">
                      {worker.skills?.map((skill, i) => (
                        <span key={i} className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-6 border-t border-stone-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Daily Wage</p>
                      <p className="font-extrabold text-2xl text-stone-900">${worker.dailyWage}</p>
                    </div>
                    <button onClick={() => setSelectedWorker(worker)} className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-600/20">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
              {workers.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-stone-100 shadow-xl">
                  <h3 className="text-2xl font-bold text-stone-400">No workers found matching your criteria.</h3>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 text-xs font-bold uppercase tracking-widest border-b border-stone-200">
                    <th className="p-6">Worker</th>
                    <th className="p-6">Date</th>
                    <th className="p-6">Type</th>
                    <th className="p-6">Wage</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.map(book => (
                    <tr key={book._id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-6 font-bold text-stone-900">{book.workerId?.name || 'Worker'}</td>
                      <td className="p-6 text-stone-600 font-medium">{new Date(book.date).toLocaleDateString()}</td>
                      <td className="p-6 text-stone-600 font-medium">{book.workType}</td>
                      <td className="p-6 font-extrabold text-emerald-600">${book.totalWage}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${book.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : book.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : book.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="p-6">
                        {book.status === 'Completed' && !book.isRated && (
                          <button onClick={() => setRatingModal(book)} className="text-sm bg-yellow-400 text-yellow-900 border border-yellow-500 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-xl font-bold transition-all shadow-sm">
                            Rate Worker
                          </button>
                        )}
                        {book.status === 'Completed' && book.isRated && (
                          <span className="text-sm text-stone-400 font-bold bg-stone-100 px-4 py-2 rounded-xl border border-stone-200">Rated ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan="6" className="p-12 text-center text-stone-500 font-bold text-xl">No bookings yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in-up">
            <button onClick={() => setSelectedWorker(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold p-2 text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Book {selectedWorker.userId?.name}</h2>
            
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                <input type="text" required placeholder="e.g. Harvesting Apples" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  value={bookingForm.workType} onChange={e => setBookingForm({...bookingForm, workType: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Workers</label>
                <input type="number" min="1" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  value={bookingForm.numberOfWorkers} onChange={e => setBookingForm({...bookingForm, numberOfWorkers: parseInt(e.target.value)})} />
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl mt-6">
                <div className="flex justify-between text-sm mb-1 text-green-800">
                  <span>Daily Wage:</span>
                  <span className="font-bold">${selectedWorker.dailyWage}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-green-900 border-t border-green-200 pt-2 mt-2">
                  <span>Total Est. Cost:</span>
                  <span>${selectedWorker.dailyWage * bookingForm.numberOfWorkers}</span>
                </div>
              </div>
              
              <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all mt-4">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in-up">
            <button onClick={() => setRatingModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold p-2 text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Rate {ratingModal.workerId?.name}</h2>
            
            <form onSubmit={handleRating} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(num => (
                    <button key={num} type="button" onClick={() => setRatingForm({...ratingForm, rating: num})} 
                      className={`p-2 rounded-full transition-colors ${ratingForm.rating >= num ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}>
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea rows="3" required placeholder="How was the worker's performance?" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none" 
                  value={ratingForm.comment} onChange={e => setRatingForm({...ratingForm, comment: e.target.value})}></textarea>
              </div>
              
              <button type="submit" className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all mt-4">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
