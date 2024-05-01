class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        return sum(item['amount'] for item in self.ledger)

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return self.get_balance() >= amount

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""
        for item in self.ledger:
            items += f"{item['description'][:23]:23}{item['amount']:>7.2f}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total

def create_spend_chart(categories):
    total_spent = sum(-item['amount'] for category in categories for item in category.ledger if item['amount'] < 0)
    category_spent = [(category.name, sum(-item['amount'] for item in category.ledger if item['amount'] < 0)) for category in categories]
    category_percentages = [(name, int((spent / total_spent) * 100 // 10) * 10) for name, spent in category_spent]

    chart = "Percentage spent by category\n"
    for percentage in range(100, -10, -10):
        chart += f"{percentage:>3}| "
        for name, percent in category_percentages:
            chart += "o  " if percent >= percentage else "   "
        chart += "\n"
    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    max_name_length = max(len(category.name) for category in categories)
    for i in range(max_name_length):
        chart += "     "
        for name, percent in category_percentages:
            if i < len(name):
                chart += f"{name[i]}  "
            else:
                chart += "   "
        chart += "\n"
    return chart.strip("\n")

# Example usage
food = Category("Food")
food.deposit(1000, "initial deposit")
food.withdraw(10.15, "groceries")
food.withdraw(15.89, "restaurant and more food for dessert")
clothing = Category("Clothing")
food.transfer(50, clothing)

