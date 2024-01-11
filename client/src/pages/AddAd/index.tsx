import { PageArea } from "./styled";
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from "../../components/MainComponents";
import React, { useEffect, useRef, useState } from "react";
import { AdAPI } from "../../apis/AdAPI";
import { ICategory } from "../../types/category";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const AddAd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [description, setDescription] = useState("");

  const fileField = useRef<HTMLInputElement>(null);

  const getCategories = async () => {
    const response = await AdAPI.getCategories();

    if (response?.error) {
      alert(response.error);
      return;
    }

    setCategories(response.categories);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim() || !category || !price.trim() || !description.trim()) {
      alert("Preencha os campos!");
      setLoading(false);
      return;
    }

    // const response = await AdAPI.getAd();
    //
    // if (response?.error) {
    //   setError(response.error);
    //   setLoading(false);
    //   return;
    // }

    setLoading(false);
    // window.location.href = "/";
  };

  useEffect(() => {
    getCategories();
  }, []);

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                disabled={loading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Category</div>
            <div className="area--input">
              <select
                disabled={loading}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={loading || priceNegotiable}
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={loading}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea
                disabled={loading}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Imagens (1 ou mais)</div>
            <div className="area--input">
              <input type="file" disabled={loading} multiple ref={fileField} />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={loading}>Cadastrar anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default AddAd;
