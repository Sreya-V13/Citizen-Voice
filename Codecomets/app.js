// Header Component
function Header() {
    return (
        <div className="description-section">
            <h2>Your Voice Matters</h2>
            <p>Our Complaint Management System is designed to ensure your concerns are heard and addressed effectively. 
            Whether you're experiencing issues with our services, have suggestions for improvement, or need to report 
            a problem, we're here to help.</p>
            
            <div className="key-features">
                <Feature 
                    title="Easy Submission" 
                    description="Simple and straightforward process to submit your complaints"
                />
                <Feature 
                    title="Real-time Tracking" 
                    description="Monitor the status of your complaints at any time"
                />
                <Feature 
                    title="Quick Resolution" 
                    description="Dedicated team working to resolve your issues promptly"
                />
            </div>
        </div>
    );
}

// Feature Component
function Feature({ title, description }) {
    return (
        <div className="feature">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

// ComplaintForm Component
function ComplaintForm({ isOpen, onClose, onSubmit }) {
    const [name, setName] = React.useState("");
    const [issue, setIssue] = React.useState("");

    const handleSubmit = () => {
        if (name && issue) {
            onSubmit({ name, issue });
            setName("");
            setIssue("");
            onClose();
        } else {
            alert("Please fill out all fields.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal show">
            <div className="modal-content">
                <h1>Complaint Tracker</h1>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <textarea 
                    placeholder="Describe your issue" 
                    value={issue} 
                    onChange={(e) => setIssue(e.target.value)}
                ></textarea>
                <button onClick={handleSubmit}>Submit Complaint</button>
                <button 
                    onClick={onClose}
                    style={{ backgroundColor: "#dc3545", marginTop: "10px" }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

// ComplaintList Component
function ComplaintList({ complaints }) {
    if (complaints.length === 0) {
        return (
            <div className="complaint-list">
                <h2>Recent Complaints</h2>
                <p>No complaints submitted yet.</p>
            </div>
        );
    }

    return (
        <div className="complaint-list">
            <h2>Recent Complaints</h2>
            {complaints.map((complaint) => (
                <div key={complaint.id} className="complaint">
                    <strong>{complaint.name}</strong>: {complaint.issue}
                </div>
            ))}
        </div>
    );
}

// Main App Component
function ComplaintTracker() {
    const [complaints, setComplaints] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleSubmitComplaint = (complaintData) => {
        const newComplaint = { 
            id: Date.now(), 
            ...complaintData 
        };
        setComplaints([...complaints, newComplaint]);
    };

    return (
        <div>
            <div className="intro-section">
                <h1>Welcome to the Complaint Management System</h1>
                <Header />

                <div className="vertical-steps">
                    <div className="step-row">
                        <div className="step-content">
                            <h3>Submit Your Complaint</h3>
                            <p>We understand that you may have concerns or issues that need attention. 
                            Our complaint submission process is simple and straightforward. Click the button 
                            to open the complaint form and describe your issue in detail.</p>
                        </div>
                        <button 
                            className="step-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Submit Complaint
                        </button>
                    </div>

                    <div className="step-row right-aligned">
                        <div className="step-content">
                            <h3>Track Your Complaints</h3>
                            <p>Once submitted, you can easily monitor your complaint's status below. 
                            We believe in transparency and keeping you informed throughout the resolution process. 
                            Click to view all your submitted complaints.</p>
                        </div>
                        <button 
                            className="step-button"
                            onClick={() => document.querySelector('.complaint-list').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Complaints
                        </button>
                    </div>
                </div>
            </div>

            <ComplaintForm 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitComplaint}
            />
            
            <ComplaintList complaints={complaints} />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ComplaintTracker />);
