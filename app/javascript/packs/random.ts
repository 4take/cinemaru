export default class Random {

    private static ALPHABETS = "abcdefghijklmnopqrstuvwxyz"
    private static NUMBERS = "0123456789"
    private static ALPHANUMERICS = Random.ALPHABETS + Random.NUMBERS

    constructor() {
    }

    static createAlphanumeric(length: number = 6): string {
        return this.create(this.ALPHANUMERICS, length)
    }

    static createOnlyNumbers(length: number = 6): string {
        return this.create(this.NUMBERS, length)
    }

    static createOnlyAlphabet(length: number): string {
        return this.create(this.ALPHABETS, length)
    }

    static createAlphanumericArray(length: number = 6, amount: number = 1): Array<string> {
        const chars = this.range(amount).map(() => this.createAlphanumeric(length)).filter((v, i, self) => self.indexOf(v) == i)
        return chars.length < amount ? chars.concat(this.createAlphanumericArray(length, amount - chars.length)) : chars
    }

    static createOnlyNumbersArray(length: number = 6, amount: number = 1): Array<string> {
        const chars = this.range(amount).map(() => this.createOnlyNumbers(length)).filter((v, i, self) => self.indexOf(v) == i)
        return chars.length < amount ? chars.concat(this.createOnlyNumbersArray(length, amount - chars.length)) : chars
    }

    static createOnlyAlphabetArray(length: number = 6, amount: number = 1): Array<string> {
        const chars = this.range(amount).map(() => this.createOnlyAlphabet(length)).filter((v, i, self) => self.indexOf(v) == i)
        return chars.length < amount ? chars.concat(this.createOnlyAlphabetArray(length, amount - chars.length)) : chars
    }

    private static create(chars: string, length: number = 6): string {
        return this.range(length).map(i => chars[Math.floor(Math.random() * chars.length)]).join('')
    }

    private static range(c: number) {
        const array = []
        for (let i = 0; i < c; i++) {
            array.push(i)
        }
        return array
    }
}