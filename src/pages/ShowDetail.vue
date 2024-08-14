<template>
  <ion-page class="details">
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons>
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ details?.name || "Details" }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <ion-progress-bar v-if="loading" type="indeterminate" slot="fixed" />
      <ion-header collapse="condense">
        <ion-toolbar color="light">
          <ion-title size="large">
            {{ details?.name || "Details" }}
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="details">
        <ion-grid>
          <ion-row>
            <ion-col size="5">
              <img :src="details.image.original || details.image.medium" />
            </ion-col>
            <ion-col size="7">
              <div v-if="details.rating.average">
                Rating: {{ details.rating.average }} &bull;
              </div>
              <div>
                <template v-for="(genre, index) in details.genres" :key="genre">
                  <ion-badge
                    @click="
                      $router.push({ name: 'Dashboard', params: { genre } })
                    "
                  >
                    {{ genre }}
                  </ion-badge>
                  <template v-if="index !== details.genres.length - 1"
                    >&nbsp;</template
                  >
                </template>
                &bull;
                <ion-badge
                  :color="details.status === 'Ended' ? 'medium' : 'success'"
                >
                  {{ details.status }}
                </ion-badge>
              </div>
              <div>Avg. runtime: {{ details.averageRuntime }} mins</div>

              <div v-if="details.language">
                Language: {{ details.language }}
              </div>
              <div v-if="details.premiered">
                Premiered: {{ details.premiered }}
              </div>

              <div v-if="details.network">
                Network: {{ details.network.name }} <br />
              </div>
              <div>
                <small>
                  <a
                    :href="details.officialSite || details.url"
                    target="_blank"
                  >
                    {{ details.officialSite || details.url }}
                  </a>
                </small>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div class="ion-padding-horizontal">
          <div v-html="details.summary" style="margin: 0;" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonContent,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
} from "@ionic/vue";
import $api from "@/services/api";

export default {
  components: {
    IonPage,
    IonHeader,
    IonButtons,

    IonBackButton,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar,

    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
  },
  data() {
    return {
      loading: false,
      details: null,
    };
  },
  methods: {
    getShowDetails() {
      const {
        $route: {
          params: { id },
        },
      } = this;
      this.loading = true;
      $api
        .getShowDetail(id)
        .then((json) => {
          console.log("result: ", json);
          this.details = json;
        })
        .catch(() => alert("An error occurred."))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getShowDetails();
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.details p {
  margin: 0;
}
ion-col > div {
  margin-bottom: 5px;
}
</style>
