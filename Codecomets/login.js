function LoginSelection() {
    const handleRoleSelect = (role) => {
        // Redirect to the appropriate login page
        window.location.href = `${role}-login.html`;
    };

    return (
        <div className="login-container">
            <div className="login-selection">
                <h1>Welcome to Citizens Voice</h1>
                <div className="role-boxes">
                    <div 
                        className="role-box"
                        onClick={() => handleRoleSelect('user')}
                    >
                        <h3>User</h3>
                        <p>Citizens Login</p>
                    </div>
                    <div 
                        className="role-box"
                        onClick={() => handleRoleSelect('admin')}
                    >
                        <h3>Admin</h3>
                        <p>Administrative Login</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LoginSelection />); 