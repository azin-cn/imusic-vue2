<template>
  <music-event v-if="HOMEPAGE_MUSIC_CALENDAR"
    :MUSIC_EVENT_DATA ="HOMEPAGE_MUSIC_CALENDAR"
  >
  </music-event>
</template>

<script>
import MusicEvent from 'components/content/music_event/MusicEvent'
import { mapState } from 'vuex'

export default {
  name: 'Calendar',
  components: {
    MusicEvent
  },
  computed: {
    ...mapState({
      HOMEPAGE_MUSIC_CALENDAR:
        state => state.DISCOVER_DATA.HOMEPAGE_MUSIC_CALENDAR
    })
  }
}
</script>