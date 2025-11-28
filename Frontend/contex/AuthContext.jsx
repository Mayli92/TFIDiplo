import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos del localStorage al iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // ---------------------------------------------------
    // 🔐 LOGIN
    // ---------------------------------------------------
    const login = async (email, password) => {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        // Tu backend devuelve el token DENTRO de data.user.token
        const token = data.user.token;
        const usuario = data.user;

        // Guardar en estado
        setToken(token);
        setUser(usuario);

        // Guardar en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(usuario));

        navigate("/");
    };

    // ---------------------------------------------------
    // 📝 REGISTRO
    // (Ajustado para backend con POST /api/auth/register)
    // ---------------------------------------------------
    const register = async (formData) => {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al registrarse");
        }

        navigate("/login");
    };

    // ---------------------------------------------------
    // 🚪 LOGOUT
    // ---------------------------------------------------
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
