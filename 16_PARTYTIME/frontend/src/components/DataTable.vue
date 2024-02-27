<template>
  <div class="data-container">
    <Message :msg="msg" :msgClass="msgClass" />
    <div class="data-table-heading">
      <div class="data-id-heading">Nº:</div>
      <div class="data-title-heading">Nome da Festa:</div>
      <div class="data-actions-heading">Ações:</div>
    </div>
    <div class="data-table-body">
      <div class="data-row" v-for="(party, index) in parties" :key="index">
        <div class="data-id-container">{{ index + 1 }}</div>
        <div class="data-title-container">
          <router-link :to="`/party/${party._id}`">{{
            party.title
          }}</router-link>
        </div>
        <div class="data-actions-container">
          <router-link :to="`/editparty/${party._id}`" class="edit-btn"
            >Editar</router-link
          >
          <button class="remove-btn" @click="remove(party._id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "DataTable",
  props: ["parties"],
  components: {
    Message,
  },
  data() {
    return {
      msg: null,
      msgClass: null,
    };
  },
  methods: {
    async remove(id) {
      // get id and token from store
      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;

      const data = {
        id: id,
        userId: userId,
      };

      const jsonData = JSON.stringify(data);

      await fetch("http://localhost:3000/api/party/", {
        method: "DELETE",
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

          // get all parties again
          this.$parent.getParties();

          setTimeout(() => {
            this.msg = null;
          }, 3000);
        })
        .catch((err) => {
            console.log(err)
        });
    },
  },
};
</script>

<style scoped>
.data-table-heading,
.data-row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
}

.data-row {
  @media screen and (max-width: 543px) {
    height: 100px;
  }
}

.data-table-heading div,
.data-row div {
  flex: 1 1 0;
  display: flex;
  flex-wrap: wrap;
}

.data-id-heading,
.data-id-container {
  max-width: 50px;
}

.edit-btn,
.remove-btn {
  padding: 10px 16px;
  background-color: transparent;
  color: #000;
  font-weight: bold;
  margin: 5px;
  text-decoration: none;
  border: 2px solid #000;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.5s;
}

.edit-btn:hover {
  background-color: #061328;
  border-color: #007bff;
  color: #007bff;
}

.remove-btn:hover {
  background-color: #061328;
  border-color: #ff0019;
  color: #ff0019;
}
</style>
