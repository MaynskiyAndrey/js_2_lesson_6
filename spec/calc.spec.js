const calc = require('../calc');
const sum = calc.sum;
const difference = calc.difference;
const multiplication = calc.multiplication;
const division = calc.division;

describe('сложение sum()', () => {
	it('должна возвращать 8 при аргументах (3, 5)', () => {
		expect(sum(3, 5)).toBe(8);
	})

	it('должна возвращать 2 при аргументах (-10, 12)', () => {
		expect(sum(-10, 12)).toBe(2);
	})

	it('если переданы строки null', () => {
		expect(sum('sdf', 'sewr')).toBeNull();
	})

	it('если переданы число и строка, возвращаем null', () => {
		expect(sum(1, 'sewr')).toBeNull();
	})

	it('если переданы число и null, возвращзаем null', () => {
		expect(sum(1, null)).toBeNull();
	})
});

describe('разность difference()', () => {
	it('переданы 5, 3 результат 2', () => {
		expect(difference(5, 3)).toBe(2);
	})
});

describe('произведение multiplication()', () => {
	it('', () => {
		expect(multiplication(5, 3)).toBe(15);
	})
});

describe('частное division()', () => {
	it('переданы 6, 3 результат 2', () => {
		expect(division(6, 3)).toBe(2);
	})

	it('переданы 6, 0 результат NaN', () => {
		expect(division(6, 0)).toBeNaN();
	})
});