import styled from 'styled-components'

export const Wrapper = styled.nav`
    display: flex;
    gap: 24px;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    padding:16px;

    .nav-left{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 240px;

        img{
            width:140px;
            height:31px;
        }

        .menu-bar{
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: var(--primary-bg);
            color: var(--primary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

    .nav-right{
        width: calc(100% - 240px);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav-tool{
        display: flex;
        align-items: center;
        gap:16px;

        .nav-item{
            display: flex;
            align-items: center;
            gap:8px;
            cursor: pointer;

            &__icon{
                font-size:18px;
                color: var(--secondary-color);
                width: 32px;
                height: 32px;
                border-radius:8px;
                border: var(--secondary-bg) 1px solid;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            p{
                font-weight: 500;
            }
        }
    }

    .nav-user{
        width: 100px;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 6px;
        border-radius:27px;
        border: solid 1px var(--secondary-bg);
        cursor: pointer;
        font-size: 18px;
        color: var(--secondary-color);
        margin-left: 2rem;

        img{
            width: 32px;
            height: 32px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
`