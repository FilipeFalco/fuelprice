import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { getFuel, updateFuel } from './services';
import {
  Box,
  Container,
  FuelInput,
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
import { FuelComponentProps, IFuel, IFuelState } from './types';

const TIME_TO_UPDATE_MS = 1000;

export const FuelComponent = ({
  editMode,
  toggleEditMode,
}: FuelComponentProps) => {
  const [fuels, setFuels] = useState<IFuelState[]>();

  async function fetchAndUpdateData() {
    const data = await getFuel();

    setFuels(data);
  }

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  useEffect(() => {
    if (editMode) return;

    const intervalId = setInterval(() => {
      fetchAndUpdateData();
    }, TIME_TO_UPDATE_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [editMode]);

  function onUpdatePrice(fuelId: number, price: string) {
    const updatedFuels = fuels?.map((fuel) => {
      if (fuel.id === fuelId) {
        fuel.price = Number(price);
        fuel.updated = true;
      }
      return fuel;
    });

    setFuels(updatedFuels);
  }

  async function onSave() {
    const changed = fuels?.filter((f) => f.updated);

    if (!changed || changed.length === 0) {
      toggleEditMode();
      return;
    }

    for (const changedFuel of changed) {
      const { updated, ...rest } = changedFuel;
      await updateFuel(rest);
    }

    fetchAndUpdateData();
    toggleEditMode();
  }

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
              {editMode ? (
                <FuelInput
                  type='number'
                  value={fuel.price}
                  onChange={(ev) => onUpdatePrice(fuel.id, ev.target.value)}
                />
              ) : (
                <FuelPrice>{fuel.price}</FuelPrice>
              )}
            </Box>
          </Row>
        ))}
        {editMode && (
          <Row>
            <SaveButton onClick={onSave}>
              <SaveIcon />
              <span>Save</span>
            </SaveButton>
          </Row>
        )}
      </Panel>
    </Container>
  );
};
