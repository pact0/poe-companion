import "@poe-companion/translations"
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import { trace, info, error, attachConsole } from "tauri-plugin-log-api";
import { core } from "@poe-companion/core"
import { useTranslation } from 'react-i18next';

export function App() {
  const { t, i18n } = useTranslation();
  core();

  const doStuff = async () => {

    const yes = await ask('Are you sure?', 'Tauri');
    const yes2 = await ask('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    const confirmed = await confirm('Are you sure?', 'Tauri');
    const confirmed2 = await confirm('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    info(`${yes}, ${yes2} ${confirmed} ${confirmed2}`);

    const selected = await open({
      multiple: true,
      filters: [{
        name: 'Image',
        extensions: ['png', 'jpeg']
      }]
    });
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
    info(`${selected}`);

    info("A");
  }

  const changeL = () => {
    i18n.changeLanguage("pl")
  }

  return (
    <>
      {t("title")}
      <p>{t('title', { name: 'John' })}</p>
      <p>{t('description.part1')}</p>
      <p>{t('description.part2')}</p>
      <button onClick={doStuff}>Click</button>
      <button onClick={changeL}>Change to pl</button>
    </>
  );
}

export default App;
