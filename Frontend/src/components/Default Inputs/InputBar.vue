<template>
  <div class="input-container">
    <input :type="props.type" required v-model="input_data" placeholder=" " />
    <label>{{ props.placeholder }}</label>
  </div>
</template>

<script lang="ts" setup>
type TypeOptions = "text" | "password" | "email";

const props = defineProps<{
  placeholder?: string;
  type?: TypeOptions;
}>();

const input_data = defineModel<string>();
</script>

<style scoped>
.input-container {
  position: relative;
  width: 300px;
  margin: 20px auto;
}

input {
  width: 100%;
  padding: 14px 12px 14px 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: all 0.1s;
}

input:focus {
  border-color: #006051;
}

label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease all;
  background-color: transparent;
  padding: 0 4px;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -10px;
  left: 8px;
  font-size: 12px;
  color: #006051;
}
</style>
