import * as React from 'react';
import { ToggleButton } from 'react-native-paper';

const Toggle = () => {
  const [order, setOrder] = React.useState('order');

  return (
    <ToggleButton.Row
      onValueChange={order => setOrder(order)}
      value={order}
      style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 10}}
      >
      <ToggleButton icon="arrow-up" value="asc" style={{ height: 30, widht: 10}}/>
      <ToggleButton icon="arrow-down" value="desc" style={{ height: 30, widht: 10}}/>
    </ToggleButton.Row>
  );
};

export default Toggle;