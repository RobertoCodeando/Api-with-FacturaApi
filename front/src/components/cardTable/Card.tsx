import './card.scss';
import { Box } from '../form/Form';
import { TextGeneric, Title } from '../titles/Titles';

const Card = ({ title = '', text = '' }: { title: string; text?: string }) => {
  return (
        <Box
            styles={{
              width: '100%',
              marginTop: '1rem',
              textAlign: 'left',
            }}
        >
            <Title
                styles={{
                  color: 'inherit',
                  fontWeight: 700,
                  fontSize: '20px',
                  display: 'inline-flex',
                }}
            >
                {title}:
                <TextGeneric
                    styles={{
                      fontSize: '16px',
                      padding: '0 0 0 0.5rem',
                      marginTop: '0.25rem',
                      color: 'black',
                    }}
                >
                    {text}
                </TextGeneric>
            </Title>
        </Box>
  );
};

export default Card;
