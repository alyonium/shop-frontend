<template>
  <v-dialog v-model="dialog"
  width="500">
  <v-card>
    <router-link to="/">
    <v-btn
      x-small
      text
      class="ml-2 mt-2 font-weight-bold"
      :v-hover="false"
      @click="dialog = false"
    >
      close
    </v-btn>
    </router-link>
    <v-card-title
      class="headline text-center justify-center d-flex pb-10">
      Thank you for your order!
    </v-card-title>
  </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'OrderWindow',
  data() {
    return {
      dialog: true,
    };
  },
};
</script>

<style scoped>
.headline {
  white-space: pre-wrap;
}
</style>
