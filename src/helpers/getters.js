import numbers from "@/data/numbers.json";

export const getNumbers = quantity => {
    const arr = new Array(quantity).fill();
    let randomNumber;

    const response = arr.map((n, i) => {
        const newRandom = Math.round(Math.random() * numbers.length);
    });
};
