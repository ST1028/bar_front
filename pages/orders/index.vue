<template>
  <v-list v-model:opened="open">
    <v-list-group value="Users">
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            prepend-icon="mdi-account"
            title="¥1,000 ジェイ"
        ></v-list-item>
      </template>

      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
    </v-list-group>
    <v-list-group value="Users2">
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            prepend-icon="mdi-account"
            title="¥1,000 ゆうか"
        ></v-list-item>
      </template>

      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
      <v-list-item
          title="¥300 赤ワイン"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    open: [''],
  }),
}
</script>

<style scoped>

</style>