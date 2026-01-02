# User login page back end logic practice

print("Welcome to the Login Page")
username = input("Enter your username: ")
password = input("Enter your password: ")

while username != "admin" or password != "admin":
    username = input("Enter your username: ")
    password = input("Enter your password: ")
    if username == "admin" and password == "admin":
        print("Login successful! Welcome, admin.")
    else:
        print("Login failed! Invalid username or password. Try again.")