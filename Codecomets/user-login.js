function UserLogin() {
    const [formData, setFormData] = React.useState({
        email: 'citizendemo@gmail.com',  // Pre-filled demo credentials
        password: 'citizen@123',         // Pre-filled demo credentials
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email === 'citizendemo@gmail.com' && formData.password === 'citizen@123') {
            window.location.href = 'user-home.html';  // Redirect to user home page
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <div className="login-selection">
                <h1>Citizen Login</h1>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
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
                        <p className="register-link">
                            New user? <a href="#register">Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<UserLogin />); 