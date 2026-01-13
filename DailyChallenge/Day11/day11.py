#handle user input
#Ask for a size (S, M, L).
#If S cost is 100, M is 150, L is 200.
#  Handle invalid inputs (e.g., user types "XL").


UserInput = input("Input size(S, M, L) for price:")


#logic
if UserInput == "S":
    print("size cost 100")
elif UserInput == "M":
    print("size cost 150")
elif UserInput == "L":
    print("size cost 200")
elif UserInput != "S,M,L":
    print("Invalid Input")

