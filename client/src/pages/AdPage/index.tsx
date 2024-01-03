import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAd } from "../../types/ad";
import { PageContainer } from "../../components/MainComponents";
import { BreadCrumb, Fake, OthersArea, PageArea } from "./styled";
import { AdAPI } from "../../apis/AdAPI";
import { formatDate } from "../../utils/date";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import AdItem from "../../components/partials/AdItem";

const AdPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState<IAd | null>(null);

  const getAdInfo = async (id: string) => {
    const response = await AdAPI.getAd(id, true);
    if (response.error) {
      alert(response.error);
      return;
    }

    if (!response.ad) {
      alert("Não existe esse anúncio!");
      return;
    }

    setAdInfo(response.ad);
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;

    getAdInfo(id);
  }, [id]);

  const itemPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(adInfo?.price || 0);

  return (
    <PageContainer>
      {adInfo && (
        <BreadCrumb>
          Você está aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.state.abbreviation}`}>
            {adInfo?.state.name}
          </Link>
          /
          <Link
            to={`/ads?state=${adInfo.state.abbreviation}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          / {adInfo.title}
        </BreadCrumb>
      )}

      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo && (
                <Slide>
                  {adInfo.images.map((image, index) => (
                    <div key={index} className="each-slide">
                      <img
                        src={image.url}
                        alt={`${adInfo.title} - Imagem ${index + 1}`}
                      />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake />}
                {adInfo && <h2>{adInfo.title}</h2>}
                {adInfo && (
                  <small>
                    Criado em {formatDate(adInfo.createdAt.toString())}
                  </small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo && <p>{adInfo.description}</p>}
                <hr />
                {adInfo && (
                  <small>
                    <strong>Visualizações: </strong>
                    {adInfo.views}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake />}
            {adInfo && adInfo.priceNegotiable && "Preço Negociável"}
            {adInfo && !adInfo?.priceNegotiable && (
              <div className="price">
                Preço: <span>{itemPrice}</span>
              </div>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo && (
            <>
              <a
                href={`mailto:${adInfo.user.email}`}
                target="_blank"
                className="contactSellerLink"
                rel="noreferrer"
              >
                Fale com o vendedor
              </a>
              <div className="box box--padding createdBy">
                <strong>{adInfo.user.name}</strong>
                <small>E-mail: {adInfo.user.email}</small>
                <small>Estado: {adInfo.state.name}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>

      <OthersArea>
        {adInfo && adInfo.otherAds && (
          <>
            <h2>Outras ofertas do vendedor:</h2>
            <div className="list">
              {adInfo.otherAds.map((ad, index) => (
                <AdItem key={index} ad={ad} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};

export default AdPage;
