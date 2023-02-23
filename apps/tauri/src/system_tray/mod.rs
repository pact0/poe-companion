use tauri::{Manager, SystemTrayEvent};

pub fn setup_system_tray() -> tauri::SystemTray {
    let quit = tauri::CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = tauri::CustomMenuItem::new("hide".to_string(), "Hide");

    let tray_menu = tauri::SystemTrayMenu::new()
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(quit);

    tauri::SystemTray::new().with_menu(tray_menu)
}

pub fn on_system_tray_event(app: &tauri::AppHandle, event: tauri::SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a left click");
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            println!("{}", id);
            match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                    item_handle.set_title("Show").unwrap();
                    item_handle.set_enabled(false).unwrap();
                    println!("hide {}", id);
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    item_handle.set_title("Hide").unwrap();
                    println!("show {}", id);
                }
                _ => {}
            }
        }
        _ => {}
    }
}
