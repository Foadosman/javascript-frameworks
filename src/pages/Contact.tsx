import { useState } from 'react';

function Contact() {
    const [fullName, setFullName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    }
    
    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (fullName.trim().length < 3) {
            alert('Full name must be at least 3 characters.');
            return;
        }

        if (subject.trim().length < 3) {
            alert('Subject must be at least 3 characters.');
            return;
        }

        if (message.trim().length < 10) {
            alert('Message must be at least 10 characters.');
            return;
        }

        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message!')

        setFullName('');
        setSubject('');
        setEmail('');
        setMessage('');
    };

    
    return (
        <section className="contact-section">
            <h2>Contact us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full name</label>
                <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange}/>

                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" value={subject} onChange={handleSubjectChange}/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange}/>

                <label htmlFor="message">Message</label>
                <textarea id="message" value={message} onChange={handleMessageChange}></textarea>
                <button type="submit">Send message</button>
            </form>
        </section>
    );
}

export default Contact;