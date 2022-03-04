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

export const FuelComponent = () => {
  return (
    <Container>
      <Title>Posto React JS</Title>
      <SettingsIcons />
      <Panel>
        <Row>
          <Box>
            <FuelText>Gasolina Comum</FuelText>
          </Box>
          <Box>
            <FuelPrice>4,59</FuelPrice>
          </Box>
        </Row>
        <Row>
          <Box>
            <FuelText>Gasolina Comum</FuelText>
          </Box>
          <Box>
            <FuelPrice>4,59</FuelPrice>
          </Box>
        </Row>
        <Row>
          <Box>
            <FuelText>Gasolina Comum</FuelText>
          </Box>
          <Box>
            <FuelPrice>4,59</FuelPrice>
          </Box>
        </Row>
      </Panel>
    </Container>
  );
};
