<template>
  <div id="nav">
    <router-link to="/" id="logo-container">
      <img src="/img/partytimelogo.png" alt="Party Time" />
    </router-link>
    <h2 id="nav-title">Party Time</h2>
    <div id="nav-links">
      <div id="extended-menu">
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-show="!authenticated">Entrar</router-link>
        <router-link to="/register" v-show="!authenticated"
          >Cadastrar</router-link
        >
        <router-link to="/dashboard" v-show="authenticated"
          >Dashboard</router-link
        >
        <router-link to="/profile" v-show="authenticated"
          >Configurações</router-link
        >
        <button @click="logout($event)" v-show="authenticated">Sair</button>
      </div>
      <CompactMenu id="compact-menu" v-on:click="onMenu" />
      <div id="menu-container">
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-show="!authenticated">Entrar</router-link>
        <router-link to="/register" v-show="!authenticated"
          >Cadastrar</router-link
        >
        <router-link to="/dashboard" v-show="authenticated"
          >Dashboard</router-link
        >
        <router-link to="/profile" v-show="authenticated"
          >Configurações</router-link
        >
        <button @click="logout($event)" v-show="authenticated">Sair</button>
      </div>
    </div>
  </div>
</template>

<script>
import CompactMenu from "./CompactMenu";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    CompactMenu,
  },
  methods: {
    onMenu() {
      let element = document.getElementById("menu-container");

      if (element.style.width === "" || element.style.width === "0px") {
        element.style.width = "0px";
        element.style.right = "-3000px";

        if (
          element.style.width === "0px" &&
          element.style.right === "-3000px"
        ) {
          element.style.width = "200px";
          element.style.right = "0px";
        }
      } else {
        element.style.width = "0px";
        element.style.right = "-3000px";
      }
    },
    logout(e) {
      e.preventDefault();

      // emit event to logout user
      this.$store.commit("logout");

      // redirect
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["authenticated"]),
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(0.75turn, #250242, #170187);
  box-shadow: 1px 5px 5px #00000073;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

#nav a {
  text-decoration: none;
  margin-right: 15px;
}

#nav img {
  width: 90px;
  padding-left: 20px;
  transition: 0.3s;
}

#nav img:hover {
  transform: scale(1.1);
}

#nav-title {
  font-size: 3rem;
  font-weight: 300;
  font-family: Bernadette;
  color: #de0f97;
  text-shadow: 1px 5px 5px #000;
  padding-bottom: 15px;
}

#logo-container,
#nav-links {
  width: 400px;
}

#nav-links {
  display: flex;
  justify-content: flex-end;
}

#extended-menu {
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

#nav-links a {
  padding: 10px 15px;
  border: 1px solid #de0f97;
  border-radius: 10px;
  background-color: #000;
  color: #de0f97;
  font-weight: bold;
  box-shadow: 1px 5px 5px #00000071;
}

#nav-links a:hover {
  color: #000;
  border: 1px solid #000;
  background-color: #de0f97;
}

#nav-links button {
  padding: 10px 15px;
  border: 1px solid #de0f97;
  border-radius: 10px;
  background-color: #000;
  color: #de0f97;
  font-weight: bold;
  font-size: 1em;
  box-shadow: 1px 5px 5px #00000071;
  transition: 0.5s;
  cursor: pointer;
}

#nav-links button:hover {
  color: #000;
  border: 1px solid #000;
  background-color: #de0f97;
}

#compact-menu {
  width: 50px;
  height: 45px;
  margin-right: 20px;
  @media screen and (min-width: 1201px) {
    display: none;
  }
}

#menu-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  right: -3000px;
  top: 140px;
  background: linear-gradient(0.75turn, #250242, #170187);
  color: #de0f97;
  width: 0px;
  height: 250px;
  border-radius: 10px 0px 0px 10px;
  transition: 0.5s;

  @media screen and (max-width: 1071px) {
    top: 177px;
  }
}

@media screen and (min-width: 1072px) {
  #menu-container {
    display: none;
  }
}

#menu-container a {
  display: flex;
  justify-content: center;
  font-size: 20px;
  min-width: 120px;
  margin-right: 0px;
}

#menu-container button {
  display: flex;
  justify-content: center;
  font-size: 20px;
  min-width: 120px;
  margin-right: 0px;
}
</style>
