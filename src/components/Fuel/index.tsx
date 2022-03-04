import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { getFuel } from './services';
import {
  Box,
  Container,
  FuelPrice,
  FuelText,
  InfoText,
  Panel,
  Row,
  SaveButton,
  SaveIcon,
  SettingsIcons,
  Title,
} from './styles';
import { FuelComponentProps, IFuel } from './types';

export const FuelComponent = ({
  editMode,
  toggleEditMode,
}: FuelComponentProps) => {
  const [fuels, setFuels] = useState<IFuel[]>();

  async function fetchAndUpdateData() {
    const data = await getFuel();

    setFuels(data);
  }

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  return (
    <Container>
      <Title>Posto React JS</Title>
      <SettingsIcons onClick={toggleEditMode} />

      <Panel>
        {editMode && (
          <Row>
            <InfoText>
              <FiEdit2 />
              Altere o preço do item e salve
            </InfoText>
          </Row>
        )}
        {fuels?.map((fuel) => (
          <Row key={fuel.id}>
            <Box>
              <FuelText>{fuel.name}</FuelText>
            </Box>
            <Box>
              <FuelPrice>{fuel.price}</FuelPrice>
            </Box>
          </Row>
        ))}
        {editMode && (
          <Row>
            <SaveButton>
              <SaveIcon />
              <span>Save</span>
            </SaveButton>
          </Row>
        )}
      </Panel>
    </Container>
  );
};
