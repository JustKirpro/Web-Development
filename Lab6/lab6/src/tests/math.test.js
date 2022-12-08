import {math, multiply, subtract} from "./math";

test('sum function test', () => {
    expect(math(2, 6)).toEqual(8);
    expect(math(10, 7)).toEqual(17);
    expect(math(-12, 2)).toEqual(-10);
    expect(math(-20, 0)).toEqual(-20);
    expect(math(0, 28)).toEqual(28);
    expect(math(0, 0)).toEqual(0);
});


test('multiply function test', () => {
    expect(multiply(2, 6)).toEqual(12);
    expect(multiply(10, 7)).toEqual(70);
    expect(multiply(-12, 2)).toEqual(-24);
    expect(multiply(0, 28)).toEqual(0);
    expect(multiply(0, 0)).toEqual(0);
});

test('subtract function test', () => {
    expect(subtract(2, 6)).toEqual(-4);
    expect(subtract(10, 7)).toEqual(3);
    expect(subtract(-12, 2)).toEqual(-14);
    expect(subtract(0, 28)).toEqual(-28);
    expect(subtract(0, 0)).toEqual(0);
});