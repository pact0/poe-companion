import { Collapse, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { SettingsManager } from "@poe-companion/settings-manager";
import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import { watch } from "tauri-plugin-fs-watch-api";
import { Header } from "./Header";

const Listings = () => {
  const [messages, setMessages] = useState<any[]>([])

  const listenToStorage = async () => {
    const clientLogPath = await SettingsManager.get("clientLog");
    // const re = /@From (<(?P<guild>.*)>)?\s?(?P<name>\w*): (\w*)(.*)")/
    const re = /@From (<(?<guild>.*)>)?\s?(?<name>\w*): (?<msg>.*)/u

    const reStash = /\(stash tab "(?<stash_name>(\w*\s?)*)"; position: left (?<left>\d*), top (?<top>\d*)\)/u
    const reMSG = /Hi, (I'd|I would) like to buy your\s(?<amount>\d*\s)?(?<item>(\w*\s)*)(listed )?for (my\s)?(?<buy_for>\d*) (?<buy_curr>(\w*\s*)*)in (?<league>(\w*\s?)*)(\.?)/u


    const path = "/home/pacto/Downloads/test.txt";

    const stopRawWatcher = await watch(
      [path],
      { delayMs: 1000 },
      async (event) => {

        const contents: String = await invoke("get_file", { filename: clientLogPath });
        const lines = contents.split('\n').slice(500, 600).map((l: string) => {

          const a = re.exec(l);

          if (a && a.groups) return a.groups
        })
        const b = lines.filter(e => e).map((i) => {
          return { ...i }
        })

        if (b) setMessages(b)
        // console.log(lines)
      })
  }

  useEffect(() => {
    listenToStorage();
  }, [])

  const b = {
    "SrMoacir": [{ guild: undefined, name: "SrMoacir", msg: "Hi, I would like to buy your Astramentis Onyx Amul…hnemesis (stash tab \"\"; position: left 12, top 4)" }, { guild: undefined, name: "SrMoacir", msg: "Hi, I would like to buy your Astramentis Onyx Amul…hnemesis (stash tab \"\"; position: left 12, top 4)" }, { guild: undefined, name: "SrMoacir", msg: "Hi, I would like to buy your Astramentis Onyx Amul…hnemesis (stash tab \"\"; position: left 12, top 4)" }],
    "ПЫЩПЫЩ": [{ guild: "DUrka", name: "ПЫЩПЫЩ", msg: "Hi, I'd like to buy your 1 Mirror Shard for my 20 Exalted Orb in Standard." }]
  }


  const groupItemsByName = messages.reduce((acc: any, curr: any) => {
    acc[curr.name] = [...(acc[curr.name] || []), curr];
    return acc;
  }, {});

  console.log(groupItemsByName);

  return (
    <List>
      {/* {Object.entries(groupItemsByName).map(([name, items]) => ( */}
      {Object.entries(b).map(([name, items]) => (
        <React.Fragment key={name}>

          <Header item={{ name: name, items: items }} />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Listings;

