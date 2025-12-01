import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
