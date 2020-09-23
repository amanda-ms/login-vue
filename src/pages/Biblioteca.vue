<template>
  <div class="bib">
    <div class="bib__header content">
      <img src="@/assets/signa.png" />
      <a href="#" @click="logout" class="bib__header__sair">
        <img src="@/assets/sair.png" />
      </a>
    </div>

    <h1 class="bib__title content">Página de Livros</h1>

    <table class="bib__table content">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Autor</th>
          <th>Genero</th>
          <th>Editora</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bib in biblioteca" :key="bib.id">
          <td>{{ bib.nome }}</td>
          <td>{{ bib.autor }}</td>
          <td>{{ bib.genero }}</td>
          <td>{{ bib.editora }}</td>
          <td>
            <a href="#" @click="deletarLivro($event, bib.id)"
              ><img src="@/assets/delete.png"
            /></a>
            <a href="#" @click="(modalEditar = true), carregarInfo($event, bib)"
              ><img src="@/assets/editar.png"
            /></a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="bib__buttons content">
      <button class="bib__buttons__btn-voltar">
        Voltar
      </button>
      <button @click="modal = true" class="bib__buttons__btn-add">Novo</button>
    </div>

    <Modal v-if="modal">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__header__title">Cadastrar novo livro</h3>
          <a href="#" @click="modal = false">
            <img src="@/assets/close.png" />
          </a>
        </div>
        <form @submit="addLivro" class="modal__form">
          <input
            type="text"
            placeholder="Nome do livro"
            v-model="nome"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Autor do livro"
            v-model="autor"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Genero do livro"
            v-model="genero"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Editora do livro"
            v-model="editora"
            class="modal__form__input"
          />
          <button @click="modal = false" class="modal__form__btn-voltar">
            Voltar
          </button>
          <button class="modal__form__btn-add">Adicionar</button>
        </form>
      </div>
    </Modal>

    <Modal v-if="modalEditar">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__header__title">Cadastrar novo livro</h3>
          <a href="#" @click="modalEditar = false">
            <img src="@/assets/close.png" />
          </a>
        </div>
        <form @submit="editarLivro" class="modal__form">
          <input
            type="text"
            placeholder="Nome do livro"
            v-model="editar.nome"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Autor do livro"
            v-model="editar.autor"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Genero do livro"
            v-model="editar.genero"
            class="modal__form__input"
          />
          <input
            type="text"
            placeholder="Editora do livro"
            v-model="editar.editora"
            class="modal__form__input"
          />

          <button class="modal__form__btn-voltar">Voltar</button>
          <button class="modal__form__btn-add">Editar</button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/common/Modal";
export default {
  data() {
    return {
      nome: "",
      autor: "",
      genero: "",
      editora: "",
      biblioteca: [],
      editar: {
        id: "",
        nome: "",
        autor: "",
        genero: "",
        editora: "",
      },
      modal: false,
      modalEditar: false,
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.carregarLivros();
  },
  methods: {
    logout() {
      this.$router.push({ name: "login" });
    },

    async carregarLivros() {
      const { data } = await axios.get("http://localhost:3000/biblioteca");

      this.biblioteca = data;
    },

    async addLivro(e) {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:3000/biblioteca", {
        nome: this.nome,
        autor: this.autor,
        genero: this.genero,
        editora: this.editora,
      });

      this.nome = "";
      this.autor = "";
      this.genero = "";
      this.editora = "";

      this.carregarLivros();
    },

    async deletarLivro(e, id) {
      e.preventDefault();
      const { data } = await axios.delete(
        `http://localhost:3000/biblioteca/${id}`
      );

      this.carregarLivros();
    },

    async editarLivro(e) {
      e.preventDefault();
      const { data } = await axios.put(
        `http://localhost:3000/biblioteca/${this.editar.id}`,
        {
          nome: this.editar.nome,
          autor: this.editar.autor,
          genero: this.editar.genero,
          editora: this.editar.editora,
        }
      );
      this.carregarLivros();
    },
    carregarInfo(e, bib) {
      e.preventDefault();
      this.editar.id = bib.id;
      this.editar.nome = bib.nome;
      this.editar.autor = bib.autor;
      this.editar.genero = bib.genero;
      this.editar.editora = bib.editora;
    },
  },
};
</script>

<style lang="scss">
.content {
  width: 65%;
  margin: 0 auto;
  background: #212121;
}
.bib {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #212121;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    background: #212121;
  }
  &__table {
    background: #303030;
    border-radius: 10px;
    border-collapse: collapse;
    thead {
      tr {
        th {
          padding: 10px 0;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 10px 0;
          color: #f7f8f9;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          a {
            &:first-child {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  &__title {
    font-size: 25px;
    color: #fff;
    padding: 25px 0;
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    &__btn-voltar {
      background: transparent;
      border: 1px solid #fff;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
      color: #fff;
      width: 150px;
      font-weight: 500;
      transition: 800ms;
      cursor: pointer;
      outline: 0;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
    &__btn-add {
      border: 0;
      width: 150px;
      padding: 10px;
      border-radius: 5px;
      background: rgb(98, 2, 238);
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      transition: 800ms;
      outline: 0;
      margin-left: 10px;
      &:hover {
        background: rgb(66, 0, 165);
      }
    }
  }
  .modal {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    &__header {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      &__title {
        color: #fff;
      }
    }
    &__form {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      &__input {
        outline: 0;
        padding: 10px;
        width: calc(50% - 5px);

        margin-bottom: 10px;
        border-radius: 5px;
        border: 0;
        &:nth-child(1) {
          margin-right: 5px;
        }
        &:nth-child(3) {
          margin-right: 5px;
        }
      }
      &__btn-voltar {
        background: transparent;
        border: 1px solid #fff;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        color: #fff;
        width: 116px;
        font-weight: 500;
        transition: 800ms;
        cursor: pointer;
        outline: 0;
        &:hover {
          background: #fff;
          color: #000;
        }
      }
      &__btn-add {
        border: 0;
        width: 116px;
        padding: 10px;
        border-radius: 5px;
        background: rgb(98, 2, 238);
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transition: 800ms;
        outline: 0;
        margin-left: 10px;
        &:hover {
          background: rgb(66, 0, 165);
        }
      }
    }
  }
}
</style>
