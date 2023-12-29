import { HeaderArea } from "./styled";
import { Link } from "react-router-dom";

import { isLogged } from "../../../helpers/AuthHandler";

const Header = () => {
  let logged = isLogged();

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
                  <Link to="/logout">Sair</Link>
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
