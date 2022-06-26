import styled from 'styled-components'

export const Wrapper = styled.div`
    display: ${props => props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    .modal{
        width: 672px;
        background-color: #fff;
        border-radius: 12px;
        
        &-header{
            padding: 2rem;
            display: flex;
            justify-content:space-between;
            font-size: 16px;
            border-bottom: 1px solid var(--primary-bg);

            .title{
                font-weight: 600;
            }
            .close{
                color: var(--light-grey);
                cursor: pointer;
            }
        }

        &-body{
            padding: 2rem;

            .input-group{
                margin-bottom: 16px;

                p{
                    margin-bottom: 9px;
                }

                input{
                    border: var(--primary-bg) 1px solid;
                    border-radius: 12px;
                    height: 48px;
                    width: 100%;
                    padding:16px;
                }
            }

            section{
                height:120px;
                width:100%;
                border: var(--primary-bg) 1px solid;
                border-radius: 12px;
                padding:12px;

                .dropzone{
                    border: var(--primary-bg) 1px dashed;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content:center;
                    align-items:center;
                    color: var(--grey);
                    cursor: pointer;
                    border-radius: 12px;

                    .anticon{
                        font-size: 30px;
                        color: var(--primary-color);
                    }
                    p{
                        margin-top: 16px;
                    }
                }
                .file-container{
                    border: var(--primary-bg) 1px dashed;
                    height: 100%;
                    border-radius: 12px;
                    color: var(--grey);
                    
                    .close-file{
                        display: flex;
                        flex-direction: row-reverse;
                        margin: 0.75rem;
                        cursor: pointer;
                    }
                    .file{
                        width: 100%;
                        text-align: center;
                    }
                }
            }

        }

        &-footer{
            border-top: 1px solid var(--primary-bg);
            padding: 2rem;
            display: flex;
            gap: 2rem;
            justify-content:center;
        }


        

    }


    .progress-bar{
        height: 20px;
        width: 100%;
        background: var(--primary-bg);
        border-radius: 8px;
    }
`