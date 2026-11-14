// @ts-check
import prettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  // Architecture rule: UI code must read data only through composables,
  // so the /data files can be replaced by a backend without touching pages.
  {
    files: ['app/pages/**', 'app/components/**', 'app/layouts/**', 'app/app.vue', 'app/error.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#data', '#data/*', '~~/data/*', '../**/data/*'],
              message: 'Read data through composables (useProjects, useExperience...) instead.',
            },
            {
              group: ['~/repositories', '~/repositories/*'],
              message: 'Pages and components must use composables, not repositories.',
            },
          ],
        },
      ],
    },
  },
  prettier,
)
