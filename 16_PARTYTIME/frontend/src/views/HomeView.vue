<template>
  <div class="home">
    <h1>Veja as últimas festas</h1>
    <div class="parties-container">
      <div
        class="party-container"
        v-for="(party, index) in parties"
        :key="index"
      >
        <div
          class="party-img"
          :style="{ 'background-image': 'url(' + party.photos[0] + ')' }"
        ></div>
        <router-link :to="`/party/${party._id}`" class="party-title"
          >{{ party.title }}</router-link
        >
        <p class="party-date">Data: {{ party.partyDate }}</p>
        <router-link :to="`/party/${party._id}`" class="party-details-btn"
          >Ver Mais</router-link
        >
      </div>
    </div>
    <p v-if="parties.length === 0">Não há festas ainda...</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      parties: [],
    };
  },
  created() {
    // load public parties
    this.getParties();
  },
  methods: {
    async getParties() {
      await fetch("http://localhost:3000/api/party/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          data.parties.forEach((party, index) => {
            if (party.partyDate) {
              party.partyDate = new Date(party.partyDate).toLocaleDateString();
            }

            if (party.photos.length > 0) {
              party.photos.forEach((photo, index) => {
                party.photos[index] = photo
                  .replace("public", "http://localhost:3000")
                  .replaceAll("\\", "/");
              });
            }
          });

          this.parties = data.parties;
        });
    },
  },
};
</script>

<style scoped>
.home {
  padding-top: 40px;
  padding-bottom: 100px;
  text-align: center;
}

.home h1 {
  margin-bottom: 40px;
}

.parties-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.party-container {
  width: 30.3%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}

.party-img {
  width: 100%;
  height: 200px;
  background-color: #ccc;
  margin-bottom: 12px;
  background-position: center;
  background-size: cover;
}

.party-title {
  color: #25282e;
  text-decoration: none;
  margin-bottom: 12px;
}

.party-date {
  color: #777;
  margin-bottom: 12px;
}

.party-details-btn {
  width: 100%;
  text-transform: uppercase;
  color: #061328;
  background-color: transparent;
  transition: 0.5s;
  border: 2px solid #061328;
  border-radius: 10px;
  padding: 12px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
}

.party-details-btn:hover {
  background-color: #061328;
  color: #fff;
}
</style>
