<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Gerencie seus eventos</h1>
      <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>
    <div v-if="parties.length > 0">
      <DataTable :parties="parties" />
    </div>
    <div v-else>
      <p>
        Você ainda não tem festas cadastradas,
        <router-link to="/newparty"
          >clique aqui para criar a sua festa!</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import DataTable from '../components/DataTable.vue'

export default {
  name: "Dashboard",
  data() {
    return {
      parties: [],
    };
  },
  components: {
    DataTable
  },
  created() {
    // load user parties

    this.getParties();
  },
  methods: {
    async getParties() {
      // get token from store
      const token = this.$store.getters.token;

      await fetch("http://localhost:3000/api/party/userparties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
      .then((res) => res.json())
      .then((data) => {

        this.parties = data.parties;

      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 50px;
  padding-bottom: 100px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  @media screen and (max-width: 641px) {
    flex-direction: column;
    gap: 20px;
  }
}

.title-container h1 {
  text-align: center;
}

.btn {
  padding: 10px 16px;
  margin: 5px;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  color: #061328;
  background-color: #fff;
  border: 2px solid #061328;
  border-radius: 10px;
  font-weight: bold;
  transition: 0.5s;
}

.btn:hover {
  color: #de0f97;
  background-color: #061328;
  border-color: #de0f97;
}
</style>
