const Securex = artifacts.require('./Securex.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Securex', ([deployer, author, tipper]) => {
    let securex

    before(async () => {
        securex = await Securex.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await securex.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await securex.name()
            assert.equal(name, 'secureX')
        })
    })


})