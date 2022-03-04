import { useEffect, useState } from 'react';
import { getFuel } from './services';
import {
  Box,
  Container,
  FuelPrice,
  FuelText,
  Panel,
  Row,
  SettingsIcons,
  Title,
} from './styles';
import { IFuel } from './types';

export const FuelComponent = () => {
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
      <SettingsIcons />
      <Panel>
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
      </Panel>
    </Container>
  );
};
