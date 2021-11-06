const sum = (a, b) => {
	if (!checkParam(a) || !checkParam(b)) {
		return null;
	}
	return a + b;
}

const difference = (a, b) => {
	if (!checkParam(a) || !checkParam(b)) {
		return null;
	}
	return a - b;
}

const multiplication = (a, b) => {
	if (!checkParam(a) || !checkParam(b)) {
		return null;
	}
	return a * b;
}

const division = (a, b) => {
	if (!checkParam(a) || !checkParam(b)) {
		return null;
	}
	if (b === 0) {
		return NaN;
	}
	return a / b;
}

const checkParam = (a) => {
	return !isNaN(parseFloat(a)) && isFinite(a);
}

module.exports = {
	sum: sum,
	difference: difference,
	multiplication: multiplication,
	division: division
}