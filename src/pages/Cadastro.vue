<template>
  <div class="container">
    <div class="cadastro">
      <img
        src="https://static.thenounproject.com/png/363640-200.png"
        class="cadastro__img"
      />
      <h1 class="cadastro__title">Novo cadastro</h1>
      <form @submit="createUser" class="cadastro__form">
        <input
          type="text"
          placeholder="Digite seu nome"
          v-model="nome"
          class="cadastro__form__input"
        />
        <input
          type="email"
          placeholder="Digite seu email"
          v-model="email"
          class="cadastro__form__input"
        />
        <input
          type="date"
          placeholder="Digite seu aniversário"
          v-model="date"
          class="cadastro__form__input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          v-model="password"
          class="cadastro__form__input"
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          v-model="confirmationPassword"
          class="cadastro__form__input"
        />
        <div class="cadastro__form__content">
          <button class="cadastro__form__content__button">Cadastrar</button>
          <router-link to="/" class="cadastro__form__content__voltar"
            >Voltar</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nome: "",
      email: "",
      date: "",
      password: "",
      confirmationPassword: "",
    };
  },
  methods: {
    async createUser(e) {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:3000/users", {
        nome: this.nome,
        email: this.email,
        date: this.date,
        password: this.password,
      });
      this.$router.push("/");

      this.nome = "";
      this.email = "";
      this.date = "";
      this.password = "";
      this.confirmationPassword = "";
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
  .cadastro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 75%;
    background: rgba(126, 126, 126, 0.3);
    border-radius: 20px;
    margin: 0 auto;
    &__img {
      width: 60px;
      margin-bottom: 20px;
      font-size: 40px;
    }
    &__title {
      color: #fff;
      margin-bottom: 20px;
      font-size: 25px;
    }
    &__form {
      display: flex;
      align-items: center;
      width: 65%;
      flex-wrap: wrap;
      &__input {
        margin: 5px;
        border-radius: 5px;
        outline: 0;
        border: 0;
        padding: 15px;
        width: 48%;
        &:first-child {
          width: 100%;
        }
        &:nth-child(2) {
          width: 66%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
      &__content {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &__button {
          border: 0;
          width: 250px;
          padding: 10px;
          border-radius: 5px;
          background: rgb(98, 2, 238);
          font-size: 18px;
          font-weight: bold;
          outline: 0;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);
          transition: 800ms;
          margin-right: 10px;
          &:hover {
            background: rgb(66, 0, 165);
          }
        }
        &__voltar {
          text-decoration: none;
          color: #fff;
          border: 1px solid #fff;
          padding: 10px;
          border-radius: 5px;
          width: 250px;
          display: flex;
          align-self: center;
          justify-content: center;
          outline: 0;
          transition: 800ms;
          font-weight: 500;
          &:hover {
            background: #fff;
            color: #000;
          }
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
      &:hover {
        background: rgb(98, 2, 238);
        border: 1px solid rgb(98, 2, 238);
      }
    }
  }
}
</style>
