import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const InputGroup = ({ label, value = '', onChange, placeholder, type = "text", textarea = false, maxRecommended }) => {
    const length = value ? value.length : 0;
    const isOverLimit = maxRecommended && length > maxRecommended;

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">{label}</label>
                {maxRecommended && (
                    <span className={`text-xs ${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        {length}/{maxRecommended} chars
                    </span>
                )}
            </div>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-white border rounded-lg p-3 text-slate-900 focus:outline-none transition-colors min-h-[100px] shadow-sm ${isOverLimit ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue'
                        }`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors shadow-sm"
                />
            )}
            {isOverLimit && <p className="text-red-500 text-xs mt-1">⚠️ Text is too long for optimal resume layout.</p>}
        </div>
    );
};

const ResumeForm = ({ resumeData, setResumeData }) => {
    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', degree: '', startDate: '', endDate: '', id: Date.now() }]
        }));
    };

    const removeEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    }

    const updateEducation = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    }

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '', id: Date.now() }]
        }));
    };

    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateExperience = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, { name: '', level: 'Intermediate', id: Date.now() }]
        }));
    };

    const removeSkill = (id) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== id)
        }));
    };

    const updateSkill = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map(skill => skill.id === id ? { ...skill, [field]: value } : skill)
        }));
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), { name: '', link: '', tech: '', description: '', id: Date.now() }]
        }));
    };

    const removeProject = (id) => {
        setResumeData(prev => ({
            ...prev,
            projects: (prev.projects || []).filter(p => p.id !== id)
        }));
    };

    const updateProject = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            projects: (prev.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };
    return (
        <div className="space-y-8">
            {/* Personal Info */}
            <section>
                <h3 className="text-lg font-bold text-brand-dark mb-4 border-b border-slate-200 pb-2">Personal Info</h3>
                <InputGroup
                    label="Full Name"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="e.g. Alex Chen"
                />

                {/* Photo Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text-secondary mb-1">Profile Photo (Optional)</label>
                    <div className="flex items-center gap-4">
                        {resumeData.personalInfo.photo && (
                            <img
                                src={resumeData.personalInfo.photo}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        updatePersonalInfo('photo', reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-brand-blue
                                hover:file:bg-blue-100
                            "
                        />
                        {resumeData.personalInfo.photo && (
                            <button
                                onClick={() => updatePersonalInfo('photo', '')}
                                className="text-red-500 hover:text-red-400"
                                title="Remove Photo"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup
                        label="Email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        placeholder="alex@example.com"
                    />
                    <InputGroup
                        label="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <InputGroup
                        label="Location"
                        value={resumeData.personalInfo.location || ''}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="New York, NY"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup
                            label="LinkedIn URL"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/alex"
                        />
                        <InputGroup
                            label="Label (Optional)"
                            value={resumeData.personalInfo.linkedinLabel || ''}
                            onChange={(e) => updatePersonalInfo('linkedinLabel', e.target.value)}
                            placeholder="My LinkedIn"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="grid grid-cols-2 gap-2 col-span-2">
                        <InputGroup
                            label="Portfolio/GitHub URL"
                            value={resumeData.personalInfo.portfolio}
                            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                            placeholder="alex.design"
                        />
                        <InputGroup
                            label="Label (Optional)"
                            value={resumeData.personalInfo.portfolioLabel || ''}
                            onChange={(e) => updatePersonalInfo('portfolioLabel', e.target.value)}
                            placeholder="My Portfolio"
                        />
                    </div>
                </div>
                <InputGroup
                    label="Summary"
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    placeholder="Brief professional summary..."
                    textarea
                    maxRecommended={500}
                />
            </section>

            {/* Education */}
            <section>
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-brand-dark">Education</h3>
                    <button onClick={addEducation} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-brand-blue transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                        <div key={edu.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group hover:border-blue-200 transition-colors">
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <InputGroup
                                label="School/University"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label="Degree"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <InputGroup
                                        label="Start"
                                        value={edu.startDate}
                                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                        placeholder="YYYY-MM"
                                    />
                                    <InputGroup
                                        label="End"
                                        value={edu.endDate}
                                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                        placeholder="Present or YYYY-MM"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {resumeData.education.length === 0 && (
                        <p className="text-text-secondary text-sm italic">Add your education history</p>
                    )}
                </div>
            </section>

            {/* Experience */}
            <section>
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-brand-dark">Experience</h3>
                    <button onClick={addExperience} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-brand-blue transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group hover:border-blue-200 transition-colors">
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <InputGroup
                                label="Company"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label="Position"
                                    value={exp.position}
                                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup
                                        label="Start Date"
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                        placeholder="YYYY-MM"
                                    />
                                    <InputGroup
                                        label="End Date"
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                        placeholder="Present or YYYY-MM"
                                    />
                                </div>
                            </div>
                            <InputGroup
                                label="Description"
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                textarea
                                maxRecommended={300}
                            />
                        </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                        <p className="text-text-secondary text-sm italic">Add your work experience</p>
                    )}
                </div>
            </section>

            {/* Projects */}
            <section>
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-brand-dark">Projects</h3>
                    <button onClick={addProject} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-brand-blue transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {(resumeData.projects || []).map((proj) => (
                        <div key={proj.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group hover:border-blue-200 transition-colors">
                            <button
                                onClick={() => removeProject(proj.id)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label="Project Name"
                                    value={proj.name}
                                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                                />
                                <InputGroup
                                    label="Link"
                                    value={proj.link}
                                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                />
                            </div>
                            <InputGroup
                                label="Technologies"
                                value={proj.tech}
                                onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                            />
                            <InputGroup
                                label="Description"
                                value={proj.description}
                                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                textarea
                                maxRecommended={300}
                            />
                        </div>
                    ))}
                    {(!resumeData.projects || resumeData.projects.length === 0) && (
                        <p className="text-text-secondary text-sm italic">Add your projects</p>
                    )}
                </div>
            </section>

            {/* Skills */}
            <section>
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-brand-dark">Skills</h3>
                    <button onClick={addSkill} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-brand-blue transition-colors">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex gap-4 items-center">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                    placeholder="Skill (e.g. React, Python)"
                                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors shadow-sm"
                                />
                            </div>
                            <button
                                onClick={() => removeSkill(skill.id)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {resumeData.skills.length === 0 && (
                        <p className="text-text-secondary text-sm italic">Add your skills</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ResumeForm;
