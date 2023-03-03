// #![warn(missing_debug_implementations, missing_docs)]
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
mod file;
mod system_tray;

use std::io::{BufRead, BufReader};
use tauri::{regex::Regex, Manager};
use tauri_plugin_log::LogTarget;

use crate::{
    app::setup,
    system_tray::{on_system_tray_event, setup_system_tray},
};

#[tauri::command]
fn get_file(filename: String) -> String {
    let file = std::fs::File::open(filename).expect("Failed to open file");
    let reader = BufReader::new(file);

    // Define a regular expression to match against
    let re = Regex::new(r"@From").unwrap();

    // Create a new string to hold the matched lines
    let mut matched_lines = String::new();

    // Loop over each line in the file
    for line in reader.lines() {
        let unwrapped_line = line.unwrap();
        if re.is_match(&unwrapped_line) {
            matched_lines.push_str(unwrapped_line.as_str());
            matched_lines.push_str("\n");
        }
    }

    return matched_lines.into();
}

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
        .invoke_handler(tauri::generate_handler![get_file])
        .system_tray(setup_system_tray())
        .on_system_tray_event(on_system_tray_event)
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(file::init())
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
