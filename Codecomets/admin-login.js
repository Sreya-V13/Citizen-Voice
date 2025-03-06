function AdminLogin() {
    const [formData, setFormData] = React.useState({
        adminId: '1307',           // Pre-filled demo credentials
        email: 'admindemo@gmail.com',    // Pre-filled demo credentials
        password: 'Admin@567'      // Pre-filled demo credentials
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.adminId === '1307' && 
            formData.email === 'admindemo@gmail.com' && 
            formData.password === 'Admin@567') {
            window.location.href = 'admin-home.html';  // Redirect to admin dashboard
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <div className="login-selection">
                <h1>Administrative Login</h1>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Admin ID"
                            value={formData.adminId}
                            onChange={(e) => setFormData({...formData, adminId: e.target.value})}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminLogin />); 