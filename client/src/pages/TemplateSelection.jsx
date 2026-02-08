import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ResumeThumbnail from '../components/ResumeThumbnail';

const TemplateSelection = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/templates')
            .then(res => res.json())
            .then(data => {
                setTemplates(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch templates:", err);
                setLoading(false);
            });
    }, []);

    const handleSelect = (id) => {
        navigate(`/builder?template=${id}`);
    };

    return (
        <div className="min-h-screen bg-brand-gray font-sans selection:bg-brand-blue selection:text-white">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">E</div>
                        <span className="text-xl font-bold tracking-tight text-brand-dark">ElevateCV</span>
                    </div>
                    <div className="text-sm text-slate-500 font-medium hidden md:block">Professional Resume Builder</div>
                </div>
            </nav>

            <header className="max-w-4xl mx-auto my-16 text-center px-4">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-brand-blue text-xs font-bold tracking-wide mb-6 uppercase border border-blue-100">
                    Trusted Layouts
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6 tracking-tight leading-tight">
                    Select a Template Optimized for <br />
                    <span className="text-brand-blue">Applicant Tracking Systems</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Choose from our collection of disciplined, high-performance layouts designed to get past the bots and into human hands.
                </p>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {templates.map(template => (
                        <div
                            key={template.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group flex flex-col h-full"
                        >
                            {/* Live Thumbnail Area */}
                            <div className="h-64 relative overflow-hidden bg-slate-100 border-b border-slate-100 group-hover:border-slate-200 transition-colors">
                                <div className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:scale-105 transition-transform duration-700">
                                    <ResumeThumbnail templateId={template.id} />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                    <button
                                        onClick={() => handleSelect(template.id)}
                                        className="bg-brand-blue text-white px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:scale-105 flex items-center gap-2"
                                    >
                                        Use This Template <ArrowRight size={16} />
                                    </button>
                                </div>

                                {template.isAtsFriendly && (
                                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                                        <CheckCircle size={10} /> ATS Friendly
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                                </div>

                                <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-1">
                                    {template.description}
                                </p>

                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {template.recommendedFor && template.recommendedFor.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 px-2 py-1 rounded-sm border border-blue-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        {template.features && template.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelect(template.id)}
                                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    Use Template
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplateSelection;
