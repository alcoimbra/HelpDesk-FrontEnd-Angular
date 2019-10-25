export class Summary{
    
    constructor(
        public amountNew: number,
        public amountResolved: number,
        public amountAproved: number,
        public amountDisaproved: number,
        public amountAssigned: number,
        public amountClosed: number
    ){}
}