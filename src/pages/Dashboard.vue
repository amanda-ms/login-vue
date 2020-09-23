<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <h1 class="dashboard__header__title">Página de usuários</h1>
      <button @click="logout" class="dashboard__header__button">Sair</button>
    </div>

    <form @submit="addUser" class="dashboard__form content">
      <input
        type="text"
        class="dashboard__form__nome"
        placeholder="Digite seu nome"
        v-model="name"
      />
      <input
        type="email"
        class="dashboard__form__email"
        placeholder="Digite seu email"
        v-model="email"
      />
      <input
        type="password"
        class="dashboard__form__senha"
        placeholder="Digite sua senha"
        v-model="password"
      />
      <button class="dashboard__form__button">Adicionar</button>
    </form>

    <form v-if="editar" @submit="editarUser" class="dashboard__form content">
      <input
        type="text"
        class="dashboard__form__nome"
        placeholder="Digite seu nome"
        v-model="formEditar.name"
      />
      <input
        type="email"
        class="dashboard__form__email"
        placeholder="Digite seu email"
        v-model="formEditar.email"
      />
      <input
        type="password"
        class="dashboard__form__senha"
        placeholder="Digite sua senha"
        v-model="formEditar.password"
      />
      <button class="dashboard__form__button">Editar</button>
    </form>

    <table class="dashboard__table content">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Senha</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <a href="#" @click="deletarUser($event, user.id)">Deletar</a>
            <a href="#" @click="carregarInfo($event, user)">Editar</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      users: [],
      editar: false,
      formEditar: {
        id: "",
        name: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.carregarUser();
  },
  methods: {
    logout() {
      this.$router.push({ name: "login" });
    },

    async carregarUser() {
      const { data } = await axios.get("http://localhost:3000/users");

      this.users = data;
    },

    async addUser(e) {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      this.name = "";
      this.email = "";
      this.password = "";

      this.carregarUser();
    },

    async deletarUser(e, id) {
      e.preventDefault();
      const { data } = await axios.delete(`http://localhost:3000/users/${id}`);

      this.carregarUser();
    },

    async editarUser(e) {
      e.preventDefault();
      const { data } = await axios.put(
        `http://localhost:3000/users/${this.formEditar.id}`,
        {
          name: this.formEditar.name,
          email: this.formEditar.email,
          password: this.formEditar.password,
        }
      );
      this.editar = false;
      this.carregarUser();
    },
    carregarInfo(e, user) {
      e.preventDefault();
      this.editar = true;
      this.formEditar.id = user.id;
      this.formEditar.name = user.name;
      this.formEditar.email = user.email;
      this.formEditar.password = user.password;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 65%;
  margin: 0 auto;
}
.dashboard {
  display: flex;
  flex-direction: column;
  background: url("https://image.freepik.com/vetores-gratis/colorido-fundo-desfocado_1112-502.jpg")
    no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100%;

  &__header {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 20px 0;
    background: rgba(247, 244, 244, 0.8);

    &__title {
      color: rgb(90, 90, 90, 0.8);
    }
    &__button {
      width: 100px;
      border-radius: 20px;
      cursor: pointer;
      border: 0;
      background: #84e3ff;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
    }
  }
  &__form {
    display: flex;
    justify-content: center;
    &__nome,
    &__email,
    &__senha {
      width: 20%;
      outline: 0;
      padding: 10px;
      margin: 30px 20px;
      border-radius: 10px;
    }
    &__button {
      height: 40px;
      padding: 8px;
      margin: 30px 0;
      border: none;
      cursor: pointer;
      background: rgba(247, 244, 244, 0.8);
      border-radius: 20px;
      width: 100px;
      font-size: 15px;
      font-weight: 700;
      color: rgb(90, 90, 90, 0.8);
    }
  }
  &__table {
    border-collapse: collapse;
    thead {
      tr {
        text-align: center;
        background: #2db7fe;
        th {
          padding: 15px;
          color: #fff;
        }
      }
    }
    tbody {
      tr {
        text-align: center;
        td {
          padding: 8px;
          a {
            background: rgba(247, 244, 244, 0.8);
            padding: 5px;
            text-decoration: none;
            border-radius: 5px;
            color: rgb(90, 90, 90, 0.8);
            font-weight: 700;
          }
        }
        td > a {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
