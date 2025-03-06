function UserDashboard() {
    const [selectedDepartment, setSelectedDepartment] = React.useState(null);
    const [complaint, setComplaint] = React.useState({
        department: '',
        category: '',
        description: '',
        location: '',
        images: [],
        isEmergency: false,
        priority: 'normal'
    });
    const [notification, setNotification] = React.useState(null);
    const [categories, setCategories] = React.useState([]);

    const departments = {
        'Public Works': {
            icon: '🏗️',
            categories: ['Road Maintenance', 'Street Lighting', 'Sidewalk Repairs', 'Bridge Issues', 'Construction Safety']
        },
        'Water & Sanitation': {
            icon: '💧',
            categories: ['Water Supply', 'Drainage Issues', 'Sewage Problems', 'Water Quality', 'Pipeline Leaks']
        },
        'Health & Safety': {
            icon: '🏥',
            categories: ['Public Health', 'Food Safety', 'Medical Emergency', 'Disease Control', 'Sanitation']
        },
        'Environment': {
            icon: '🌳',
            categories: ['Garbage Collection', 'Air Pollution', 'Noise Pollution', 'Park Maintenance', 'Tree Issues']
        },
        'Emergency Services': {
            icon: '🚨',
            categories: ['Fire Hazard', 'Accidents', 'Natural Disasters', 'Public Safety', 'Emergency Response']
        },
        'Municipal Services': {
            icon: '🏛️',
            categories: ['Property Tax', 'License Issues', 'Certificate Requests', 'Municipal Records', 'General Enquiry']
        },
        'Education': {
            icon: '📚',
            categories: ['School Infrastructure', 'Education Quality', 'Mid-day Meals', 'Teacher Issues', 'Student Facilities']
        },
        'Transportation': {
            icon: '🚌',
            categories: ['Public Transport', 'Traffic Issues', 'Parking Problems', 'Bus Stops', 'Route Information']
        },
        'Social Welfare': {
            icon: '🤝',
            categories: ['Pension Issues', 'Disability Support', 'Women Safety', 'Child Welfare', 'Senior Citizen Services']
        }
    };

    // Update categories when department changes
    React.useEffect(() => {
        if (selectedDepartment) {
            const departmentCategories = ComplaintManager.getCategories(selectedDepartment);
            setCategories(departmentCategories);
            setComplaint(prev => ({
                ...prev,
                department: selectedDepartment,
                category: departmentCategories[0] || ''
            }));
        }
    }, [selectedDepartment]);

    // Show notification
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 5000); // Hide after 5 seconds
    };

    // Get current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setComplaint({
                    ...complaint,
                    location: `${position.coords.latitude}, ${position.coords.longitude}`
                });
                showNotification("Location successfully captured!");
            });
        }
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setComplaint({
            ...complaint,
            images: [...complaint.images, ...fileUrls]
        });
    };

    // Submit complaint
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create new complaint object
        const newComplaint = {
            id: Date.now(), // Generate unique ID
            ...complaint,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            isEmergency: complaint.priority === 'emergency'
        };

        // Get existing complaints from localStorage
        const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        
        // Add new complaint to the array
        const updatedComplaints = [...existingComplaints, newComplaint];
        
        // Save back to localStorage
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));

        // Show success notification
        setNotification('Complaint submitted successfully!');
        setTimeout(() => setNotification(null), 3000);

        // Reset form
        setComplaint({
            department: '',
            category: '',
            description: '',
            location: '',
            images: [],
            isEmergency: false,
            priority: 'normal'
        });
        setSelectedDepartment(null);
    };

    return (
        <div className="user-dashboard">
            <nav className="dashboard-nav">
                <h2>Citizens Voice Dashboard</h2>
                <button className="logout-btn" onClick={() => window.location.href = 'index.html'}>
                    Logout
                </button>
            </nav>

            <div className="dashboard-content">
                {!selectedDepartment ? (
                    <div className="department-selection">
                        <h3>Select Department</h3>
                        <div className="department-grid">
                            {Object.entries(departments).map(([dept, info]) => (
                                <div 
                                    key={dept}
                                    className="department-card"
                                    onClick={() => {
                                        setSelectedDepartment(dept);
                                        setComplaint({ ...complaint, department: dept });
                                    }}
                                >
                                    <span className="department-icon">{info.icon}</span>
                                    <h4>{dept}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="complaint-form-container">
                        <button 
                            className="back-button"
                            onClick={() => setSelectedDepartment(null)}
                        >
                            ← Back to Departments
                        </button>
                        
                        <form onSubmit={handleSubmit} className="complaint-form animate-in">
                            <h3>{selectedDepartment}</h3>
                            
                            <div className="form-group">
                                <label>Category:</label>
                                <select 
                                    value={complaint.category}
                                    onChange={(e) => setComplaint({...complaint, category: e.target.value})}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <textarea
                                    placeholder="Description of the problem"
                                    value={complaint.description}
                                    onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group location-group">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={complaint.location}
                                    onChange={(e) => setComplaint({...complaint, location: e.target.value})}
                                    required
                                />
                                <button type="button" onClick={getCurrentLocation} className="location-btn">
                                    📍 Get Location
                                </button>
                            </div>

                            <div className="form-group">
                                <div className="file-upload">
                                    <label>
                                        <span>📎 Upload Images/Videos</span>
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            multiple
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                </div>
                            </div>

                            {complaint.images.length > 0 && (
                                <div className="image-preview">
                                    {complaint.images.map((url, index) => (
                                        <img key={index} src={url} alt={`Preview ${index + 1}`} />
                                    ))}
                                </div>
                            )}

                            <button type="submit" className="submit-btn">
                                Submit Complaint
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<UserDashboard />); 