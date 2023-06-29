<template>
  <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
    <div class="fit q-pt-xl q-px-sm column">
      <q-btn
        round
        flat
        color="grey-8"
        stack
        no-caps
        size="26px"
        class="GPL__side-btn"
      >
        <q-icon size="22px" name="photo" />
        <div class="GPL__side-btn__label">Photos</div>
      </q-btn>

      <q-btn
        round
        flat
        color="grey-8"
        stack
        no-caps
        size="26px"
        class="GPL__side-btn"
      >
        <q-icon size="22px" name="collections_bookmark" />
        <div class="GPL__side-btn__label">Albums</div>
      </q-btn>

      <q-btn
        round
        flat
        color="grey-8"
        stack
        no-caps
        size="26px"
        class="GPL__side-btn"
      >
        <q-icon size="22px" name="assistant" />
        <div class="GPL__side-btn__label">Assistant</div>
        <q-badge
          floating
          color="red"
          text-color="white"
          style="top: 8px; right: 16px"
        >
          1
        </q-badge>
      </q-btn>

      <q-btn
        round
        flat
        color="grey-8"
        stack
        no-caps
        size="26px"
        class="GPL__side-btn"
      >
        <q-icon size="22px" name="group" />
        <div class="GPL__side-btn__label">Sharing</div>
      </q-btn>

      <q-btn
        round
        flat
        color="grey-8"
        stack
        no-caps
        size="26px"
        class="GPL__side-btn"
      >
        <q-icon size="22px" name="import_contacts" />
        <div class="GPL__side-btn__label">Photo books</div>
      </q-btn>
    </div>
  </q-page-sticky>
</template>

<script setup></script>

<style scoped></style>
