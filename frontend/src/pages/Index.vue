<template>
  <q-page class="row items-center justify-evenly">
    <q-btn :to="{ path: 'login' }" label="Login" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return { }
  }
})
</script>
