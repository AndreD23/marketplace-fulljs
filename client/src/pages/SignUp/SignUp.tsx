import { PageArea } from "./styled";
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from "../../components/MainComponents";
import { useEffect, useState } from "react";
import { AuthAPI } from "../../apis/AuthAPI";
import { doLogin } from "../../helpers/AuthHandler";
import { IState } from "../../types/state";
import { AdAPI } from "../../apis/AdAPI";

const SignUp = () => {
  const [name, setName] = useState("");
  const [idState, setIdState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stateList, setStateList] = useState<IState[]>([]);

  const getStates = async () => {
    const response = await AdAPI.getStates();

    if (response?.error) {
      alert(response.error);
      return;
    }

    setStateList(response.states);
  };

  useEffect(() => {
    getStates();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !name || !password || !idState) {
      alert("Preencha os campos!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Senhas não batem!");
      setLoading(false);
      return;
    }

    const response = await AuthAPI.register(name, email, password, idState);

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
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome completo</div>
            <div className="area--input">
              <input
                type="text"
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>

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
            <div className="area--title">Confirmar senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                value={idState}
                onChange={(e) => setIdState(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {stateList.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
              <button disabled={loading}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default SignUp;
