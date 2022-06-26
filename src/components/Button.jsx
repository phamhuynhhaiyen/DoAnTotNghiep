import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = props => {

    return (
        <ButtonWrapper
            secondaryStyle={props.secondaryStyle}
            height={props.height}
            className='btn'
            disabled={props.disabled}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </ButtonWrapper>
    )
}

Button.propTypes = {
    secondaryStyle: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    height: PropTypes.number
}

export default Button

const ButtonWrapper = styled.button`
    background: ${props => props.secondaryStyle ? `#fff` : `var(--primary-color)`};
    border-radius: 12px;
    border: ${props => props.secondaryStyle ? `#CECECE` : `var(--primary-color)`} 1.4px solid;
    height: ${props => props.height ? props.height : "48px"};
    font-weight: 700;
    color: ${props => props.secondaryStyle ? `var(--grey)` : `#fff`};
    text-transform: uppercase;
    width:180px ;
    cursor: pointer;

    &:disabled{
        opacity:0.5;
        cursor: not-allowed;
    }
`
