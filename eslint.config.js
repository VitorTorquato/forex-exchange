const eslintConfig = async () => {
  const vue = (await import('eslint-plugin-vue')).default;
  const prettier = (await import('eslint-plugin-prettier')).default;
  const prettierConfig = (await import('eslint-config-prettier')).default;

  return [
    {
      files: ['**/*.{js,ts,vue}'],
      languageOptions: {
        parser: await import('vue-eslint-parser'),
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      plugins: {
        vue,
        prettier,
      },
      rules: {
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error', // Treat Prettier issues as ESLint errors
      },
    },
    prettierConfig,
  ];
};

export default eslintConfig();
