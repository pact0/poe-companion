mod file_watcher;

pub use crate::file_watcher::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
