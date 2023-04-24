<template>
	<v-app>
    <v-app-bar app>
      <v-toolbar-title>Private Bar</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension v-if="isMatch('/menus')">
        <v-tabs
            v-model="tab"
            align-tabs="title"
            color="primary"
        >
          <v-tab
              v-for="(item, i) in items"
              :key="item"
              :value="i+1"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
      <v-btn icon v-if="isMatch('/friends')" @click="openAddFriendModal">
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-layout class="overflow-visible" style="position: fixed;bottom: 0;width: 100%;">
        <v-bottom-navigation
            v-model="bottomNavigation"
            :bg-color="color"
            mode="shift"
        >
          <v-btn @click="toPage('/menus')" :disabled="isMatch('/menus')">
            <v-icon>mdi-glass-cocktail</v-icon>
            <span>Menus</span>
          </v-btn>
          <v-btn @click="toPage('/friends')" :disabled="isMatch('/friends')">
            <v-icon>mdi-account-multiple</v-icon>
            <span>Friends</span>
          </v-btn>
          <v-btn @click="toPage('/orders')" :disabled="isMatch('/orders')">
            <v-icon>mdi-credit-card-outline</v-icon>
            <span>Orders</span>
          </v-btn>
        </v-bottom-navigation>
      </v-layout>
	</v-app>
</template>

<script>
import {useMenuTab} from "../composables/useMenuTab";
import {useAddFriendModal} from "../composables/useAddFriendModal";

export default {
  data: () => ({ tab: null, bottomNavigation: null, items: ['web', 'shopping', 'videos', 'images', 'news']}),
  computed: {
    color () {
      return 'primary'
    },
  },
  mounted() {
    if (this.$route.path == '/menus') {
      this.bottomNavigation = 0;
    } else if(this.$route.path == '/friends') {
      this.bottomNavigation =  1;
    } else if (this.$route.path == '/orders') {
      this.bottomNavigation =  2;
    }
  },
  methods: {
    toPage(path) {
      navigateTo(path)
    },
    isMatch(path) {
      return this.$route.path == path;
    },
    openAddFriendModal() {
      useAddFriendModal().updateAddFriendModal(true)
    }
  },
  watch: {
    tab(newVal, oldVal) {
      useMenuTab().updateMenuTab(newVal)
    }
  },
}
</script>