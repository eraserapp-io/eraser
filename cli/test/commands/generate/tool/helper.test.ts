import {expect, test} from '@oclif/test'

describe('generate:tool:helper', () => {
  test
  .stdout()
  .command(['generate:tool:helper'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['generate:tool:helper', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
