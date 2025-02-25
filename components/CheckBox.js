import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setChecked(!checked)} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: checked ? '#0057ff' : 'transparent',
      }}>
        {checked && <Text style={{ color: 'white' }}>✔</Text>}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
