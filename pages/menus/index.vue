<template>
  <div>
    <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Order</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
            lines="one"
            subheader
        >
          <v-list-subheader>Selected menu</v-list-subheader>
          <v-list-item>
            <v-list-item-subtitle>Wine</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            lines="two"
            subheader
        >
          <v-list-subheader>How to mix alcohol</v-list-subheader>
          <v-list-item>
            <v-radio-group>
              <v-radio label="水" value="1" color="primary"></v-radio>
              <v-radio label="氷" value="2" color="primary"></v-radio>
              <v-radio label="炭酸" value="3" color="primary"></v-radio>
            </v-radio-group>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            lines="one"
            subheader
        >
          <v-list-subheader>Person</v-list-subheader>
          <v-list-item>
            <v-select
                v-model="vSelect"
                :items="['foo', 'bar', 'fizz', 'buzz']"
                chips
                multiple
            ></v-select>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            lines="one"
            subheader
        >
          <v-list-item>
            <v-btn prepend-icon="mdi-receipt-text-send-outline" variant="outlined" @click="dialog = false">
              Order
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    <v-window v-model="menuTab">
      <v-window-item
          v-for="n in 6"
          :key="n"
          :value="n"
      >
        <v-card
            class="mx-auto my-12 mt-5"
        >
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
            ></v-progress-linear>
          </template>

          <v-img
              cover
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-item>
            <v-card-title>Wines</v-card-title>

            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>
              <v-icon
                  color="error"
                  icon="mdi-fire-circle"
                  size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Menus</v-card-title>
          <v-list lines="three">
            <template v-for="(item, i) in list_items">
              <v-list-item
                  @click="dialog = !dialog"
                  :value="i"
                  :prepend-avatar="item.prependAvatar"
              >
                <v-list-item-title>
                  <v-icon
                      color="error"
                      icon="mdi-numeric-1-circle"
                      size="small"
                      v-if="i == 0"
                  ></v-icon>
                  <v-icon
                      color="error"
                      icon="mdi-numeric-2-circle"
                      size="small"
                      v-else-if="i == 1"
                  ></v-icon>
                  <v-icon
                      color="error"
                      icon="mdi-numeric-3-circle"
                      size="small"
                      v-else-if="i == 2"
                  ></v-icon>
                  {{item.title}}</v-list-item-title>
                <v-list-item-subtitle>
                   {{item.subtitle}}
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import {useMenuTab} from "../../composables/useMenuTab";
const { menuTab } = useMenuTab()

// <script setup>の場合はreturnなしでOK
</script>
<script>
export default {
  data: () => ({
    vSelect: ['foo', 'bar', 'fizz', 'buzz'],
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    list_items: [
      {
        value: 1,
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'Red Wine',
        subtitle: `Popular`,
      },
      {
        value: 2,
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'White Wine',
        subtitle: `Popular`,
      },
      {
        value: 3,
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'ロバートモンダヴィ',
        subtitle: 'ワイン大国アメリカにおいて、総生産量の約90％のワインを生産しているカリフォルニア州。 ロバート・モンダヴィ・ワイナリーは、そのカリフォルニアにおいて、「カリフォルニアワインの父」と呼ばれるロバート・モンダヴィ氏により設立されたワイナリーです。',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'グルナッシュ',
        subtitle: 'Popular',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'オーパスワン',
        subtitle: 'Popular',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'オーパスワン',
        subtitle: 'Popular',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'オーパスワン',
        subtitle: 'Popular',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'オーパスワン',
        subtitle: 'Popular',
      },
      {
        prependAvatar: 'https://media.istockphoto.com/id/960574664/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E6%89%8B%E6%8F%8F%E3%81%8D%E3%83%AF%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E6%A0%AA%E5%BC%8F%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E3%81%AE%E3%83%AD%E3%82%B4-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E3%81%A8%E8%B5%A4%E3%83%AF%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AC%E3%83%A9%E3%82%B9.jpg?s=612x612&w=0&k=20&c=Of1Bns9_8smwGa6_GmEWVzfpUvZIgNtLT4uh2oi8V6Y=',
        title: 'オーパスワン',
        subtitle: 'Popular',
      },
    ],
    tab: null,
    items: [
      {
        title: 'Item #1',
        value: 1,
      },
      {
        title: 'Item #2',
        value: 2,
      },
      {
        title: 'Item #3',
        value: 3,
      },
    ],
  }),
}
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>