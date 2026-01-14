import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
        <h2 className="text-center mb-4">About Us</h2>
        <p>
          <strong>NoteNest</strong> is your personal and secure space to store, organize, and manage notes — all in one place. 
          Designed with simplicity and productivity in mind, NoteNest helps you capture your thoughts, tasks, and ideas effortlessly.
        </p>

        <h4 className="mt-4"> Features</h4>
        <ul>
          <li>Create, edit, and delete notes with ease.</li>
          <li>Access your notes securely from anywhere.</li>
          <li>Organize your thoughts using tags and categories.</li>
          <li>Simple, elegant, and distraction-free interface.</li>
        </ul>

        <h4 className="mt-4"> Security</h4>
        <p>
          Your privacy is our priority. Every user’s notes are stored securely and can only be accessed by the account owner. 
          NoteNest ensures that your personal data remains safe and private.
        </p>

        <h4 className="mt-4"> Our Vision</h4>
        <p>
          We believe great ideas can come at any time. NoteNest aims to provide a clean and reliable platform 
          where you can instantly capture your inspiration and keep it organized for future use.
        </p>

        <h4 className="mt-4"> Contact</h4>
        <p>
          Have feedback or suggestions? We’d love to hear from you!  
          Reach out at <h6 style={{color: 'blue'}}>supportnotenest@mail.com</h6>
        </p>

        <p className="text-center mt-4 text-muted">
          © {new Date().getFullYear()} NoteNest — A cozy “nest” for all your notes.
        </p>
      </div>
    </div>
  );
};

export default About;

