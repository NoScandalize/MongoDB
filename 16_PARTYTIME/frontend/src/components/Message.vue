<template>
  <div>
    <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["msg", "msgClass"],
};
</script>

<style scoped>
.msg {
  max-width: 500px;
  position: fixed;
  top: 160px;
  right: 20px;
  padding: 20px;
  text-align: center;
  border: 2px solid rgba(204, 204, 204, 0.452);
  border-radius: 10px;
}

@media screen and (max-width: 950px) {
  .msg {
    position: initial;
    margin: 20px auto;
    max-width: 350px;
  }
}

@media screen and (min-width: 1072px) {
  .msg {
    top: 123px;
  }
}

.success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
