import { IAd } from "../../../types/ad";
import { Link } from "react-router-dom";
import { Item } from "./styled";

interface AdProps {
  ad: IAd;
}

const AdItem = ({ ad }: AdProps) => {
  const itemImage = ad.defaultImg || ad.images[0];

  const itemPrice = ad.priceNegotiable
    ? "Preço Negociável"
    : new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(ad.price);

  return (
    <Item className="aditem">
      <Link to={`/ad/${ad._id}`}>
        <div className="itemImage">
          <img src={itemImage.url} alt={`Imagem - ${ad.title}`} />
        </div>
        <div className="itemName">{ad.title}</div>
        <div className="itemPrice">{itemPrice}</div>
      </Link>
    </Item>
  );
};
export default AdItem;
