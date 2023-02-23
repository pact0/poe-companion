use log::{info, trace};
use rdev::{listen, Event};
use tauri::{App, Manager};

fn callback(event: Event, win: &mut tauri::Window) {
    // println!("My callback {:?}", event);
    match event.name {
        Some(string) => info!(
            "User wrote {:?} window is visible {}",
            string,
            win.inner_position().unwrap().x
        ),
        None => (),
    }
}

pub fn setup(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    let main_window = app_handle.get_window("main").unwrap();
    //
    let inner_position = main_window.inner_position().unwrap();
    info!(
        "Window inner positrion x:{} y:{}",
        inner_position.x, inner_position.y
    );
    //
    let inner_size = main_window.inner_size().unwrap();
    // info!("Window inner size {}", inner_size.to_logical(1.0).width);

    let appdir = app.handle().path_resolver().app_config_dir().unwrap();
    let logdir = app.handle().path_resolver().app_log_dir().unwrap();
    let inner_position = main_window.inner_position().unwrap();
    let cursor_position = main_window.inner_position().unwrap();
    info!(
        "Appdir: {} | LogDir: {}",
        appdir.to_path_buf().display(),
        logdir.to_path_buf().display()
    );

    let mouse_handle = std::thread::spawn(move || loop {
        let mut main_window_handle = app_handle.get_window("main").unwrap();

        if let Err(error) = listen(move |event: Event| callback(event, &mut main_window_handle)) {
            print!("YAYAYYA {:?}", error)
        }
    });

    // let docs_window = tauri::WindowBuilder::new(
    //     app,
    //     "external", /* the unique window label */
    //     tauri::WindowUrl::External("https://forbiddentrove.com/".parse().unwrap()),
    // )
    // .build()?;
    trace!("Starting app.");

    Ok(())
}
