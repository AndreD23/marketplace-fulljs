import styled from "styled-components";

interface FakeProps {
  height?: number;
}

export const Fake = styled.div<FakeProps>`
  background-color: #ddd;
  height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
  display: flex;

  .box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #999;
    margin-bottom: 20px;
  }

  .box--padding {
    padding: 10px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;

    .adImage {
    }

    .adInfo {
      padding: 10px;

      .adName {
        margin-bottom: 20px;
      }

      .adDescription {
      }
    }

    .adDescription {
    }
  }

  .rightSide {
    width: 250px;
  }
`;
