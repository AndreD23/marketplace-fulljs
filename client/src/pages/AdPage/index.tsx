import { useParams } from "react-router-dom";
import { useState } from "react";
import { IAd } from "../../types/ad";
import { PageContainer } from "../../components/MainComponents";
import { Fake, PageArea } from "./styled";

const AdPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState<IAd | null>(null);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">{loading && <Fake height={300} />}</div>
            <div className="adInfo">
              <div className="adName">{loading && <Fake />}</div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">{loading && <Fake />}</div>
          <div className="box box--padding">
            {loading && <Fake height={50} />}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default AdPage;
