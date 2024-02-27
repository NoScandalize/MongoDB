<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" id="message" />
    <div>
      <form
        @submit="page === 'register' ? register($event) : update($event)"
        id="user-form"
      >
        <input type="hidden" name="id" id="id" v-model="id" />
        <div class="input-container">
          <label for="name">Nome: </label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="input-container">
          <label for="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            placeholder="Digite o seu email"
          />
        </div>
        <div class="input-container">
          <label for="password">Senha: </label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Digite a sua senha"
          />
        </div>
        <div class="input-container">
          <label for="confirmPassword">Confirmação de Senha: </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            v-model="confirmPassword"
            placeholder="Digite a sua senha novamente"
          />
        </div>
        <InputSubmit :text="btnText" />
      </form>
    </div>
  </div>
</template>

<script>
import InputSubmit from "./form/InputSubmit";
import Message from "./Message.vue";

export default {
  name: "UserForm",
  data() {
    return {
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirmPassword: null,
      msg: null,
      msgClass: null,
    };
  },
  props: ["user", "page", "btnText"],
  components: {
    InputSubmit,
    Message,
  },
  methods: {
    async register(e) {
      e.preventDefault();

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const jsonData = JSON.stringify(data);

      await fetch("http://localhost:3000/api/auth/register", {
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async update(e) {
      e.preventDefault();

      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const jsonData = JSON.stringify(data);

      // get token from store
      const token = this.$store.getters.token;

      await fetch("http://localhost:3000/api/user/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: jsonData,
      })
        .then((res) => res.json())
        .then((data) => {

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.message;
            this.msgClass = "success";
          }

          setTimeout(() => {
            this.msg = null;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#user-form {
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
