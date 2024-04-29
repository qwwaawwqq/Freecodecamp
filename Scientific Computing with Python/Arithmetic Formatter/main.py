def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    arranged_problems = []
    for problem in problems:
        operands = problem.split()
        if len(operands) != 3:
            return "Error: Invalid problem format."

        operand1, operator, operand2 = operands
        if not operand1.isdigit() or not operand2.isdigit():
            return "Error: Numbers must only contain digits."
        if len(operand1) > 4 or len(operand2) > 4:
            return "Error: Numbers cannot be more than four digits."
        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."

        width = max(len(operand1), len(operand2)) + 2
        line1 = operand1.rjust(width)
        line2 = operator + ' ' + operand2.rjust(width - 2)
        line3 = '-' * width
        if show_answers:
            answer = str(eval(problem))
            line4 = answer.rjust(width)
            arranged_problems.append([line1, line2, line3, line4])
        else:
            arranged_problems.append([line1, line2, line3])

    output = ''
    for i in range(len(arranged_problems[0])):
        for j in range(len(arranged_problems)):
            output += arranged_problems[j][i].rjust(max(len(line) for line in arranged_problems[j]))
            if j != len(arranged_problems) - 1:
                output += '    '
        output += '\n'

    return output.rstrip()
    

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')