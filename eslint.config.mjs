import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'warn',
    'ts/no-unused-expressions': 'off',
    'no-undef': 'off',
  },
  ignores: ['*.d.ts', '*.js'],
})
