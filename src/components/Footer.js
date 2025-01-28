import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Shared Travel App. All Rights Reserved.</p>
                <p>
                    Built with ❤️ by <a href="https://yourwebsite.com" className="text-light">Your Name</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
