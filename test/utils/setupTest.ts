import { createApp } from 'vue'

export const setupTest = <T>(useComposable: () => T) => {
  let result: T

  const app = createApp({
    setup() {
      result = useComposable()
      return () => {}
    },
  })

  app.mount(document.createElement('div'))

  return {
    get result() {
      return result
    },
    app,
  }
}
