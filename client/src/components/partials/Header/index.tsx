import { HeaderArea } from "./styled";
import { Link } from "react-router-dom";

import { doLogout, isLogged } from "../../../helpers/AuthHandler";

const Header = () => {
  let logged = isLogged();

  const handleLogout = () => {
    doLogout();
  };

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
        <nav>
          <ul>
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to="/post-an-ad" className="button">
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
            {!logged && (
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
};

export default Header;
