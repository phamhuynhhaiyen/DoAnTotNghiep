import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const CheckBox = props => {
    
    const inputRef = React.useRef(null)

    const onChange = () => {
        if(props.onChange){
            props.onChange(inputRef.current)
        }
    }

    return (
        <Label>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked}/>
            <span className="checkmark">
                <img src={props.img}/>
            </span>
            {props.label}
        </Label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    img: PropTypes.string
}

export default CheckBox

const Label = styled.label`
    display:flex;
    align-items:center;
    cursor: pointer;
    /* &:hover{
        color: var(--primary-color);
    } */

    input{
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        cursor: pointer;
    }

    .checkmark{
        margin-right: 10px;
        height: 15px;
        width: 15px;
        border: 1px solid #CDCDCD;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            transform: scale(0);
            transition: transform 0.3s ease;
        }
    }
    
    input:checked ~ .checkmark{
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        color: #fff;


        img{
            transform: scale(0.75);
            
        }
    }
`
