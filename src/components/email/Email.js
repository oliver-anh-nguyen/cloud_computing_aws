import React, { useState } from 'react';
import './Email.scss';
import axios from 'axios';

export default function Email() {
    const [formData, setFormData] = useState({
        messageTitle: '',
        message: '',
        email: '',
        guestName: '',
        phone: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const { messageTitle, message, email, guestName, phone } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://mgv6yaurh0.execute-api.us-east-1.amazonaws.com/v1/contact', // Replace with your actual API endpoint
                formData
            );

            // Parse the response body as JSON
            const responseBody = response.data;

            // Check if the message in the response body indicates success
            if (responseBody.message === 'Message sent successfully!') {
                // If successful, show the popup
                setSubmissionStatus('success');
            } else {
                // If not successful, handle accordingly (you can log or show an error message)
                setSubmissionStatus('error');
                console.error('Error:', responseBody.message);
            }

            setShowPopup(true);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus('error');
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setSubmissionStatus(null); // Reset submission status when closing the popup
    };

    return (
        <div className="main" id="contact">
            <h1 className="prof-title">Send A Message</h1>
            <div className="row">
                <div className="main-content-contact">
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
                                required
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
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={message}
                                required
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>

                        <button className="button-email" type="submit">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        {submissionStatus === 'success' ? (
                            <p>The message was sent successfully!</p>
                        ) : (
                            <p>There was an error sending the message. Please try again.</p>
                        )}
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
