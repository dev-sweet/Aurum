import { LegalLayout } from '@/components/LegalLayout/LegalLayout';

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="March 31, 2026">
            <h2>1. Information We Collect</h2>
            <p>We collect information that identifies, relates to, or could reasonably be linked with you. This includes personal identifiers such as your name, email address, and encrypted payment details.</p>

            <h2>2. How We Use Data</h2>
            <p>Your data is used exclusively to provide a bespoke user experience, process transactions, and ensure the security of the Trust OS ecosystem.</p>

            <h2>3. Data Sovereignty</h2>
            <p>We believe in user data ownership. You may request a full export or deletion of your personal data at any time via your account settings.</p>
        </LegalLayout>
    );
}