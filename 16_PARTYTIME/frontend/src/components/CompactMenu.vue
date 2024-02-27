<template>
  <div class="menu-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "CompactMenu",
};
</script>

<style scoped>
.menu-container {
  background-color: #000;
  color: #de0f97;
  border: 1px solid #de0f97;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}

.menu-container:hover {
  background-color: #de0f97;
  color: #000;
  border: 1px solid #000;
  font-weight: bold;
}
</style>
