<template>
  <ion-page class="dashboard">
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
      <!-- for android, secondary toolbar in header -->
      <ion-toolbar
        v-if="!isIOS"
        :sticky="true"
        class="subheader ion-no-margin"
        color="light"
      >
        <ion-searchbar
          v-model.trim="searchText"
          @ion-input="onSearch"
          @ion-clear="onResetSearch"
          :debounce="400"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light" :scroll-y="list.length">
      <ion-progress-bar v-if="loading" type="indeterminate" slot="fixed" />
      <ion-header collapse="condense">
        <ion-toolbar color="light">
          <ion-title size="large">
            Dashboard
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item-divider
        v-if="isIOS"
        sticky
        color="light"
        class="ion-no-padding"
      >
        <ion-searchbar
          v-model.trim="searchText"
          @ion-input="onSearch"
          @ion-clear="onResetSearch"
          :debounce="400"
        />
      </ion-item-divider>
      <template v-if="list.length">
        <ion-row lines="none" class="ion-padding-horizontal">
          <ion-col size="4">
            <ion-select
              v-model="selected"
              label="Genre"
              label-placement="stacked"
              placeholder="Select"
              mode="md"
              @ion-change="onGenreChange"
            >
              <ion-select-option value="">All</ion-select-option>
              <ion-select-option
                v-for="genre in genres"
                :key="genre"
                :value="genre.toLowerCase()"
              >
                {{ genre }}
              </ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col class="flex" style="justify-content: end;">
            <ion-button id="sorter" fill="clear" size="small">
              <ion-icon :icon="icons.swapVerticalOutline" />
            </ion-button>
            <div>
              <ion-segment v-model="viewType">
                <ion-segment-button value="list">
                  <ion-icon :icon="icons.listOutline" />
                </ion-segment-button>
                <ion-segment-button value="grid">
                  <ion-icon :icon="icons.gridOutline" />
                </ion-segment-button>
              </ion-segment>
            </div>
          </ion-col>
        </ion-row>
        <ion-grid>
          <ion-row class="shows-list">
            <ion-col
              v-for="(show, index) in sortedList"
              :key="index"
              class="show-item"
              :size="viewType === 'grid' ? 4 : 12"
              :size-lg="viewType === 'grid' ? 2 : 12"
              @click="
                $router.push({
                  name: 'ShowDetail',
                  params: { id: show.id },
                })
              "
            >
              <div class="list-item">
                <ion-thumbnail
                  :style="`--size: ${viewType === 'grid' ? '100%' : '40%'};`"
                  class="loading"
                >
                  <img
                    :src="show?.image?.original"
                    @load="
                      (e) => e.target.parentNode.classList.remove('loading')
                    "
                  />
                </ion-thumbnail>
                <ion-item
                  v-if="viewType === 'list'"
                  lines="none"
                  color="light"
                  :detail="true"
                >
                  <ion-label class="ion-text-wrap">
                    <h3>{{ show.name }}</h3>

                    <div>
                      <template
                        v-for="(genre, index) in show.genres"
                        :key="genre"
                      >
                        <ion-badge
                          @click.stop="
                            $router.push({
                              name: 'Dashboard',
                              params: { genre },
                            })
                          "
                        >
                          {{ genre }}
                        </ion-badge>
                        <template v-if="index !== show.genres.length - 1"
                          >&nbsp;</template
                        >
                      </template>
                    </div>

                    <div v-if="show.rating.average">
                      Rating: {{ show.rating.average }}
                    </div>

                    <div v-if="show.language">
                      Language: {{ show.language }}
                    </div>
                    <div v-if="show.premiered">
                      Premiered: {{ show.premiered }}
                    </div>

                    <div v-if="show.network">
                      Network: {{ show.network.name }} <br />
                    </div>
                  </ion-label>
                </ion-item>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-infinite-scroll @ion-infinite="onLoadMore">
          <ion-infinite-scroll-content loading-text="Loading more..." />
        </ion-infinite-scroll>

        <ion-action-sheet
          trigger="sorter"
          header="Sort by"
          :buttons="actionSheetButtons"
          @didDismiss="onSortChange"
        />
      </template>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonProgressBar,
  IonThumbnail,
  IonButton,
  IonItemDivider,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonActionSheet,
  isPlatform,
} from "@ionic/vue";
import {
  chevronForwardOutline,
  listOutline,
  gridOutline,
  swapVerticalOutline,
} from "ionicons/icons";
import $api from "@/services/api";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonThumbnail,
    IonButton,
    IonItemDivider,
    IonSelect,
    IonSelectOption,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonGrid,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonBadge,
    IonIcon,
    IonItem,
    IonLabel,
    IonActionSheet,
    IonProgressBar,
  },
  data() {
    return {
      list: [],
      loading: false,
      searchText: "",
      selected: "",
      page: 1,
      viewType: "grid",
      sortRating: 0,
    };
  },
  computed: {
    isIOS() {
      return isPlatform("ios");
    },
    sortedList() {
      const { list, sortRating } = this;
      return list
        .map((show) => ({
          ...show,
          rating: show.rating || { average: 0 },
        }))
        .sort((a, b) => {
          if (!sortRating) {
            return a.score - b.score;
          }
          return sortRating === 1
            ? a.rating.average - b.rating.average
            : b.rating.average - a.rating.average;
        });
    },
  },
  methods: {
    async onGenreChange() {
      const { selected } = this;
      if (!selected) {
        this.$router.replace({
          params: { genre: "" },
        });
      } else {
        this.loading = true;
        const result = await $api.search(selected);
        this.list = result.map((item) => ({
          ...item.show,
          score: item.score,
        }));
        this.loading = false;
      }
    },
    async onSearch() {
      const { searchText } = this;
      if (searchText) {
        this.loading = true;
        this.list = [];
        const result = await $api.search(searchText);
        this.list = result.map((item) => ({
          ...item.show,
          score: item.score,
        }));
        console.log("result: ", result);
        this.loading = false;
      }
    },
    onSortChange(e) {
      const { data } = e?.detail || {};
      if (data?.rating) {
        this.sortRating = data.rating;
      }
    },
    onResetSearch() {
      this.searchText = "";
      this.onGenreChange(); // resets list
    },
    async onLoadMore(ev) {
      const page = Math.ceil(this.list.reverse().shift().id / 250); // logic from 'https://www.tvmaze.com/api#show-index'
      await this.fetchShows(page);
      setTimeout(() => ev.target.complete(), 500);
    },
    async fetchShows(page) {
      // const { genres } = this;
      this.loading = true;
      try {
        const result = await $api
          .getShowsList(page)
          .then((list) =>
            list.map((i) => ({ ...i, score: i.score || i.weight }))
          );
        if (!page || page === 1) {
          this.list = result;
        } else {
          this.list.push(...result);
        }
        console.log("result: ", this.list);
      } catch (e) {
        console.warn(e);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.selected = (this.$route.params.genre || "").toLowerCase();
    this.fetchShows();
  },
  setup() {
    const genres = [
      "Action",
      "Adventure",
      "Animated",
      "Biography",
      "Comedy",
      "Crime",
      "Dance",
      "Disaster",
      "Documentary",
      "Drama",
      "Erotic",
      "Family",
      "Fantasy",
      "Found Footage",
      "Historical",
      "Horror",
      "Independent",
      "Legal",
      "Live Action",
      "Martial Arts",
      "Musical",
      "Mystery",
      "Noir",
      "Performance",
      "Political",
      "Romance",
      "Satire",
      "Science Fiction",
      "Short",
      "Silent",
      "Slasher",
      "Sports",
      "Spy",
      "Superhero",
      "Supernatural",
      "Suspense",
      "Teen",
      "Thriller",
      "War",
      "Western",
    ];
    const actionSheetButtons = [
      {
        text: "Sort by relevance",
        data: {
          rating: 0,
        },
      },
      {
        text: "Sort by rating — Low to High",
        data: {
          rating: 1,
        },
      },
      {
        text: "Sort by rating — High to Low",
        data: {
          rating: 2,
        },
      },
    ];
    return {
      isPlatform,
      genres,
      actionSheetButtons,
      icons: {
        chevronForwardOutline,
        listOutline,
        swapVerticalOutline,
        gridOutline,
      },
    };
  },
};
</script>
<style scoped>
ion-segment {
  display: inline-flex;
}
ion-segment-button {
  min-width: 40px;
  max-width: 50px;
}
.list-item {
  display: flex;
  align-items: flex-start;
}
.list-item ion-thumbnail {
  min-height: 120px;
}
.list-item ion-thumbnail.loading {
  background-color: var(--ion-color-medium-tint);
}
.list-item > ion-item {
  max-width: 60%;
  flex: 1;
}
.list-item h3 {
  margin-top: 0;
}
</style>
