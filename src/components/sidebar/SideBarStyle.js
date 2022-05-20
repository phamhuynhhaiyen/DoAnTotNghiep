import styled from 'styled-components'

export const Wrapper = styled.div`
    position:fixed;
    top:70px;
    left:0;
    width:256px;
    padding-left: 16px;

    .menu-item{

    }
    
    a{
        color: var(--grey);
    }

    .link-name{
        padding: 12px;
        height: 48px;
        color: var(--grey);

        &.active{
            color: var(--primary-color);
        }

        &.active-separate{
            background: var(--primary-bg);
            border-radius: 12px;
            a{
                color: var(--primary-color);
            }
        }
    }

    .anticon{
        font-size: 18px;
        margin-right: 12px;
    }

    .sub-menu{
        display:flex;
        gap: 10px;
        margin-left: 1.4rem;

        &__item{
            width: 92%;
        }

        li{
            color: var(--grey);
            height: 48px;
            padding: 16px;

            &.active{
                background: var(--primary-bg);
                color: var(--primary-color);
                border-radius: 12px;

                a{
                    color: var(--primary-color);
                }
            }
        }
    }

    .line{
        width: 2px;
        background-color: var(--secondary-bg)
    }
`