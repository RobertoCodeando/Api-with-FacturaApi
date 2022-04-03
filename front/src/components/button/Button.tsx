import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { StylesCSS } from '../table/Table';

type ButtonType = 'icon' | 'primary' | 'secondary';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: StylesCSS;
  stylesButton?: StylesCSS;
  buttonType?: ButtonType;
}
const BUTTON_STYLES = {
  primary: {
    width: '10rem',
    borderRadius: 'unset',
    background: '#50B4D8',
    color: '#1f1f21',
  },
  icon: {
    borderRadius: '50%',
    width: '2rem',
    background: '',
    color: '',
  },
  secondary: {
    width: '10rem',
    borderRadius: 'unset',
    background: '#018571',
    color: '#1f1f21',
  },
};

const StyledButton = styled.button<ButtonProps>`
    all: unset;
    cursor: pointer;
    border-radius: ${({ buttonType = 'icon' }) => BUTTON_STYLES[buttonType].borderRadius};
    width: ${({ buttonType = 'icon' }) => BUTTON_STYLES[buttonType].width};
    background: ${({ buttonType = 'icon' }) => BUTTON_STYLES[buttonType].background};
    color: ${({ buttonType = 'icon' }) => BUTTON_STYLES[buttonType].color};
    height: 2rem;
    box-shadow: 0 0 0px #3fbdbc;
    &:active {
        box-shadow: 0 0 10px #3fbdbc;
        transition-duration: 0.05s;
    }
    ${({ styles }) => styles},
`;

const Button: FC<ButtonProps> = ({ ...props }) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Button;
