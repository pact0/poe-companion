import { FormControl, NativeSelect } from '@mui/material';
import { SettingsManager } from '@poe-companion/settings-manager';
import { supportedLanguages } from '@poe-companion/translations';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LangugeSelector = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = async (event: any) => {
    const locale = event.target.value
    setLanguage(locale);
    i18n.changeLanguage(locale);
    await SettingsManager.set("language", locale)

  };

  useEffect(() => {
    SettingsManager.get("language").then((language) => {
      console.log("language", language)

      setLanguage(language);
      i18n.changeLanguage(language);
    })
  }, [])

  return (
    <div>
      {t("choose_language")}
      <FormControl>
        <NativeSelect
          value={language}
          onChange={handleLanguageChange}
          inputProps={{
            name: 'option',
            id: 'dropdown-native',
          }}
        >
          {supportedLanguages.map((language) => {
            return <option value={language.locale}>{language.name}</option>
          })}
        </NativeSelect>
      </FormControl>
    </div>
  )
}
