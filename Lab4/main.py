import os
from math import floor
from datetime import datetime

LOGS_PATH = 'logs'
INCORRECT_INPUT_ERROR_MESSAGE = 'Ошибка! Некорректный ввод.'
ZERO_VALUE_ERROR_MESSAGE = 'Ошибка! Среди введённых чисел присутствует 0.'

cache = {}


def create_log_file():
    if not os.path.exists(LOGS_PATH):
        os.mkdir(LOGS_PATH)

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return os.path.join(LOGS_PATH, current_time)


def log(log_path, input_data, result):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_path, 'a', encoding='utf-8') as file:
        file.write(f'{input_data} - {result} - {current_time}\n')


def remove_logs():
    for file in os.listdir(LOGS_PATH):
        os.remove(os.path.join(LOGS_PATH, file))


def gcd(a, b):
    if (a, b) in cache:
        print('Результат возвращён из кэша')
        return cache[(a, b)]
    if (b, a) in cache:
        print('Результат возвращён из кэша')
        return cache[(b, a)]

    while b != 0:
        a, b = b, a % b
    return a


def main():
    log_path = create_log_file()
    print('Программа для вычисления НОД двух чисел.')
    while (user_input := input('Пожалуйста, введите два числа через пробел (или "q" для выхода): ')) != 'q':
        if user_input == 'rm logs':
            remove_logs()
            print('Логи были успешно удалены!')
        else:
            try:
                numbers = map(float, user_input.split())
                first_number, second_number = map(floor, numbers)
            except ValueError:
                log(log_path, user_input, INCORRECT_INPUT_ERROR_MESSAGE)
                print(INCORRECT_INPUT_ERROR_MESSAGE)
                continue
            if first_number == 0 or second_number == 0:
                log(log_path, user_input, ZERO_VALUE_ERROR_MESSAGE)
                print(ZERO_VALUE_ERROR_MESSAGE)
                break
            first_number, second_number = abs(first_number), abs(second_number)
            result = gcd(first_number, second_number)
            log(log_path, user_input, result)
            print(f'НОД чисел {first_number} и {second_number} равен {result}')
            cache[(first_number, second_number)] = result
    else:
        print('Завершение работы программы...')


if __name__ == '__main__':
    main()
