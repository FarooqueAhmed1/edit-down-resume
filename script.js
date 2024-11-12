document.getElementById('generateResume').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const objective = document.getElementById('objective').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).join(', ');

    const resumeContent = `
        <h3>${name}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Location: ${location}</p>
        <h4>Objective</h4>
        <p>${objective}</p>
        <h4>Education</h4>
        <p>${education}</p>
        <h4>Experience</h4>
        <p>${experience}</p>
        <h4>Skills</h4>
        <p>${skills}</p>
    `;

    document.getElementById('resumeContent').innerHTML = resumeContent;
    document.getElementById('resumePreview').classList.remove('hidden');

    const uniqueUrl = `https://${ username}.vercel.app/resume`;
    document.getElementById('resumeLink').innerHTML = `Share your resume: <a href="${uniqueUrl}" target="_blank">${uniqueUrl}</a>`;
    
    document.getElementById('downloadResume').onclick = () => {
        const pdfContent = document.getElementById('resumeContent').innerHTML;
        downloadPDF(pdfContent, `${username}_resume.pdf`);
    };
});

function downloadPDF(content, filename) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}