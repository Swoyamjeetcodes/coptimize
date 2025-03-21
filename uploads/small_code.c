//Small C code with counts - LOC: 37, For: 5, While: 1, If: 2
#include <stdio.h>
#include <stdlib.h>
void generate_numbers(int arr[], int size) {
    for (int i = 0; i < size; i++) arr[i] = rand() % 100;
}
void process_numbers(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        if (arr[i] % 2 == 0) arr[i] /= 2;
        else arr[i] = arr[i] * 3 + 1;
    }
}
int sum_array(int arr[], int size) {
    int sum = 0, i = 0;
    while (i < size) sum += arr[i++];
    return sum;
}
void sort_array(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
int main() {
    int numbers[20];
    generate_numbers(numbers, 20);
    process_numbers(numbers, 20);
    sort_array(numbers, 20);
    printf("Sorted numbers:\n");
    for (int i = 0; i < 20; i++) printf("%d ", numbers[i]);
    printf("\nSum: %d\n", sum_array(numbers, 20));
    return 0;
}