Processor = "AMD Ryzen 5 5600G"
processor = 7500
Motherboard = "A520M S2H"
motherboard = 4200
RAM = "16GB (2x8GB) DDR4 3200MHz"
ram = 2800
Storage = "512GB NVMe SSD"
storage = 2800
PowerSupply = "550W 80+ Bronze" 
powerSupply = 3000
Case = "mATX Case with Fans"
case = 2000

def calculate_total_cost():
    total_cost = (processor + motherboard + ram + storage + powerSupply + case)
    return total_cost



print("Components:") 
print(f"Processor: {Processor} ₱{processor}")
print(f"Motherboard: {Motherboard} ₱{motherboard}")
print(f"RAM: {RAM} ₱{ram}")
print(f"Storage: {Storage} ₱{storage}")
print(f"Power Supply: {PowerSupply} ₱{powerSupply}")
print(f"Case: {Case} ₱{case}")
print("Total Cost of the PC Build:", calculate_total_cost())
# Daily Challenge - Day 7
# Task: Create a Python program that calculates the total cost of building a PC based on the