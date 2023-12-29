import { PageArea } from "./styled";
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from "../../components/MainComponents";
import { useState } from "react";
import { AuthAPI } from "../../apis/auth";
import { doLogin } from "../../helpers/AuthHandler";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      alert("Preencha os campos!");
      setLoading(false);
      return;
    }

    const response = await AuthAPI.login(email, password);

    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    doLogin(response.token, rememberPassword);
    setLoading(false);
    window.location.href = "/";
  };

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={loading}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={loading}>Fazer login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default SignIn;
