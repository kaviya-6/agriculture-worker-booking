import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, Users, CalendarCheck, ArrowRight, ShieldCheck, Sprout, TrendingUp, CheckCircle2, Search } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-['Plus_Jakarta_Sans'] flex flex-col overflow-x-hidden">
      
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Sprout className="text-white h-7 w-7" />
            </div>
            <span className="font-extrabold text-2xl text-stone-900 tracking-tight">AgriConnect<span className="text-emerald-600">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 text-stone-700 hover:text-emerald-700 font-bold transition-colors">Log In</Link>
            <Link to="/register" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5">Get Started</Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Animated Background blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold text-sm mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Revolutionizing Agricultural Labor
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1] max-w-4xl mb-8">
            The Smart Way to Hire <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Reliable Farm Labor.</span>
          </h1>
          
          <p className="text-2xl text-stone-500 max-w-2xl leading-relaxed mb-10 font-medium">
            Bridge the gap between farms needing urgent help and skilled workers seeking fair, transparent daily wages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1">
              Hire Workers <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 border-2 border-stone-200 rounded-2xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1">
              Find Farm Jobs
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-stone-200 flex flex-wrap justify-center gap-8 text-stone-500 font-semibold text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Verified Worker Profiles</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Transparent Daily Wages</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Zero Hidden Fees</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform -rotate-3 scale-105"></div>
              <img src="https://images.unsplash.com/photo-1592982537447-6f29df2b3a9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farming" className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full" />
              
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full"><TrendingUp className="text-emerald-600 h-8 w-8" /></div>
                  <div>
                    <p className="text-stone-500 font-semibold text-sm">Labor Efficiency</p>
                    <p className="text-2xl font-extrabold text-stone-900">+45%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3">About AgriConnect</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight">Empowering the Agricultural Backbone.</h3>
              <p className="text-2xl text-stone-600 mb-8 leading-relaxed font-medium">
                Finding trustworthy labor during harvest is tough. We make it easy with a transparent, rating-driven platform directly connecting farms with skilled workers.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-stone-700 font-medium">
                  <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
                  Direct connection between Farms and Labor.
                </li>
                <li className="flex gap-3 text-stone-700 font-medium">
                  <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
                  Skill-based matching system.
                </li>
                <li className="flex gap-3 text-stone-700 font-medium">
                  <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
                  Community-driven rating system ensuring quality.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-3">Platform Features</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6">Designed for Field Productivity</h3>
            <p className="text-stone-400 text-xl font-medium">Everything needed to manage farm labor efficiently.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Search />} 
              title="Smart Skill Search" 
              desc="Filter workers instantly by specific capabilities like harvesting or machinery operation." 
              dark 
            />
            <FeatureCard 
              icon={<ShieldCheck />} 
              title="Verified Reviews" 
              desc="Hire with confidence. Read genuine ratings left by other local farmers." 
              dark 
            />
            <FeatureCard 
              icon={<CalendarCheck />} 
              title="Instant Booking" 
              desc="Select dates, specify workers needed, and send requests with one click." 
              dark 
            />
            <FeatureCard 
              icon={<Users />} 
              title="Digital Profiles" 
              desc="Workers build profiles showcasing experience and set their own daily wage." 
              dark 
            />
            <FeatureCard 
              icon={<Tractor />} 
              title="Job Dashboards" 
              desc="Dedicated hubs to track pending requests, schedules, and job history." 
              dark 
            />
            <FeatureCard 
              icon={<TrendingUp />} 
              title="Wage Transparency" 
              desc="No middlemen. See exact wages upfront to budget accurately." 
              dark 
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-stone-200 pb-24">
          <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3">Simple Process</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-16">How AgriConnect Works</h3>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-emerald-100 z-0 border-t-2 border-dashed border-emerald-200"></div>
            
            <Step number="1" title="Create Profile" desc="Sign up as Farmer or Worker. Add your skills or farm details." />
            <Step number="2" title="Search & Request" desc="Farmers browse local talent and send booking requests." />
            <Step number="3" title="Work & Rate" desc="Job is completed, wages settled, and ratings are left." />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-6">Ready to streamline your harvest?</h2>
          <p className="text-stone-500 mb-8 max-w-2xl mx-auto text-lg">Join hundreds of local farmers and workers modernizing agriculture today.</p>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105">
            Create Free Account
          </Link>
          
          <div className="mt-16 pt-8 text-stone-400 text-sm flex flex-col md:flex-row justify-between items-center border-t border-stone-100">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sprout className="h-5 w-5" />
              <span className="font-bold text-stone-900 tracking-tight">AgriConnect.</span>
            </div>
            <p>&copy; 2026 AgriConnect Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, dark }) => (
  <div className={`p-8 rounded-3xl transition-all duration-300 border ${dark ? 'bg-stone-800/50 border-stone-700 hover:bg-stone-800' : 'bg-white border-stone-100 shadow-xl hover:-translate-y-2'}`}>
    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${dark ? 'bg-stone-700 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
      {icon}
    </div>
    <h3 className={`text-2xl font-bold mb-3 ${dark ? 'text-white' : 'text-stone-900'}`}>{title}</h3>
    <p className={`text-lg leading-relaxed font-medium ${dark ? 'text-stone-400' : 'text-stone-600'}`}>{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="relative z-10 flex flex-col items-center group">
    <div className="w-20 h-20 bg-white border-4 border-emerald-100 rounded-2xl shadow-xl flex items-center justify-center text-2xl font-black text-emerald-600 mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 rotate-3 group-hover:rotate-0">
      {number}
    </div>
    <h3 className="text-2xl font-bold text-stone-900 mb-3">{title}</h3>
    <p className="text-lg font-medium text-stone-500 max-w-xs">{desc}</p>
  </div>
);

export default LandingPage;
