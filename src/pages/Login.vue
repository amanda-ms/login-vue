<template>
  <div class="container">
    <div class="login">
      <img
        src="https://static.thenounproject.com/png/363640-200.png"
        class="login__title"
      />

      <form @submit="submit" class="login__form">
        <input
          type="email"
          class="login__form__input"
          placeholder="Digite seu email"
          v-model="email"
        />
        <input
          type="password"
          class="login__form__input"
          placeholder="Digite sua senha"
          v-model="senha"
        />
        <button class="login__form__button">Entrar</button>
      </form>
      <router-link to="/cadastro" class="login__cadastro"
        >Cadastre-se</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();

      const { data } = await axios.get("http://localhost:3000/users", {
        params: {
          email: this.email,
          password: this.senha,
        },
      });
      if (data.length > 0) {
        this.$router.push({ name: "dashboard" });
      } else {
        alert("Usuário ou senha incorretos");
      }
    },
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.input-click {
  border: 1px solid rgb(98, 2, 238);
}

.container {
  width: 100%;
  height: 100%;
  background: #212121;
  background-size: 100%;
  display: flex;
  align-items: center;
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 500px;
    background: rgba(126, 126, 126, 0.3);
    border-radius: 20px;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1),
      0 8px 16px rgba(255, 255, 255, 0.1);
    &__title {
      width: 85px;
      margin-bottom: 35px;
      font-size: 40px;
    }
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 65%;
      &__input {
        margin-bottom: 30px;
        border-radius: 5px;
        outline: 0;
        border: 0;
        padding: 15px;
        width: 100%;
      }
      &__button {
        border: 0;
        width: 250px;
        padding: 10px;
        border-radius: 5px;
        background: rgb(98, 2, 238);
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);
        transition: 800ms;
        outline: 0;

        &:hover {
          background: rgb(66, 0, 165);
        }
      }
    }
    &__cadastro {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
      color: #fff;
      margin-top: 15px;
      width: 250px;
      font-weight: 500;
      transition: 800ms;
      outline: 0;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
