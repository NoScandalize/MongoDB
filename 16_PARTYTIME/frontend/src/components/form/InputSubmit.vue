<template>
  <input type="submit" :value="text" />
</template>

<script>
export default {
  name: "InputSubmit",
  props: {
    text: ""
  }
};
</script>

<style scoped>
    input {
        width: 200px;
        margin: 20px auto;
        text-transform: uppercase;
        color: #061328;
        background-color: #fff;
        border: 2px solid #061328;
        border-radius: 10px;
        padding: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: .5s;
    }

    input:hover {
        color: #DE0F97;
        background-color: #061328;
        border-color: #DE0F97;
    }
</style>