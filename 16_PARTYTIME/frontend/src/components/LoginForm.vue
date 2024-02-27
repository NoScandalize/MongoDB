<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form id="login-form" @submit="login($event)">
      <div class="input-container">
        <label for="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Digite o seu email"
        />
      </div>
      <div class="input-container">
        <label for="password">Senha: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Digite a sua senha"
        />
      </div>
      <InputSubmit text="Entrar" />
    </form>
  </div>
</template>

<script>
import Message from "./Message.vue";
import InputSubmit from "./form/InputSubmit.vue";

export default {
  name: "LoginForm",
  components: {
    Message,
    InputSubmit,
  },
  data() {
    return {
      email: null,
      password: null,
      msm: null,
      msgClass: null,
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();

      const data = {
        email: this.email,
        password: this.password,
      };

      const jsonData = JSON.stringify(data);

      await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      })
        .then((res) => res.json())
        .then((data) => {
          let auth = false;

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            auth = true;
            this.msg = data.message;
            this.msgClass = "success";

            // emit event for auth an user
            this.$store.commit("authenticate", {
              token: data.token,
              userId: data.userId,
            });
          }

          setTimeout(() => {
            if (!auth) {
              this.msg = null;
              this.msgClass = null;
            } else {
              // redirect
              this.$router.push("dashboard");
            }
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
#login-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
  padding: 0px 10px;
}

.input-container label {
  margin-bottom: 10px;
  color: #061328;
}

.input-container input {
  padding: 10px;
  border: 1px solid #061328;
  border-radius: 5px;
}
</style>
