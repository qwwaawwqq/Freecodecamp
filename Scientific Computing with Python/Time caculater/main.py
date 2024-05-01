def add_time(start, duration, start_day=None):
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    # Parse the start time and duration
    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(':'))
    duration_hour, duration_minute = map(int, duration.split(':'))

    # Convert start time to 24-hour format based on AM/PM
    if period == "PM":
        start_hour += 12

    # Add duration to start time
    new_minute = start_minute + duration_minute
    new_hour = start_hour + duration_hour + new_minute // 60
    new_minute %= 60
    days_passed = new_hour // 24
    new_hour %= 24

    # Determine new period and adjust hours for 12-hour format
    new_period = "AM" if new_hour < 12 else "PM"
    new_hour = new_hour if new_hour % 12 != 0 else 12
    if new_hour > 12:
        new_hour -= 12

    # Result formatting
    new_time = f"{new_hour}:{new_minute:02d} {new_period}"
    if start_day:
        new_day_index = (days_of_week.index(start_day.capitalize()) + days_passed) % 7
        new_day = days_of_week[new_day_index]
        new_time += f", {new_day}"

    # Add annotations about the number of days later
    if days_passed == 1:
        new_time += " (next day)"
    elif days_passed > 1:
        new_time += f" ({days_passed} days later)"

    return new_time
