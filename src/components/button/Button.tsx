import { ReactNode } from "react";

import './Button.css';

interface IButton {
    text: string;
    style: string;    
    disabled?: boolean;
    children?: ReactNode;
    handleClick(): void;
}

const Button: React.FC<IButton> = (props) => {
    return (
        <button 
            onClick={props.handleClick} 
            className={props.style} 
            disabled={props.disabled}
        >
            { props.text }
            {
                props.children &&
                props.children
            }
        </button>
    )
}

export default Button;