'use client';

import { FormEvent } from 'react';
import Airtable from 'airtable';

const EmailForm = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            const messageElement = document.getElementById('message');
            if (messageElement) {
                messageElement.textContent = 'Enter a working email';
            }
            return;
        }
        try {
            const response = await fetch('/api/add_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                const messageElement = document.getElementById('message');
            if (messageElement) {
                messageElement.textContent = 'Done!';
            }
            emailInput.value = '';
            } else {
                throw new Error('Error adding email');
            }
        } catch (error) {
            console.error('Error adding email:', error);
            const messageElement = document.getElementById('message');
            if (messageElement) {
                messageElement.textContent = 'Oops, we hit an error. If it fails again, send us a message!';
            }
        }
    };

    return (
        <form className="flex items-center gap-2 mt-2" onSubmit={handleSubmit}>
            <label htmlFor="email" className="font-lato text-gray-800">Learn about new cards:</label>
            <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="py-0.5 px-2 border border-gray-400 rounded-none focus:outline-none max-w-xs text-sm"
                style={{ flexGrow: 1 }}
            />
            <button
                className="bg-green-600 hover:bg-black border border-gray-800 text-white font-bold font-lato text-sm py-0.5 px-2 rounded-none transition duration-150 ease-in-out"
            >
                SUBMIT
            </button>
        </form>
    );
};

export default EmailForm;