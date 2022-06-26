import React from 'react'
import styled from 'styled-components'

const Loading = () => {
    return (
        <Wrapper>
            <div className="lds">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Wrapper>
    )
}

export default Loading

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .lds{
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;

        div{
            display: inline-block;
            position: absolute;
            left: 8px;
            width: 16px;
            background: var(--primary-color);
            animation: lds 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

            &:nth-child(1) {
                left: 8px;
                animation-delay: -0.24s;
            }
            &:nth-child(2) {
                left: 32px;
                animation-delay: -0.12s;
            }
            &:nth-child(3) {
                left: 56px;
                animation-delay: 0;
            }
        }
        @keyframes lds {
            0% {
            top: 8px;
            height: 64px;
            }
            50%, 100% {
            top: 24px;
            height: 32px;
            }
        }
    }
`