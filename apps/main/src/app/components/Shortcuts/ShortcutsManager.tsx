import { Shortcut } from './Shortcut';
import { writeText, readText } from '@tauri-apps/api/clipboard';




export const ShortcutsManager = () => {

  async function call() {
    console.log("Call")
    await writeText('Test clipboard');
  }

  return (
    <div>
      <Shortcut shortcutName={"Msg with"} callbackOnUse={call} />
      <Shortcut shortcutName={"Msg with"} callbackOnUse={call} />
    </div>
  )
}
