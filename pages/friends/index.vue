<template>
  <div>
    <v-dialog
        v-model="addFriendModal"
        persistent
        width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Friend Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="Name"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeModal"
          >
            Close
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeModal"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list>
      <v-list-subheader>Friends</v-list-subheader>
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          active-color="primary"
          variant="plain"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-account"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const { addFriendModal } = useAddFriendModal()

const items = [
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' },
];

</script>
<script>
import {useAddFriendModal} from "../../composables/useAddFriendModal";
export default {
  data: () => ({
    dialog:false
  }),
  methods: {
    closeModal() {
      useAddFriendModal().updateAddFriendModal(false)
    }
  }
}
</script>
<style scoped>

</style>