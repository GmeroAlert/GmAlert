import antfu from '@antfu/eslint-config'

export default antfu({ ignores: ['*.d.ts', '**/*.js'] }, {
  rules: {
    'no-console': 'warn',
    'ts/no-unused-expressions': 'off',
    'no-undef': 'off',
  },

})
