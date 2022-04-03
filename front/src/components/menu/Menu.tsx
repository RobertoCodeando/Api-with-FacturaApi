import {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { Link, useNavigate } from '@tanstack/react-location';
import styled from 'styled-components';
import { useWindowSize } from '../../helper/useWindowSize';
import { Title } from '../titles/Titles';

const StyledMenu = styled.nav<{ open: boolean }>`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #111e80;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 768px) {
        width: 100%;
        position: absolute;
    }

    a,
    h3 {
        font-size: 1.3rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: white;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
            font-size: 1.5rem;
            text-align: center;
        }

        &:hover {
            color: white;
        }
    }
`;

const MenuStyled: React.FC<{ open: boolean }> = ({ open }) => {
  const navigate = useNavigate();
  return (
    <StyledMenu open={open}>
      <Link to="/users/create">Crear usuario</Link>
      <Link to="/users">Lista de usuarios</Link>
      <a href="https://www.facturapi.io/contact" target="blank">
        Contacto
      </a>
      <Title
        onClick={() => {
          localStorage.removeItem('token');
          navigate({ to: '/', replace: true });
        }}
      >
        Cerrar Sesión
      </Title>
    </StyledMenu>
  );
};

const StyledBurger = styled.button<any>`
    position: absolute;
    top: 5%;
    left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
        outline: none;
    }

    @media (max-width: 768px) {
        top: 1%;
        position: absolute;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: #0D0C1D;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }

        :nth-child(2) {
            opacity: ${({ open }) => (open ? '0' : '1')};
            transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
        }

        :nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

function Burger({ open, setOpen }: any) {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}

function Menu() {
  const [open, setOpen] = useState(false);
  const refP = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback((event: any) => {
    if (refP.current && !refP.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }, []);

  const [width] = useWindowSize();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return (
    <>
      {width <= 768 ? (
        <div ref={refP}>
          <Burger open={open} setOpen={setOpen} />
          <MenuStyled open={open} />
        </div>
      ) : (
        <MenuStyled open />
      )}
    </>
  );
}

export default Menu;
