import styled from "styled-components";

export const Wrapper = styled.div`
    display: ${props => props.isVisible ? 'initial' : 'none'};
    width: 100% ;
    height: 100% ;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;

    .header{
        height: 70px;
        display: flex;
        align-items: center;
        padding: 16px;
        gap:26px;

        span{
            font-size:22px;
            cursor: pointer;
            color: var(--primary-color);
        }
        .title{
            font-size:20px;
            text-transform:uppercase;
        }
    }

    .body{
        margin: 16px;
        padding: 16px;
        margin-top: 0;
        height: calc(100vh - 86px);
        border-radius: 12px;
        background-color: var(--secondary-bg);

        .container{
            background: #fff;
            border-radius: 12px;
            height: 100%;
            padding: 16px;
        }
    }
`
export const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  .btn-excel{
    background: #1D6F42;
    border-radius: 12px;
    border: #1D6F42 1.4px solid;
    height: 48px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    width: 180px;
    margin-right: 10px;
    position: relative;

    input[type="file"]{
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        opacity: 0
    }
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`