import { PageArea, SearchArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import { useEffect, useState } from "react";
import { IState } from "../../types/state";
import { ICategory } from "../../types/category";
import { AdAPI } from "../../apis/AdAPI";
import { Link } from "react-router-dom";

const Home = () => {
  const [stateList, setStateList] = useState<IState[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getStates = async () => {
    const states = await AdAPI.getStates();
    setStateList(states.states);
  };

  const getCategories = async () => {
    const response = await AdAPI.getCategories();
    setCategories(response.categories);
  };

  useEffect(() => {
    getStates();
    getCategories();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((state, index) => (
                  <option key={index} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/ads?cat=${category.slug}`}
                className="categoryItem"
              >
                <img src={category.img} alt="" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
        <PageContainer>
          <PageArea>
            <h2>Anúncios Recentes</h2>
            <div className="list"></div>
            <button>Ver mais anúncios</button>
          </PageArea>
        </PageContainer>
      </SearchArea>
    </>
  );
};

export default Home;
