import { defineRecipe } from '@pandacss/dev'

export const heading = defineRecipe({
  className: 'heading',
  base: {
    fontWeight: 'semibold',
    letterSpacing: "-0.027em"
  },
})
