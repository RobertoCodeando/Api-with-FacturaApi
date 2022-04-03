import './input.scss';
import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled, { Interpolation, ThemeProvider } from 'styled-components';
import { Box } from '../form/Form';
import { theme } from './theme';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'color' | 'name'> {
  name: string;
  color?: string;
  label?: string;
  validationRegex?: string | RegExp;
  stylesInput?: Interpolation<React.CSSProperties>;
  onValidation?: (key: string, isValid: boolean) => void;
}

export const StyledInput = styled.input<InputProps>`
    width: 100%;
    padding: 8px;
    outline: none;
    height: 100%;
    background-color: #ffffff;
    font-size: 20px;
    border: 1px solid gray;
    &:focus {
        border: 1px solid;
        border-color: ${(props) => props.theme[props.color || '']};
    }
`;

const Label = styled.label`
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 3%;
    top: 20%;
    transition: 0.3s ease all;
    ${StyledInput}:focus ~ & {
        top: -60%;
        font-size: 16px;
        opacity: 0.6;
    }
`;

export const Input: FC<InputProps> = ({
  value = '',
  label = '',
  name = '',
  validationRegex = /.*\S.*/,
  onValidation,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isValueValid, setIsValueValid] = useState(false);

  const validateRegex = useCallback(
    () => new RegExp(validationRegex),
    [validationRegex],
  );
  const colorInput = isValueValid ? 'success' : 'error';

  const handleOnChangeInternal = (e: any) => {
    setInternalValue(e.target.value);
  };

  const handleOnFocus = useCallback(() => {
    if (typeof internalValue === 'string') {
      const isValid = validateRegex().test(internalValue as string);
      setIsValueValid(isValid);
    }
  }, [internalValue, validateRegex]);

  useEffect(() => {
    handleOnFocus();
  }, [handleOnFocus]);

  useEffect(() => {
    if (onValidation && internalValue) {
      onValidation(name, isValueValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValueValid, internalValue]);

  return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box styles={{ position: 'relative', height: '40px' }}>
                    <StyledInput
                        {...props}
                        value={internalValue || ''}
                        onChange={handleOnChangeInternal}
                        onFocus={handleOnFocus}
                        color={colorInput}
                        id={name}
                        name={name}
                    />
                    <Label
                        className={`${
                          internalValue !== ''
                            ? 'label__active'
                            : 'label__inactive'
                        }`}
                    >
                        {label}
                        {props.required ? '*' : ''}
                    </Label>
                </Box>
            </Box>
        </ThemeProvider>
  );
};
