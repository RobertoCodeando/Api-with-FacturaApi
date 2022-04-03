import styled, { CSSObject } from 'styled-components';

export const Title = styled.h3<{ styles?: CSSObject }>`
    font-size: ${({ styles }) => styles?.fontSize ?? '18px'};
    color: ${(styles) => styles?.color ?? '#6f6f6f'};
    margin: 0;
    ${({ styles }) => styles}
`;

export const TextGeneric = styled.p<{ styles?: CSSObject }>`
    margin: 0;
    ${({ styles }) => styles}
`;
