import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import Button from '../button/Button';
import './feather.css';

export type IconProp = {
  iconCode?: string;
  className?: string;
  color?: string;
  size?: number;
  style?: {};
};

export const Icon: FC<IconProp> = ({
  iconCode = '',
  color = '',
  size = 20,
  className = '',
  style = {},
}) => (
  <i
    className={`icons ${className} ${iconCode}`}
    style={{ fontSize: size, color, ...style }}
  />
);

export interface IconButtonProps
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  iconProps: IconProp;
}

export const IconButton: FC<IconButtonProps> = ({ iconProps, ...props }) => (
  <Button styles={{ cursor: 'pointer' }} {...props}>
    <>
      <Icon {...iconProps} />
    </>
  </Button>
);
