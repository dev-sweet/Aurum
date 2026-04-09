import { LegalLayout } from '@/components/LegalLayout/LegalLayout';

export default function CookiePolicy() {
    return (
        <LegalLayout title="Cookie Policy" lastUpdated="March 31, 2026">
            <h2>What are Cookies?</h2>
            <p>Cookies are small text files used to store small pieces of information. They are stored on your device when the website is loaded in your browser.</p>

            <h2>How We Use Them</h2>
            <ul>
                <li><strong>Essential:</strong> Necessary for the secure operation of the dashboard.</li>
                <li><strong>Analytics:</strong> To understand how users interact with our premium interfaces.</li>
                <li><strong>Preferences:</strong> To remember your language and theme settings.</li>
            </ul>
        </LegalLayout>
    );
}