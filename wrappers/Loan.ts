import { Address, beginCell, Cell, Contract, contractAddress } from 'ton-core'

export type LoanConfig = {
    elector?: Address
    treasury: Address
    validator: Address
    roundSince: bigint
}

export function loanConfigToCell(config: LoanConfig): Cell {
    return beginCell()
        .storeAddress(config.elector)
        .storeAddress(config.treasury)
        .storeAddress(config.validator)
        .storeUint(config.roundSince, 32)
        .endCell()
}

export class Loan implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Loan(address)
    }

    static createFromConfig(config: LoanConfig, code: Cell, workchain = -1) {
        const data = loanConfigToCell(config)
        const init = { code, data }
        return new Loan(contractAddress(workchain, init), init)
    }
}