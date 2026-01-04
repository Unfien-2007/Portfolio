#Days till January 25 python code

def CalculateDaysTillJan25():
    from datetime import datetime, timedelta

    today = datetime.now()
    current_year = today.year
    jan_25_this_year = datetime(current_year, 1, 25)

    if today > jan_25_this_year:
        target_date = datetime(current_year + 1, 1, 25)
    else:
        target_date = jan_25_this_year

    days_diff = (target_date - today).days
    print(f"There are {days_diff} days till January 25.")

CalculateDaysTillJan25()