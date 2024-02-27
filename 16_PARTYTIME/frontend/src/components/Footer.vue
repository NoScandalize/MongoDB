<template>
  <footer>
    <h3>Party Time &copy; 2024</h3>
    <p>O melhor local para compartilhar seus eventos</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  background: linear-gradient(0.75turn, #250242, #170187);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 1px -5px 5px #00000073;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
}

footer h3 {
  color: #de0f97;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 1.6rem;
}

footer p {
  color: #fff;
}
</style>
