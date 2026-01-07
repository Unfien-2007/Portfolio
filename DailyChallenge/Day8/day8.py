#Input/Output
#Ask the user for their name and age using `input()`.
# Calculate the year they will turn 25 and print a sentence telling them.
#
#
currentAge = int(input("Enter your age: "))

currentYear = 2025
yearTurn25 = currentYear + (25 - currentAge)
print(f"You will turn 25 in the year {yearTurn25}.")
print(f"you have {yearTurn25 - currentYear} years left to turn 25.")