<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{smoothie.title}} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIn" v-model="anotherIng" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  data() {
    return {
      smoothie: null,
      anotherIng: null,
      feedback: null,
    };
  },
  methods: {
    addIn() {
      if (this.anotherIng) {
        this.smoothie.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add your ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient != ing;
        }
      );
    },
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style scoped>
.editSmoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
h2 {
  font-size: 2em;
  margin: 20px auto;
}

.field {
  margin: 20px auto;
  position: relative;
}

.delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
