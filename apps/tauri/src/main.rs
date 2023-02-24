// #![warn(missing_debug_implementations, missing_docs)]
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
mod system_tray;

use tauri::Manager;
use tauri_plugin_log::LogTarget;

use crate::{
    app::setup,
    system_tray::{on_system_tray_event, setup_system_tray},
};

fn main() {
    // let log_path = std::path::PathBuf::from("/home/pacto/work/poe-companion/logs");

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([
                    LogTarget::LogDir,
                    LogTarget::Stdout,
                    // LogTarget::Folder(log_path),
                ])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![])
        .system_tray(setup_system_tray())
        .on_system_tray_event(on_system_tray_event)
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(setup)
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app, event| {
            let app_handle = app.app_handle();
            let main_window = app_handle.get_window("main");

            // if let RunEvent::WindowEvent { label, event, .. } = event {
            //     info!("{} {:?}", label, event);
            // }
            // not_windows_main();
        });
}
