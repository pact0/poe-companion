use log::{info, trace};
use rdev::{listen, Event, EventType};
use tauri::{App, Manager};

fn callback(event: Event, win: &mut tauri::Window) {
    // println!("My callback {:?}", event);

    let win_size = win.inner_size().unwrap();
    let win_w = win_size.width;
    let win_h = win_size.height;
    let inner_position = win.inner_position().unwrap();

    let inner_x_top_left = inner_position.x;
    let inner_y_top_left = inner_position.y;

    let inner_x_top_right = inner_position.x + win_w as i32;
    let inner_y_bottom_left = inner_position.y - win_h as i32;

    let outer_position = win.outer_position().unwrap();
    let outer_x = outer_position.x;
    let outer_y = outer_position.y;

    match event.event_type {
        EventType::MouseMove { x, y } => {
            if (x > inner_x_top_left as f64
                && x < (inner_x_top_left as f64 + win_w as f64)
                && y > inner_y_top_left as f64
                && y < (inner_y_top_left as f64 + win_h as f64 - 100.))
            {
                // println!("INSIDE");
                win.set_ignore_cursor_events(false).unwrap();
            } else {
                win.set_ignore_cursor_events(true).unwrap();
            }
            // println!("mouse event {} {}", x, y)
        }
        _ => (),
    }

    match event.name {
        Some(string) => info!(
            "User wrote {:?} window is visible x:{},y{}   |  outer x:{},y:{}",
            string, inner_x_top_left, inner_y_top_left, outer_x, outer_y
        ),
        None => (),
    }
}

pub fn setup(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    let main_window = app_handle.get_window("main").unwrap();

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
