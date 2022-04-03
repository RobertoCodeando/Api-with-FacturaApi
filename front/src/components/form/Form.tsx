import React, { FC, useRef, useState } from 'react';
import styled, { CSSObject, Interpolation } from 'styled-components';
import { useToast } from '@chakra-ui/react';
import Button, { ButtonProps } from '../button/Button';
import { InputProps, Input } from '../Input/Input';
import { PARSE_INPUT } from '../../constants';
import { TextGeneric, Title } from '../titles/Titles';

type BoxProps = {
  styles?: Interpolation<React.CSSProperties>;
};

export const Box = styled.div<BoxProps>`
    ${({ styles }) => styles},
`;

type FormProps = BoxProps & {
  name: string;
  inputs: Array<InputProps>;
  buttons?: Array<ButtonProps>;
  stylesButtonContainer?: Interpolation<React.CSSProperties>;
  onSubmit: (x: any) => any;
};

const errorsInput = (filter: Array<string>) => (
  <>
    <Title styles={{ color: 'white', fontSize: '14px' }}>
      {' '}
      Asgúrate que estos campos sean válidos:
      {' '}
    </Title>
    {filter.map((key: string) => (
      <Box>
        <TextGeneric>{(PARSE_INPUT as any)[key]}</TextGeneric>
      </Box>
    ))}
  </>
);

const Form: FC<FormProps> = ({
  name,
  styles,
  inputs,
  buttons,
  stylesButtonContainer,
  onSubmit,
}) => {
  const formRef = useRef(null);
  const [validatedFields, setValidatedFields] = useState<
  Record<string, string | number | boolean | undefined>
  >({});
  const toast = useToast();

  const validateInputByKey = (key: string, isValid: boolean) => {
    if (validatedFields) {
      const newValidFromInputs = JSON.parse(
        JSON.stringify(validatedFields),
      );
      newValidFromInputs[key] = isValid;
      setValidatedFields(newValidFromInputs);
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formRef.current
            && !Object.values(validatedFields).includes(false)
    ) {
      const formElements = new FormData(formRef.current);
      const formData = inputs.reduce((data, input) => {
        if (input.name) {
          data[input.name] = formElements.get(input.name) as string;
        }
        return data;
      }, {} as any);

      return onSubmit(formData);
    }

    const filterIputs = Object.keys(validatedFields).filter(
      (isValid) => !validatedFields[isValid],
    );

    toast({
      title: errorsInput(filterIputs),
      status: 'error',
      position: 'top-right',
    });
  };

  return (
    <form ref={formRef} id={name} name={name} onSubmit={onSubmitHandler}>
      <Box styles={styles}>
        {inputs?.map((input, index) => (
          <Box styles={input.stylesInput} key={index}>
            <Input
              label={input.label}
              onValidation={validateInputByKey}
              {...input}
            />
          </Box>
        ))}
      </Box>
      <Box styles={{ ...(stylesButtonContainer as CSSObject) }}>
        {buttons?.map((button, index) => (
          <Box styles={button.stylesButton} key={index}>
            <Button {...button} />
          </Box>
        ))}
      </Box>
    </form>
  );
};

export default Form;
