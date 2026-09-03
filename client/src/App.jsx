import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/auth";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch {
      // User is not logged in.
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin) {
      if (!form.name) {
        setError("Please enter your full name.");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "/login" : "/register";

      const body = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
          };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      if (isLogin) {
        setUser(data.user);

        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage("Account created successfully. You can now sign in.");

        setIsLogin(true);

        setForm({
          name: "",
          email: form.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsLogin(true);
      setMessage("You have been signed out.");
    } catch {
      setError("Unable to log out. Please try again.");
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setError("");
    setMessage("");
  };

  if (user) {
    return (
      <main className="dashboard-page">
        <nav className="dashboard-nav">
          <div className="brand">
            <div className="brand-mark">P</div>
            <span>ProdigyAuth</span>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </nav>

        <section className="dashboard-content">
          <span className="eyebrow">SECURE SESSION</span>

          <h1>
            Welcome,
            <br />
            <span>{user.name}.</span>
          </h1>

          <p className="dashboard-description">
            You're securely signed in to your ProdigyAuth account.
          </p>

          <div className="account-card">
            <div className="card-header">
              <span>ACCOUNT</span>

              <div className="active-status">
                <span></span>
                Active
              </div>
            </div>

            <div className="account-info">
              <span className="info-label">Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="account-info">
              <span className="info-label">Email</span>
              <strong>{user.email}</strong>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="brand">
          <div className="brand-mark">P</div>
          <span>ProdigyAuth</span>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <span className="eyebrow">
              {isLogin ? "SECURE ACCESS" : "GET STARTED"}
            </span>

            <h1>{isLogin ? "Welcome back." : "Create your account."}</h1>

            <p>
              {isLogin
                ? "Sign in to continue to your secure account."
                : "Create a secure account and get started."}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="field">
                <label htmlFor="name">Full name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Aman Gavandi"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
            </div>

            {!isLogin && (
              <div className="field">
                <label htmlFor="confirmPassword">Confirm password</label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && <div className="form-message error">{error}</div>}

            {message && <div className="form-message success">{message}</div>}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}

              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="switch-auth">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={switchMode}
              className="text-button switch-button"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="security-note">
          <span className="status-dot"></span>
          Your connection is secure
        </div>
      </section>

      <aside className="visual-panel">
        <div className="visual-content">
          <span className="visual-label">PRODIGY AUTHENTICATION</span>

          <h2>
            Security should feel
            <br />
            <span>effortless.</span>
          </h2>

          <p>
            A modern authentication experience built with React, Node.js,
            Express and MongoDB.
          </p>

          <div className="feature-row">
            <div className="feature">
              <strong>01</strong>
              <span>Secure</span>
            </div>

            <div className="feature">
              <strong>02</strong>
              <span>Private</span>
            </div>

            <div className="feature">
              <strong>03</strong>
              <span>Reliable</span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default App;
