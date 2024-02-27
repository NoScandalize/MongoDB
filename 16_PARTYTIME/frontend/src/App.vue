<template>
  <div>
    <Navbar />
    <router-view class="container" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  margin-top: 100px;
  @media screen and (max-width: 1072px) {
    margin-top: 147px;
  }
}

a {
  transition: 0.5s;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border: none;
  background: #250242;
}

::-webkit-scrollbar-thumb {
  background: #de0f97;
  border-radius: 10px;
  border: 1px solid #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #000;
  border: 1px solid #de0f97;
}
</style>
