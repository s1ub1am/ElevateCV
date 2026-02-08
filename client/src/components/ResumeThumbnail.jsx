import React from 'react';
import ResumePreview from './ResumePreview';

const dummyData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        location: "New York, NY",
        linkedin: "linkedin.com/in/johndoe",
        summary: "Passionate software engineer with experience in building scalable web applications."
    },
    education: [
        { id: 1, school: "University of Tech", degree: "B.S. Computer Science", year: "2023" }
    ],
    experience: [
        { id: 1, company: "Tech Corp", position: "Frontend Intern", duration: "Summer 2022", description: "Built responsive UI components using React and Tailwind CSS." }
    ],
    projects: [
        { id: 1, name: "Portfolio Site", tech: "React, Node.js", description: "Personal portfolio to showcase projects." }
    ],
    skills: [
        { id: 1, name: "JavaScript" },
        { id: 2, name: "React" },
        { id: 3, name: "Node.js" }
    ]
};

const ResumeThumbnail = ({ templateId }) => {
    return (
        <div className="w-full h-full overflow-hidden bg-white relative">
            <div className="absolute top-0 left-0 transform origin-top-left scale-[0.25] w-[210mm] h-[297mm] pointer-events-none select-none">
                <ResumePreview
                    resumeData={dummyData}
                    templateId={templateId}
                    fontFamily="Inter"
                />
            </div>
        </div>
    );
};

export default ResumeThumbnail;
