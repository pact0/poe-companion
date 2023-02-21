import { TextField } from '@mui/material';
import { SettingsManager } from '@poe-companion/settings-manager';
import { open } from '@tauri-apps/api/dialog';
import { useEffect, useState } from 'react';
import { info } from 'tauri-plugin-log-api';

export const SelectPathToFile = () => {
  const [clientTxTPath, setClientTxTPath] = useState("")
  const [productionConfigPath, setProductionConfigPath] = useState("")
  const [applicationLogsPath, setApplicationLogsPath] = useState("")

  useEffect(() => {
    SettingsManager.get("clientLog").then((clientLog) => {
      setClientTxTPath(clientLog)
    })

    SettingsManager.get("gameConfig").then((gameConfig) => {
      setProductionConfigPath(gameConfig)
    })

    SettingsManager.get("logDir").then((logDir) => {
      setApplicationLogsPath(logDir)
    })
  }, [])

  const selectClientTxTPath = async () => {
    const selected = await open({
      multiple: false,
      filters: [{
        name: 'Client',
        extensions: ['txt']
      }],
      defaultPath: clientTxTPath
    });
    if (selected !== null && !Array.isArray(selected)) {
      await SettingsManager.set("clientLog", selected)
      setProductionConfigPath(selected);
      info(`${selected}`);
    } else {
      info(`User Cancelled Selection of Client TxT`);
    }
  }

  const selectProductionConfigPath = async () => {
    const selected = await open({
      multiple: false,
      filters: [{
        name: 'production_Config',
        extensions: ['ini']
      }],
      defaultPath: productionConfigPath
    });
    if (selected !== null && !Array.isArray(selected)) {
      await SettingsManager.set("gameConfig", selected)
      setProductionConfigPath(selected);
      info(`${selected}`);
    } else {
      info(`User Cancelled Selection of Production Config`);
    }
  }

  const selectApplicationLogPath = async () => {
    const selected = await open({
      multiple: false,
      defaultPath: applicationLogsPath
    });

    if (selected !== null && !Array.isArray(selected)) {
      await SettingsManager.set("logDir", selected)
      setApplicationLogsPath(selected);
      info(`${selected}`);
    } else {
      info(`User Cancelled Selection of Application Logs`);
    }
  }

  return (
    <div>
      <TextField
        label="Client.txt"
        value={clientTxTPath}
        onClick={selectClientTxTPath}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />


      <TextField
        label="production_Config.ini"
        value={productionConfigPath}
        onClick={selectProductionConfigPath}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        label="Application Logs"
        value={applicationLogsPath}
        onClick={selectApplicationLogPath}
        margin="normal"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  )
}
