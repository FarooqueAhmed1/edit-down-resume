interface ResumeData {
    username: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    objective: string;
    education: string;
    experience: string;
    skills: string[];
}

document.getElementById('generateResume')?.addEventListener('click', () => {
    const resumeData: ResumeData = {
        username: (document.getElementById('username') as HTMLInputElement).value,
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        location: (document.getElementById('location') as HTMLInputElement).value,
        objective: (document.getElementById('objective') as HTMLTextAreaElement).value,
        education: (document.getElementById('education') as HTMLTextAreaElement).value,
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim()),
    };

    const resumeContent = `
        <h3>${resumeData.name}</h3>
        <p>Email: ${resumeData.email}</p>
        <p>Phone: ${resumeData.phone}</p>
        <p>Location: ${resumeData.location}</p>
        <h4>Objective</h4>
        <p>${resumeData.objective}</p>
        <h4>Education</h4>
        <p>${resumeData.education}</p>
        <h4>Experience</h4>
        <p>${resumeData.experience}</p>
        <h4>Skills</h4>
        <p>${resumeData.skills.join(', ')}</p>
    `;

    document.getElementById('resumeContent').innerHTML = resumeContent;
    document.getElementById('resumePreview')?.classList.remove('hidden');

    const uniqueUrl = `https://${resumeData.username}.vercel.app/resume`;
    document.getElementById('resumeLink').innerHTML = `Share your resume: <a href="${uniqueUrl}" target="_blank">${uniqueUrl}</a>`;

    document.getElementById('downloadResume')?.onclick = () => {
        downloadPDF(resumeContent, `${resumeData.username}_resume.pdf`);
    };
});

function downloadPDF(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}