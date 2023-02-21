import { TextField } from '@mui/material';
import React, { useState } from 'react';

export const ShortcutsManager = (props: {}) => {
  const [hotkey, setHotkey] = useState('Ctrl+Alt+Del');

  const handleHotkeyChange = (event: any) => {
    setHotkey(event.target.value);
  };

  const handleHotkeyKeyPress = (event: any) => {
    event.preventDefault(); // prevent default browser behavior
    const hotkey = getHotkeyFromEvent(event);
    if (hotkey) {
      setHotkey(hotkey);
    }
  };

  const getHotkeyFromEvent = (event: any) => {
    const key = event.key;
    const ctrlKey = event.ctrlKey || event.metaKey;
    const altKey = event.altKey;
    const shiftKey = event.shiftKey;
    if (key === 'Control' || key === 'Meta' || key === 'Shift' || key === 'Alt') {
      return null; // ignore control/meta/shift/alt key press
    }
    if (key === ' ') {
      return 'Space'; // use "Space" instead of spacebar key
    }
    if (key && (ctrlKey || altKey || shiftKey)) {
      const modifiers = [];
      if (ctrlKey) modifiers.push('Ctrl');
      if (altKey) modifiers.push('Alt');
      if (shiftKey) modifiers.push('Shift');
      const hotkey = modifiers.join('+') + (modifiers.length > 0 ? '+' : '') + key;
      return hotkey;
    }
    return null;
  };

  return (
    <div>
      <TextField
        label="Show app hotkey"
        value={`${hotkey}`}
        onKeyDown={handleHotkeyKeyPress}
        onChange={handleHotkeyChange}
        margin="normal"
        variant="outlined"
        style={{ caretColor: "transparent", userSelect: "none" }}
      />
    </div>
  )
}
