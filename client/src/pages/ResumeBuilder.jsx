import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Save, Eye, FileText, Image as ImageIcon, FileType, Settings, LogOut, Monitor, Printer } from 'lucide-react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const initialResumeState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        linkedinLabel: '', // Added for custom link text
        portfolio: '',
        portfolioLabel: '', // Added for custom link text
        summary: '',
        location: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [], // Ensure projects is initialized
};

const fontOptions = [
    { name: 'Arial (Standard)', family: 'Arial, Helvetica, sans-serif' },
    { name: 'Calibri (Clean)', family: 'Calibri, "Segoe UI", sans-serif' },
    { name: 'Times New Roman (Formal)', family: '"Times New Roman", Times, serif' },
    { name: 'Georgia (Traditional)', family: 'Georgia, serif' },
    { name: 'Verdana (Readable)', family: 'Verdana, Geneva, sans-serif' },
    { name: 'Roboto (Modern)', family: '"Roboto", sans-serif' },
];

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { getTemplateDefaults } from '../data/templateDefaults';

const ResumeBuilder = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template') || 'modern';

    // Load initial state from template defaults or localStorage
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeData');
        const savedTemplateId = localStorage.getItem('currentTemplateId');

        // Only use saved data if it's for the same template
        if (saved && savedTemplateId === templateId) {
            return JSON.parse(saved);
        }

        // Otherwise, use template defaults and clear old data
        localStorage.removeItem('resumeData');
        localStorage.setItem('currentTemplateId', templateId);
        const defaults = getTemplateDefaults(templateId);
        // Ensure unique IDs for list items to prevent React key warnings
        const ensureIds = (items) => (items || []).map((item, index) => ({ ...item, id: item.id || `default-${index}-${Date.now()}` }));
        return {
            ...defaults,
            education: ensureIds(defaults.education),
            experience: ensureIds(defaults.experience),
            projects: ensureIds(defaults.projects),
            skills: ensureIds(defaults.skills)
        };
    });

    const [activeTab, setActiveTab] = useState('edit');
    const [selectedFont, setSelectedFont] = useState(fontOptions[0].family);
    const [layoutSettings, setLayoutSettings] = useState({
        fontSize: 10, // pt
        lineHeight: 1.3,
        margin: 18, // mm
        sectionSpacing: 1.5, // em
        themeColor: '#000000', // default black
    });
    const [showDesignSettings, setShowDesignSettings] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false); // Overflow state
    const [currentResumeId, setCurrentResumeId] = useState(null);
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
    const [viewMode, setViewMode] = useState('split'); // 'split' or 'print'

    // Structure & Content Settings
    const [sectionOrder, setSectionOrder] = useState(['experience', 'education', 'projects', 'skills']);
    const [sectionTitles, setSectionTitles] = useState({
        experience: 'Experience',
        education: 'Education',
        projects: 'Projects',
        skills: 'Skills'
    });
    const [dateFormat, setDateFormat] = useState('short'); // 'short' (Aug 2024), 'numeric' (08/2024), 'year' (2024)

    // Reload defaults when template changes
    useEffect(() => {
        const savedTemplateId = localStorage.getItem('currentTemplateId');
        if (savedTemplateId !== templateId) {
            // Template changed, load new defaults
            const defaults = getTemplateDefaults(templateId);
            setResumeData(defaults);
            localStorage.setItem('currentTemplateId', templateId);
            localStorage.removeItem('resumeData');
        }
    }, [templateId]);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        localStorage.setItem('currentTemplateId', templateId);

        // Debounced auto-save to database (2 seconds after last change)
        const timer = setTimeout(() => {
            if (currentResumeId) {
                saveToDatabase();
            } else {
                createNewResume();
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [resumeData, layoutSettings, sectionOrder, sectionTitles, dateFormat, selectedFont]);

    const createNewResume = async () => {
        try {
            setSaveStatus('saving');
            const response = await api.post('/resumes', {
                title: resumeData.personalInfo.fullName || 'Untitled Resume',
                templateId,
                data: resumeData,
                layoutSettings,
                structureSettings: { sectionOrder, sectionTitles, dateFormat },
                selectedFont
            });
            setCurrentResumeId(response.data.resume._id);
            setSaveStatus('saved');
        } catch (error) {
            console.error('Error creating resume:', error);
            setSaveStatus('error');
        }
    };

    const saveToDatabase = async () => {
        try {
            setSaveStatus('saving');
            await api.put(`/resumes/${currentResumeId}`, {
                title: resumeData.personalInfo.fullName || 'Untitled Resume',
                templateId,
                data: resumeData,
                layoutSettings,
                structureSettings: { sectionOrder, sectionTitles, dateFormat },
                selectedFont
            });
            setSaveStatus('saved');
        } catch (error) {
            console.error('Error saving resume:', error);
            setSaveStatus('error');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Check for overflow whenever resumeData or font changes
    useEffect(() => {
        const checkOverflow = () => {
            const element = document.getElementById('resume-export');
            if (element) {
                // 297mm in pixels at 96 DPI is approx 1123px. 
                // However, the element width is 210mm (794px).
                // Let's use a safe threshold. 297mm * 3.78 px/mm ~= 1122.66
                const A4_HEIGHT_PX = 1123;
                if (element.scrollHeight > A4_HEIGHT_PX + 5) { // +5 buffer
                    setIsOverflowing(true);
                } else {
                    setIsOverflowing(false);
                }
            }
        };

        // Short timeout to allow render
        const timer = setTimeout(checkOverflow, 500);
        return () => clearTimeout(timer);
    }, [resumeData, selectedFont, layoutSettings]);


    const handleDownloadPDF = async () => {
        const element = document.getElementById('resume-export');
        if (!element) return;

        // Clone the element to ensure we capture current styles/structure
        const resumeContent = element.innerHTML;
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map(style => style.outerHTML)
            .join('');

        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
                ${styles}
                <style>
                    body { margin: 0; padding: 0; background: white; }
                    .resume-wrapper { margin: 0 auto; box-shadow: none; }
                    @page { size: A4; margin: 0; }
                </style>
            </head>
            <body>
                <div id="resume-export" style="width: 210mm; min-height: 297mm; overflow: visible;">
                    ${resumeContent}
                </div>
            </body>
            </html>
        `;

        try {
            const response = await fetch('http://localhost:5000/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ html: fullHtml })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`PDF Generation failed: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const blob = await response.blob();
            saveAs(blob, `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
        } catch (error) {
            console.error("Server PDF generation failed:", error);
            alert("Failed to generate PDF on server. Is the backend running?");
        }
    };

    const handleChangeTemplate = () => {
        if (window.confirm("Changing templates will save your current data. Continue?")) {
            // Data is already saved to local storage via useEffect
            window.location.href = '/templates';
        }
    };



    return (
        <div className="min-h-screen bg-brand-gray text-slate-900 p-4 md:p-8 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">E</div>
                        <span className="text-xl font-bold tracking-tight text-brand-dark">ElevateCV</span>
                    </div>

                    {/* Save Status */}
                    <div className="flex items-center gap-2 text-sm">
                        {saveStatus === 'saving' && (
                            <>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-slate-500">Saving...</span>
                            </  >
                        )}
                        {saveStatus === 'saved' && (
                            <>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-slate-500">Saved</span>
                            </>
                        )}
                        {saveStatus === 'error' && (
                            <>
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-red-500">Save failed</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* User Display */}
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-700 font-medium hidden md:block">{user?.name}</span>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="text-slate-500 hover:text-red-600 text-sm font-semibold transition-colors px-3 py-1.5 border border-slate-300 rounded-lg hover:border-red-300"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={handleChangeTemplate}
                        className="text-slate-500 hover:text-brand-blue text-xs font-bold transition-colors mr-2 hidden md:block uppercase tracking-wider"
                    >
                        Change Template
                    </button>
                    {/* Font Selector */}
                    <div className="relative">
                        <select
                            value={selectedFont}
                            onChange={(e) => setSelectedFont(e.target.value)}
                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 w-40 focus:ring-brand-blue focus:border-brand-blue shadow-sm"
                        >
                            {fontOptions.map(font => (
                                <option key={font.name} value={font.family}>{font.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Print View Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'split' ? 'print' : 'split')}
                        className={`p-2 rounded-lg border transition-colors shadow-sm ${viewMode === 'print' ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                        title={viewMode === 'split' ? 'Switch to Print View' : 'Switch to Split View'}
                    >
                        {viewMode === 'split' ? <Printer size={20} /> : <Monitor size={20} />}
                    </button>

                    {/* Design Settings Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDesignSettings(!showDesignSettings)}
                            className={`p-2 rounded-lg border transition-colors shadow-sm ${showDesignSettings ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                            title="Layout Settings"
                        >
                            <Settings size={20} />
                        </button>

                        {/* Settings Modal */}
                        {showDesignSettings && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 bg-black/50 z-40"
                                    onClick={() => setShowDesignSettings(false)}
                                ></div>

                                {/* Modal */}
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
                                    {/* Header */}
                                    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                                        <h2 className="text-brand-dark font-bold text-lg">Resume Settings</h2>
                                        <button
                                            onClick={() => setShowDesignSettings(false)}
                                            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Layout Density Section */}
                                        <div className="mb-6">
                                            <h3 className="text-brand-dark font-bold mb-4 text-sm uppercase tracking-wider">Layout Density</h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Font Size */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                        <span>Font Size</span>
                                                        <span className="text-brand-blue">{layoutSettings.fontSize}pt</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="8"
                                                        max="14"
                                                        step="0.5"
                                                        value={layoutSettings.fontSize}
                                                        onChange={(e) => setLayoutSettings({ ...layoutSettings, fontSize: parseFloat(e.target.value) })}
                                                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                                                    />
                                                </div>

                                                {/* Line Height */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                        <span>Line Spacing</span>
                                                        <span className="text-brand-blue">{layoutSettings.lineHeight}</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1.0"
                                                        max="2.0"
                                                        step="0.1"
                                                        value={layoutSettings.lineHeight}
                                                        onChange={(e) => setLayoutSettings({ ...layoutSettings, lineHeight: parseFloat(e.target.value) })}
                                                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                                                    />
                                                </div>

                                                {/* Section Spacing */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                        <span>Section Gap</span>
                                                        <span className="text-brand-blue">{layoutSettings.sectionSpacing}em</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0.5"
                                                        max="3.0"
                                                        step="0.1"
                                                        value={layoutSettings.sectionSpacing}
                                                        onChange={(e) => setLayoutSettings({ ...layoutSettings, sectionSpacing: parseFloat(e.target.value) })}
                                                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                                                    />
                                                </div>

                                                {/* Theme Color */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                        <span>Accent Color</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="color"
                                                            value={layoutSettings.themeColor}
                                                            onChange={(e) => setLayoutSettings({ ...layoutSettings, themeColor: e.target.value })}
                                                            className="w-10 h-10 rounded cursor-pointer border border-slate-300"
                                                        />
                                                        <span className="text-xs text-slate-500 uppercase">{layoutSettings.themeColor}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Margins - Full Width */}
                                            <div className="mt-6">
                                                <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                    <span>Page Margins</span>
                                                    <span className="text-brand-blue">{layoutSettings.margin}mm</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    {[
                                                        { label: 'Compact', val: 10 },
                                                        { label: 'Normal', val: 18 },
                                                        { label: 'Wide', val: 25 }
                                                    ].map(opt => (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => setLayoutSettings({ ...layoutSettings, margin: opt.val })}
                                                            className={`flex-1 py-2 text-sm rounded font-medium border ${layoutSettings.margin === opt.val ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-slate-200 my-6"></div>

                                        {/* Content & Structure Section */}
                                        <div>
                                            <h3 className="text-brand-dark font-bold mb-4 text-sm uppercase tracking-wider">Content & Structure</h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Date Format */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                                        <span>Date Format</span>
                                                    </div>
                                                    <select
                                                        value={dateFormat}
                                                        onChange={(e) => setDateFormat(e.target.value)}
                                                        className="w-full bg-white text-slate-900 text-sm rounded-lg p-2.5 border border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                                                    >
                                                        <option value="short">Short (Aug 2024)</option>
                                                        <option value="numeric">Numeric (08/2024)</option>
                                                        <option value="year">Year Only (2024)</option>
                                                    </select>
                                                </div>

                                                {/* Placeholder for balance */}
                                                <div></div>
                                            </div>

                                            {/* Section Reordering - Full Width */}
                                            <div className="mt-6">
                                                <div className="flex justify-between text-xs text-slate-500 mb-3 font-medium">
                                                    <span>Sections (Reorder & Rename)</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {sectionOrder.map((sectionId, index) => (
                                                        <div key={sectionId} className="bg-slate-50 p-3 rounded-lg border border-slate-200 group hover:border-blue-200 transition-colors">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{sectionId}</span>
                                                                <div className="flex gap-1">
                                                                    <button
                                                                        disabled={index === 0}
                                                                        onClick={() => {
                                                                            const newOrder = [...sectionOrder];
                                                                            [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                                                                            setSectionOrder(newOrder);
                                                                        }}
                                                                        className="text-slate-400 hover:text-brand-blue disabled:opacity-30 p-1 text-sm"
                                                                        title="Move Up"
                                                                    >
                                                                        ↑
                                                                    </button>
                                                                    <button
                                                                        disabled={index === sectionOrder.length - 1}
                                                                        onClick={() => {
                                                                            const newOrder = [...sectionOrder];
                                                                            [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
                                                                            setSectionOrder(newOrder);
                                                                        }}
                                                                        className="text-slate-400 hover:text-brand-blue disabled:opacity-30 p-1 text-sm"
                                                                        title="Move Down"
                                                                    >
                                                                        ↓
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={sectionTitles[sectionId]}
                                                                onChange={(e) => setSectionTitles({ ...sectionTitles, [sectionId]: e.target.value })}
                                                                className="w-full bg-white text-slate-800 text-sm rounded px-3 py-2 border border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                                                                placeholder={`Rename ${sectionId}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Downloads */}
                    <div className="flex gap-2">
                        <button

                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition-all text-sm"
                            title="Download PDF"
                        >
                            <FileType size={16} /> PDF
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-col flex-1 pb-4 overflow-hidden">
                {isOverflowing && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 text-center text-sm font-bold animate-pulse">
                        ⚠️ Content exceeds 1 page! PDF export may be cut off. Please shorten your content.
                    </div>
                )}

                <div className="flex flex-1 gap-8 overflow-hidden pt-4">
                    {/* Editor Section - Hidden in print view */}
                    {viewMode === 'split' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`w-full md:w-1/2 lg:w-5/12 bg-white border border-slate-200 rounded-2xl p-6 overflow-y-auto shadow-sm ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-dark">
                                <span className="w-1.5 h-6 bg-brand-blue rounded-full"></span>
                                Edit Details
                            </h2>
                            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                        </motion.div>
                    )}

                    {/* Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${viewMode === 'print' ? 'w-full' : 'w-full md:w-1/2 lg:w-7/12'} bg-slate-200/50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner overflow-y-auto ${activeTab === 'edit' ? 'hidden md:block' : 'block'}`}
                    >
                        <div className="h-full p-4 md:p-8 overflow-y-auto flex justify-center">
                            <div id="resume-preview-content" className="w-full max-w-[210mm] shadow-lg">
                                <ResumePreview
                                    resumeData={resumeData}
                                    fontFamily={selectedFont}
                                    templateId={templateId}
                                    layoutSettings={layoutSettings}
                                    structureSettings={{ sectionOrder, sectionTitles, dateFormat }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Tab Switcher */}
                <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full flex shadow-xl border border-slate-200 z-50">
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Preview
                    </button>
                </div>

                {/* Hidden Export Container */}
                {/* We position this off-screen but keep it in the DOM so fonts and styles load correctly. */}
                <div
                    id="resume-export"
                    style={{
                        position: 'absolute',
                        left: '-9999px',
                        top: 0,
                        width: '210mm',
                        minHeight: '297mm', // Ensure min height
                        background: 'white',
                        color: 'black',
                        fontFamily: selectedFont,
                        overflow: 'visible' // FIXED: Enforce visibility
                    }}
                >
                    <ResumePreview
                        resumeData={resumeData}
                        fontFamily={selectedFont}
                        templateId={templateId}
                        layoutSettings={layoutSettings}
                        structureSettings={{ sectionOrder, sectionTitles, dateFormat }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
