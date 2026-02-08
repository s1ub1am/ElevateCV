import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Layout, ArrowRight, Shield, Zap, FileText, Trash2, Edit, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchResumes();
        }
    }, [isAuthenticated]);

    const fetchResumes = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/resumes', {
                headers: { 'x-auth-token': token }
            });
            setResumes(res.data.resumes || []);
        } catch (err) {
            console.error('Error fetching resumes:', err);
            if (err.response && err.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this resume?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/resumes/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setResumes(resumes.filter(r => r._id !== id));
        } catch (err) {
            console.error('Error deleting resume:', err);
            alert('Failed to delete resume');
        }
    };

    const handleEdit = (id) => {
        navigate(`/builder?id=${id}`);
    };

    return (
        <div className="min-h-screen bg-brand-gray text-brand-dark font-sans selection:bg-brand-blue selection:text-white">
            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">E</div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">ElevateCV</span>
                </div>
                <div className="flex gap-3 items-center">
                    {isAuthenticated ? (
                        <>
                            {user?.name && <span className="hidden md:block text-sm text-slate-600">Hi, {user.name}!</span>}
                            <button onClick={() => navigate('/templates')} className="px-5 py-2 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 flex items-center gap-2">
                                <Plus size={16} /> New Resume
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="hidden md:block px-5 py-2 text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors">Log In</button>
                            <button onClick={() => navigate('/signup')} className="px-5 py-2 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-brand-blue"></span>
                    v2.0 is Live
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 text-brand-dark leading-[1.1]">
                    Build a Resume that <br className="hidden md:block" />
                    <span className="text-brand-blue relative inline-block">
                        Gets Results
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Stop wrestling with formatting. Create a sleek, ATS-optimized resume in minutes with our professional builder. Trusted by candidates at top tech firms.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
                    <button
                        onClick={() => navigate('/templates')}
                        className="px-8 py-4 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        Build My Resume <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={() => navigate('/templates')}
                        className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        View Templates
                    </button>
                </div>

                {/* Social Proof / Trust Indicators */}
                <div className="pt-8 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Optimized for</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Tech', 'Finance', 'Consulting', 'Startups', 'Academia'].map((label, i) => (
                            <span key={i} className="text-lg font-display font-bold text-slate-400 hover:text-brand-blue cursor-default">{label}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* User Dashboard Section (Only when logged in) */}
            {isAuthenticated && (
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-brand-dark">Your Resumes</h2>
                            <p className="text-slate-500 text-sm mt-1">Manage and edit your saved resumes</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
                        </div>
                    ) : resumes.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Create New Card */}
                            <div
                                onClick={() => navigate('/templates')}
                                className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50/50 transition-all cursor-pointer group min-h-[200px]"
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                                    <Plus size={24} />
                                </div>
                                <span className="font-semibold">Create New Resume</span>
                            </div>

                            {/* Resume Cards */}
                            {resumes.map(resume => (
                                <div key={resume._id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 text-brand-blue rounded-lg">
                                            <FileText size={24} />
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => handleDelete(resume._id, e)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3
                                        className="text-lg font-bold text-slate-800 mb-1 cursor-pointer hover:text-brand-blue transition-colors truncate"
                                        onClick={() => handleEdit(resume._id)}
                                    >
                                        {resume.title || 'Untitled Resume'}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-6">
                                        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>

                                    <button
                                        onClick={() => handleEdit(resume._id)}
                                        className="w-full py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit size={14} /> Edit Resume
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">No resumes yet</h3>
                            <p className="text-slate-500 mb-6">Create your first professional resume today.</p>
                            <button
                                onClick={() => navigate('/templates')}
                                className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Create Resume
                            </button>
                        </div>
                    )}
                </section>
            )}
            <section className="bg-white py-24 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Professionals Choose ElevateCV</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">We focus on clean design and parsing efficiency so you can focus on the content.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="text-emerald-600" />}
                            iconBg="bg-emerald-50"
                            title="ATS-Friendly Architecture"
                            desc="Every template is rigorously tested against Applicant Tracking Systems to ensuring your data is parsed correctly."
                        />
                        <FeatureCard
                            icon={<Layout className="text-brand-blue" />}
                            iconBg="bg-blue-50"
                            title="8+ Professional Layouts"
                            desc="From Harvard Classic to Tech Minimalist, choose a design that matches your industry standards."
                        />
                        <FeatureCard
                            icon={<Zap className="text-amber-500" />}
                            iconBg="bg-amber-50"
                            title="Instant PDF Export"
                            desc="Generate high-resolution A4 PDFs instantly. No watermarks, no sign-up walls, fully private."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-slate-500 text-sm bg-brand-gray">
                <div className="mb-4 font-bold text-slate-900">ElevateCV</div>
                <p>&copy; {new Date().getFullYear()} ElevateCV. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, iconBg, title, desc }) => (
    <div className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h3 className="text-xl font-bold mb-3 text-brand-dark">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default LandingPage;
