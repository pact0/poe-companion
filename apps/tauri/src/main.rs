// #![warn(missing_debug_implementations, missing_docs)]
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use inputbot::{KeybdKey::*, MouseButton::*, *};
// use std::{thread, time};
// use std::{thread::sleep, time::Duration};

use log::{error, info, trace, warn};
use rdev::{listen, Event};
use sysinfo::{NetworkExt, NetworksExt, ProcessExt, System, SystemExt};
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu};
use tauri::{RunEvent, State};
use tauri_plugin_log::LogTarget;

use file_watcher::hosting;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_docs(handle: tauri::AppHandle) {
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        "docs", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
    )
    .build()
    .unwrap();
}

#[cfg(not(target_os = "windows"))]
fn not_windows_main() -> notify::Result<()> {
    use notify::{Config, PollWatcher, RecursiveMode, Watcher};
    use std::path::Path;
    use std::time::Duration;

    let mut paths: Vec<_> = std::env::args()
        .skip(1)
        .map(|arg| Path::new(&arg).to_path_buf())
        .collect();
    if paths.is_empty() {
        let lo_stats = Path::new("/sys/class/net/lo/statistics/tx_bytes").to_path_buf();
        if !lo_stats.exists() {
            eprintln!("Must provide path to watch, default system path was not found (probably you're not running on Linux?)");
            std::process::exit(1);
        }
        println!(
            "Trying {:?}, use `ping localhost` to see changes!",
            lo_stats
        );
        paths.push(lo_stats);
    }

    println!("watching {:?}...", paths);
    // configure pollwatcher backend
    let config = Config::default()
        .with_compare_contents(true) // crucial part for pseudo filesystems
        .with_poll_interval(Duration::from_secs(2));
    let (tx, rx) = std::sync::mpsc::channel();
    // create pollwatcher backend
    let mut watcher = PollWatcher::new(tx, config)?;
    for path in paths {
        // watch all paths
        watcher.watch(&path, RecursiveMode::Recursive)?;
    }
    // print all events, never returns
    for res in rx {
        match res {
            Ok(event) => println!("changed: {:?}", event),
            Err(e) => println!("watch error: {:?}", e),
        }
    }

    Ok(())
}

fn main() {
    // if let Err(error) = listen(callback) {
    //     println!("Error: {:?}", error)
    // }
    //
    // fn callback(event: Event) {
    //     println!("My callback {:?}", event);
    //     match event.name {
    //         Some(string) => println!("User wrote {:?}", string),
    //         None => (),
    //     }
    // }
    // hosting::add_to_waitlist();
    let tray_menu = SystemTrayMenu::new(); // insert the menu items here
    let system_tray = SystemTray::new().with_menu(tray_menu);

    let log_path = std::path::PathBuf::from("/home/pacto/work/poe-companion/logs");

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([
                    LogTarget::LogDir,
                    LogTarget::Stdout,
                    LogTarget::Folder(log_path),
                ])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet, open_docs])
        .system_tray(system_tray)
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            // let docs_window = tauri::WindowBuilder::new(
            //     app,
            //     "external", /* the unique window label */
            //     tauri::WindowUrl::External("https://forbiddentrove.com/".parse().unwrap()),
            // )
            // .build()?;
            trace!("Starting app.");

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|_app, event| {
            // if let RunEvent::WindowEvent { label, event, .. } = event {
            //     info!("{} {:?}", label, event);
            // }
            // not_windows_main();
        });
}
