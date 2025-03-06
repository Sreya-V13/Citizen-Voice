import ComplaintManager from './utils';

// Demo complaints and utility functions
const demoComplaints = [
    {
        id: 1,
        department: 'Public Works',
        category: 'Road Maintenance',
        description: 'Large pothole on main street',
        location: 'Main Street, Block A',
        date: '2024-03-15',
        status: 'pending',
        severity: 'high',
        image: 'https://example.com/pothole.jpg'
    },
    {
        id: 2,
        department: 'Water & Sanitation',
        category: 'Water Supply',
        description: 'No water supply for 2 days',
        location: 'Green Park Area',
        date: '2024-03-16',
        status: 'in-progress',
        severity: 'high',
        image: 'https://example.com/water.jpg'
    },
    // Add more demo complaints for each department
];

// Initialize localStorage with demo complaints if empty
if (!localStorage.getItem('complaints')) {
    localStorage.setItem('complaints', JSON.stringify(demoComplaints));
}

function AdminDashboard() {
    const [selectedDepartment, setSelectedDepartment] = React.useState(null);
    const [complaints, setComplaints] = React.useState([]);
    const [statusFilter, setStatusFilter] = React.useState('all');

    const departments = {
        'Public Works': '🏗️',
        'Water & Sanitation': '💧',
        'Health & Safety': '🏥',
        'Environment': '🌳',
        'Emergency Services': '🚨',
        'Municipal Services': '🏛️',
        'Education': '📚',
        'Transportation': '🚌',
        'Social Welfare': '🤝'
    };

    // Load complaints on mount
    React.useEffect(() => {
        const loadComplaints = () => {
            const savedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
            setComplaints(savedComplaints);
        };

        loadComplaints();
        window.addEventListener('storage', loadComplaints);
        return () => window.removeEventListener('storage', loadComplaints);
    }, []);

    // Update complaint status
    const updateStatus = (complaintId, newStatus) => {
        const updatedComplaints = complaints.map(complaint =>
            complaint.id === complaintId 
                ? { ...complaint, status: newStatus }
                : complaint
        );
        setComplaints(updatedComplaints);
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    };

    // Filter complaints by department and status
    const filteredComplaints = complaints.filter(complaint => {
        if (selectedDepartment && complaint.department !== selectedDepartment) return false;
        if (statusFilter !== 'all' && complaint.status !== statusFilter) return false;
        return true;
    });

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={() => window.location.href = 'index.html'}>Logout</button>
            </header>

            <main className="dashboard-main">
                {!selectedDepartment ? (
                    // Department Selection View
                    <div className="departments-grid">
                        {Object.entries(departments).map(([dept, icon]) => {
                            const deptComplaints = complaints.filter(c => c.department === dept);
                            return (
                                <div 
                                    key={dept}
                                    className="department-card"
                                    onClick={() => setSelectedDepartment(dept)}
                                >
                                    <span className="department-icon">{icon}</span>
                                    <h3>{dept}</h3>
                                    <p>{deptComplaints.length} complaints</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Department Complaints View
                    <div className="department-view">
                        <div className="department-header">
                            <button onClick={() => setSelectedDepartment(null)}>
                                ← Back to Departments
                            </button>
                            <h2>{selectedDepartment}</h2>
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>

                        <div className="complaints-grid">
                            {filteredComplaints.map(complaint => (
                                <div 
                                    key={complaint.id}
                                    className={`complaint-card ${complaint.status}`}
                                >
                                    {complaint.image && (
                                        <img 
                                            src={complaint.image}
                                            alt="Complaint"
                                            className="complaint-image"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <div className="complaint-info">
                                        <h4>{complaint.category}</h4>
                                        <p>{complaint.description}</p>
                                        <p>📍 {complaint.location}</p>
                                        <p>📅 {complaint.date}</p>
                                        <div className="status-controls">
                                            <select
                                                value={complaint.status}
                                                onChange={(e) => updateStatus(complaint.id, e.target.value)}
                                                className={complaint.status}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminDashboard />);