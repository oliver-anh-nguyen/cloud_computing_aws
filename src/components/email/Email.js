import React, {useContext, useState} from 'react';
import './Email.scss'; // Import the styles if they are in a separate file
import { Fade } from 'react-reveal';

export default function Contact() {
    const [formData, setFormData] = useState({
        messageTitle: '',
        message: '',
        email: '',
        guestName: '',
        phone: '',
    });

    const { messageTitle, message, email, guestName, phone } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement form submission logic here
    };

    return (
        <Fade bottom duration={1000} distance="20px">
            <div className="main" id="contact">
                <h1 className="prof-title">Send A Message</h1>
                <div className="row">
                    <div className="main-content-contact">
                        {/* Updated form with larger email input and additional fields */}
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    className="larger-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Guest Name</label>
                                <input
                                    type="text"
                                    name="guestName"
                                    placeholder="Your Name"
                                    value={guestName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone (Optional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
                                    value={phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message Title</label>
                                <input
                                    type="text"
                                    name="messageTitle"
                                    placeholder="Title of your message"
                                    value={messageTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={message}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </div>

                            <button className="button-email" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fade>
    );
}
