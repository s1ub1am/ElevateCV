import React from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin, Link as LinkIcon, Github } from 'lucide-react';

const ResumePreview = ({ resumeData, fontFamily, templateId, layoutSettings = { fontSize: 10, lineHeight: 1.3, margin: 18, sectionSpacing: 1.5, themeColor: '#000000' }, structureSettings }) => {
    const { personalInfo, education, experience, skills, projects } = resumeData;

    // Default structure settings if not provided
    const {
        sectionOrder = ['education', 'experience', 'projects', 'skills'],
        sectionTitles = { education: 'Education', experience: 'Experience', projects: 'Projects', skills: 'Skills' },
        dateFormat = 'short'
    } = structureSettings || {};

    // Dynamic Style Injection for scaling
    // ... (unchanged)
    const dynamicStyles = `
        .resume-wrapper {
            font-size: ${layoutSettings.fontSize}pt;
            line-height: ${layoutSettings.lineHeight};
            padding: ${layoutSettings.margin}mm;
            --section-gap: ${layoutSettings.sectionSpacing || 1.5}em;
            --theme-color: ${layoutSettings.themeColor || '#000000'};
            font-family: ${fontFamily};
            word-break: break-word; /* Prevent overflow */
            overflow-wrap: break-word;
        }
        .resume-wrapper .text-xs { font-size: 0.75em !important; }
        .resume-wrapper .text-sm { font-size: 0.875em !important; }
        .resume-wrapper .text-base { font-size: 1em !important; }
        .resume-wrapper .text-md { font-size: 1.05em !important; }
        .resume-wrapper .text-lg { font-size: 1.125em !important; }
        .resume-wrapper .text-xl { font-size: 1.25em !important; }
        .resume-wrapper .text-2xl { font-size: 1.5em !important; }
        .resume-wrapper .text-3xl { font-size: 1.875em !important; }
        .resume-wrapper .text-4xl { font-size: 2.25em !important; }
    `;

    // --- SHARED HELPERS ---
    const getLinkText = (url, label, type) => {
        if (label && label.trim().length > 0) return label;
        if (!url) return '';
        const cleanUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
        if (type === 'linkedin') return cleanUrl.includes('linkedin.com') ? cleanUrl.split('linkedin.com/in/')[1] : 'LinkedIn';
        if (type === 'github') return cleanUrl.includes('github.com') ? cleanUrl.split('github.com/')[1] : 'GitHub';
        return cleanUrl.length > 30 ? cleanUrl.substring(0, 27) + '...' : cleanUrl;
    };

    const formatPeriod = (item) => {
        // Legacy fallback
        if (!item.startDate && !item.endDate) {
            return item.year || item.duration || '';
        }

        const formatDate = (dateString) => {
            if (!dateString) return 'Present';
            const [year, month] = dateString.split('-');
            const date = new Date(year, month - 1);

            if (dateFormat === 'numeric') return `${month}/${year}`;
            if (dateFormat === 'year') return year;
            return date.toLocaleString('default', { month: 'short', year: 'numeric' });
        };

        const startStr = formatDate(item.startDate);
        const endStr = formatDate(item.endDate);

        if (startStr === endStr) return startStr;
        return `${startStr} - ${endStr}`;
    };

    // --- TEMPLATE LAYOUTS ---

    // 1. MODERN PROFESSIONAL (Default)
    const ModernLayout = () => {
        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="font-bold text-slate-900 text-[10pt]">{edu.school}</div>
                            <div className="text-slate-700 text-[9pt]">{edu.degree}</div>
                        </div>
                        <div className="text-[9pt] text-slate-600 font-medium">{formatPeriod(edu)}</div>
                    </div>
                )
            },
            experience: {
                title: sectionTitles.experience,
                data: experience,
                render: (exp) => (
                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-[10pt] text-slate-900">{exp.company}</h3>
                            <span className="text-[9pt] text-slate-500">{formatPeriod(exp)}</span>
                        </div>
                        <div className="text-[9pt] text-slate-700 italic mb-1">{exp.position}</div>
                        <p className="text-slate-800 text-[9pt] leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-[10pt] text-slate-900">{proj.name}</h3>
                            <span className="text-[9pt] text-slate-500 italic">{proj.tech}</span>
                        </div>
                        <p className="text-slate-800 text-[9pt] leading-relaxed whitespace-pre-line text-justify">{proj.description}</p>
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills,
                type: 'skills',
                render: () => (
                    <div className="flex flex-wrap gap-2 text-[9pt]">
                        {skills.map(skill => (
                            <span key={skill.id} className="bg-slate-100 text-slate-800 px-2 py-1 rounded border border-slate-200 font-medium">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )
            }
        };

        return (
            <div className="text-left">
                {/* Header */}
                <div className="mb-6 flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-[26pt] font-bold uppercase mb-1 text-slate-900 leading-[1] tracking-tight">
                            {personalInfo.fullName}
                        </h1>
                        <div className="text-[11pt] text-slate-600 font-medium mb-3 tracking-wide uppercase">
                            {personalInfo.summary ? 'Software Engineer' : ''} {/* Placeholder title if summary exists */}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9pt] text-slate-600 font-medium">
                            {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} className="shrink-0" />{personalInfo.email}</div>}
                            {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} className="shrink-0" />{personalInfo.phone}</div>}
                            {personalInfo.linkedin && (
                                <div className="flex items-center gap-1">
                                    <Linkedin size={12} className="shrink-0" />
                                    <a href={personalInfo.linkedin} className="hover:text-blue-600">{getLinkText(personalInfo.linkedin, personalInfo.linkedinLabel, 'linkedin')}</a>
                                </div>
                            )}
                            {personalInfo.portfolio && (
                                <div className="flex items-center gap-1">
                                    <Globe size={12} className="shrink-0" />
                                    <a href={personalInfo.portfolio} className="hover:text-blue-600">{getLinkText(personalInfo.portfolio, personalInfo.portfolioLabel)}</a>
                                </div>
                            )}
                        </div>
                    </div>
                    {personalInfo.photo && (
                        <img
                            src={personalInfo.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 ml-4 hidden md:block print:block shrink-0"
                        />
                    )}
                </div>

                {/* Sections */}
                {sectionOrder.map(sectionId => {
                    const section = sections[sectionId];
                    if (!section) return null;
                    const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                    if (!hasData) return null;

                    return (
                        <div key={sectionId} className="mb-5 last:mb-0" style={{ marginBottom: 'var(--section-gap)' }}>
                            <h2 className="text-[11pt] font-bold text-slate-900 border-b-2 border-slate-200 mb-3 uppercase tracking-wider" style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}>
                                {section.title}
                            </h2>
                            {section.data ? (
                                section.data.map(item => (
                                    <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                ))
                            ) : (
                                section.render() // For skills
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // 2. HARVARD CLASSIC (Minimalist, Serif, Very Dense)
    const HarvardLayout = () => {
        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="mb-2">
                        <div className="flex justify-between font-bold text-[10pt]">
                            <span>{edu.school}, {edu.degree}</span>
                            <span>{formatPeriod(edu)}</span>
                        </div>
                    </div>
                )
            },
            experience: {
                title: sectionTitles.experience,
                data: experience,
                render: (exp) => (
                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-[10pt]">
                            <span>{exp.company}</span>
                            <span>{formatPeriod(exp)}</span>
                        </div>
                        <div className="italic text-[10pt] mb-1">{exp.position}</div>
                        <p className="text-[10pt] text-justify leading-snug">{exp.description}</p>
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-3">
                        <div className="font-bold text-[10pt]">{proj.name}</div>
                        {proj.tech && <div className="text-[9pt] italic text-gray-600 mb-1">{proj.tech}</div>}
                        <p className="text-[10pt] text-justify leading-snug">{proj.description}</p>
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills,
                type: 'skills',
                render: () => (
                    <p className="text-[10pt]">
                        {skills.map(s => s.name).join(', ')}
                    </p>
                )
            }
        };

        return (
            <div className="text-left text-black">
                <div className="text-center mb-6">
                    <h1 className="text-[22pt] font-bold uppercase tracking-wide mb-2">{personalInfo.fullName}</h1>
                    <div className="text-[10pt] flex justify-center flex-wrap gap-3 separator-dot">
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
                    </div>
                </div>

                {/* Sections */}
                {sectionOrder.map(sectionId => {
                    const section = sections[sectionId];
                    if (!section) return null;
                    const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                    if (!hasData) return null;

                    return (
                        <div key={sectionId} className="mb-4" style={{ marginBottom: 'var(--section-gap)' }}>
                            <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider" style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}>
                                {section.title}
                            </h2>
                            {section.data ? (
                                section.data.map(item => (
                                    <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                ))
                            ) : (
                                section.render() // For skills
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // 3. CORPORATE CLEAN (MNC Standard - TCS/Wipro)
    const CorporateLayout = () => {
        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="font-bold text-base">{edu.school}</div>
                            <div className="text-gray-700">{edu.degree}</div>
                        </div>
                        <div className="font-bold">{formatPeriod(edu)}</div>
                    </div>
                )
            },
            experience: {
                title: sectionTitles.experience,
                data: experience,
                render: (exp) => (
                    <div className="mb-4">
                        <div className="flex justify-between font-bold text-base mb-1">
                            <span>{exp.company}</span>
                            <span>{formatPeriod(exp)}</span>
                        </div>
                        <div className="italic text-gray-700 mb-1">{exp.position}</div>
                        <p className="text-justify leading-relaxed">{exp.description}</p>
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-3">
                        <h3 className="font-bold inline-block mr-2">{proj.name}:</h3>
                        <span className="italic text-gray-600 text-sm">({proj.tech})</span>
                        <p className="mt-1 text-justify leading-relaxed">{proj.description}</p>
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills,
                type: 'skills',
                render: () => (
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {skills.map(skill => (
                            <div key={skill.id} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                                <span className="text-gray-900 font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                )
            }
        };

        return (
            <div className="text-left font-sans text-sm text-gray-900">
                {/* Simple Header */}
                <div className="border-b-2 border-gray-800 pb-4 mb-6 text-center">
                    {personalInfo.photo && (
                        <img
                            src={personalInfo.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-800 mx-auto mb-4 shrink-0"
                        />
                    )}
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
                    <p className="text-gray-700 text-sm mb-2 max-w-2xl mx-auto">{personalInfo.summary}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-800">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-blue-800 hover:underline">LinkedIn</a>}
                    </div>
                </div>

                <div className="space-y-6">
                    {sectionOrder.map(sectionId => {
                        const section = sections[sectionId];
                        if (!section) return null;
                        const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                        if (!hasData) return null;

                        return (
                            <div key={sectionId}>
                                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1" style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}>
                                    {section.title}
                                </h2>
                                {section.data ? (
                                    section.data.map(item => (
                                        <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                    ))
                                ) : (
                                    section.render() // For skills
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // 4. TECH MINIMALIST (Monospace, Git-style stats)
    const TechLayout = () => {
        const sections = {
            experience: {
                title: `~/${sectionTitles.experience.toLowerCase()}`,
                data: experience,
                render: (exp) => (
                    <div className="mb-6 pl-4 border-l-2 border-slate-200">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-black">{exp.company}</span>
                            <span className="text-slate-500 text-xs text-right">[{formatPeriod(exp)}]</span>
                        </div>
                        <div className="text-slate-600 italic mb-2">// {exp.position}</div>
                        <p className="whitespace-pre-line text-xs font-sans leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                )
            },
            projects: {
                title: `~/${sectionTitles.projects.toLowerCase()}`,
                data: projects,
                render: (proj) => (
                    <div className="mb-4">
                        <div className="font-bold text-black mb-1">{proj.name}();</div>
                        <div className="text-xs text-neon-green bg-black/90 px-1 py-0.5 inline-block mb-1 rounded">{proj.tech}</div>
                        <p className="text-xs pl-1 text-gray-600 font-sans leading-relaxed">{proj.description}</p>
                    </div>
                )
            },
            skills: {
                title: `~/${sectionTitles.skills.toLowerCase()}_array`,
                type: 'skills',
                render: () => (
                    <div className="text-xs border border-slate-300 p-3 bg-slate-50">
                        const skills = [<br />
                        &nbsp;&nbsp;{skills.map(s => `"${s.name}"`).join(', ')}<br />
                        ];
                    </div>
                )
            },
            education: {
                title: `~/${sectionTitles.education.toLowerCase()}`,
                data: education,
                render: (edu) => (
                    <div className="mb-4 pl-4 border-l-2 border-slate-200">
                        <div className="font-bold text-black">{edu.school}</div>
                        <div className="text-slate-600 text-xs">// {edu.degree}</div>
                        <div className="text-slate-500 text-xs">/* {formatPeriod(edu)} */</div>
                    </div>
                )
            }
        };

        return (
            <div className="text-left text-sm text-slate-800 leading-tight">
                <div className="border-b-4 border-black pb-4 mb-6" style={{ borderColor: 'var(--theme-color)' }}>
                    <h1 className="text-4xl font-black tracking-tighter mb-2" style={{ color: 'var(--theme-color)' }}>./{personalInfo.fullName.toLowerCase().replace(/\s+/g, '_')}</h1>
                    <div className="text-xs flex gap-4 text-slate-500">
                        {personalInfo.email && <span>email: "{personalInfo.email}"</span>}
                        {personalInfo.phone && <span>tel: "{personalInfo.phone}"</span>}
                    </div>
                </div>

                {sectionOrder.map(sectionId => {
                    const section = sections[sectionId];
                    if (!section) return null;
                    const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                    if (!hasData) return null;

                    return (
                        <div key={sectionId} className="mb-8" style={{ marginBottom: 'var(--section-gap)' }}>
                            <h2 className="text-lg font-bold bg-black text-white px-2 py-1 inline-block mb-4" style={{ backgroundColor: 'var(--theme-color)' }}>{section.title}</h2>
                            {section.data ? (
                                section.data.map(item => (
                                    <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                ))
                            ) : (
                                section.render() // For skills
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // 5. PROJECT CENTRIC FRESHER
    const ProjectCentricLayout = () => (
        <div className="text-left font-sans text-gray-900">
            <header className="mb-8 border-b-2 border-purple-900 pb-4" style={{ borderColor: 'var(--theme-color)', marginBottom: 'var(--section-gap)' }}>
                <h1 className="text-4xl font-extrabold text-purple-900 mb-2" style={{ color: 'var(--theme-color)' }}>{personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-600">
                    {personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} />{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} />{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={14} />Active</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe size={14} />Portfolio</span>}
                </div>
            </header>

            {/* PROJECTS FIRST - Hero Section */}
            {projects && projects.length > 0 && (
                <div className="mb-8" style={{ marginBottom: 'var(--section-gap)' }}>
                    <h2 className="text-xl font-bold text-purple-900 uppercase tracking-widest mb-4" style={{ color: 'var(--theme-color)' }}>{sectionTitles.projects}</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map(proj => (
                            <div key={proj.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 no-break-inside">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
                                    {proj.link && <a href={proj.link} className="text-purple-700 hover:underline text-sm flex items-center gap-1">View <LinkIcon size={12} /></a>}
                                </div>
                                {proj.tech && (
                                    <div className="text-sm font-bold text-purple-800 mb-3">
                                        <span className="bg-purple-100 inline-block px-2 py-0.5 rounded" style={{ color: 'var(--theme-color)', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                                            {proj.tech}
                                        </span>
                                    </div>
                                )}
                                <p className="text-sm text-gray-700 leading-relaxed text-justify">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    {/* Experience and Education in Main Column */}
                    {experience && experience.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-3">{sectionTitles.experience}</h2>
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-4">
                                    <h3 className="font-bold">{exp.company}</h3>
                                    <p className="text-sm italic text-gray-600 mb-1">{exp.position} | {formatPeriod(exp)}</p>
                                    <p className="text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-3">{sectionTitles.education}</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <h3 className="font-bold">{edu.school}</h3>
                                <p className="text-sm text-gray-600">{edu.degree}</p>
                                <p className="text-sm font-semibold">{formatPeriod(edu)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 bg-purple-50 p-4 rounded-lg h-fit" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.1 }}>
                    <h2 className="text-lg font-bold text-purple-900 uppercase tracking-widest mb-3" style={{ color: 'var(--theme-color)', opacity: 1 }}>{sectionTitles.skills || 'Skills'}</h2>
                    <div className="flex flex-col gap-2">
                        {skills.map(skill => (
                            <span key={skill.id} className="text-sm font-medium border-b border-purple-200 pb-1" style={{ borderColor: 'var(--theme-color)' }}>{skill.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // 6. MINIMAL FRESHER
    const MinimalFresherLayout = () => {
        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="mb-2 flex justify-between">
                        <div>
                            <div className="font-bold">{edu.school}</div>
                            <div>{edu.degree}</div>
                        </div>
                        <div className="font-medium">{formatPeriod(edu)}</div>
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills || 'Technical Skills',
                type: 'skills',
                render: () => (
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill.id} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm border border-gray-200">{skill.name}</span>
                        ))}
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-4">
                        <div className="font-bold">{proj.name}</div>
                        <div className="text-sm italic mb-1">{proj.tech}</div>
                        <p className="text-sm leading-relaxed">{proj.description}</p>
                    </div>
                )
            },
            experience: {
                title: sectionTitles.experience,
                data: experience,
                render: (exp) => (
                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>{exp.company}</span>
                            <span>{formatPeriod(exp)}</span>
                        </div>
                        <div className="italic text-sm mb-1">{exp.position}</div>
                        <p className="text-sm leading-relaxed">{exp.description}</p>
                    </div>
                )
            }
        };

        return (
            <div className="text-left font-sans text-gray-900">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold uppercase mb-2">{personalInfo.fullName}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>}
                        {personalInfo.portfolio && <a href={personalInfo.portfolio} className="text-blue-600 hover:underline">Portfolio</a>}
                    </div>
                </header>

                {sectionOrder.map(sectionId => {
                    const section = sections[sectionId];
                    if (!section) return null;
                    const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                    if (!hasData) return null;

                    return (
                        <div key={sectionId} className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b-2 border-gray-800 mb-3" style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}>{section.title}</h2>
                            {section.data ? (
                                section.data.map(item => (
                                    <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                ))
                            ) : (
                                section.render() // For skills
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // 7. STUDENT / INTERN LAYOUT (Education & Skills First)
    const StudentLayout = () => {
        // Force specific order for students if not overridden
        const studentOrder = ['education', 'skills', 'projects', 'experience'];
        // Use structureSettings.sectionOrder if provided, else default to studentOrder
        const activeOrder = structureSettings?.sectionOrder || studentOrder;

        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-lg text-gray-900">{edu.institution}</h3>
                            <span className="text-sm font-semibold text-gray-700">{formatPeriod(edu)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <div className="text-md text-gray-800 font-medium">{edu.degree}</div>
                            <div className="text-sm text-gray-600 italic">{edu.location}</div>
                        </div>
                        {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: <span className="font-semibold">{edu.gpa}</span></div>}
                        {edu.coursework && <div className="text-sm text-gray-600 mt-1"><span className="font-semibold">Coursework:</span> {edu.coursework}</div>}
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills,
                type: 'skills',
                render: () => (
                    <div className="grid grid-cols-1 gap-1">
                        {skills.map(skill => (
                            <div key={skill.id} className="text-sm">
                                <span className="font-bold text-gray-800 mr-2">• {skill.name.split(':')[0]}:</span>
                                <span className="text-gray-700">{skill.name.split(':')[1] || ''}</span>
                            </div>
                        ))}
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900">{proj.name}</h3>
                            {proj.link && <a href={proj.link} className="text-xs text-blue-600 hover:underline">Link ↗</a>}
                        </div>
                        {proj.tech && <div className="text-xs font-mono text-purple-700 mb-1 bg-purple-50 inline-block px-1 rounded">{proj.tech}</div>}
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                            {proj.description.split('. ').map((point, i) => (
                                point.trim() && <li key={i}>{point.trim().replace(/\.$/, '')}</li>
                            ))}
                        </ul>
                    </div>
                )
            },
            experience: {
                title: 'Internships & Experience', // Custom title for students
                data: experience,
                render: (exp) => (
                    <div className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md text-gray-900">{exp.company}</h3>
                            <span className="text-sm text-gray-600">{formatPeriod(exp)}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800 italic">{exp.position}</div>
                        <p className="text-sm text-gray-700 mt-1 text-justify">{exp.description}</p>
                    </div>
                )
            }
        };

        return (
            <div className="text-left font-serif text-gray-900 leading-relaxed">
                <header className="text-center border-b-2 border-gray-300 pb-5 mb-6">
                    <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 text-gray-900">{personalInfo.fullName}</h1>
                    <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-700 separator-dot">
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-blue-700 hover:underline flex items-center gap-1"><Linkedin size={12} /> LinkedIn</a>}
                        {personalInfo.portfolio && <a href={personalInfo.portfolio} className="text-blue-700 hover:underline flex items-center gap-1"><Github size={12} /> Portfolio</a>}
                    </div>
                    {personalInfo.summary && <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto italic">{personalInfo.summary}</p>}
                </header>

                {activeOrder.map(sectionId => {
                    const section = sections[sectionId];
                    if (!section) return null;
                    const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);

                    if (!hasData) return null;

                    return (
                        <div key={sectionId} className="mb-5">
                            <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-3 tracking-wider text-gray-800" style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}>
                                {section.title}
                            </h2>
                            {section.data ? (
                                section.data.map(item => (
                                    <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                ))
                            ) : (
                                section.render() // For skills
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };


    // 8. TWO-COLUMN SKILLS FOCUS
    const TwoColumnLayout = () => {
        // Soft reordering: Sort sidebar and main content based on sectionOrder
        const sidebarSections = ['skills', 'education'].sort((a, b) => sectionOrder.indexOf(a) - sectionOrder.indexOf(b));
        const mainSections = ['experience', 'projects'].sort((a, b) => sectionOrder.indexOf(a) - sectionOrder.indexOf(b));

        const sections = {
            education: {
                title: sectionTitles.education,
                data: education,
                render: (edu) => (
                    <div className="mb-4">
                        <div className="font-bold text-gray-900">{edu.school}</div>
                        <div className="text-sm text-gray-600 italic">{edu.degree}</div>
                        <div className="text-sm text-gray-500">{formatPeriod(edu)}</div>
                    </div>
                )
            },
            skills: {
                title: sectionTitles.skills || 'Core Competencies',
                type: 'skills',
                render: () => (
                    <div className="flex flex-col gap-2">
                        {skills.map(skill => (
                            <div key={skill.id} className="bg-white p-2 rounded shadow-sm border border-gray-100 text-sm">
                                <span className="font-semibold text-gray-800">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                )
            },
            projects: {
                title: sectionTitles.projects,
                data: projects,
                render: (proj) => (
                    <div className="mb-6">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
                            {proj.tech && <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{proj.tech}</span>}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{proj.description}</p>
                    </div>
                )
            },
            experience: {
                title: sectionTitles.experience,
                data: experience,
                render: (exp) => (
                    <div className="mb-6 relative pl-4 border-l-2 border-gray-200">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-lg text-gray-900">{exp.company}</h3>
                            <span className="text-sm font-semibold text-gray-500">{formatPeriod(exp)}</span>
                        </div>
                        <div className="text-sm text-gray-600 italic mb-2">{exp.position}</div>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{exp.description}</p>
                    </div>
                )
            }
        };

        return (
            <div className="text-left font-sans text-gray-900 grid grid-cols-12 gap-8 h-full">
                {/* Sidebar */}
                <div className="col-span-4 bg-gray-50 p-6 rounded-lg h-fit border border-gray-100">
                    <div className="mb-8">
                        {personalInfo.photo && (
                            <img
                                src={personalInfo.photo}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto mb-4"
                            />
                        )}
                        <h1 className="text-2xl font-bold uppercase text-center text-gray-900 leading-tight mb-4">{personalInfo.fullName}</h1>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            {personalInfo.email && <div className="flex items-center gap-2 break-all"><Mail size={14} className="shrink-0" />{personalInfo.email}</div>}
                            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="shrink-0" />{personalInfo.phone}</div>}
                            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} className="shrink-0" />{personalInfo.location}</div>}
                            {personalInfo.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={14} className="shrink-0" />
                                    <a href={personalInfo.linkedin} className="hover:underline">{getLinkText(personalInfo.linkedin, personalInfo.linkedinLabel, 'linkedin')}</a>
                                </div>
                            )}
                            {personalInfo.portfolio && (
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className="shrink-0" />
                                    <a href={personalInfo.portfolio} className="hover:underline">{getLinkText(personalInfo.portfolio, personalInfo.portfolioLabel)}</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {sidebarSections.map(sectionId => {
                        const section = sections[sectionId];
                        const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);
                        if (!hasData) return null;

                        return (
                            <div key={sectionId} className="mb-8 last:mb-0">
                                <h2 className="text-md font-bold uppercase border-b-2 border-gray-200 mb-3 pb-1" style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}>
                                    {section.title}
                                </h2>
                                {section.data ? (
                                    section.data.map(item => (
                                        <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                    ))
                                ) : (
                                    section.render()
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Main Content */}
                <div className="col-span-8 py-6 pr-6">
                    {personalInfo.summary && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold uppercase text-gray-800 mb-3 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gray-800 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }}></span>
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
                        </div>
                    )}

                    {mainSections.map(sectionId => {
                        const section = sections[sectionId];
                        const hasData = section.data ? section.data.length > 0 : (sectionId === 'skills' && skills.length > 0);
                        if (!hasData) return null;

                        return (
                            <div key={sectionId} className="mb-8 last:mb-0">
                                <h2 className="text-xl font-bold uppercase text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-gray-800 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }}></span>
                                    {section.title}
                                </h2>
                                {section.data ? (
                                    section.data.map(item => (
                                        <div key={item.id} className="no-break-inside">{section.render(item)}</div>
                                    ))
                                ) : (
                                    section.render()
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderLayout = () => {
        switch (templateId) {
            case 'modern': return <ModernLayout />;
            case 'harvard': return <HarvardLayout />;
            case 'mnc-standard': return <CorporateLayout />; // Mapped to Corporate
            case 'tech-minimalist': return <TechLayout />; // Mapped to Tech
            case 'project-centric': return <ProjectCentricLayout />;
            case 'minimal-fresher': return <MinimalFresherLayout />;
            case 'student': return <StudentLayout />; // New Student Layout
            case 'two-column': return <TwoColumnLayout />; // New Two Column
            default: return <ModernLayout />;
        }
    };

    return (
        <div className="resume-preview-container bg-white shadow-lg mx-auto overflow-hidden print:shadow-none print:m-0"
            style={{
                width: '210mm',
                minHeight: '297mm', // A4 height
                fontFamily: fontFamily || 'Inter, sans-serif'
            }}
        >
            <style>{dynamicStyles}</style>
            <div className="resume-wrapper h-full w-full box-border">
                {renderLayout()}
            </div>
        </div>
    );
};

export default ResumePreview;
